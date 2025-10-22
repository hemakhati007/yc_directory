"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from 'slugify'
import { writeClient } from "@/sanity/lib/write-client";


export const createPitch = async (
    state: any,
    form: FormData,
    pitch: string,
 ) => {
    const session = await auth();
    // if(!session)return JSON.parse(JSON.stringify({error:"NoT signed in",status:"ERROR"}))
    // or may be by utility function
    if (!session) return parseServerActionResponse({
        error: "NoT signed in",
        status: "ERROR"
    });

    const { title, description, category, link } = Object.fromEntries(
        Array.from(form).filter(([key]) => key != pitch))
    // we only wanna keep the pitch

    //creating slug for each startup
    // generate randomly or npm package slugify
    // npm i slugify
    const slug = slugify(title as string, { lower: true, strict: true });
    
    try {

        const startup = {
            title,
            description,
            category,
            image: link,
            slug: {
                _type: slug,
                current: slug,
            },
            author: {
                _type: 'reference',
                _ref: session?.id,
            },
            pitch,
        };
        //write to sanity client

        const result = await writeClient.create({ _type: "startup", ...startup });
        return parseServerActionResponse({
            ...result,
            error: '',
            status:'SUCCESS',
        })
    }
    catch (error) {
        console.log(error);
        return parseServerActionResponse({
            error: JSON.stringify(error),
            status: "ERROR",
        });
    }
    
};