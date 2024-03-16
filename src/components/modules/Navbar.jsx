import React, { useEffect, useState } from "react";
import Logo from "./Navbar/logo";
import Profile from "./Navbar/userProfile";
import Search from "./Navbar/search";
import MenuNav from "./Navbar/menuNav";
import Theme from "./Navbar/theme";
import { HiBars3 } from "react-icons/hi2";
import { GrClose } from "react-icons/gr";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import apiRequest from "../../services/Axios/config";
import "../../css/ElementProprety/MenuMobile.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false); // وضعیت باز یا بسته بودن منو
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  ////////////////////////////////////////////////////////////////
  const [menu, setMenu] = useState([]);
  const [items, setItems] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await apiRequest.get("/Categories");
        const categories = categoriesResponse.data;
        setMenu(categories);

        const coursesResponse = await apiRequest("/courses");
        const courses = coursesResponse.data;
        setItems(courses);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getFilteredItems = (category) => {
    return items.filter((course) => course.category === category);
  };

  ////////////////////////////////////////////////////////////////
  const searchHandler = (event) => {
    if (event.keyCode === 13) {
      if (search.trim()) {
        navigate(`/courses/search?q=${search}`);
        toggleMenu()
      } else if (!search.trim()) {
        navigate(`/courses`);
        toggleMenu()
      }
    }
  };

  const searchBtnHandler = () => {
    if (search.trim()) {
      navigate(`/courses/search?q=${search}`);
    } else if (!search.trim()) {
      navigate(`/courses`);
    }
  };

  const toggleMenu = () => { 
    setMenuOpen(!menuOpen); // تغییر وضعیت منو
  };

  return (
    <>
      <div className="bg-white flex items-center justify-between mx-auto max-w-[1920px] h-[84px] md:h-[6rem] px-4 lg:px-12">
        <div className="navigation__open-btn button-lg bg-gray-100 dark:bg-white/5 only-icon lg:hidden">
          <HiBars3
            className="w-5 h-5 text-slate-500 dark:text-white cursor-pointer"
            onClick={toggleMenu}
          />
        </div>

        <nav className="flex items-center h-13">
          {/* Logo Navbar */}
          <Logo />

          {/* Navigation Navbar */}
          <div
            className={`navigation lg:hidden bg-white dark:bg-darker w-64 overflow-y-auto fixed top-0 bottom-0 right-0 z-50 p-4 transition-all ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* icon close and logo site */}
            <div className="flex justify-between relative pb-6">
              <img
                src="https://sabzlearn.ir/wp-content/themes/sabzlearn-theme/images/logo.webp"
                className="h-12"
                alt="سبز لرن"
              />
              <div className="flex gap-x-3">
                <div className="navigation__close-btn button-lg only-icon bg-gray-100 text-slate-500">
                  <GrClose onClick={toggleMenu} />
                </div>
              </div>
            </div>
            <hr />
            {/* search box */}
            <div>
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
              <div className="mt-6">
                <ul className="mobile-menu">
                  {menu.map((menuItem) => (
                    <li
                      key={menuItem.id} // کلید یکتا برای عنصر اصلی لیست
                      onClick={() =>
                        setHoveredItem(
                          hoveredItem === menuItem.title ? null : menuItem.title
                        )
                      }
                    >
                      <span className="mobile-menu__link flex items-center justify-between font-danaMedium">
                        {menuItem.title}
                        <IoIosArrowBack
                          className={`${
                            hoveredItem === menuItem.title ? "-rotate-90" : ""
                          }`}
                        />
                      </span>
                      {hoveredItem === menuItem.title && (
                        <ul className="rounded-[0.75rem] bg-[#f3f4f6] p-2 text-[1rem] font-danaLight mt-4">
                          {getFilteredItems(menuItem.title).map((item) => (
                            <li key={item.id} className="py-2">
                              <a href={`/course/${item.name}`}>{item.title}</a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* list Menu item */}
          </div>

          {/* Menu Navbar */}
          <MenuNav />
        </nav>

        <div dir="ltr" className="flex items-center gap-x-2 h-13">
          {/* Profile User */}
          <Profile />
          {/* mode theme */}
          <Theme />
          {/* Search */}
          <Search />
        </div>

        {menuOpen && (
          <div
            className="overlay fixed w-full h-full top-0 left-0 bg-black/40 z-40 transition-all"
            onClick={toggleMenu}
          ></div>
        )}
      </div>
    </>
  );
}
