import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { client } from "./sanity/lib/client";
import { writeClient } from "./sanity/lib/write-client";
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user, profile }) {
      if (!profile) return false; // no profile means auth failed

      const { id, login, bio } = profile;
      const { name, email, image } = user;

      const existingUser = await client.withConfig({useCdn:false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile?.id, });
      
      if (!existingUser) {
        await writeClient.create({
          _type: 'author',
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || "",
        });
      }
     
        return true;
      
    },

    // allow us to connect githubuser with a sanity author that can then create a startup

    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client.withConfig({useCdn: false})
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id: profile?.id,
          });
        token.id = user?._id;
      }
      return token;
    },

    // in order to use 
    async session({ session, token }) {
      // pass profile id from token to session
      Object.assign(session, { id: token.id });
      return session;
    }
    
  },
})
 
// callbacks that will execute after succesful authetication by OAUTH

// by this from any page eg home we can extract our session
// from there we will get the sanity id of the author for that user