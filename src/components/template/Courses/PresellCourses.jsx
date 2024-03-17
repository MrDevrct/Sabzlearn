import React, { useEffect, useState } from "react";
import SectionHeader from "../Home/SectionHeader";
import CourseBox from "../../modules/CourseBox";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses, setCourses } from "../../../services/Redux/actions";

export default function PopularCourses() {
  const dispatch = useDispatch();
  const dataCourses = useSelector((state) => state.courses);
  const [coursesInfo, setCoursesInfo] = useState([]);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  useEffect(() => {
    setCoursesInfo(dataCourses);
  }, [dataCourses]);

  useEffect(() => {
    let filteredCourses = dataCourses;

    filteredCourses = filteredCourses
      .filter((item) => item.participants)
      .sort((a, b) => b.participants - a.participants)
      .slice(0, 4);

    setCoursesInfo(filteredCourses);
  }, [dataCourses]);

  return (
    <section className="sm:mt-[8rem] mt-[6rem]">
      <div className="w-fit container relative">
        {/* <!-- title page --> */}
        <SectionHeader
          title="دوره های پیش فروش"
          desc=" دورهای پیش فروش  بر اساس امتیاز دانشجو ها"
          path=""
          btnTitle=""
          spanColor="bg-yellow-500"
        />

        {/* <!-- courses --> */}
        <div className="w-fit grid grid-rows-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 sm:px-0 px-2">
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

        {/* <!-- bg gradient background --> */}
        <div className="hidden lg:block absolute left-0 top-0 -translate-x-44 -translate-y-[64%] w-60 h-60 bg-sky-500 opacity-25 blur-[125px] -z-10 rounded-full"></div>
      </div>
    </section>
  );
}
