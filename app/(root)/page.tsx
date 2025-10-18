import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({searchParams}:{searchParams:Promise<{query?:string}>}) {

  //acccess quesry from search params
  // 1 define type of search params
  //2.extract that query from search params
  const query=(await searchParams).query;
  
  //hard code posts for now
  const posts = [
    {
      _createdAt: new Date(), //turn it into meaning full string right now its an object
      views: 50,
      author: {
        _id: 1,
        name: "hemakahti",
      },
      _id: 1,
      description: "this is a discription",
      image:
        "https://plus.unsplash.com/premium_photo-1677094310899-02303289cadf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1032",
      category: "robots",
      title: "We Robots",
    },
  ];

  return (
   <>
   <section className="pink_container">
   
    <h1 className="heading">Pitch Your Startup,<br/> Connect With Enterpreneurs</h1>
    <p className="sub-heading !max-w-3xl">
      Submit Ideas,Vote on Pitches, and Get Noticed In Virtual Competitions.
    </p>
    <SearchForm query={query}/>
    {/* need to difien query rypw in serachfom componnet otherwise it wont recognize here */}

   </section>

    <section className="section_container">
      <p className="text-30-semibold">
        {query?`Search results for ${query}`:'All Startups'}
      </p>
      {/* we can map our posts */}
      
      <ul className="mt-7 card_grid">
        {posts?.length>0?(posts.map((post: StartupCardType, index: number)=>(
        
          // passing an index is not a good practice  so we will pass post id cuz its gonna be always unique
          <StartupCard key={post?._id} post={post}/>
        ))):(<p className="no-results">No Startups Found</p>)}
      </ul>

    </section>
     </>
  );
}
// ! before class to override other styles previously provided

// while teh home page will be sever rander the search bar will have some clientside functionality  to manage keyboard preses and buttom clicks
 