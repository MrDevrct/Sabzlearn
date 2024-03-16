// use this
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../../services/Redux/actions";
import apiRequest from "../../../services/Axios/config";
// component
import CourseDetailBox from "../../modules/CourseDetailBox";
import Breadcrumb from "../../modules/Breadcrumb";

// icon
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { LuHome } from "react-icons/lu";

// icon course details box
import { BsInfoCircle } from "react-icons/bs";
import { CiVideoOn } from "react-icons/ci";
import { HiOutlineBriefcase } from "react-icons/hi2";
import { HiOutlineUsers } from "react-icons/hi2";
import { RxCalendar } from "react-icons/rx";
import { CiClock2 } from "react-icons/ci";

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
    <main className="mt-8 sm:mt-10">
      <div className="container">
        {/*  Breadcrumb */}
        <div>
          <Breadcrumb
            links={[
              {
                id: 1,
                title: <LuHome className="text-[25px] mb-2" />,
                to: "/",
              },
              {
                id: 2,
                title: "دوره ها",
                to: "/courses",
              },
              {
                id: 3,
                title: `${courseInfo.category}`,
                to: `/category/${categoryPath}`,
              },
              {
                id: 4,
                title: `${courseInfo.title}`,
                to: `/course/${courseInfo.name}`,
              },
            ]}
          />
        </div>

        {/* course info and video  */}
        <section className="grid lg:grid-cols-2 lg:gap-5 gap-4 mt-8 bg-white lg:bg-transparent p-5 rounded-[2rem]">
          {/* course description and title  */}
          <div className="flex flex-col justify-between order-2 lg:order-1">
            <div>
              <h1 className="font-danaDemibold text-[1.375rem]/8 sm:text-[1.625rem]/10 mb-4">
                {courseInfo.title}
              </h1>
              <p className="font-danaLight sm:text-lg line-clamp-4 sm:line-clamp-3">
                {courseInfo.description}
              </p>
            </div>
            <div className="space-y-4 lg:space-y-8 mt-4 lg:mt-4">
              <div className="flex justify-center xl:items-center lg:justify-between gap-5">
                <a
                  href={`/course/${courseInfo.name}`}
                  className="button-2xl button-primary w-full mb-2 sm:w-auto"
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
                    <span className="text-green-500 font-danaDemibold text-2xl mb-4 lg:mb-0">
                      رایگان!{" "}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* course image */}
          <div className="overflow-hidden rounded-2xl order-1 lg:order-2 xl:h-[370px]">
            <video
              src=""
              poster={courseInfo.img}
              className="w-full h-full object-cover"
              alt="آموزش جامع webpack"
              controls
            ></video>
          </div>
        </section>

        {/* course details */}
        <section className="grid grid-cols-12 gap-6 sm:gap-7 mt-7 lg:mt-20">
          <div className="col-span-12 lg:col-span-8">
            {/* course box details */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {/* item 1 */}
              <CourseDetailBox
                icon={<BsInfoCircle />}
                title="وضعیت دوره"
                text="پیش فروش"
              />
              {/* item 2 */}
              <CourseDetailBox
                icon={<CiClock2 />}
                title="مدت زمان دوره"
                text="0 ساعت"
              />
              {/* item 3 */}
              <CourseDetailBox
                icon={<RxCalendar />}
                title="آخرین بروزرسانی"
                text="1402/12/22"
              />
              {/* item 4 */}
              <CourseDetailBox
                icon={<HiOutlineUsers />}
                title="روش پشتیبانی"
                text="آنلاین"
              />
              {/* item 5 */}
              <CourseDetailBox
                icon={<HiOutlineBriefcase />}
                title="پیش نیاز"
                text="تسلط به فرانت اند"
              />
              {/* item 6 */}
              <CourseDetailBox
                icon={<CiVideoOn />}
                title="نوع مشاهده"
                text="بصورت آنلاین"
              />
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-darker rounded-2xl p-4.5 sm:p-5 mt-8">
              <div>
                title
              </div>
              <div>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Sapiente pariatur, dicta soluta unde earum temporibus animi
                voluptatem blanditiis cum, quod culpa porro! Deleniti nihil, qui
                aliquam ratione tenetur quibusdam rem.
              </div>
              <button>Shoe More</button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
