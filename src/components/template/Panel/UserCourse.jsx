import React, { useState, useEffect } from "react";
import CourseBox from "../../modules/CourseBox";

export default function UserCourse({ userData }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (userData && userData.courses) {
      setCourses(userData.courses);
      console.log(userData.courses);
    }
  }, [userData]);

  return (
    <div className="posts_wrap grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7 sm:px-0 px-2">
      {courses.map((course) => (
        <CourseBox key={course.id} {...course} />
      ))}
    </div>
  );
}
