"use client";

import { LoadingFullPage } from "@/app/_component/Loading";
import useFetch from "@/hooks/useFetch";
import { inter } from "@/lib/fonts";
import { classNames } from "@/lib/uitls";
import { toast } from "@/lib/webviewHandler";
import { ArticleWithImage, CommentWithUser } from "@/types/article";
import dayjs from "dayjs";
import { Session } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Comment from "./Comment";
import { stackRouterPush } from "@/lib/stackRouter";
import { Hyperlink } from "@/app/_component/Hyperlink";
import Advertisement from "@/app/_component/Advisement";
import ArticleMore from "./ArticleMore";
import CopyToClipboard from "react-copy-to-clipboard";
import Modal from "@/app/_component/Modal";

const Article = ({
  article,
  auth,
}: {
  article: ArticleWithImage & {
    comments: {
      comments: CommentWithUser[];
      totalPage: number;
    };
  };
  auth: Session;
}) => {
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { triggerFetch: requestDelete } = useFetch(
    `/board/article/${article.id}`,
    "DELETE",
    {
      onError: (status, message) => {
        setDeleteLoading(false);
        toast("error", message || "알 수 없는 오류가 발생했습니다.");
      },
      onSuccess: (status, message, body) => {
        stackRouterPush(router, `/board`, "reset");
        stackRouterPush(router, `/board/${article.boardId}`);
        setDeleteLoading(false);
        toast("success", "게시글이 삭제되었습니다.");
      },
      onPending: () => setDeleteLoading(true),
    }
  );

  const { triggerFetch: requestLike } = useFetch(
    `/board/article/${article.id}/like`,
    "POST",
    {
      onError: (status, message) => {
        setLikeLoading(false);
        toast("error", message || "알 수 없는 오류가 발생했습니다.");
      },
      onSuccess: (status, message, body) => {
        router.refresh();
        setLikeLoading(false);
        toast("success", message);
      },
      onPending: () => setLikeLoading(true),
    }
  );

  return (
    <>
      {likeLoading && <LoadingFullPage />}
      {deleteLoading && <LoadingFullPage />}
      <Modal
        open={showDeleteAlert}
        onClose={() => {
          setShowDeleteAlert(false);
        }}
      >
        <div className={classNames(inter.className, "px-5 py-4")}>
          <div className="w-full">
            <span className="text-xl font-bold">게시글 삭제하기</span>
            <span className="text-sm text-gray-500 block mt-2">
              게시글을 삭제하시겠습니까?
            </span>
            <div className="flex flex-row mt-5">
              <button
                onClick={() => setShowDeleteAlert(false)}
                className="flex-1 text-center py-2 text-gray-500 border border-gray-300 rounded-[10px] text-sm"
              >
                취소
              </button>
              <button
                onClick={async () => {
                  requestDelete({});
                  setShowDeleteAlert(false);
                }}
                disabled={deleteLoading}
                className="flex-1 text-center py-2 text-white bg-red-500 rounded-[10px] text-sm ml-3"
              >
                {deleteLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    />
                  </>
                ) : (
                  <>확인</>
                )}
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <div
        className={classNames(
          "flex flex-col min-h-[100vh] pb-20",
          inter.className
        )}
      >
        <div className="flex flex-row w-full items-center px-4">
          <div className="relative h-[50px] w-[50px] rounded-full overflow-hidden my-2">
            <Image
              src={
                !article.isAnonymous
                  ? article.user.profile
                    ? process.env.NEXT_PUBLIC_S3_URL + article.user.profile
                    : "/images/schoolmate/logobg.svg"
                  : "/images/schoolmate/logobg.svg"
              }
              alt="article"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="flex flex-col ml-3">
            <span className="text-[#66738C] text-base font-bold items-center flex justify-start">
              {article.isAnonymous ? "익명" : article.user.name}
              {article.isMe && (
                <span className="font-light border border-primary-500 rounded-full text-primary-500 px-1 ml-1 text-[0.75rem] leading-[1rem]">
                  작성자
                </span>
              )}
            </span>
            <span className="text-[#66738C] text-sm font-light">
              {dayjs(article.createdAt).format("MM/DD HH:mm")}
            </span>
          </div>
          {!article.isMe && !article.isAnonymous && (
            <div className="ml-auto mb-auto mt-2.5">
              <ArticleMore userId={article.userId} />
            </div>
          )}
        </div>
        <div className="flex flex-col items-start px-4">
          <span className="text-lg font-bold h-full whitespace-pre-wrap break-words w-full">
            {article.title}
          </span>
          <Hyperlink
            className="mt-1 text-start w-full h-full whitespace-pre-wrap break-words text-base"
            text={article.content}
          />
        </div>
        {article.images.length > 0 && (
          <div className="flex flex-col w-full mt-4 px-4">
            {article.images.map((image, index) => (
              <div
                className="relative w-full rounded-xl overflow-hidden my-2"
                key={index}
              >
                <Image
                  src={process.env.NEXT_PUBLIC_S3_URL + image}
                  alt="article"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-row w-full mt-4 space-x-3 px-4">
          <div className="flex flex-row">
            <Image src="/icons/Like.svg" alt="Like" width={20} height={20} />
            <span className="text-[#8c8c8c] ml-1">{article.likeCounts}</span>
          </div>
          <div className="flex flex-row">
            <Image
              src="/icons/Comment.svg"
              alt="Commnet"
              width={20}
              height={20}
            />
            <span className="text-[#8c8c8c] ml-1">{article.commentCounts}</span>
          </div>
          <div className="flex flex-row">
            <Image src="/icons/View.svg" alt="View" width={23} height={23} />
            <span className="text-[#8c8c8c] ml-1">{article.views}</span>
          </div>
          <CopyToClipboard
            text={`https://schoolmate.kr/board/${article.boardId}/${article.id}`}
            onCopy={() => {
              toast("success", "게시글 링크가 복사되었습니다!");
            }}
          >
            <button className="w-full items-center flex justify-end">
              <Image
                src="/icons/Share.svg"
                alt="share"
                width={14}
                height={14}
                style={{
                  filter:
                    "invert(78%) sepia(2%) saturate(6%) hue-rotate(317deg) brightness(94%) contrast(88%)",
                }}
              />
            </button>
          </CopyToClipboard>
        </div>
        <div className="flex flex-row px-4">
          <button
            onClick={() => requestLike({})}
            className="border border-primary-500 rounded-full py-1 flex flex-row items-center justify-center px-2 w-28 mt-4"
          >
            <Image
              src="/icons/LikePrimary.svg"
              alt="Like"
              width={20}
              height={20}
              className="mr-1"
            />
            <span className="text-primary-500 text-sm font-bold py-1">
              공감하기
            </span>
          </button>
          {article.isMe ? (
            <div className="ml-auto mt-auto">
              <button
                onClick={() => setShowDeleteAlert(true)}
                className="underline underline-offset-1 text-sm text-[#66738C]"
              >
                삭제하기
              </button>
            </div>
          ) : (
            <div className="ml-auto mt-auto">
              <button
                onClick={() => {
                  stackRouterPush(
                    router,
                    `/board/${article.boardId}/${article.id}/report`
                  );
                }}
                className="underline underline-offset-1 text-sm text-[#66738C]"
              >
                신고하기
              </button>
            </div>
          )}
        </div>
        <Advertisement unit="DAN-dNmES5mBqOzN5HN3" className="pt-5" />
        <Comment article={article} board={article.board} auth={auth} />
      </div>
    </>
  );
};

export default Article;
