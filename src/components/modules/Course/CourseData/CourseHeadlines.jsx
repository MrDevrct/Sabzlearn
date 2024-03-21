import React, { useState } from "react";
import { HiAcademicCap } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { ImPlay2 } from "react-icons/im";
import HeaderTitle from "./HeaderTitle";

export default function CourseHeadlines({ data }) {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-5 mt-8">
      {/* !<-- Header Title --> */}
      <HeaderTitle
        title='سرفصل ها'
        icon={<HiAcademicCap/>}
        iconColor='text-sky-500'
        spanColor='bg-sky-500'
      />

      {/* Headline Items */}
      <div className="space-y-4 md:space-y-5">
        {data.session.map((course) => (
          <div
            className="overflow-hidden rounded-[0.75rem] bg-[#f3f4f6]"
            key={course.id}
          >
            <div
              className={`topic__head flex cursor-pointer items-center justify-between gap-x-5 md:gap-x-20 p-4 md:p-4 transition duration-150 ease-in py-2 ${
                hoveredItem === course.name ? "bg-[#64748b] text-white" : ""
              }`}
              onClick={() =>
                setHoveredItem(hoveredItem === course.name ? null : course.name)
              }
            >
              <span className="inline-block font-danaDemibold lg:line-clamp-3 transition-colors">
                {course.name}
              </span>
              <div className="flex items-center gap-x-3 shrink-0">
                <div
                  className={`hidden lg:flex items-center gap-x-1.5 text-sm ${
                    hoveredItem === course.name ? "text-whi" : "text-slate-500"
                  } child:transition-colors`}
                >
                  <span>{course.Episode.length} جلسه</span>
                  <span
                    className={`topic__time-dot block w-1 h-1 ${
                      hoveredItem === course.name
                        ? "bg-white"
                        : "bg-slate-500/50"
                    } rounded-full`}
                  ></span>
                  <span>14 دقیقه</span>
                </div>
                <IoIosArrowDown
                  className={hoveredItem === course.name ? `rotate-180` : ""}
                />
              </div>
            </div>
            {hoveredItem === course.name && (
              <>
                {course.Episode.length > 0 ? (
                  // اگر آرایه حاوی آیتم‌ها بود
                  course.Episode.map((episode) => (
                    <div className="topic__body" key={episode.id}>
                      <div className="flex items-start justify-between gap-x-5 gap-y-3 flex-wrap lg:flex-nowrap px-4 py-5 group">
                        <div className="flex items-start flex-grow gap-x-2.5 md:gap-x-3.5 child:transition-colors">
                          <div className="flex items-center justify-center w-8 h-6 md:h-7 text-sm font-danaDemiBold bg-white group-hover:bg-green-500 group-hover:text-white rounded">
                            {episode.id}
                          </div>
                          <a
                            href={`/lesson/${episode.path}`}
                            className="inline-block lg:max-w-3/4 text-sm md:text-base group-hover:text-green-500"
                          >
                            {episode.name}
                          </a>
                        </div>
                        <div className="flex items-center gap-x-1.5 mr-auto text-gray-600 group-hover:text-green-500 child:transition-colors">
                          <span className="text-sm md:text-base">03:54</span>
                          <ImPlay2 />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  // اگر آرایه خالی بود
                  <div className="text-gray-500 p-4">
                    هنوز دوره ای قرار داده نشده است .
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
