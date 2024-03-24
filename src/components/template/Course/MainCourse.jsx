// use this
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../../services/Redux/actions";
import apiRequest from "../../../services/Axios/config";
import moment from "jalali-moment";

// component
import Breadcrumb from "../../modules/Categoreis/Breadcrumb";
import CourseBanner from "../../modules/Course/CourseHead/CourseBanner";
import CourseDetailBox from "../../modules/Course/CourseData/CourseDetailBox";
import CourseInfo from "../../modules/Course/CourseHead/CourseInfo";
import CourseHeadlines from "../../modules/Course/CourseData/CourseHeadlines";
import CourseRelated from "../../modules/Course/CourseData/CourseRelated";
import CourseComments from "../../modules/Course/CourseData/CourseComments";
import CourseDescription from "../../modules/Course/CourseData/CourseDescription";
import CourseAboutTeacher from "../../modules/Course/CourseData/CourseAboutTeacher";
import CourseShortLink from "../../modules/Course/CourseData/CourseShortLink";
import CourseComplatePercentage from "../../modules/Course/CourseData/CourseComplatePercentage";

// icon
import { LuHome } from "react-icons/lu";

// icon CourseBox Info
import { BsInfoCircle } from "react-icons/bs";
import { CiVideoOn } from "react-icons/ci";
import { HiOutlineBriefcase } from "react-icons/hi2";
import { HiOutlineUsers } from "react-icons/hi2";
import { RxCalendar } from "react-icons/rx";
import { CiClock2 } from "react-icons/ci";

// Convert Gregorian date to solar
function formatDate(isoString) {
  const dateObject = new Date(isoString);
  const jalaliDate = moment(dateObject).locale("fa").format("YYYY/MM/DD");
  return jalaliDate;
}

export default function CourseView() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  const params = useParams();
  const [courseInfo, setCourseInfo] = useState(null);
  const [categoryPath, setCategoryPath] = useState(null);
  const [relatedCourse, setRelatedCourse] = useState([]);

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
        // get data Categories
        const categoriesResponse = await apiRequest("/Categories");
        const category = categoriesResponse.data.find((category) => courseInfo && courseInfo.category === category.title);

        // If category value
        if (category) {
          setCategoryPath(category.path);
        }

        // related Course 
        if (courses.length > 0 && courseInfo) {
          const filteredCourses = courses.filter((course) => course.category === courseInfo.category && course.name !== courseInfo.name); 
          if (filteredCourses.length > 0) {
            const fourCourses = filteredCourses.slice(0, 4); // چهار دوره اول
            setRelatedCourse(fourCourses);
          }
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

  // Convert Gregorian to solar time
  const formattedDate = formatDate(courseInfo.time);

  return (
    <main className="mt-8 sm:mt-10">
      <div className="container px-4">
        {/* <!-- Breadcrumb --> */}
        <Breadcrumb
          links={[
            {
              id: 1,
              title: <LuHome className="text-[25px] text-gray-400 ml-2" />,
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

        {/* <!-- Course Head  --> */}
        <section className="grid lg:grid-cols-2 lg:gap-5 gap-4 mt-8 bg-white lg:bg-transparent p-5 rounded-[2rem]">
          {/* <!-- Course Info -->  */}
          <CourseInfo
            name={courseInfo.name}
            title={courseInfo.title}
            description={courseInfo.description}
            price={courseInfo.price}
          />

          {/* <!-- Course Banner  --> */}
          <CourseBanner srcVideo="" posterVideo={courseInfo.img} />
        </section>

        {/* !<-- CourseData --> */}
        <section className="grid grid-cols-12 gap-6 sm:gap-7 mt-7 lg:mt-20">
          <div className="col-span-12 lg:col-span-8">
            {/* !<-- CourseBox Info --> */}
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
                text={formattedDate}
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
                text={`${courseInfo.prerequisite}`}
              />
              {/* item 6 */}
              <CourseDetailBox
                icon={<CiVideoOn />}
                title="نوع مشاهده"
                text="بصورت آنلاین"
              />
            </div>

            {/* !<-- Description --> */}
            <CourseDescription data={courseInfo} />

            {/* !<-- Headlines --> */}
            <CourseHeadlines data={courseInfo} />

            {/* !<-- Related Courses  */}
            <CourseRelated data={relatedCourse} inCourse={courseInfo}/>

            {/* !<-- Comments --> */}
            <CourseComments />
          </div>

          {/* <!-- Students & Rating & Progress --> */}
          <aside className="col-span-12 lg:col-span-4 space-y-8">
            {/* student and complite course */}
            <CourseComplatePercentage data={courseInfo} />

            {/* !<-- Course teacher --> */}
            <CourseAboutTeacher data={courseInfo} />

            {/* !<-- Course short Link --> */}
            <CourseShortLink />
          </aside>
        </section>
      </div>
    </main>
  );
}
