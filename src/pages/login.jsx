import React from "react";

export default function Login() {
  return (
    <>
    <div className="flex justify-center items-center h-[100vh]">
      <div className="flex-center min-h-screen">
        <div className="w-full xs:w-100 px-5 xs:p-0 ">
          <div className="flex gap-x-2.5 mb-7 sm:mb-10">
            <img src="https://sabzlearn.ir/wp-content/themes/sabzlearn-theme/images/logo.webp" className="w-[104px] h-[67px]" alt="سبز لرن" />
            <h1 className="font-bold text-[50px] mr-2">سبزلرن</h1>
          </div>
          <div className="relative p-7 sm:px-8 sm:py-9 bg-white dark:bg-gray-800 shadow-md dark:shadow-none rounded-2xl">
            <div>
              <div className="text-center mb-7 sm:mb-9">
                <h2 className="font-sans text-zinc-700 dark:text-white text-3xl mb-2 sm:mb-3">ورود</h2>
                <span className="font-sans text-lg text-slate-500 dark:text-gray-500">
                  حساب کاربری ندارید؟
                  <a href="https://sabzlearn.ir/signup?after=https%3A%2F%2Fsabzlearn.ir%2F" className="font-sans hover:text-green-500 transition-colors">ثبت نام</a>
                </span>
              </div>
              <form className="px-12">
                <div className="space-y-2.5 sm:space-y-3.5">
                  <div className="relative">
                    <input type="text" className="pl-9 sm:pl-12" placeholder="شماره موبایل" inputMode="tel" value="" />
                    <svg className="left-3 sm:left-4">
                      <use xlinkHref="#phone"></use>
                    </svg>
                  </div>
                </div>
                <button type="submit" className="h-12 mt-2.5 sm:mt-4 w-full">تایید</button>
              </form>
              <div className="flex justify-between mt-5 text-sm text-slate-500 dark:text-slate-400 tracking-tight">
                <a href="https://sabzlearn.ir/login/email?after=https%3A%2F%2Fsabzlearn.ir%2F">ورود با ایمیل</a>
                <a href="https://sabzlearn.ir/terms-conditions/">حریم خصوصی</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
