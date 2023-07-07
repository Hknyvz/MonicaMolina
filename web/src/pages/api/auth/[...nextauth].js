import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient } from "../client";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 60 * 60 },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const client = createClient();
        const res = await client.post("/login", credentials);

        const user = await res.data;

        if (res.status === 200 && user.password === req.body.password) {
          return user;
        }

        return null;
      },
      jwt: {
        maxAge: 60 * 60,
      },
      callbacks: {
        async signIn(params) {
          if (params.user) {
            return true;
          }
          return false;
        },

        async jwt(params) {
          if (params.user) {
            params.token = {
              token: params.user.token,
              name: params.user.name,
              email: params.user.email,
              userId: params.user.id,
            };
            return params.token;
          }
          return params.token;
        },

        async session(params) {
          params.session.token = params.token.token;
          params.session.user.image = "";
          params.session.userId = params.token.userId;
          return params.session;
        },
      },
    }),
  ],
};

export default NextAuth(authOptions);
