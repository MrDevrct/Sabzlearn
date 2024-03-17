import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { setOpenMenu } from "../../../services/Redux/actions";

export default function Input({ platform }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openMenu = useSelector((state) => state.OpenMenu);

  const toggleMenu = () => {
    dispatch(setOpenMenu(!openMenu));
  };

  const searchHandler = (event) => {
    if (event.keyCode === 13) {
      if (search.trim()) {

        navigate(`/courses/search?q=${search}`);
        if (platform === "mobile") { toggleMenu() }

      } else if (!search.trim()) {

        navigate(`/courses`);
        if (platform === "mobile") { toggleMenu() }

      }
    }
  };

  const searchBtnHandler = () => {
    if (search.trim()) {

      navigate(`/courses/search?q=${search}`);
      if (platform === "mobile") { toggleMenu() }

    } else if (!search.trim()) {

      navigate(`/courses`);
      if (platform === "mobile") { toggleMenu() }

    }
  };

  return (
    <>
    {/* search box in desktop */}
      {platform === "desktop" && (
        <div className="hidden lg:block">
          <div className="hidden xl:block">
            <div className="relative h-13 block">
              <input
                className="bg-gray-100 text-slate-500 text-sm font-danaMedium rounded-full pr-4 pl-12 xl:w-[20rem] h-[56px] text-right"
                type="text"
                placeholder="چیو میخوای یاد بگیری؟"
                onKeyDown={searchHandler}
                onChange={() => setSearch(event.target.value)}
              />
              <button
                className="absolute left-5 top-0 bottom-0 w-7 h-7 my-auto text-slate-500"
                onClick={searchBtnHandler}
              >
                <CiSearch className="text-[30px]" />
              </button>
            </div>
          </div>
        </div>
      )}

    {/* search box in mobile */}
      {platform === "mobile" && (
        <div className="relative h-13 block mt-4">
          <input
            className="bg-gray-100 text-slate-500 text-sm font-danaMedium rounded-full pr-4 pl-12 h-[40px] text-right"
            type="text"
            placeholder="چیو میخوای یاد بگیری؟"
            onKeyDown={searchHandler}
            onChange={() => setSearch(event.target.value)}
          />
          <button
            className="absolute left-3 top-0 bottom-0 w-7 h-7 my-auto text-slate-500"
            onClick={searchBtnHandler}
          >
            <CiSearch className="text-[26px] mb-1" />
          </button>
        </div>
      )}
    </>
  );
}
