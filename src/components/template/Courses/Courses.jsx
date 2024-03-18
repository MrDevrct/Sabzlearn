import React, { useState, useEffect } from "react";
import CourseBox from "../../modules/CourseBox";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../../services/Redux/actions";
import HeaderCategories from "../Category/HeaderCategories";
import SortBox from "../../modules/Categoreis/SortBox";
import FilterBox from "../../modules/Categoreis/FilterBox";
import SearchBox from "../../modules/Categoreis/SearchBox";
import { LuArrowUpDown } from "react-icons/lu";


export default function Courses() {
  const location = useLocation();
  const dispatch = useDispatch();
  const dataCourses = useSelector((state) => state.courses);
  const [coursesInfo, setCoursesInfo] = useState([]);
  const { categoryName } = useParams();
  const [searchValue, setSearchValue] = useState(""); // افزودن متغیر searchQuery
  const [active, setActive] = useState(null);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  useEffect(() => {
    setCoursesInfo(dataCourses);
  }, [dataCourses]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const newSearchQuery = queryParams.get("q");

    setSearchValue(newSearchQuery || ""); // تنظیم مقدار جدید برای searchQuery

    let filteredCourses = dataCourses;

    if (newSearchQuery) {
      filteredCourses = dataCourses.filter((course) =>
        course.title.toLowerCase().includes(newSearchQuery.toLowerCase())
      );
    }

    if (categoryName) {
      filteredCourses = filteredCourses.filter(
        (course) => course.category.toLowerCase() === categoryName.toLowerCase()
      );
    }

    setCoursesInfo(filteredCourses);
  }, [location.search, dataCourses, categoryName]);

  const handleSortChange = (sortName) => {
    let sortedCourses = [...dataCourses];
    if (sortName === "ارزان ترین") {
      sortedCourses.sort((a, b) => a.price - b.price);
    } else if (sortName === "گران ترین") {
      sortedCourses.sort((a, b) => b.price - a.price);
    } else if (sortName === "پر مخاطب ها") {
      sortedCourses.sort((a, b) => b.participants - a.participants);
    } else {
      sortedCourses = dataCourses;
    }
    setCoursesInfo(sortedCourses);
    setActive(sortName)
  };
  
  return (
    <main className="mt-20">
      <div className="w-fit container">
        {/* <!-- title page --> */}
        {searchValue ? (
          <HeaderCategories
            titlePage={`جستجو : ${searchValue}`}
            quantityCourses={coursesInfo.length}
          />
        ) : (
          <HeaderCategories
            titlePage="همه دوره ها"
            quantityCourses={coursesInfo.length}
          />
        )}

        {/* <!-- content --> */}
        <section className="grid grid-cols-12 gap-y-5 md:gap-x-7">
          {/* <!-- search and filters --> */}
          <div className="col-span-full lg:col-span-4 xl:col-span-3 lg:sticky top-6 space-y-6">
            <form className="space-y-6">
              {/* <!-- search box --> */}
              <SearchBox placeholder="جستجو بین دورها" />

              {/* <!-- toggle filters --> */}
              <FilterBox operator="دوره های رایگان" />
              <FilterBox operator="دوره های پیش فروش" />
              <FilterBox operator="دوره های خریداری شده " />
            </form>
          </div>

          <section className="col-span-full lg:col-span-8 xl:col-span-9 order-1 lg:order-2">
            {/* <!-- sort in courses --> */}
            <div className="hidden lg:flex items-center gap-x-6 px-5 mb-8 h-16 bg-white shadow-normal rounded-xl">
              <div className="flex items-center shrink-0 gap-x-2 px-4">
                <LuArrowUpDown className="text-[25px]" />
                <span className="font-danaMedium">مرتب سازی بر اساس :</span>
              </div>
              <div className="flex items-center font-danaLight gap-x-2 lg:gap-x-8 h-full">
                <SortBox sortName="همه دورها" onSortChange={handleSortChange} active={active === "همه دورها"} />
                <SortBox sortName="ارزان ترین" onSortChange={handleSortChange} active={active === "ارزان ترین"} />
                <SortBox sortName="گران ترین" onSortChange={handleSortChange} active={active === "گران ترین"} />
                <SortBox sortName="پر مخاطب ها" onSortChange={handleSortChange} active={active === "پر مخاطب ها"} />
              </div>
            </div>

            {/* <!-- courses --> */}
              <div className="posts_wrap grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7 sm:px-0 px-2">
                {coursesInfo.length > 0 ? (
                  coursesInfo.map((course) => (
                    <CourseBox key={course.id} {...course} />
                  ))
                ) : (
                  <Link to="/courses">
                    <button>برگشت به صفحه محصولاتی</button>
                  </Link>
                )}
              </div>

          </section>
        </section>
      </div>
    </main>
  );
}
