import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SortBox from "../../modules/Categoreis/SortBox";
import CourseBox from "../../modules/CourseBox";
import HeaderCategories from "./HeaderCategories";
import apiRequest from "../../../services/Axios/config";
import "../../../css/ElementProprety/Input.css";
import FilterBox from "../../modules/Categoreis/FilterBox";
import SearchBox from "../../modules/Categoreis/SearchBox";

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
            <form className="space-y-6">
              {/* search */}
              <SearchBox/>

              {/* toggle filters */}
              <FilterBox operator="دوره های رایگان"/>
              <FilterBox operator="دوره های پیش فروش"/>

            </form>
          </div>

          {/* content sort and courses */}
          <section className="col-span-full lg:col-span-8 xl:col-span-9 order-1 lg:order-2">
            {/* <!-- sort in courses --> */}
            <SortBox />

            {/* <!-- courses --> */}
            <div className="posts_wrap grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7">
              {courses.map((course) => (
                <CourseBox key={course.id} {...course} />
              ))}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
