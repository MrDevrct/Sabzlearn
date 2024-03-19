import React from "react";
import "../css/ElementProprety/FormInput.css";

export default function Login() {
  return (
    <>
      <main className="flex justify-center items-center flex-col relative px-4 py-6 min-h-screen">
        {/* logo sabzlearn  */}
        <a
          href="/"
          className="flex items-center gap-x-3.5 mb-10"
        >
          <img
            src="https://sabzlearn.ir/wp-content/themes/sabzlearn-theme/images/logo.webp"
            className="sm:h-[62px] h-[50px] lg:mt-5 mt-2"
            alt="سبز لرن"
            loading="lazy"
          />
          <span className="w-[136px] h-[62px]">
            <h1 className="font-danaDemibold sm:text-[40px] text-[26px]">سبزلرن</h1>
            <p className="sm:text-[18px] text-[12px]">S a b z l e r n . i r</p>
          </span>
        </a>

        {/* page Body  */}
        <div className="max-w-[330px] w-full pt-5 pb-6 px-6 text-center bg-white dark:bg-darker rounded-2xl">
          <h4 className="font-danaDemibold text-xl mb-4 sm:mb-4.5">ورود با ایمیل</h4>

          <p className="mb-5">
            قبلا ثبت نام نکرده اید؟
            <a
              href="/register"
              className="font-danaDemiBold text-green-500"
            >
              عضویت
            </a>
          </p>

          <form className="user-data__form space-y-5">
            <div className="relative">
              <input
                type="email"
                className="user-data__username form-input has-icon"
                placeholder="آدرس ایمیل"
              />
            </div>
            <div className="relative">
              <input
                type="password"
                className="user-data__username form-input has-icon"
                placeholder="رمز عبور"
              />
            </div>
          </form>
        </div>

        {/* footer page */}
        <div className="max-w-[330px] w-full mx-auto text-center mt-7 sm:mt-8 font-danaMedium">
          با عضویت در سایت، تمامی قوانین و شرایط استفاده از خدمت
          <a href="https://sabzlearn.ir" className="text-green-500">
            سبزلرن
          </a>{" "}
          را پذیرفته اید.
        </div>

        <div className="hidden lg:block absolute top-0 left-0 w-[300px] h-[300px] bg-sky-500 opacity-20 blur-[120px] rounded-full"></div>
        <div className="hidden lg:block absolute bottom-0 right-0 w-[300px] h-[300px] bg-amber-400 opacity-20 blur-[120px] rounded-full"></div>
      </main>
    </>
  );
}
