"use server";

import { auth } from "@/auth";

export const createPitch = async (state: any, form: FormData, pitch: string) => {
    const session = await auth();
    // if(!session)return JSON.parse(JSON.stringify({error:"NoT signed in",status:"ERROR"}))
    // or may be by utility function
    
}