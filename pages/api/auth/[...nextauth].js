import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      httpOptions: {
        timeout: 300000,
      }
    }),
    // ...add more providers here
  ],

  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true,
    // maxAge: 5 * 60,
  },
  pages: {
    signIn: '/auth/signin'
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user.username = session.user.name
        .split("")
        .join("")
        .toLocaleLowerCase();

      session.user.userid = token.sub;
      return session;
    }
  }
})