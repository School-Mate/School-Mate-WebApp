"use client";

import Button from "@/app/_component/Button";
import { Loading } from "@/app/_component/Loading";
import { swrFetcher } from "@/lib/fetch";
import { inter } from "@/lib/fonts";
import { stackRouterPush } from "@/lib/stackRouter";
import { classNames } from "@/lib/uitls";
import { sendWebviewEvent } from "@/lib/webviewHandler";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ConnectionAccount } from "schoolmate-types";
import useSWR from "swr";

const ConnectAccountPage = ({ token }: { token: string }) => {
  const router = useRouter();
  const { data: connectAccount, isLoading } = useSWR<ConnectionAccount[]>(
    "/auth/me/connectaccount",
    swrFetcher,
    {
      refreshInterval: 2000,
    }
  );
  if (isLoading)
    return (
      <div className="flex flex-col h-[88vh] items-center justify-center">
        <Loading color="primary" />
      </div>
    );
  return (
    <>
      <div
        className={classNames(
          "flex flex-col px-5 pt-3 space-y-3",
          inter.className
        )}
      >
        <div className="flex flex-row">
          <div className="flex flex-row items-center">
            <Image
              src="/icons/Instagram.svg"
              alt="instagram"
              width={30}
              height={30}
            />
            <span className="ml-2">
              {connectAccount?.find(item => item.provider === "instagram")
                ? connectAccount?.find(item => item.provider === "instagram")
                    ?.name
                : "인스타그램"}
            </span>
          </div>
          <Button
            className="ml-auto rounded-2xl px-4 py-1"
            variant={
              connectAccount?.find(item => item.provider === "instagram")
                ? "outline"
                : "primary"
            }
            onClick={
              connectAccount?.find(item => item.provider === "instagram")
                ? async () => {
                    stackRouterPush(
                      router,
                      "/me/connectaccount/disconnect/instagram",
                      "stack",
                      false
                    );
                  }
                : async () => {
                    sendWebviewEvent("OPEN_BROWSER_EVENT", {
                      url:
                        process.env.NEXT_PUBLIC_API_URL +
                        `/auth/instagram?token=${token}`,
                    });
                  }
            }
          >
            {connectAccount?.find(item => item.provider === "instagram")
              ? "연동해제"
              : "연동하기"}
          </Button>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-row items-center">
            <Image
              src={
                process.env.NEXT_PUBLIC_S3_URL + "static/league-of-legends.png"
              }
              alt="league-of-legends"
              width={30}
              height={30}
            />
            <span className="ml-2">
              {connectAccount?.find(item => item.provider === "leagueoflegends")
                ? connectAccount?.find(
                    item => item.provider === "leagueoflegends"
                  )?.name
                : "리그 오브 레전드"}
            </span>
          </div>
          <Button
            className="ml-auto rounded-2xl px-4 py-1"
            variant={
              connectAccount?.find(item => item.provider === "leagueoflegends")
                ? "outline"
                : "primary"
            }
            onClick={
              connectAccount?.find(item => item.provider === "leagueoflegends")
                ? async () => {
                    stackRouterPush(
                      router,
                      "/me/connectaccount/disconnect/leagueoflegends",
                      "stack",
                      false
                    );
                  }
                : async () => {
                    sendWebviewEvent("OPEN_BROWSER_EVENT", {
                      url:
                        process.env.NEXT_PUBLIC_API_URL +
                        `/auth/connect/leagueoflegends?token=${token}`,
                    });
                  }
            }
          >
            {connectAccount?.find(item => item.provider === "leagueoflegends")
              ? "연동해제"
              : "연동하기"}
          </Button>
        </div>
      </div>
    </>
  );
};
export default ConnectAccountPage;
