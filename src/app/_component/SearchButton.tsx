"use client";

import { stackRouterPush } from "@/lib/stackRouter";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SerachButton = ({ searchPath }: { searchPath?: string }) => {
  const router = useRouter();
  return (
    <button
      className="flex flex-row space-x-2"
      onClick={() => {
        stackRouterPush(router, searchPath ? searchPath : "/search");
      }}
    >
      <Image src="/icons/Search.svg" alt="search" width={24} height={24} />
    </button>
  );
};

export default SerachButton;
