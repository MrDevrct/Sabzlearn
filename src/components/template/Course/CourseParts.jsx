import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../../services/Redux/actions";
import Breadcrumb from '../../modules/Categoreis/Breadcrumb';
import { LuHome } from "react-icons/lu";
import apiRequest from '../../../services/Axios/config';
import HeaderTitle from '../../modules/Course/CourseData/HeaderTitle';
import Button from '../../modules/Button'

export default function CourseParts() {
  const [course , setCourse]=useState([])
  const [episodeCourse , setEpisodeCourse] = useState([])
  const [categoryPath, setCategoryPath] = useState(null);
  const { courseInfo } = useParams();
  const dispatch = useDispatch();
  const dataCourses = useSelector((state) => state.courses);
  
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  // Get Episode Course
  useEffect(() => {
     const foundCourse = dataCourses.find(c => c.name === courseInfo.split('-')[0]);
      if (foundCourse) {
        setCourse(foundCourse)
        const chapterId = parseInt(courseInfo.split('-')[1]);
        const foundChapter = foundCourse.session.find(chap => chap.id === chapterId);
        console.log(foundChapter);
        if (foundChapter) {
          const episodeId = parseInt(courseInfo.split(':')[1])
          const foundEpisode = foundChapter.Episode.find(epsid => epsid.id === episodeId)
          setEpisodeCourse(foundEpisode);
        }
      }
  }, [dataCourses, courseInfo]);

  // Get Path Categoreis
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiRequest("/Categories");
        const category = response.data.find((category) => course && course.category === category.title);
        setCategoryPath(category.path);
      } catch (error) {}
    };
    fetchData();
  }, [course]);

  return (
    <section className='mx-auto overflow-x-hidden mt-8 sm:mt-10'>
      <div className='container'>
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
        <div className='aspect-video mt-8 sm:mt-10 overflow-hidden rounded-xl'>
            <video src={episodeCourse.video} className='w-full m-auto overflow-hidden rounded-[20px]' controls></video>
        </div>

        <div className='grid grid-cols-12 gap-y-6 gap-x-5 lg:gap-x-7 mt-6 lg:mt-8 '>

          <div className='col-span-full order-last md:order-none md:col-span-7 xl:col-span-8'>

            {/* !<-- info --> */}
            <div className='block bg-white dark:bg-darker rounded-2xl p-5 sm:p-5'>

              {/* !<-- course title */}
              <HeaderTitle
               title = {course.title}
               spanColor = 'bg-sky-500'
              />

              {/* course Lesson title */}
              <div className='flex py-5 sm:py-4 my-5 border-b border-b-gray-200'>
                <div className='inline-flex items-center shrink-0 h-7 bg-sky-50 text-sky-500 dark:bg-sky-500/10 text-sm px-1 ml-2.5 font-IRANSNumber rounded'>{episodeCourse.id}</div>
                <h4 className='font-danaMedium sm:text-lg'>{episodeCourse.name}</h4>
              </div>

              {/* course CTA buttons */}
              <div className='flex justify-between gap-3.5 flex-wrap'>

                <Button 
                  text='سوال دارم!'
                  className="w-full sm:w-36 p-2 button-lg button-gray"
                />

                <div className='flex gap-y-3.5 gap-x-4 justify-end flex-grow flex-wrap'>
                <Button 
                  text='دانلود ویدیو'
                  className="w-full sm:w-36 p-2 button-lg button-primary"
                />

                </div>
              </div>

            </div>

            {/* !<-- info --> */}
            <div className='bg-white dark:bg-darker rounded-2xl p-4.5 sm:p-5 mt-6 lg:mt-8'></div>

          </div>

          {/* !<-- Side --> */}
          <aside className='col-span-full order-first md:order-none md:col-span-5 xl:col-span-4'>
            <div className='bg-white border border-gray-100 pl-2 pr-5 sm:pr-5 py-5 sm:py-5 rounded-xl mt-6 lg:mt-0'>
              {/* title Chapter */}
              <div className="flex items-center gap-x-2 mb-5 pb-5 border-b">
							  <span className="font-danaDemibold text-lg">سرفصل های دوره</span>
						  </div>
              {/* Chapters */}
              <div className='overflow-y-scroll pl-2 max-h-[602px]'>
                <div className='chapter'>
                  salam
                </div>
              </div>

            </div>
          </aside>
        </div>

      </div>
    </section>
  );
}