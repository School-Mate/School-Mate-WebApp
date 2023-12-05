import { inter } from "@/lib/fonts";
import { classNames } from "@/lib/uitls";
import { AxiosResponse } from "axios";
import { Board } from "schoolmate-types";
import BoardItem from "./BoardItem";

interface Props {
  data: Promise<AxiosResponse>;
}

const BoardList = async ({ data }: Props) => {
  const boards = (await data.then(res => res.data.data)) as Board[];

  return (
    <>
      <BoardListSection
        title="인기 게시판"
        boards={[
          {
            id: "/hot" as any,
            name: "HOT 게시판",
            default: true,
            schoolId: "1",
            noticeId: [],
            description: "",
            icon: "🔥",
          },
        ]}
      />
      {boards.filter(board => board.default).length !== 0 && (
        <BoardListSection
          title="즐겨찾는 게시판"
          boards={boards.filter(board => board.default)}
        />
      )}
      {boards.filter(board => !board.default).length !== 0 && (
        <BoardListSection
          title="학교 게시판"
          boards={boards.filter(board => !board.default)}
        />
      )}
    </>
  );
};

const BoardListSection = ({
  title,
  boards,
}: {
  title: string;
  boards: Board[];
}) => {
  return (
    <>
      <div className={classNames("flex flex-col px-5 pt-5", inter.className)}>
        <span className="text-[#b6b6b6] text-base font-bold">{title}</span>
        <div className="flex flex-col items-start mt-2 rounded-[20px] py-2 px-7 bg-white drop-shadow-lg">
          {boards.map((board, index) => (
            <BoardItem
              key={index}
              index={index}
              icon={
                (board.id as any) === "/hot"
                  ? "🔥"
                  : board.icon
                  ? board.icon
                  : "📌"
              }
              name={board.name}
              path={`/board/${board.id}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const BoardListSkeleton = () => {
  const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent`;

  return (
    <div className="flex flex-col mt-6 px-5 items-center">
      <div className="flex flex-col w-full">
        <div
          className={`relative h-[20px] w-24 rounded-[20px] bg-[#CCCCCC] ${shimmer}`}
        />
      </div>
      <div className="flex flex-col w-full mt-3">
        <div
          className={`relative h-[150px] rounded-[20px] bg-[#CCCCCC] ${shimmer}`}
        />
      </div>
      <div className="flex flex-col w-full mt-3">
        <div
          className={`relative h-[20px] w-24 rounded-[20px] bg-[#CCCCCC] ${shimmer}`}
        />
      </div>
      <div className="flex flex-col w-full mt-3">
        <div
          className={`relative h-[100px] rounded-[20px] bg-[#CCCCCC] ${shimmer}`}
        />
      </div>
      <div className="flex flex-col w-full mt-3">
        <div
          className={`relative h-[20px] w-24 rounded-[20px] bg-[#CCCCCC] ${shimmer}`}
        />
      </div>
      <div className="flex flex-col w-full mt-3">
        <div
          className={`relative h-[350px] rounded-[20px] bg-[#CCCCCC] ${shimmer}`}
        />
      </div>
    </div>
  );
};

export { BoardList, BoardListSkeleton };
export default BoardList;
