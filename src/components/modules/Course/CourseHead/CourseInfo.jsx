import React from "react";
import { HiOutlineAcademicCap } from "react-icons/hi2";

export default function CourseInfo({ title, description, name, price }) {
  const addCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="flex flex-col justify-between order-2 lg:order-1">
      <div>
        <h1 className="font-danaDemibold text-[1.375rem]/8 sm:text-[1.625rem]/10 mb-4">
          {title}
        </h1>
        <p className="font-danaLight sm:text-lg line-clamp-4 sm:line-clamp-3">
          {description}
        </p>
      </div>
      <div className="space-y-4 lg:space-y-8 mt-4 lg:mt-4">
        <div className="flex justify-center xl:items-center lg:justify-between gap-5">
          <a
            href={`/course/${name}`}
            className="button-2xl button-primary w-full mb-2 sm:w-auto"
          >
            <HiOutlineAcademicCap className="text-[30px]" />
            ثبت نام در دوره
          </a>
          <div className="flex items-center justify-between gap-x-2 mb-3">
            {price !== 0 ? (
              <>
                <span className="text-green-500 text-2xl ml-1 font-IRANSNumber">
                  {addCommas(price)}{" "}
                </span>
                <img
                  src="../../../public/toman.svg"
                  className="hidden sm:block w-8 h-8"
                  alt="toman-icon"
                />
              </>
            ) : (
              <span className="hidden sm:block text-green-500 font-danaDemibold text-2xl mt-2 lg:mb-0">
                رایگان!{" "}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
