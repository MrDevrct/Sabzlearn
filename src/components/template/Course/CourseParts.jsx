import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../../services/Redux/actions";
import Breadcrumb from "../../modules/Categoreis/Breadcrumb";
import { LuHome } from "react-icons/lu";
import apiRequest from "../../../services/Axios/config";
import HeaderTitle from "../../modules/Course/CourseData/HeaderTitle";
import Button from "../../modules/Button";
import { MdKeyboardArrowDown } from "react-icons/md";
import { CgArrowLeftO } from "react-icons/cg";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import "../../../css/ElementProprety/CourseParts.css";

// icon 
import { BsInfoCircle } from "react-icons/bs";
import { PiTimer } from "react-icons/pi";
import { HiOutlineVideoCamera } from "react-icons/hi2";


export default function CourseParts() {
  // get the courses in redux
  const dispatch = useDispatch();
  const dataCourses = useSelector((state) => state.courses);

  // params in pgae route
  const { courseInfo } = useParams();

  // validate the course
  const [course, setCourse] = useState([]);

  // validate the course chapters
  const [chapterCourse, setChapterCourse] = useState([]);

  // validate the course episodes
  const [episodeCourse, setEpisodeCourse] = useState([]);

  // validate the category path
  const [categoryPath, setCategoryPath] = useState(null);

  // validate open menu chapter
  const [openChapters, setOpenChapters] = useState([]);

  // Fetch courses on component mount
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  // Get Episode Course
  useEffect(() => {
    const foundCourse = dataCourses.find(
      (c) => c.name === courseInfo.split("-")[0]
    );
    if (foundCourse) {
      setCourse(foundCourse);
      setChapterCourse(foundCourse.session);
      const chapterId = parseInt(courseInfo.split("-")[1]);
      const foundChapter = foundCourse.session.find(
        (chap) => chap.id === chapterId
      );

      if (foundChapter) {
        const episodeId = parseInt(courseInfo.split(":")[1]);
        const foundEpisode = foundChapter.Episode.find(
          (epsid) => epsid.id === episodeId
        );
        setEpisodeCourse(foundEpisode);
      }
    }
  }, [dataCourses, courseInfo]);

  // Get Path Categoreis
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiRequest("/Categories");
        const category = response.data.find(
          (category) => course && course.category === category.title
        );
        setCategoryPath(category.path);
      } catch (error) {}
    };
    fetchData();
  }, [course]);

  // تابعی برای تغییر وضعیت باز یا بسته شدن فصل:
  const toggleChapter = (chapterId) => {
    setOpenChapters((prevState) => {
      if (prevState.includes(chapterId)) {
        return prevState.filter((id) => id !== chapterId);
      } else {
        return [...prevState, chapterId];
      }
    });
  };

  return (
    <section className="mx-auto overflow-x-hidden mt-8 sm:mt-10">
      <div className="container">
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
              title: `${course.category}`,
              to: `/category/${categoryPath}`,
            },
            {
              id: 4,
              title: `${course.title}`,
              to: `/course/${course.name}`,
            },
          ]}
        />

        {/* <!-- Course Lesson --> */}
        <div className="aspect-video mt-8 sm:mt-10 overflow-hidden rounded-xl">
          <ReactPlayer
            url={episodeCourse.video}
            className="w-full h-full overflow-hidden rounded-xl"
            width="100%"
            height="100%"
            controls={true}
          />
        </div>

        <div className="grid grid-cols-12 gap-y-6 gap-x-5 lg:gap-x-7 mt-6 lg:mt-8 ">
          <div className="col-span-full order-last md:order-none md:col-span-7 xl:col-span-8">
            {/* !<-- info --> */}
            <div className="block bg-white dark:bg-darker rounded-2xl p-5 sm:p-5">
              {/* !<-- course title */}
              <HeaderTitle title={course.title} spanColor="bg-sky-500" />

              {/* course Lesson title */}
              <div className="flex py-5 sm:py-4 my-5 border-b border-b-gray-200">
                <div className="inline-flex items-center shrink-0 h-7 bg-sky-50 text-sky-500 dark:bg-sky-500/10 text-sm px-1 ml-2.5 font-IRANSNumber rounded">
                  {episodeCourse.id}
                </div>
                <h4 className="font-danaMedium sm:text-lg">
                  {episodeCourse.name}
                </h4>
              </div>

              {/* course CTA buttons */}
              <div className="flex justify-between gap-3.5 flex-wrap">
                <Button
                  text="سوال دارم!"
                  className="w-full sm:w-36 p-2 button-lg button-gray font-danaMedium"
                />

                <div className="flex gap-y-3.5 gap-x-4 justify-end flex-grow flex-wrap">
                  <Button
                    text="دانلود ویدیو"
                    className="w-full sm:w-36 p-2 button-lg button-primary font-danaMedium"
                  />
                </div>
              </div>
            </div>

            {/* !<-- Comment --> */}
            <div className="bg-white dark:bg-darker rounded-2xl p-5 sm:p-5 mt-6 lg:mt-8">
              <div>
                <HeaderTitle
                  title="پرسش و پاسخ"
                  icon={<IoChatbubbleEllipsesSharp />}
                  iconColor="text-red-500"
                  spanColor="bg-red-500"
                />
              </div>

              {/* Q&A form */}
              <div className="mb-8 sm:mb-10"></div>
            </div>
          </div>

          {/* !<-- Side --> */}
          <aside className="col-span-full order-first md:order-none md:col-span-5 xl:col-span-4">
            {/* chapter */}
            <div className="bg-white border border-gray-100 pl-2 pr-5 sm:pr-5 py-5 sm:py-5 rounded-xl mt-6 lg:mt-0">
              {/* title Chapter */}
              <div className="flex items-center gap-x-2 mb-5 pb-5 border-b">
                <span className="font-danaDemibold text-lg">
                  سرفصل های دوره
                </span>
              </div>

              {/* Chapters */}
              <div className="overflow-y-scroll pl-2 max-h-[602px]">
                <div className="chapters">
                  {chapterCourse.map((chapter) => (
                    <div className="chapter my-4" key={chapter.id}>
                      <div
                        className={`chapter__head ${
                          openChapters.includes(chapter.id)
                            ? "chapter__head--active"
                            : ""
                        }`}
                        onClick={() => toggleChapter(chapter.id)}
                      >
                        <span className="font-danaMedium truncate">
                          {chapter.name}
                        </span>
                        <MdKeyboardArrowDown
                          className={`${
                            openChapters.includes(chapter.id)
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </div>
                      {openChapters.includes(chapter.id) &&
                        chapter.Episode.map((episode) => (
                          <div className="chapter__lessons" key={episode.id}>
                            <div className="lesson">
                              <a
                                href={`/lesson/${course.name}-${chapter.id}:${episode.id}`}
                                className="block line-clamp-2"
                              >
                                {episode.name}
                              </a>
                              <div className="flex items-center justify-between mt-3 sm:mt-2">
                                <div className="lesson__status text-[20px] text-green-500">
                                  <MdOutlineRadioButtonUnchecked />
                                </div>
                                <div className="min-w-18 button-xs button-primary button-outline">
                                  11:30{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* details box */}
            <div className="grid grid-cols-3 gap-4 mt-4 lg:mt-5 items-center">
              <div className="text-center pb-4 sm:pb-3 pt-4 sm:3.5 bg-white rounded-xl flex flex-col items-center">
                <BsInfoCircle className="block mb-2 text-green-500 text-[40px]" />
                <div>
                  <h3 className="block font-danaDemibold text-sm sm:text-base mb-1 sm:mb-0">وضعیت دوره</h3>
                  <p className="opacity-70 text-sm">تکمیل شده</p>
                </div>
              </div>
              <div className="text-center pb-4 sm:pb-3 pt-4 sm:3.5 bg-white rounded-xl flex flex-col items-center">
                <PiTimer className="block mb-2 text-green-500 text-[40px]" />
                <div>
                  <h3 className="block font-danaDemibold text-sm sm:text-base mb-1 sm:mb-0">زمان دوره</h3>
                  <p className="opacity-70 text-sm">56:34</p>
                </div>
              </div>
              <div className="text-center pb-4 sm:pb-3 pt-4 sm:3.5 bg-white rounded-xl flex flex-col items-center">
                <HiOutlineVideoCamera className="block mb-2 text-green-500 text-[40px]" />
                <div>
                  <h3 className="block font-danaDemibold text-sm sm:text-base mb-1 sm:mb-0">وضعیت دوره</h3>
                  <p className="opacity-70 text-sm">تکمیل شده</p>
                </div>
              </div>

            </div>

            {/* progress  */}
            <div className="bg-white border border-gray-100 p-5 sm:p-5 rounded-xl mt-4 lg:mt-6">
              <p className="text-sm mb-4">
                وقتی 70 درصد یک ویدیو را بصورت آنلاین تماشا میکنید، میزان پیشرفت
                شما بصورت خودکار بروزرسانی میشود.
              </p>
              <div className="flex items-center justify-between mb-5 font-danaDemibold text-green-500">
                <span>میزان پیشرفت شما</span>
                <span>0%</span>
              </div>
              <div
                className="flex w-full h-4 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700"
                role="progressbar"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
                dir="ltr"
              >
                <div
                  className="flex flex-col justify-center rounded-full overflow-hidden bg-[#22c55e] text-xs text-white text-center whitespace-nowrap transition duration-500"
                  style={{ width: "20%" }}
                ></div>
              </div>
            </div>

            {/* teacher */}
            <div className="bg-white border border-gray-100 p-5 sm:p-5 rounded-xl mt-6 lg:mt-8">
              {/* img */}
              <img
                src="https://secure.gravatar.com/avatar/50db59beddbfed36a1646dae99ca7b2d?s=96&amp;d=mm&amp;r=g"
                className="mx-auto rounded-full object-cover"
                width="90"
                height="90"
                alt="محمدامین سعیدی راد"
              />
              {/* name */}
              <p className="font-danaDemibold text-lg my-5 text-center">
                {course.teacher} | مدرس دوره
              </p>
              {/* profile */}
              <a
                href={`/teacher/${course.teacher}`}
                className="flex items-center justify-center gap-x-2.5 text-green-500 font-danaMedium"
              >
                مشاهده پروفایل من
                <CgArrowLeftO />
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
