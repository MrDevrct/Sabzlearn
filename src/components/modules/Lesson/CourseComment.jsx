import React from "react";
import HeaderTitle from "../Course/CourseData/HeaderTitle";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

export default function CourseComment() {
  return (
    <div className="bg-white dark:bg-darker rounded-2xl p-5 sm:p-5 mt-6 lg:mt-8">
      <div>
        <HeaderTitle
          title="پرسش و پاسخ"
          icon={<IoChatbubbleEllipsesSharp />}
          iconColor="text-red-500"
          spanColor="bg-red-500"
        />
      </div>

      {/* Q&A form */}
      <div className="mb-8 sm:mb-12">
        <div className="comments_wrap space-y-5 sm:space-y-5 mt-[2rem]">

          <div className="p-5 md:p-5 bg-gray-100 dark:bg-dark rounded-xl">
            <div className="comment-head">salam</div>
          </div>

          <div className="p-5 md:p-5 bg-gray-100 dark:bg-dark rounded-xl">
            <div>salam</div>
          </div>

          <div className="p-5 md:p-5 bg-gray-100 dark:bg-dark rounded-xl">
            <div>salam</div>
          </div>

        </div>
      </div>
    </div>
  );
}
