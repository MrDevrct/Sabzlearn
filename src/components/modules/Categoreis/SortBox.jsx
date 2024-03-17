import React from "react";
import { LuArrowUpDown } from "react-icons/lu";


export default function SortBox() {
  return (
    <div className="hidden lg:flex items-center gap-x-6 px-5 mb-8 h-16 bg-white shadow-normal rounded-xl">
      <div className="flex items-center shrink-0 gap-x-2 px-4">
        <LuArrowUpDown className="text-[25px]" />
        <span className="font-danaMedium">مرتب سازی بر اساس :</span>
      </div>
      <div className="flex items-center font-danaLight gap-x-2 lg:gap-x-8 h-full">
        <a
          href=""
          data-id="default"
          className="sort-btn sort-btn--active font-danaLight"
          role="button"
        >
          همه دوره ها
        </a>
        <a
          href=""
          data-id="cheapest"
          className="sort-btn font-danaLight"
          role="button"
        >
          ارزان ترین
        </a>
        <a
          href=""
          data-id="expensive"
          className="sort-btn font-danaLight"
          role="button"
        >
          گران ترین
        </a>
        <a
          href=""
          data-id="popular"
          className="sort-btn font-danaLight"
          role="button"
        >
          پرمخاطب ها
        </a>
      </div>
    </div>
  );
}
