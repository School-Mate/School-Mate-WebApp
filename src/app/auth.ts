import dayjs from "dayjs";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Response } from "@/types/fetcher";

import client from "@/lib/fetch";

interface Credentials {
  phone?: string;
  password?: string;
  provider: "id" | "kakao" | "google" | "app";
  code?: string;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        phone: { label: "Phone", type: "text", placeholder: "010-0000-0000" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
        code: { label: "code", type: "text" },
        provider: { label: "provider", type: "text" },
      },
      async authorize(credentials) {
        const { phone, password, provider, code } = credentials as Credentials;
        // @ts-ignore
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
        if (provider === "id") {
          try {
            const { data: loginData } = await client.post("/auth/login", {
              phone: phone?.replace(/-/g, ""),
              password,
            });
            return loginData.data;
          } catch (e) {
            return null;
          }
        } else if (provider === "app") {
          try {
            const { data: loginData } = await client.post<Response<any>>(
              `/auth/applogin?code=${code}`
            );
            return loginData.data;
          } catch (e) {
            return null;
          }
        } else {
          try {
            const { data: loginData } = await client.get<Response<any>>(
              `/auth/${provider}/callback?code=${code}`
            );
            return loginData.data;
          } catch (e) {
            return null;
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        try {
          // @ts-ignore
          const userToken = token.data.token.accessToken;
          const { data: user } = await client.get("/auth/me", {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });

          token.data = {
            // @ts-ignore
            ...token.data,
            user: user.data,
            registered: user.data.isVerified,
          };
        } catch (e) {
          console.log(e);
        }
      }
      if (user) {
        token.data = user;
      }
      // @ts-ignore
      return token;
    },
    async session({ session, token, user, newSession, trigger }) {
      // @ts-ignore
      session.user = token.data;
      // @ts-ignore
      session.expires = dayjs()
        // @ts-ignore
        .add(token.data.token.expiresIn, "second")
        .toDate();
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export const { handlers, auth, signIn, middleware } = NextAuth(authOptions);
