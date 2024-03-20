import React from "react";
// component
import Input from "../components/modules/Input";

// icon
import { HiOutlineUser } from "react-icons/hi2";
import { LuPhone } from "react-icons/lu";
import { FaRegEnvelope } from "react-icons/fa";
import { FiLock } from "react-icons/fi";


export default function Login() {
  return (
    <>
      <section className="flex justify-center items-center flex-col relative px-4 py-6 min-h-screen">
        <a href="" className="flex items-center gap-x-3 sm:mb-10 mb-4">
          <img
            src="https://sabzlearn.ir/wp-content/themes/sabzlearn-theme/images/logo.webp"
            alt="logo"
            className="h-[62px]"
          />
          <div className="w-[138px] h-[62px] sm:mb-3 sm:mt-0 mt-10">
            <h2 className="sm:text-[30px] text-[20px] font-danaDemibold">سبزلرن</h2>
            <h2 className="sm:text-[18px] text-[12px] font-danaLight">
              S a b z l e a r n . i r
            </h2>
          </div>
        </a>

        <div className="max-w-[330px] w-full pt-5 pb-6 px-6 text-center bg-white rounded-2xl">
          <h4 className="font-danaMedium text-xl mb-4 sm:mb-5">عضویت</h4>
          <p className="mb-5">
            قبلا ثبت نام کرده اید؟{" "}
            <a href="" className="font-danaDemibold text-green-500 ">
              وارد شوید
            </a>
          </p>

          <div className="form-data space-y-5">
            <Input type="text" placeholder="نام کاربری" icon={HiOutlineUser} />
            <Input type="text" placeholder="شماره موبایل" icon={LuPhone} />
            <Input type="text" placeholder="ادرس ایمیل" icon={FaRegEnvelope} />
            <Input type="text" placeholder="رمز عبور" icon={FiLock} />
            <button className="bg-[#22c55e] text-white rounded-full text-[1rem] px-[1rem] h-[52px] gap-1 w-full">ادامه</button>
          </div>
        </div>

        <div className="hidden lg:block absolute top-0 left-0 w-[300px] h-[300px] bg-sky-500 opacity-20 blur-[120px] rounded-full"></div>
        <div className="hidden lg:block absolute bottom-0 right-0 w-[300px] h-[300px] bg-amber-400 opacity-20 blur-[120px] rounded-full"></div>
      </section>
    </>
  );
}
