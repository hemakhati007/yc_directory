import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import markdownit from "markdown-it";
import { Suspense } from "react";
const md = markdownit();

import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  //sequetial data fetching first the current startup then editors pick
  // const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });
  // // if second request do not depend in first then make it parallel
  // const { select: editorPosts } = await client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: 'editor-s-pick' });
  
  const [post, {select:editorPosts}] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "editor-s-pick" }),
  ]);

  if (!post) return notFound();
  const parsedContent = md.render(post?.pitch || "");
  

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>
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
          <Suspense fallback={<Skeleton className="view_skeleton" />}>
            {/* from react allowing a fallback in case we cannot render the dynamic content  */}
            {/* render a dynmic componnet */}
            <View id={id} />
          </Suspense>
        </div>

        {/* TODO: EDITOR SELECTED STATUPS */}

      </section>

      <hr className="divider" />

      {editorPosts?.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <p className="text-30-semibold">Editors picks</p>
          <ul className="mt-7 card_grid-sm">
            {editorPosts.map((post: StartupTypeCard, i: number) => (
              <StartupCard key={i} post={post}/>
            ))}
          </ul>
        </div>
      )

      }

      {/* dynamic content ppr */}
      {/* real time update */}
    </>
  );
}

export default page
