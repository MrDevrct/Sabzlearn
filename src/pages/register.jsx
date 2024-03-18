import React from "react";
import "../css/ElementProprety/FormInput.css";

export default function Login() {
  return (
    <>
      <main className="flex justify-center items-center flex-col relative px-4 py-6 min-h-screen">
        {/* logo sabzlearn  */}
        <a
          href="https://sabzlearn.ir"
          class="flex items-center gap-x-3.5 mb-10"
        >
          <img
            src="https://sabzlearn.ir/wp-content/themes/sabzlearn-theme/images/logo.webp"
            class="h-[62px]"
            alt="سبز لرن"
            loading="lazy"
          />
          <span class="w-[136px] h-[62px]">
            <h1 className="font-danaDemibold text-[40px]">سبزلرن</h1>
            <p>S a b z l e r n . i r</p>
          </span>
        </a>

        {/* page Body  */}
        <div className="max-w-[330px] w-full pt-5 pb-6 px-6 text-center bg-white dark:bg-darker rounded-2xl">
          <h4 className="font-danaDemibold text-xl mb-4 sm:mb-4.5">عضویت</h4>

          <p class="mb-5">
            قبلا ثبت نام کرده اید؟
            <a
              href="/login"
              class="font-danaDemiBold text-green-500"
            >
              وارد شوید
            </a>
          </p>

          <form className="user-data__form space-y-5">
            <div class="relative">
              <input
                type="text"
                class="user-data__username form-input has-icon"
                placeholder="نام کاربری"
              />
            </div>
            <div class="relative">
              <input
                type="text"
                class="user-data__username form-input has-icon"
                placeholder="شماره موبایل"
              />
            </div>
            <div class="relative">
              <input
                type="email"
                class="user-data__username form-input has-icon"
                placeholder="آدرس ایمیل"
              />
            </div>
            <div class="relative">
              <input
                type="password"
                class="user-data__username form-input has-icon"
                placeholder="رمز عبور"
              />
            </div>
          </form>
        </div>

        {/* footer page */}
        <div class="max-w-[330px] w-full mx-auto text-center mt-7 sm:mt-8 font-danaMedium">
          با عضویت در سایت، تمامی قوانین و شرایط استفاده از خدمت
          <a href="https://sabzlearn.ir" class="text-green-500">
            سبزلرن
          </a>{" "}
          را پذیرفته اید.
        </div>

        <div class="hidden lg:block absolute top-0 left-0 w-[300px] h-[300px] bg-sky-500 opacity-20 blur-[120px] rounded-full"></div>
        <div class="hidden lg:block absolute bottom-0 right-0 w-[300px] h-[300px] bg-amber-400 opacity-20 blur-[120px] rounded-full"></div>
      </main>
    </>
  );
}
