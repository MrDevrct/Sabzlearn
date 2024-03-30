import React from "react";
import Input from "../../modules/Input";

export default function formEditAccount() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
      <div className="xl:col-span-2 bg-white dark:bg-gray-800 p-4.5 rounded-2xl">
        <div className="p-5 border-b border-b-gray-200 dark:border-b-slate-500">
          <span className="font-danaMedium md:text-xl text-zinc-700 dark:text-white">
            جزییات حساب کاربری
          </span>
        </div>
        <form action="" className="px-4 py-8">
          <div className="relative mb-11">
            <img
              src="https://secure.gravatar.com/avatar/528a5bf0557c32011fe9642f619f90d9?s=256&amp;d=mm&amp;r=g"
              className="w-32 md:w-44 h-32 md:h-44 rounded-full"
            />
            <a
              href="https://gravatar.com/"
              target="_blank"
              title="برای تغییر پروفایل وارد وبسایت Gravatar.com شوید."
              className="absolute bottom-0 right-0 flex items-center justify-center w-10 md:w-14 h-10 md:h-14 rounded-full bg-sky-600 border-2 md:border-4 border-white cursor-pointer transition-colors"
            >
              Photo
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-6">
            <div>
              <label
                for="phone"
                className="font-danaDemibold text-zinc-700 dark:text-white"
              >
                شماره موبایل
              </label>
              <Input />
            </div>

            <div class="hidden md:block"></div>

            <div>
              <label
                for="phone"
                className="font-danaDemibold text-zinc-700 dark:text-white"
              >
                شماره موبایل
              </label>
              <Input />
            </div>

            <div>
              <label
                for="phone"
                className="font-danaDemibold text-zinc-700 dark:text-white"
              >
                شماره موبایل
              </label>
              <Input />
            </div>

            <div>
              <label
                for="phone"
                className="font-danaDemibold text-zinc-700 dark:text-white"
              >
                شماره موبایل
              </label>
              <Input />
            </div>

            <div>
              <label
                for="phone"
                className="font-danaDemibold text-zinc-700 dark:text-white"
              >
                شماره موبایل
              </label>
              <Input />
            </div>
          </div>

          <button
            type="submit"
            class="flex w-full h-[3.5rem] justify-center items-center gap-x-2 px-7 text-base mr-auto md:w-auto mt-10 bg-green-400 text-white rounded-[12px]"
          >
            ثبت اطلاعات
          </button>
        </form>
      </div>

      <div className="xl:col-span-1 bg-white dark:bg-gray-800 p-4.5 rounded-2xl">
        <div className="p-5 border-b border-b-gray-200 dark:border-b-slate-500">
          <span className="font-danaMedium md:text-xl text-zinc-700 dark:text-white">
            تغییر رمز عبور
          </span>
        </div>
        <form action="" className="p-4 pt-8">
          <div className="space-y-5 md:space-y-6">
            <div>
              <label
                for="phone"
                className="font-danaDemibold text-zinc-700 dark:text-white"
              >
                شماره موبایل
              </label>
              <Input />
            </div>

            <div>
              <label
                for="phone"
                className="font-danaDemibold text-zinc-700 dark:text-white"
              >
                شماره موبایل
              </label>
              <Input />
            </div>
          </div>
          <button
            type="submit"
            class="flex w-full h-[3.5rem] justify-center items-center gap-x-2 px-7 text-base mr-auto md:w-auto mt-10 bg-green-400 text-white rounded-[12px]"
          >
            ثبت اطلاعات
          </button>
        </form>
      </div>
    </div>
  );
}
