import React, { useState, useEffect } from "react";
import Card from "../../modules/CardBox";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../../services/Redux/actions";
import HeaderCategories from "../Category/HeaderCategories";
import { LuArrowUpDown } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";

export default function Courses() {
  const location = useLocation();
  const dispatch = useDispatch();
  const dataCourses = useSelector((state) => state.courses);
  const [coursesInfo, setCoursesInfo] = useState([]);
  const { categoryName } = useParams();
  const [searchValue, setSearchValue] = useState(""); // افزودن متغیر searchQuery

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

  return (
    <main className="mt-20">
      <div className="w-fit container">
        {/* title page */}
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

        {/* content */}
        <section className="grid grid-cols-12 gap-y-5 md:gap-x-7">
          {/* search and filters */}
          <div className="col-span-full lg:col-span-4 xl:col-span-3 lg:sticky top-6 space-y-6">
            <form id="archive_filters" className="space-y-6">
              {/* search box */}
              <div className="h-17 bg-white rounded-xl p-4 md:p-5">
                <div className="flex justify-between gap-x-6 h-full text-slate-500">
                  <input
                    type="text"
                    name="s"
                    className="md:font-danaMedium placeholder-slate-500 bg-transparent flex-grow"
                    placeholder="جستجو بین دوره ها"
                  />
                  <button>
                    <CiSearch className="w-7 h-7" />
                  </button>
                </div>
              </div>
              {/* toggle filters */}
              <div className="h-14 bg-white rounded-xl p-5 hidden md:block">
                <div className="flex items-center justify-between">
                  <span className="font-danaDemibold">فقط دوره های رایگان</span>
                  <label className="toggle">
                    <input
                      className="toggle__input"
                      type="checkbox"
                      name="only_free"
                      value="yes"
                    />
                    <span className="toggle__marker"></span>
                  </label>
                </div>
              </div>
              {/* toggle filters */}
              <div className="h-14 bg-white rounded-xl p-5 hidden md:block">
                <div className="flex items-center justify-between">
                  <span className="font-danaDemibold">در حال پیش فروش</span>
                  <label className="toggle">
                    <input
                      className="toggle__input"
                      type="checkbox"
                      name="presell"
                      value="yes"
                    />
                    <span className="toggle__marker"></span>
                  </label>
                </div>
              </div>
            </form>
          </div>

          {/* sort in courses */}
          <section className="col-span-full lg:col-span-8 xl:col-span-9 order-1 lg:order-2">
            <div className="hidden lg:flex items-center gap-x-6 px-5 mb-8 h-16 bg-white shadow-normal rounded-xl">
              <div className="flex items-center shrink-0 gap-x-2 px-4">
                <LuArrowUpDown className="text-[25px]" />
                <span className="font-danaMedium">مرتب سازی بر اساس :</span>
              </div>
              <div className="flex items-center font-danaLight gap-x-2 lg:gap-x-8 h-full">
                <a
                  href=""
                  data-id="default"
                  className="sort-btn sort-btn--active font-danaLight"
                  role="button"
                >
                  همه دوره ها
                </a>
                <a
                  href=""
                  data-id="cheapest"
                  className="sort-btn font-danaLight"
                  role="button"
                >
                  ارزان ترین
                </a>
                <a
                  href=""
                  data-id="expensive"
                  className="sort-btn font-danaLight"
                  role="button"
                >
                  گران ترین
                </a>
                <a
                  href=""
                  data-id="popular"
                  className="sort-btn font-danaLight"
                  role="button"
                >
                  پرمخاطب ها
                </a>
              </div>
            </div>

            {/* courses */}
            <div className="posts_wrap grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7">
              {coursesInfo.length > 0 ? (
                coursesInfo.map((course) => (
                  <Card key={course.id} {...course} />
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
