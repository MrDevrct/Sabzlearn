import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../../services/Redux/actions";
import Breadcrumb from '../../modules/Categoreis/Breadcrumb';
import { LuHome } from "react-icons/lu";

export default function CourseParts() {
  const [course , setCourse]=useState([])
  const [episodeCourse , setEpisodeCourse] = useState([])
  const { courseInfo } = useParams();
  const dispatch = useDispatch();
  const dataCourses = useSelector((state) => state.courses);
  
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

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
              to: `/category/${course.category}`,
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
          <div className='col-span-full order-last md:order-none md:col-span-7 xl:col-span-8'></div>

          {/* !<-- Side --> */}
          <aside className='col-span-full order-first md:order-none md:col-span-5 xl:col-span-4'></aside>
        </div>

      </div>
    </section>
  );
}