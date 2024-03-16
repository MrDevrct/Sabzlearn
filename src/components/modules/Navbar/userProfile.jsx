import React, { useState } from "react";
import { HiOutlineUser } from "react-icons/hi2";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { CiPower } from "react-icons/ci";


export default function UserProfile() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <>
      <div className="relative">
        <div className="container">
          <div onClick={handleProfileToggle} className="cursor-pointer">
            {/* <a href="#" className="hidden lg:block">
              <img
                src="https://secure.gravatar.com/avatar/528a5bf0557c32011fe9642f619f90d9?s=96&d=mm&r=g"
                className="w-14 h-14 rounded-full"
                alt="avatar-user"
              />
            </a> */}
            <a
              href="#"
              className="flex lg:hidden button-xl only-icon bg-gray-100 text-slate-500 dark:text-white" 
            >
              <FaArrowRightFromBracket />
            </a>
            <a
              href=""
              className="hidden lg:flex button-xl button-secondary hover:text-white hover:bg-sky-600"
            >
              ورود | عضویت
              <HiOutlineUser className="text-[18px]" />
            </a>
          </div>

          {isProfileOpen && (
            <div
              className={`absolute w-[300px] bg-white p-4 mt-6 z-50 rounded-[20px] shadow-md`}
            >
              <div className="space-y-2 px-2 text-right">
                <div className="flex px-2 py-2 mr-auto justify-end">
                  <img
                    src="https://secure.gravatar.com/avatar/528a5bf0557c32011fe9642f619f90d9?s=96&d=mm&r=g"
                    className="w-[4rem] h-[4rem] rounded-full order-1"
                    alt="avatar-user"
                  />
                  <div className="flex flex-col mr-4">
                    <h3 className="font-danaMedium text-lg">IamNot</h3>
                    <p className="font-danaLight text-[#0ea5e9] mt-2">
                      موجودی : 0 تومان
                    </p>
                  </div>
                </div>
                <hr />
                <div className="flex flex-col">
                  <a
                    href=""
                    className="text-[#464749] hover:bg-slate-200 hover:text-[#464749] py-[12px] px-2 my-[4px] rounded-[12px]"
                  >
                    <span>پیشخوان</span>
                  </a>
                  <a
                    href=""
                    className="text-[#464749] hover:bg-slate-200 hover:text-[#464749] py-[12px] px-2 my-[4px] rounded-[12px]"
                  >
                    <span>دوره های من</span>
                  </a>
                  <a
                    href=""
                    className="text-[#464749] hover:bg-slate-200 hover:text-[#464749] py-[12px] px-2 my-[4px] rounded-[12px]"
                  >
                    <span>تیکت های پشتیبانی</span>
                  </a>
                  <a
                    href=""
                    className="text-[#464749] hover:bg-slate-200 hover:text-[#464749] py-[12px] px-2 my-[4px] rounded-[12px]"
                  >
                    <span>جزئیات حساب</span>
                  </a>
                </div>
                <hr />
                <div className="flex flex-col">
                  <a
                    href=""
                    className="text-[#464749] hover:bg-slate-200 hover:text-[#464749] py-[12px] px-2 rounded-[12px]"
                  >
                    <span>خروج</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
        {isProfileOpen && (
          <div
            className="overlay fixed w-full h-full top-0 left-0 bg-black/40 z-40 transition-all"
            onClick={handleProfileToggle}
          ></div>
        )}
      </div>
    </>
  );
}
