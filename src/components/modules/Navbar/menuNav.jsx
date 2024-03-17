import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiRequest from "../../../services/Axios/config";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

export default function MenuNav({ platform }) {
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

  return (
    <>
      {platform === "desktop" && (
        <ul className="hidden lg:flex lg:mt-2 gap-x-0 lg:gap-x-6 font-danaMedium">
          {menu.map((menuItem) => (
            <div
              key={menuItem.id}
              className="relative"
              onMouseEnter={() => setHoveredItem(menuItem.title)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="flex item-center">

                {/* !<-- Articles Path root */}
                {menuItem.path === "articles" ? (
                  <Link to={`/${menuItem.path}`}>
                    <span className="flex items-center justify-center cursor-pointer text-[#3F3F46] lg:mb-2 mb-0">
                      {menuItem.title}
                    </span>
                  </Link>
                ) : (
                  <Link to={`/category/${menuItem.path}`}>
                    <span className="flex items-center justify-center cursor-pointer text-[#3F3F46] lg:mb-2 mb-0">
                      {menuItem.title}
                    </span>
                  </Link>
                )}

                <IoIosArrowDown className="hidden mt-1 mr-1 lg:block" />
              </div>
              {hoveredItem === menuItem.title && (
                <div
                  className="absolute w-[15rem] right-0 bg-white rounded-[18px] px-5 py-2 cursor-pointer shadow-sm z-10"
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {getFilteredItems(menuItem.title).map((item) => (
                    <Link key={item.id} to={`/course/${item.name}`}>
                      <div className="text-xl font-danaLight text-slate-500 py-1 my-2 text-right hover:text-[#2bce56] line-clamp-1">
                        {item.title}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </ul>
      )}
      {platform === "mobile" && (
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
              <span
                className={`mobile-menu__link flex items-center justify-between font-danaMedium ${
                  hoveredItem === menuItem.title
                    ? "mobile-menu__link--open"
                    : ""
                }`}
              >
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
                      <a href={`/course/${item.name}`}>اموزش {item.name}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
