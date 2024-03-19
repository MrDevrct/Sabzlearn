import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SortBox from "../../modules/Categoreis/SortBox";
import CourseBox from "../../modules/CourseBox";
import HeaderCategories from "./HeaderCategories";
import apiRequest from "../../../services/Axios/config";
import "../../../css/ElementProprety/Input.css";
import FilterBox from "../../modules/Categoreis/FilterBox";
import SearchBox from "../../modules/Categoreis/SearchBox";
import { LuArrowUpDown } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../../services/Redux/actions";


export default function Category() {
  const dispatch = useDispatch();
  const dataCourses = useSelector((state) => state.courses);
  const [coursesInfo, setCoursesInfo] = useState([]);
  const { categoryName } = useParams();
  const [courseCount, setCourseCount] = useState(0);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [sortSelected, setSortSelected] = useState(null);
  const [active, setActive] = useState(null);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  useEffect(() => {
    setCoursesInfo(dataCourses);
  }, [dataCourses]);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
          const filteredCourses = dataCourses.filter(
            (course) => course.category === selectedCategory.title
          );
          setCoursesInfo(filteredCourses);
          setSortSelected(filteredCourses);
          setCourseCount(filteredCourses.length);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    if (categoryName) {
      fetchData();
    }
  }, [categoryName, dataCourses]);

  const handleSortChange = (sortName) => {
    let sortedCourses = [...coursesInfo];
    if (sortName === "ارزان ترین") {
      sortedCourses.sort((a, b) => a.price - b.price);
    } else if (sortName === "گران ترین") {
      sortedCourses.sort((a, b) => b.price - a.price);
    } else if (sortName === "پر مخاطب ها") {
      sortedCourses.sort((a, b) => b.participants - a.participants);
    } else {
      sortedCourses = sortSelected;
    }

    setCoursesInfo(sortedCourses);
    setActive(sortName);
  };
  

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
            <form className="space-y-6">
              {/* search */}
              <SearchBox placeholder={`جستجو بین دورهای ${categoryTitle}`} />

              {/* toggle filters */}
              <FilterBox operator="دوره های رایگان" />
              <FilterBox operator="دوره های پیش فروش" />
              <FilterBox operator="دوره های خریداری شده " />
            </form>
          </div>

          {/* content sort and courses */}
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
            <div className="posts_wrap grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7">
              {coursesInfo.map((course) => (
                <CourseBox key={course.id} {...course} />
              ))}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
