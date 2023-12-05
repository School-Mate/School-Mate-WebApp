import { AskedListWithUser, AskedWithUser } from "@/types/asked";
import { AxiosResponse } from "axios";
import AskedCreate from "./AskedCreate";
import Image from "next/image";
import { classNames } from "@/lib/uitls";
import AskedMore from "./AskedMore";
import AskedEditStatusMessage from "./AskedEditStatusMessage";
import { Session } from "next-auth";
import AskedList from "./AskedList";

const AskedMe = async ({
  data,
  auth,
}: {
  data: Promise<AxiosResponse>;
  auth: Session;
}) => {
  const askedme = (await data
    .then(res => res.data.data)
    .catch(e => null)) as AskedListWithUser | null;

  if (!askedme) return <AskedCreate />;

  return (
    <>
      <div className="w-full">
        <div className="w-full py-3 border-b">
          <div className="px-5 w-full flex flex-row items-center">
            <div className="relative w-[65px] h-[65px]">
              <Image
                src={
                  askedme.user.user.profile
                    ? process.env.NEXT_PUBLIC_S3_URL + askedme.user.user.profile
                    : "/images/schoolmate/logobg.svg"
                }
                layout="fill"
                objectFit="cover"
                className="rounded-full"
                alt="profile"
              />
            </div>
            <div className="flex flex-col ml-3">
              <div className="flex flex-row items-center w-full">
                <span className="font-bold">@{askedme.user.customId}</span>
                <div className="flex flex-row ml-2 items-center space-x-1">
                  {askedme.user.tags.slice(0, 2).map((item, key) => (
                    <span
                      key={key}
                      className={classNames(
                        "text-[0.7rem] font-bold text-white px-2 py-[0.14rem] rounded-full truncate",
                        "bg-[#0a1a3a]"
                      )}
                    >
                      #{item}
                    </span>
                  ))}
                </div>
              </div>
              <AskedEditStatusMessage
                statusMessage={askedme.user.statusMessage}
                auth={auth}
              />
            </div>
            <AskedMore />
          </div>
        </div>
        <AskedList askeds={askedme.askeds} />
      </div>
    </>
  );
};

const AskedMeSkeleton = () => {
  const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent`;

  return (
    <div className="flex flex-col">
      <div className="w-full py-3 border-b">
        <div className="px-5 w-full flex flex-row items-center">
          <div
            className={`relative h-[65px] rounded-[20px] bg-[#CCCCCC] ${shimmer} w-full`}
          />
        </div>
      </div>
      <div className="px-5 w-full flex flex-row items-center mt-3">
        <div
          className={`relative h-[350px] rounded-[20px] bg-[#CCCCCC] ${shimmer} w-full`}
        />
      </div>
    </div>
  );
};

export default AskedMe;
export { AskedMeSkeleton };