import React from "react";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import HeaderTitle from "./HeaderTitle";

export default function CourseComments() {
  const comments = [
    {
      id: 1,
      userName: "ali",
      adminName: "admin",
      text: "ایا بعد این دوره میتوان وارد بازار کار شد",
      answar: "بله",
    },
    {
      id: 2,
      userName: "mmd",
      adminName: "admin",
      text: "ایا بعد این دوره میتوان وارد بازار کار شد",
      answar: "",
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-5 mt-8">
      <div className="flex items-center justify-between mb-6 sm:mb-7">
        {/* !<-- Header Title --> */}
        <HeaderTitle
          title="نظرات"
          icon={<HiChatBubbleLeftRight />}
          iconColor="text-red-500"
          spanColor="bg-red-500"
        />

        {/* New Comment Button */}
        <button className="button-primary sm:h-[40px] sm:px-[1rem] mb-5 h-[35px] px-[8px] sm:text-[16px] text-[14px]">
          ایجاد نظر جدید
          <HiOutlineChatBubbleBottomCenterText className="mr-1" />
        </button>
      </div>

      <div className="mb-8 sm:mb-12 w-full">
        <div className="comments_wrap space-y-5 sm:space-y-5 mt-[2rem]">
          {comments.map((comment) => (
            <div
              className="p-5 md:p-5 bg-gray-100 dark:bg-dark rounded-xl"
              key={comment.id}
            >
              <div className="comment-head flex items-center gap-x-3.5">
                <div className="border-[1px] border-yellow-500 p-1 rounded-full">
                  <img
                    src="https://secure.gravatar.com/avatar/ebc9c654aaf436ca8c07e14c6c16c34d?s=96&d=mm&r=g"
                    alt="user-img"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <span className="font-sans text-lg">{comment.userName}</span>
              </div>
              <div className="comment mt-4 border-t py-4">
                <p>{comment.text}</p>

                {comment.answar.length > 0 && (
                  <div className="mt-5 p-4 border rounded-[10px]">
                    <div className="answer-head flex items-center gap-x-4">
                      <div className="p-1 rounded-full border-[1px] border-yellow-500">
                        <img
                          src="https://secure.gravatar.com/avatar/ebc9c654aaf436ca8c07e14c6c16c34d?s=96&d=mm&r=g"
                          alt="user-img"
                          className="w-12 h-12 rounded-full"
                        />
                      </div>
                      <span className="font-sans text-lg">
                        {comment.adminName}
                      </span>
                    </div>
                    <div className="answar mt-4 border-t py-4 px-4">
                      <p>{comment.answar}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
