import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import markdownit from "markdown-it";
import { Suspense } from "react";
const md = markdownit();

import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });
  
  if (!post) return notFound();
  const parsedContent = md.render(post?.pitch || "");
  

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createAT)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      <section className="section_container">
        <Image
          src={post.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
          width={144}
          height={30}
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3 "
            >
              <div className="w-16 h-16 relative">
                <Image
                  src={post.author.image}
                  alt="avatar"
                  fill
                  className="rounded-full drop-shadow-lg"
                />
              </div>
              <div>
                <p className="text-20-medium">{post.author.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{post.author.username}
                </p>
              </div>
            </Link>
            <p className="category-tag">{post.category}</p>
          </div>

          <h3 className="text-30-bold">Pitch Details</h3>
          {/* pitch details comes in markdown format to convert markdown format to html string
            intall package markdown-it
         */}
          {/* react escape any html to prevent from Xss attack dangerouslySetInnerHTML indicate content safe */}
          {parsedContent ? (
            <article
              dangerouslySetInnerHTML={{ __html: parsedContent }}
              className="prose max-w-4xl font-work-sans break-all"
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>

        {/* TODO: EDITOR SELECTED STATUPS */}
      </section>
      <hr className="divider" />

      {/* dynamic content ppr */}
      {/* real time update */}
      <Suspense fallback={<Skeleton className="view_skeleton" />}>
        {/* from react allowing a fallback in case we cannot render the dynamic content  */}
        {/* render a dynmic componnet */}
        <View id={id} />
      </Suspense>
    </>
  );
}

export default page
