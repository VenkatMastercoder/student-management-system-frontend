import axios from "axios";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const authOption: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        if (!credentials || !credentials.username || !credentials.password) {
          return null;
        }

        const response = await axios.post(
          "https://student-management-system-production-a6f2.up.railway.app/v1/auth/login",
          {
            email: credentials?.username,
            password: credentials?.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const user = response.data;
        console.log(user.user);

        if (user) {
          return user.user;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};

const hander = NextAuth(authOption);

export { hander as GET, hander as POST };
