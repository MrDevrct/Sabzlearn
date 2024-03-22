import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SortBox from "../../modules/Categoreis/SortBox";
import apiRequest from "../../../services/Axios/config";
import "../../../css/ElementProprety/Input.css";
import { LuArrowUpDown } from "react-icons/lu";
import Button from "../../modules/Button";
import CourseBox from "../../modules/CourseBox";

// icons
import { FaInstagram } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";

export default function Category() {
  const { teacherName } = useParams();
  const [courses , setCourses] = useState([])
  const [sortSelected , setSortSelected] = useState([])
  const [active , setActive] = useState([])
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const teacherResponse = await apiRequest("/teachers");
        const foundTeacher = teacherResponse.data.find((teacher) => teacher.name === teacherName);
        if (foundTeacher) {
          setTeacher(foundTeacher);
          setCourses(foundTeacher.courses);
          setSortSelected(foundTeacher.courses)
        }
      } catch (error) {
        console.error("Error fetching teacher:", error);
      }
    };

    fetchTeacher();
  }, [teacherName]);

  const handleSortChange = (sortName) => {
    let sortedCourses = [...courses];
    if (sortName === "ارزان ترین") {
      sortedCourses.sort((a, b) => a.price - b.price);
    } else if (sortName === "گران ترین") {
      sortedCourses.sort((a, b) => b.price - a.price);
    } else if (sortName === "پر مخاطب ها") {
      sortedCourses.sort((a, b) => b.participants - a.participants);
    } else {
      sortedCourses = sortSelected;
    }

    setCourses(sortedCourses);
    setActive(sortName);
  };

  if (!teacher) {
    return <div>Loading...</div>;
  }

  return (
    // section categories
    <main className="mt-20">
      <div className="w-fit container">
        {/* content */}
        <section className="grid grid-cols-12 gap-y-5 md:gap-x-7">
          {/* search and filters */}
          <aside className="col-span-full lg:col-span-4 xl:col-span-3 lg:sticky top-6 space-y-6">
            <div className="bg-white dark:bg-darker p-5 rounded-xl">
              {/* teacher Info */}
              <div className="text-center mb-5">
                {/* teacher img */}
                <img
                  className="size-28 mx-auto object-cover rounded-full"
                  src={teacher.img}
                  alt={teacher.name}
                />

                {/* teacher name */}
                <h5 className="font-danaDemibold text-lg mt-5 mb-2">
                  {teacher.name}
                </h5>

                {/* teacher description */}
                <p className="text-sm">{teacher.description}</p>

                {/* teacher social */}
                <div className="flex justify-center gap-3 mt-4">
                  {teacher.social.map((social, index) =>
                    social.name === "instagram" ? (
                      <Button
                        key={index}
                        icon={<FaInstagram />}
                        className="button-primary button-xl button-outline only-icon"
                      />
                    ) : (
                      <Button
                        key={index}
                        icon={<FaTelegramPlane />}
                        className="button-primary button-xl button-outline only-icon"
                      />
                    )
                  )}
                </div>
              </div>

              {/* teacher skills */}
              <div className="space-y-4">
                {teacher.skills.map((skills) => (
                  <div
                    className="flex items-center justify-between px-3 h-12 bg-gray-100 select-none rounded-md"
                    key={skills.id}
                  >
                    <span className="text-slate-500 dark:text-white">
                      {skills.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

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
            <div className="posts_wrap grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7 sm:px-0 px-2">
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
