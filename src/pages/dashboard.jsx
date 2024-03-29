import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import apiRequest from "../services/Axios/config";
import { BiHome } from "react-icons/bi";
import { HiOutlineFolderOpen } from "react-icons/hi2";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi2";
import { CiPower } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../services/Redux/actions";
import { HiOutlineBell } from "react-icons/hi2";
import { IoMoonOutline } from "react-icons/io5";
import { HiOutlineCreditCard } from "react-icons/hi2";
import { HiOutlineTicket } from "react-icons/hi2";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import Profile from "../components/modules/Navbar/userProfile";
import { useParams } from "react-router-dom";

export default function dashboard() {
  const dispatch = useDispatch();
  const dataUsers = useSelector((state) => state.users);
  const [user, setUser] = useState([]);
  const token = Cookies.get("Token");
  let { value } = useParams();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (token && dataUsers.length > 0) {
      const userFound = dataUsers.find((user) => user.email === token);
      setUser(userFound);
    }
  }, [dataUsers, token]);

  const logout = (event) => {
    event.preventDefault();
    Cookies.remove("Token");
    location.pathname = "/";
  };

  if (value) {
    console.log("Value:", value);
  } else {
    console.log("Home");
  }

  const addCommas = (num) => {
    if (num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return "0";
    }
  };

  return (
    <main className="md:bg-white flex gap-x-10 2xl:gap-x-14 lg:px-8 xl:px-14 2xl:px-25 lg:py-7">
      <aside className="sidebar fixed top-0 bottom-0 -right-64 z-30 lg:static bg-white flex flex-col w-64 lg:w-56 lg:mt-10 px-7 py-5 lg:px-0 lg:py-0 shrink-0 lg:min-h-[calc(100vh-68px)] transition-all lg:transition-none">

        <div className="flex items-center justify-between pb-5 mb-7 border-b md:border-none border-b-gray-200">
          <a href="/" className="flex items-center gap-x-1.5 md:gap-x-2.5">
            <img
              src="https://sabzlearn.ir/wp-content/themes/sabzlearn-theme/images/logo.webp"
              className="h-10 md:h-14"
              alt="سبز لرن"
            />
            <div className="w-[86px] md:w-32 h-10 md:h-[57px]">
              <h1 className="font-danaDemibold text-4xl">سبزلرن</h1>
              <span className="text-sm">S a b z l e a r n . i r</span>
            </div>
          </a>
        </div>
        <div className="space-y-2 text-zinc-700 font-danaMedium">
          {/* 1 */}
          <a
            href="/my-account/"
            className="flex items-center gap-x-2.5 h-12 px-3 rounded-lg bg-green-500 text-white hover:bg-green-600"
          >
            <BiHome className="text-[24px]" />
            پیشخوان{" "}
          </a>

          {/* 2 */}
          <a
            href="/my-account/courses"
            className={`flex items-center gap-x-2.5 h-12 px-3 rounded-lg  text-black hover:bg-gray-100`}
          >
            <HiOutlineFolderOpen className="text-[24px]" />
            دوره های من{" "}
          </a>

          {/* 3 */}
          <a
            href=""
            className="flex items-center gap-x-2.5 h-12 px-3 rounded-lg text-black hover:bg-gray-100"
          >
            <HiOutlineChatBubbleLeftRight className="text-[24px]" />
            تیکت های پشتیبانی{" "}
          </a>

          {/* 4 */}
          <a
            href=""
            className="flex items-center gap-x-2.5 h-12 px-3 rounded-lg text-black hover:bg-gray-100"
          >
            <HiOutlineUser className="text-[24px]" />
            جزئیات حساب{" "}
          </a>

          {/* 5 */}
          <a
            href=""
            className="flex items-center gap-x-2.5 h-12 px-3 rounded-lg  text-black hover:bg-red-500 hover:text-white"
            onClick={logout}
          >
            <CiPower className="text-[25px]" />
            خروج{" "}
          </a>
        </div>

      </aside>
      {/* section */}
      <div className="w-full max-w-[1432px] mx-auto bg-gray-100 dark:bg-gray md:p-10 lg:rounded-3xl">
        <header className="flex items-center justify-between bg-white dark:bg-gray md:bg-transparent md:border-none border-b-gray-700 mb-6 md:mb-14 p-5 md:p-0">
          <h3 className="hidden md:block font-danaDemiBold text-2xl text-zinc-700 dark:text-white">
            {user.username} عزیز؛ خوش اومدی 🙌
          </h3>

          <div className="sidebar__open-btn flex gap-x-1 md:hidden font-danaMedium text-zinc-700">
            <HiOutlineBars3BottomRight className="text-2xl" />
            پیشخوان{" "}
          </div>

          <div className="flex gap-x-3.5 md:gap-x-7">
            <div className="notifications flex items-center justify-center w-14 h-14 bg-gray-100 md:bg-white  text-slate-500  rounded-full cursor-pointer text-2xl">
              <HiOutlineBell />
            </div>

            <div className="toggle-theme flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 md:bg-white text-slate-500 cursor-pointer transition-colors text-2xl">
              <IoMoonOutline />
            </div>

            <Profile bgColor="md:bg-white bg-gray-100" />
          </div>
        </header>
        <div className="px-5 md:px-0">
          <div className="flex flex-wrap gap-x-3 gap-y-4 md:gap-x-10 mb-10">
            {/* 1 */}
            <div className="flex items-center gap-x-2.5 md:gap-x-4 flex-grow md:flex-grow-0 md:w-60 bg-amber-400 p-2 rounded-2xl">
              <div className="flex items-center justify-center w-14 h-14 md:w-[68px] md:h-[68px] bg-white/20 rounded-2xl text-3xl text-white">
                <HiOutlineCreditCard />
              </div>
              <div className="flex flex-col gap-y-1.5 md:gap-y-2 text-white">
                <span className="text-sm font-danaMedium">مجموع پرداخت ها</span>
                <span className="font-IRANSNumber text-sm md:text-lg">
                  {addCommas(user.paid)} &nbsp;
                  <span className="slms-price_symbol font-danaDemibold">
                    تومان
                  </span>
                </span>
              </div>
            </div>

            {/* 2 */}
            <div className="flex items-center gap-x-2.5 md:gap-x-4 flex-grow md:flex-grow-0 md:w-60 bg-sky-500 p-2 rounded-2xl">
              <div className="flex items-center justify-center w-14 h-14 md:w-[68px] md:h-[68px] bg-white/20 rounded-2xl text-3xl text-white">
                <HiOutlineRocketLaunch />
              </div>
              <div className="flex flex-col gap-y-1.5 md:gap-y-2 text-white">
                <span className="text-sm font-danaMedium">دوره های من</span>
                <span className="font-IRANSNumber text-sm md:text-lg">
                  {user && user.courses && user.courses.length > 0 ? (
                    <>
                      {user.courses.length}
                      <span className="slms-price_symbol font-danaDemibold">
                        {" "}
                        دوره{" "}
                      </span>
                    </>
                  ) : (
                    "0 دوره"
                  )}
                </span>
              </div>
            </div>

            {/* 3 */}
            <div className="flex items-center gap-x-2.5 md:gap-x-4 flex-grow md:flex-grow-0 md:w-60 bg-pink-500 p-2 rounded-2xl">
              <div className="flex items-center justify-center w-14 h-14 md:w-[68px] md:h-[68px] bg-white/20 rounded-2xl text-3xl text-white">
                <HiOutlineTicket />
              </div>
              <div className="flex flex-col gap-y-1.5 md:gap-y-2 text-white">
                <span className="text-sm font-danaMedium">مجموع تیکت ها </span>
                <span className="font-IRANSNumber text-sm md:text-lg">
                  {user && user.tiket && user.tiket.length > 0 ? (
                    <>
                      {user.tiket.length}
                      <span className="slms-price_symbol font-danaDemibold">
                        {" "}
                        تیکت{" "}
                      </span>
                    </>
                  ) : (
                    "0 تیکت"
                  )}
                </span>
              </div>
            </div>

            {/* 4 */}
            <div className="flex items-center gap-x-2.5 md:gap-x-4 flex-grow md:flex-grow-0 md:w-60 bg-primary p-2 rounded-2xl">
              <div className="flex items-center justify-center w-14 h-14 md:w-[68px] md:h-[68px] bg-white/20 rounded-2xl text-3xl text-white">
                <HiOutlineCurrencyDollar />
              </div>
              <div className="flex flex-col gap-y-1.5 md:gap-y-2 text-white">
                <span className="text-sm font-danaMedium">موجودی حساب</span>
                <span className="font-IRANSNumber text-sm md:text-lg">
                  {addCommas(user.wallet)} &nbsp;
                  <span className="slms-price_symbol font-danaDemibold">
                    تومان
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
