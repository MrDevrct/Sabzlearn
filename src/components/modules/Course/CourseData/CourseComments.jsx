import React from "react";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import HeaderTitle from "./HeaderTitle";

export default function CourseComments() {
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-5 mt-8">
      <div className="flex items-center justify-between mb-6 sm:mb-7">
        
      {/* !<-- Header Title --> */}
        <HeaderTitle
          title='نظرات'
          icon={<HiChatBubbleLeftRight/>}
          iconColor='text-red-500'
          spanColor='bg-red-500'
        />
      
      {/* New Comment Button */}
        <button className="button-primary sm:h-[40px] sm:px-[1rem] mb-5 h-[35px] px-[8px] sm:text-[16px] text-[14px]">
          ایجاد نظر جدید
          <HiOutlineChatBubbleBottomCenterText className="mr-1" />
        </button>
        
      </div>
    </div>
  );
}
