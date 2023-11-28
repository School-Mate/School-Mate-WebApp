"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { classNames } from "@/lib/uitls";
import { useRouter } from "next/navigation";
import { stackRouterBack } from "@/lib/stackRouter";
import { inter } from "@/lib/fonts";
import SerachButton from "./SearchButton";

const LeftHeaderContainer = ({
  title = "",
  backIcon = true,
  children,
  className = "",
}: {
  title?: string;
  backIcon?: boolean;
  children?: React.ReactNode;
  className?: string;
}) => {
  useEffect(() => {
    function handleVerticalResize() {
      const clientWidth = document.getElementsByTagName("html")[0].clientWidth;
      if (window.visualViewport?.width === clientWidth) {
        // indicates that width is unchanged (e.g. keyboard opens on phone)
        document.getElementsByTagName("html")[0].style.height =
          window.visualViewport?.height.toString() + "px";
      }
    }
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleVerticalResize);
      return () =>
        window.visualViewport?.removeEventListener(
          "resize",
          handleVerticalResize
        );
    }
  }, []);

  return (
    <>
      <div className={className}>
        <Header title={title} backIcon={backIcon} />
        <div
          style={{
            paddingTop: "64px",
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

const Header = ({
  title = "",
  className = "",
  backIcon = true,
  ...props
}: {
  title?: string;
  className?: string;
  backIcon?: boolean;
} & React.ComponentPropsWithRef<"header">) => {
  const router = useRouter();

  return (
    <header
      className={classNames(
        "text-2xl bg-white fixed w-full z-10 min-w-[280px] max-w-[540px] px-4",
        className
      )}
      style={{
        boxShadow: "0px 2px 30px rgba(0, 0, 0, 0.06)",
      }}
      {...props}
    >
      <div className="font-bold relative flex items-center h-14">
        {backIcon && (
          <button
            onClick={() => {
              stackRouterBack(router);
            }}
          >
            <Image src="/icons/Back.svg" alt="back" width={12} height={12} />
          </button>
        )}
        <span
          className={classNames("ml-4 font-bold text-[22px]", inter.className)}
        >
          {title}
        </span>
        <div className="flex flex-row ml-auto">
          <SerachButton />
        </div>
      </div>
    </header>
  );
};

export default LeftHeaderContainer;
