import { auth } from "@/auth";
import SearchForm from "@/components/SearchForm";
import StartupCard,{StartupTypeCard} from "@/components/StartupCard";
// import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";



export default async function Home({searchParams}:{searchParams:Promise<{query?:string}>}) {

  //acccess quesry from search params
  // 1 define type of search params
  //2.extract that query from search params
  const query = (await searchParams).query;
  
  const params = { search: query || null };

  //extracting session to create a session for the user
  const session = await auth();
  console.log(session?.id);
  //it can possible null typscript complain-->define a typscript module at next-auth.d.ts
  //by this session will know it have a id
  //if youre logged in already it will be undefiend

  //we may not be able to see it even after logged out bcz its cached  for 60sec make usecdn false by withConfig
 

  
  // const posts = await client.fetch(STARTUPS_QUERY);
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });
  // console.log(JSON.stringify(posts,null,2));
 

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup,
          <br /> Connect With Enterpreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas,Vote on Pitches, and Get Noticed In Virtual Competitions.
        </p>
        <SearchForm query={query} />
        {/* need to difien query rypw in serachfom componnet otherwise it wont recognize here */}
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for ${query}` : "All Startups"}
        </p>
        {/* we can map our posts */}

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              // passing an index is not a good practice  so we will pass post id cuz its gonna be always unique
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No Startups Found</p>
          )}
        </ul>
      </section>

      <SanityLive/>
    </>
  );
}
// ! before class to override other styles previously provided

// while teh home page will be sever rander the search bar will have some clientside functionality  to manage keyboard preses and buttom clicks
 