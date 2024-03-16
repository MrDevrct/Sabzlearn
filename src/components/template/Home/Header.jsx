import React from "react";
import "../../../css/ElementProprety/button.css";

export default function Header() {
  return (
    <section className="lg:mt-12 relative" dir="ltr">
      <div className="container">
        <div className="flex items-center justify-center flex-wrap lg:flex-nowrap lg:justify-between gap-y-8 sm:text-right text-center">

          {/* text and btn header */}
          <div className="relative w-full sm:w-auto order-2 lg:order-2">

            {/* title header */}
            <h2 className="font-danaExtrabold sm:font-danaExtrabold text-2xl sm:text-[2.625rem]/[70px] 3xl:text-5xl/normal leading-normal">
              آکادمی آموزش
              <br />
              برنامه نویسی سبزلرن
            </h2>
 
            {/* description header */}
            <p className="sm:text-2xl font-danaMedium lg:mt-5 sm:mt-9 lg:max-w-[440px] xl:max-w-[470px] mt-2 leading-normal">
              با آکادمی خصوصی سبزلرن، علم برنامه نویسی رو با خیال راحت یاد بگیر
              و پیشرفت کن
            </p>

            {/* buttons header */}
            <div className="flex items-center justify-center flex-wrap lg:justify-end gap-4 sm:gap-6 mt-8 sm:mt-10">
              <a
                href="https://sabzlearn.ir/courses/?s=&amp;only_free=yes"
                className="flex items-center gap-x-2 group font-danaMedium cursor-pointer"
              >
                <span className="hidden sm:inline">دوره های رایگان</span>

                <span className="button-xl button-primary only-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    className="bi bi-play"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.804 8 5 4.633v6.734zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696z" />
                  </svg>
                </span>
              </a>
              <a href="#roadmaps" className="button-xl button-secondary">
                از این مسیر ها شروع کن
              </a>
            </div>

            {/* items back in background */}
            <div className="hidden lg:block absolute -top-20 -right-17 w-[250px] h-[250px] bg-green-500 opacity-25 blur-[120px] -z-10 rounded-full"></div>
            <div className="hidden lg:block absolute -bottom-25 left-0 w-[250px] h-[250px] bg-sky-500 opacity-25 blur-[120px] -z-10 rounded-full"></div>

          </div>

          {/* image Header */}
          <div className="mt-8 lg:w-px order-1 lg:order-1 lg:h-[391px] xl:h-[530px] 3xl:h-[580px]">
            <img
              src="https://sabzlearn.ir/wp-content/themes/sabzlearn-theme/images/svgs/hero-light.svg"
              className="lg:absolute left-0 right-0 lg:right-auto top-8 lg:top-0 mx-auto lg:w-[580px] xl:w-[946px]"
              alt="Sabzlearn"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
