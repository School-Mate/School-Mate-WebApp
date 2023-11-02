import "./globals.css";
import type { Metadata } from "next";
import { Nanum_Gothic } from "next/font/google";
import AuthSession from "./_component/AuthSession";

const NanumGothic = Nanum_Gothic({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body className={NanumGothic.className}>
        <AuthSession>{children}</AuthSession>
      </body>
    </html>
  );
}
