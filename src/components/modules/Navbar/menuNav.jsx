import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiRequest from "../../../services/Axios/config";
import { IoIosArrowDown } from "react-icons/io";

export default function MenuNav() {
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
    <ul className="hidden lg:flex lg:mt-2 gap-x-0 lg:gap-x-6 font-danaMedium">
      {menu.map((menuItem) => (
        <div
          key={menuItem.id}
          className="relative"
          onMouseEnter={() => setHoveredItem(menuItem.title)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div className="flex item-center">
            <Link to={`/category/${menuItem.path}`}>
              <span className="flex items-center justify-center cursor-pointer text-[#3F3F46] lg:mb-2 mb-0">
                {menuItem.title}
              </span>
            </Link>
            <IoIosArrowDown className="hidden mt-1 mr-1 lg:block"/>
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
  );
}
