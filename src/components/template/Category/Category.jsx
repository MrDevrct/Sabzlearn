import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardBox from "../../modules/CardBox";
import HeaderCategories from "./HeaderCategories";
import apiRequest from "../../../services/Axios/config";
import { LuArrowUpDown } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import "../../../css/ElementProprety/Input.css";

export default function Category() {
  const { categoryName } = useParams();
  const [courseCount, setCourseCount] = useState(0);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch courses
        const coursesResponse = await apiRequest("/courses");
        const courses = coursesResponse.data;

        // Fetch category data for the specified path
        const categoriesResponse = await apiRequest("/Categories");
        const category = categoriesResponse.data;
        const selectedCategory = category.find(
          (category) => category.path === categoryName
        );

        // Set category title
        if (selectedCategory) {
          setCategoryTitle(selectedCategory.title);
          // set count courses
          const filteredCourses = courses.filter(
            (course) => course.category === selectedCategory.title
          );
          setCourses(filteredCourses);
          setCourseCount(filteredCourses.length);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [categoryName]);

  return (
    // section categories
    <main className="mt-20">
      <div className="w-fit container">
        {/* title page */}
        <HeaderCategories
          titlePage={categoryTitle}
          quantityCourses={courseCount}
        />

        {/* content */}
        <section className="grid grid-cols-12 gap-y-5 md:gap-x-7">
          
          {/* search and filters */}
          <div className="col-span-full lg:col-span-4 xl:col-span-3 lg:sticky top-6 space-y-6">
            <form id="archive_filters" className="space-y-6">
              
              {/* search */}
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
              {courses.map((course) => (
                <CardBox key={course.id} {...course} />
              ))}
            </div>
          </section>

        </section>
      </div>
    </main>
  );
}
