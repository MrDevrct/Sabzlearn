import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../../services/Redux/actions";
import Breadcrumb from "../../modules/Breadcrumb";
import apiRequest from "../../../services/Axios/config";
import { HiOutlineAcademicCap } from "react-icons/hi2";

export default function CourseView() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  const params = useParams();
  const [courseInfo, setCourseInfo] = useState(null);
  const [categoryPath, setCategoryPath] = useState(null);

  // Fetch courses on component mount
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  // Update courseInfo when courses or params change
  useEffect(() => {
    const course = courses.find((cours) => cours.name === params.courseName);
    setCourseInfo(course);
  }, [courses, params.courseName]);

  // Fetch categoryPath based on courseInfo
  useEffect(() => {
    const fetchCategoryPath = async () => {
      try {
        const categoriesResponse = await apiRequest("/Categories");
        const category = categoriesResponse.data.find(
          (category) => courseInfo && courseInfo.category === category.title
        );

        if (category) {
          setCategoryPath(category.path);
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    // Only fetch categoryPath when courseInfo is available
    if (courseInfo) {
      fetchCategoryPath();
    }
  }, [courseInfo]);

  // Loading state while fetching data
  if (!courseInfo || !categoryPath) {
    return <div>Loading...</div>;
  }

  const addCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <section className="mt-10 leading-normal">
      <div className="container">
        {/*  Breadcrumb */}
        <div>
          <Breadcrumb
            links={[
              { id: 1, title: "خانه", to: "/" },
              {
                id: 2,
                title: `${courseInfo.category}`,
                to: `/category/${categoryPath}`,
              },
              {
                id: 3,
                title: `${courseInfo.title}`,
                to: `/course/${courseInfo.name}`,
              },
            ]}
          />
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-y-4.5 gap-x-6 sm:gap-x-7 lg:items-center xl:items-stretch mt-8 sm:mt-10 rounded-2xl p-4.5 lg:p-0">
          <div className="flex flex-col justify-between order-1 lg:order-1">
            <div>
              <h1 className="font-danaDemibold text-[1.375rem]/8 sm:text-[1.625rem]/10 mb-4">
                {courseInfo.title}
              </h1>
              <p className="font-danaLight sm:text-lg line-clamp-4 sm:line-clamp-3">
                {courseInfo.description}
              </p>
            </div>
            <div className="space-y-4 lg:space-y-8 mt-4 lg:mt-4">
              <div className="flex justify-center xl:items-center lg:justify-between flex-wrap-reverse gap-y-4 gap-x-6">
                <a
                  href={`/course/${courseInfo.name}`}
                  className="button-2xl button-primary w-full sm:w-auto"
                >
                  <HiOutlineAcademicCap className="text-[30px]" />
                  ثبت نام در دوره
                </a>
                <div className="flex items-end gap-x-2.5">
                  {courseInfo.price !== "رایگان" ? (
                    <>
                      <span className="text-green-500 text-2xl ml-1 font-IRANSNumber">
                        {addCommas(courseInfo.price)}{" "}
                      </span>
                      <img
                        src="../../../public/toman.svg"
                        className="w-8 h-8"
                        alt="toman-icon"
                      />
                    </>
                  ) : (
                    <span className="text-green-500 font-danaDemibold text-2xl">
                      رایگان!{" "}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl order-2 lg:order-2 xl:h-[370px]">
            <img
              src={courseInfo.img}
              className="w-full h-full object-cover"
              alt="آموزش جامع webpack"
            />
          </div>
        </section>
      </div>
    </section>
  );
}

{
  /* <section className="mt-5 font-danaMedium leading-normal">
<div className="container">
  <div>
    {/* Breadcrumb */
}

//   </div>
//   <div className="grid grid-rows-3 grid-flow-col gap-4">
//     <div className="row-span-3 order-2">
//       <img
//         src={courseInfo.img}
//         className="w-full rounded-[30px]"
//         alt={courseInfo.title}
//       />
//     </div>
//     <div className="relative d-flex flex-column justify-content-between order-1">
//       <div>
//         <h1 className="font-danaExtrabold text-[35px] pb-4">
//           {courseInfo.title}
//         </h1>
//         <p className="text-[18px]">{courseInfo.description}</p>
//       </div>
//       <div className="flex justify-between row-span-2 col-span-2">
//         <div className="order-2">
//           تعداد شرکت‌کنندگان: {courseInfo.participants}
//         </div>
//         <div className="order-1">
//           <Button className="w-[150px]" active>
//             شرکت در دوره
//           </Button>{" "}
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
// </section> */}
