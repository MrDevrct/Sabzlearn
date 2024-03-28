import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "../../../css/ElementProprety/button.css";

//icon
import { HiMiniArrowRightOnRectangle } from "react-icons/hi2";
import { BiHome } from "react-icons/bi";
import { HiOutlineFolderOpen } from "react-icons/hi2";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi2";
import { CiPower } from "react-icons/ci";

export default function UserProfile({ isLogin, logout }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <>
      <div className="relative group">
        <div className="container">
          <div
            className={`relative group ${
              isProfileOpen ? "z-50" : ""
            } cursor-pointer`}
          >
            {isLogin ? (
              <button
                to="#"
                className="user-profile button-xl only-icon bg-gray-100 text-slate-500"
                onClick={handleProfileToggle}
              >
                <HiOutlineUser className="text-[20px]" />
              </button>
            ) : (
              <>
                {/* mobile btn login */}
                <Link
                  href="/login"
                  className="flex lg:hidden button-xl only-icon bg-gray-100 text-slate-500"
                >
                  <HiMiniArrowRightOnRectangle className="text-[24px]" />
                </Link>
                {/* desktop btn login */}
                <Link
                  to="/login"
                  className="hidden lg:flex button-xl button-secondary hover:text-white hover:bg-sky-600 font-danaMedium"
                >
                  ورود | عضویت
                  <HiOutlineUser className="text-[18px]" />
                </Link>
              </>
            )}
          </div>

          {isProfileOpen && (
            <div
              className="absolute left-0 top-full pt-4 z-50 transition-all show"
              dir="rtl"
            >
              <div className="w-[278px] bg-white dark:bg-darker border border-neutral-100 dark:border-0 p-5 pb-3.5 rounded-xl">
                <div className="flex items-center border-b border-b-gray-300 pb-5 mb-2">
                  <a href="" className="shrink-0">
                    <img
                      src="https://secure.gravatar.com/avatar/528a5bf0557c32011fe9642f619f90d9?s=96&d=mm&r=g"
                      className="object-cover w-14 h-14 rounded-full inline-block"
                      alt="avatar-user"
                    />
                  </a>
                  <div className="mr-3.5 flex flex-col gap-y-3 overflow-hidden">
                    <h3 className="font-danaDemibold inline-block truncate">
                      {isLogin.username}
                    </h3>
                    <p className="text-sm font-danaMedium text-green-500 inline-block">
                      موجودی : {isLogin.wallet} تومان
                    </p>
                  </div>
                </div>

                {/* 1 */}
                <Link
                  to=""
                  className="flex items-center justify-between px-2.5 h-12 rounded-lg hover:text-white hover:bg-green-500 transition-colors"
                >
                  <span className="flex items-center gap-x-2">
                    <BiHome className="text-[24px]" />
                    پیشخوان
                  </span>
                </Link>

                {/* 2 */}
                <Link
                  to=""
                  className="flex items-center justify-between px-2.5 h-12 rounded-lg hover:text-white hover:bg-green-500 transition-colors"
                >
                  <span className="flex items-center gap-x-2">
                    <HiOutlineFolderOpen className="text-[24px]" />
                    دوره های من
                  </span>
                </Link>

                {/* 3 */}
                <Link
                  to=""
                  className="flex items-center justify-between px-2.5 h-12 rounded-lg hover:text-white hover:bg-green-500 transition-colors"
                >
                  <span className="flex items-center gap-x-2">
                    <HiOutlineChatBubbleLeftRight className="text-[24px]" />
                    تیکت های پشتیبانی
                  </span>
                </Link>

                {/* 4 */}
                <Link
                  to=""
                  className="flex items-center justify-between px-2.5 h-12 rounded-lg hover:text-white hover:bg-green-500 transition-colors"
                >
                  <span className="flex items-center gap-x-2">
                    <HiOutlineUser className="text-[24px] " />
                    جزئیات حساب
                  </span>
                </Link>

                <div className="mt-2 pt-2 border-t border-t-gray-300">
                  <Link
                    to="/"
                    className="flex items-center justify-between px-2.5 h-12 rounded-lg hover:text-white hover:bg-red-500 transition-colors"
                    onClick={logout}
                  >
                    <span className="flex items-center gap-x-2">
                      <CiPower className="text-[24px]" />
                      خروج
                    </span>
                  </Link>
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
