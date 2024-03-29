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
import Profile from "../components/modules/Navbar/userProfile";

export default function dashboard() {
  const dispatch = useDispatch();
  const dataUsers = useSelector((state) => state.users);
  const [user, setUser] = useState([]);
  const token = Cookies.get("Token");

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
          <a href="" className="flex items-center gap-x-1.5 md:gap-x-2.5">
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
            href=""
            className="flex items-center gap-x-2.5 h-12 px-3 rounded-lg bg-green-500 text-white hover:bg-green-600"
          >
            <BiHome className="text-[24px]" />
            پیشخوان{" "}
          </a>

          {/* 2 */}
          <a
            href="/my-account/courses"
            className="flex items-center gap-x-2.5 h-12 px-3 rounded-lg text-black hover:bg-gray-100"
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
      <section className="w-full max-w-[1432px] mx-auto bg-gray-100 dark:bg-gray md:p-10 lg:rounded-3xl">
        <header className="flex items-center justify-between bg-white dark:bg-gray md:bg-transparent dark:border-b md:border-none border-b-gray-700 mb-6 md:mb-14 p-5 md:p-0">
          <h3 className="hidden md:block font-danaDemiBold text-2xl text-zinc-700 dark:text-white">
            {user.username} عزیز؛ خوش اومدی 🙌
          </h3>
          <div className="flex gap-x-3.5 md:gap-x-7">
            <div className="notifications flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-gray-100 md:bg-white  text-slate-500  rounded-full cursor-pointer text-2xl">
              <HiOutlineBell />
            </div>

            <div className="toggle-theme flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-gray-100 md:bg-white text-slate-500 cursor-pointer transition-colors text-2xl">
              <IoMoonOutline />
            </div>

            <Profile bgColor="bg-white" />
          </div>
        </header>
        <div className="px-5 md:px-0">
          <div className="flex flex-wrap gap-x-3 gap-y-4 md:gap-x-10 mb-10">
            <div className="flex items-center gap-x-2.5 md:gap-x-4 flex-grow md:flex-grow-0 md:w-60 bg-amber-400 dark:bg-yellow-400 p-2 rounded-2xl">
              <div className="flex flex-col gap-y-1.5 md:gap-y-2 text-white">
                <span className="text-base">مجموع پرداخت ها</span>
                <span className="font-IRANSNumber text-sm md:text-lg">{addCommas(user.wallet)} &nbsp;<span className="slms-price_symbol font-danaDemibold">تومان</span></span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
