import React, { useState } from "react";
import { HiOutlineUser, HiOutlineUsers } from "react-icons/hi2";
import { FaStarHalfAlt } from "react-icons/fa";

export default function CardBox(props) {
  const addCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const transformedNum = (num) => {
    // تبدیل عدد به 2/4
    const transformedNum = num / 100;
    return transformedNum.toString();
  };

  return (
    //  CardBox
    <div className="course sm:h-[27rem] sm:max-w-[19rem] w-full h-fit flex flex-col bg-white shadow-sm rounded-2xl leading-normal">
      {/* image cover */}
      <div className="relative h-42 group">
        <a
          href={`/course/${props.name}`}
          className="block w-full h-full"
          title={props.title}
        >
          <img
            className="block w-full h-full object-cover rounded-2xl"
            src={props.img}
            alt={props.title}
            loading="lazy"
          />
        </a>
      </div>

      {/* title and description */}
      <div className="flex-grow px-4.5 pt-4 pb-3 px-2">
        <h4 className="font-danaDemibold text-[17px] line-clamp-2 mb-3 px-[12px]">
          <a href={`/course/${props.name}`} className="hover:text-black">
            {props.title}
          </a>
        </h4>
        <p className="text-[16px] font-danaLight line-clamp-2 cursor-text opacity-70 px-[12px]">
          {props.description}
        </p>
      </div>

      {/* Icon Teacher and satisfaction */}
      <div className="px-4 pb-3">
        <div className="flex justify-between gap-2.5 text-slate-500 dark:text-white/70 text-sm pb-3">
          <div className="flex items-center gap-x-1 hover:text-green-500 transition-colors">
            <HiOutlineUser className="text-[18px]" />
            <a
              href={`/teacher/${props.teacher}`}
              className="font-danaLight text-[18px] mt-1 hover:text-green-500"
            >
              {props.teacher}
            </a>
          </div>
          <div className="flex items-center gap-x-2 text-amber-500">
            <span className="font-IRANSNumber mt-1">
              {transformedNum(props.satisfaction)}
            </span>
            <FaStarHalfAlt className="text-[20px]" />
          </div>
        </div>

        <hr />

        {/* price and participants */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex gap-x-2 mt-2">
            <HiOutlineUsers className="text-[20px]" />
            <span className="flex items-center text-slate-500 dark:text-white/70 text-sm font-IRANSNumber mt-[2px]">
              {props.participants}
            </span>
          </div>

          <div className="flex flex-row items-center mt-2">
            {props.price === 0 ? (
              <>
                <span className="text-green-500 font-danaDemibold text-lg">
                  رایگان!{" "}
                </span>
              </>
            ) : (
              <>
                <span className="text-green-500 text-xl ml-1 font-IRANSNumber">
                  {addCommas(props.price)}{" "}
                </span>
                <img
                  src="../../../public/toman.svg"
                  className="w-5 h-5"
                  alt="toman-icon"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
