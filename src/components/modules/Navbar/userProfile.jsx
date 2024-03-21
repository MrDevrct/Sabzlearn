import React, { useState, useEffect } from "react";
import { HiOutlineUser } from "react-icons/hi2";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import apiRequset from "../../../services/Axios/config.js";

export default function UserProfile() {
  const Token = Cookies.get("Token");

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState();

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const LogoutHandler = () => {
    Cookies.remove("Token");
    setIsProfileOpen(false);
  };

  useEffect(() => {
    if (Token) {
      apiRequset("/users")
        .then((response) => {
          const users = response.data;
          const isProfileUser = users.find((user) => user.email === Token);
          setUser(isProfileUser);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [Token]);

  return (
    <>
      <div className="relative">
        <div className="container">
          <div className="cursor-pointer">
            {Token ? (
              <Link
                to="#"
                className="hidden lg:block"
                onClick={handleProfileToggle}
              >
                <img
                  src="https://secure.gravatar.com/avatar/528a5bf0557c32011fe9642f619f90d9?s=96&d=mm&r=g"
                  className="w-14 h-14 rounded-full"
                  alt="avatar-user"
                />
              </Link>
            ) : (
              <Link
                to="/login"
                className="hidden lg:flex button-xl button-secondary hover:text-white hover:bg-sky-600"
              >
                ورود | عضویت
                <HiOutlineUser className="text-[18px]" />
              </Link>
            )}
          </div>

          {isProfileOpen && (
            <div
              className='absolute w-[300px] bg-white p-4 mt-6 z-50 rounded-[20px] shadow-md'
            >
              <div className="space-y-2 px-2 text-right">
                <div className="flex px-2 py-2 mr-auto justify-end">
                  <img
                    src="https://secure.gravatar.com/avatar/528a5bf0557c32011fe9642f619f90d9?s=96&d=mm&r=g"
                    className="w-[4rem] h-[4rem] rounded-full order-1"
                    alt="avatar-user"
                  />
                  <div className="flex flex-col mr-4">
                    <h3 className="font-danaMedium text-lg">{user.username}</h3>
                    <p className="font-danaLight text-[#0ea5e9] mt-2">
                      موجودی : {user.wallet} تومان
                    </p>
                  </div>
                </div>
                
                <hr />

                <div className="flex flex-col items-end">
                  <Link
                    to=""
                    className="flex text-[#464749] hover:bg-slate-200 hover:text-[#464749] py-[12px] px-2 my-[4px] rounded-[12px]"
                  >
                    <span>پیشخوان</span>
                    <span>پیشخوان</span>
                  </Link>
                  <Link
                    to=""
                    className="flex text-[#464749] hover:bg-slate-200 hover:text-[#464749] py-[12px] px-2 my-[4px] rounded-[12px]"
                  >
                    <span>دوره های من</span>
                  </Link>
                  <Link
                    to=""
                    className="flex text-[#464749] hover:bg-slate-200 hover:text-[#464749] py-[12px] px-2 my-[4px] rounded-[12px]"
                  >
                    <span>تیکت های پشتیبانی</span>
                  </Link>
                  <Link
                    to=""
                    className="flex text-[#464749] hover:bg-slate-200 hover:text-[#464749] py-[12px] px-2 my-[4px] rounded-[12px]"
                  >
                    <span>جزئیات حساب</span>
                  </Link>
                </div>

                <hr />
                
                <div className="flex flex-col">
                  <Link
                    to="/"
                    className="text-[#464749] hover:bg-slate-200 hover:text-[#464749] py-[12px] px-2 rounded-[12px]"
                    onClick={LogoutHandler}
                  >
                    <span>خروج</span>
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
