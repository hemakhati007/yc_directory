import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { auth, signOut,signIn} from '@/auth';
//import from @/auth is import serevr component 
//if we import from next-auth/react they will client 
//we want teh whole navbar to be server componnet

const Navbar = async () => {
    const session=await auth(); //gives us the user session if user is logged in
    //bcz this is a server component we can use async await, in a client component we cant use async await
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
            <Image src="/logo.png" alt="Logo" width={144} height={30} />
        </Link>

        <div className='flex items-center gap-5 text-black'>
            {/* render thigs is user is logged in  how can we know if use is loggedIn 
            ->look into a user session comming directly from nextAuth
            */}

            {session &&  session.user ? (
                <>
                {/* if logged in  */}
                    <Link href="/startup/create">
                        <span>create</span>
                    </Link> 
                    
                    {/* we cant use onClick event handler as its for browser interactivity and its a serevr componnet */}
                    {/* Server Actions to trigger sigin/signOut without needing client componnet onClick */}
                    <form action={async()=>{
                        "use server";
                         await signOut({redirectTo:"/"});
                        }}>

                        <button type="submit">LogOut</button>
                    </form>
                    {/* serevr action runs through form submissins 
                      ->action prop points to async server function 
                      ->use server tells execute it on server
                      ->button of type submit makes POST req to that action -->no client js need 
                    */}

                    <Link href={`/user/${session?.user?.id}`}>
                    <span>{session?.user?.name}</span></Link>
                </>
             ):(
                <form action={async()=>
                    { 
                        'use server';
                         await signIn('github')}
                 }>
                  
                <button type='submit'>
                Login
                </button>
                </form>
             )}    


        </div>
      </nav>
    </header>
  )
}

export default Navbar
