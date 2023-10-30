import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      user: User;
      token: {
        accessToken: string;
        expiresIn: number;
      };
      registered: boolean;
    };
  }
}
