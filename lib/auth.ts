import NextAuth, { DefaultSession } from "next-auth"
import Google from "next-auth/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/data/db"
 
declare module "next-auth" {
  interface Session {
    user: {
      accessToken?: string;
    } & DefaultSession["user"]
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google({
    authorization: {
      params: {
         scope: [
          "https://www.googleapis.com/auth/userinfo.email",
          "https://www.googleapis.com/auth/userinfo.profile",
          "openid",
          "https://www.googleapis.com/auth/photospicker.mediaitems.readonly"
         ].join(" ")
      }
    },
  })],
  adapter: DrizzleAdapter(db),
  callbacks: {
    jwt: ({token, account })=> {
      console.log("HERE",token, account);
      if (account?.access_token) {
        token.access_token = account.access_token;
      }
      return token;
    },
  },
})