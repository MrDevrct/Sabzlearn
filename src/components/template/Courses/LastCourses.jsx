import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../../services/Redux/actions";
import SectionHeader from "../../modules/Home/SectionHeader";
import CourseBox from "../../modules/CourseBox";
import { Link } from "react-router-dom";

export default function LastCourses() {
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
      .filter((item) => item.time)
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, 12);

    setCoursesInfo(filteredCourses);
  }, [dataCourses]);

  return (
    <>
      <section className="sm:mt-[8rem] mt-[6rem]">
        <div className="w-fit container">
          {/* <!-- title page --> */}
          <SectionHeader
            title="جدیدترین دوره ها"
            desc="سکوی پرتاب شما به سمت موفقیت"
            path="/courses/"
            btnTitle="نمایش همه دوره ها"
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
        </div>
      </section>
    </>
  );
}
