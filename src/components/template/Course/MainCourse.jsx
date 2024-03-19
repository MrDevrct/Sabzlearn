// use this
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../../services/Redux/actions";
import apiRequest from "../../../services/Axios/config";
import moment from "jalali-moment";

import '../../../css/ElementProprety/button.css'

// component
import Breadcrumb from "../../modules/Categoreis/Breadcrumb";
import CourseBanner from "../../modules/Course/CourseHead/CourseBanner";
import CourseDetailBox from "../../modules/Course/CourseDetailBox";


// icon
import { LuHome } from "react-icons/lu";
import { HiUsers } from "react-icons/hi2";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { IoIosStar } from "react-icons/io";
import { IoDocumentText } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { HiAcademicCap } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { ImPlay2 } from "react-icons/im";
import { HiSparkles } from "react-icons/hi2";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";




// icon course details box
import { BsInfoCircle } from "react-icons/bs";
import { CiVideoOn } from "react-icons/ci";
import { HiOutlineBriefcase } from "react-icons/hi2";
import { HiOutlineUsers } from "react-icons/hi2";
import { RxCalendar } from "react-icons/rx";
import { CiClock2 } from "react-icons/ci";
import CourseInfo from "../../modules/Course/CourseHead/CourseInfo";

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
  const [hoveredItem, setHoveredItem] = useState(null);
  const [showFullContent, setShowFullContent] = useState(false);
  const [relatedCourses , setRelatedCourses] = useState([])

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


  const formattedDate = formatDate(courseInfo.time);

  const handlerShowFullContent = () => {
    setShowFullContent(!showFullContent);
    console.log(showFullContent);
  };

  return (
    <main className="mt-8 sm:mt-10 px-2">
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
          <CourseBanner
          srcVideo = ''
          posterVideo ={courseInfo.img}
          />
        </section>

        {/* course Data */}
        <section className="grid grid-cols-12 gap-6 sm:gap-7 mt-7 lg:mt-20">
          {/* <!-- details box & desciption --> */}
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
                text={` تسلط به ${courseInfo.category}`}
              />
              {/* item 6 */}
              <CourseDetailBox
                icon={<CiVideoOn />}
                title="نوع مشاهده"
                text="بصورت آنلاین"
              />
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-5 sm:p-5 mt-8">
              {/* title description */}
              <div className="flex items-center gap-x-2 mb-5 sm:mb-6 relative">
                <span className="absolute -right-6 sm:-right-[26px] block w-2 h-[34px] md:h-10 bg-amber-400 rounded-r-sm "></span>
                <span className="hidden md:inline-block text-amber-400 text-[30px]">
                  <IoDocumentText />
                </span>
                <h3 className="font-danaDemibold text-xl md:text-2xl">
                  توضیحات
                </h3>
              </div>
              {/* text description */}
              <div className="relative overflow-hidden">
                <div
                  className={`course-content max-w-none ${
                    showFullContent ? "max-h-full" : "max-h-[800px]"
                  } leading-10 font-danaLight text-[16px] space-y-2`}
                >
                  <p>
                    حقیقت تلخ شماره ۱: درصد زیادی از افرادی که یک مسیر رو شروع
                    میکنن. درنهایت شکست میخورن و نتیجه ای نمیگیرن
                  </p>
                  <p>
                    <img
                      src={courseInfo.ProjectCourseImg}
                      loading="lazy"
                      className="w-full rounded-[25px] p-2"
                    />
                  </p>
                  <p>
                    حقیفت تلخ شماره ۲: افرادی که از حقیقت اول جان سالم به در
                    بردن هم درصد کمی شون پول و رشد کمال خوبی رو تجربه میکنن!
                  </p>
                  <p>
                    میخواید باهاتون رو راست باشم؟ همین بازیگرای هالیوود. چند
                    درصدشون سیاهی لشکرن و چند درصدشون سوپر استار؟ یا اصلا جای
                    دوری نریم. چند نفر از اطرافیان تون رو میشناسید که کاسب هستن
                    و از بین اون کاسب ها چند نفر واقعا اوضاع خفنی داره؟ طبعا همه
                    میدونیم که تعداد این افراد بسیار بسیار کمه و در دنیای برنامه
                    نویسی. در بخش بازار کار هم اوضاع مستثنی از این نیست. اگر
                    نخواهیم نگاه سوسیالیستی به مسائل داشته باشیم. اینگونه که همه
                    مون بهتره فقیر باشیم و کسی لازم نکرده به جایگاه های بالاتر
                    برسه. باید قبول کنیم که از بین هزاران برنامه نویسی که بصورت
                    کارمندی کار میکنن. تعداد کمی شون دستمزد های بالایی میگیرن.
                    تعداد کمی شون در رده های بالاتر مشغول فعالیتن
                  </p>
                  <p>
                    برای مثال: شما ممکنه با برنامه نویس ایرانیی ملاقات کنید که
                    در عین خوشحالی بگه که من ساعتی تقریبا ۱۷۰ هزار تومان(نسبت به
                    دلار ۵۰ هزار تومانی) دستمزد میگیرم. اما آیا میدونستید که
                    تعداد اندکی از این برنامه نویس ها هستن که دو یا سه یا حتی
                    پنج برابر بیشتر از مبلغ ذکر شده دستمزدشونه؟ شاید در
                    تصوراتتون برای چنین افراد. آدم هایی بیاد که قطعا بالای ۳۰
                    ساله برنامه نویس هستن. اما نه جانم! مسئله این نیست که شما
                    سابقه بسیار بسیار خفنی داشته باشی. مسئله اینه که چقدر شناخت
                    از کارفرما جماعت داری!
                  </p>
                  <p>
                    فکت: فریلنسر موفق فردی نیست که با هزاران کارفرما در ارتباطه.
                    بلکه فردیه که با شبکه سازی درست و اصولی تونسته با چند
                    کارفرمای خردمند ارتباط برقرار کنه و با ارائه خدمات با کیفیت
                    به اونها و معرفی شدنش به دیگران. این شبکه رو گسترش بده و
                    گسترش شبکه با کیفیت == پول با کیفیت تر
                  </p>
                  <p>&nbsp;</p>
                  <p>
                    اما سوال اصلی اینجاست که چطور باید به چنین افرادی چنگ زد؟
                    چطور باید شناسایی شون کرد؟ چطور باید کار کنیم تا سعادت کار
                    با کارفرمای خردمندی نصیب مون بشه که بجای غرغرای الکی سر هر
                    پروژه. چک و چونه های وقت تلف کننده بیاد و تسک رو تعریف کنه و
                    کار رو براش انجام بدیم و هزینه مون هم واریز بشه و هر دو به
                    زندگی مون برسیم؟
                  </p>
                  <p>&nbsp;</p>
                  <p>
                    اصولا شما از هر فریلنسری این سوال رو بپرسی ممکنه پاسخ های
                    متفاوتی رو بهتون بده. اما اگر این سوال رو از یک کارفرمایی که
                    با فریلنسر های مختلف کار کرده باشه بپرسید چی؟ قطعا کیفیت
                    پاسخ دهی بسیار بالاتر و فراتر از انتظاراتتونه. همونطور که
                    شما در زمان کودکی و نوجوانی به جواب این سوال که اخلاق مامان
                    باباها توی فلان مدل شرایط به چه شکله رو نمیتونستی از طریق
                    پرس و جو از دوستان نزدیکت برسی و بلکه باید از یک پدر و مادر
                    متشخص چنین مواردی رو میپرسیدی. بحث شناخت کارفرما ها هم به
                    همین شکل هست
                  </p>
                  <p>&nbsp;</p>
                  <p>
                    و این چالش. سر آغاز تولید یک خدمت جدید از سبزلرن برای شما
                    عزیزانه. در این دوره آموزشی. من:قدیر یلمه. بنیانگذار پلتفرم
                    سبزلرن همراه شما هستم تا تجربیاتم رو در راستای ارتقای جایگاه
                    شغلی شما. به اشتراک بزارم
                  </p>
                  <p>&nbsp;</p>
                  <p>
                    شما با شرکت در دوره مستر فریلنس. قرار هست که از زاویه دید یک
                    کارفرما. به مسئله فریلنسری نگاه کنید. نقاط قوت و ضعف اونهارو
                    بدست بیارید و نقاط قوت و ضعف خودتون رو بهبود ببخشید تا در یک
                    رابطه تجاری پرسود. پارتنر های خوبی برای هم باشید
                  </p>
                  <p>
                    میخواید باهاتون رو راست باشم؟ همین بازیگرای هالیوود. چند
                    درصدشون سیاهی لشکرن و چند درصدشون سوپر استار؟ یا اصلا جای
                    دوری نریم. چند نفر از اطرافیان تون رو میشناسید که کاسب هستن
                    و از بین اون کاسب ها چند نفر واقعا اوضاع خفنی داره؟ طبعا همه
                    میدونیم که تعداد این افراد بسیار بسیار کمه و در دنیای برنامه
                    نویسی. در بخش بازار کار هم اوضاع مستثنی از این نیست. اگر
                    نخواهیم نگاه سوسیالیستی به مسائل داشته باشیم. اینگونه که همه
                    مون بهتره فقیر باشیم و کسی لازم نکرده به جایگاه های بالاتر
                    برسه. باید قبول کنیم که از بین هزاران برنامه نویسی که بصورت
                    کارمندی کار میکنن. تعداد کمی شون دستمزد های بالایی میگیرن.
                    تعداد کمی شون در رده های بالاتر مشغول فعالیتن
                  </p>
                  <p>
                    برای مثال: شما ممکنه با برنامه نویس ایرانیی ملاقات کنید که
                    در عین خوشحالی بگه که من ساعتی تقریبا ۱۷۰ هزار تومان(نسبت به
                    دلار ۵۰ هزار تومانی) دستمزد میگیرم. اما آیا میدونستید که
                    تعداد اندکی از این برنامه نویس ها هستن که دو یا سه یا حتی
                    پنج برابر بیشتر از مبلغ ذکر شده دستمزدشونه؟ شاید در
                    تصوراتتون برای چنین افراد. آدم هایی بیاد که قطعا بالای ۳۰
                    ساله برنامه نویس هستن. اما نه جانم! مسئله این نیست که شما
                    سابقه بسیار بسیار خفنی داشته باشی. مسئله اینه که چقدر شناخت
                    از کارفرما جماعت داری!
                  </p>
                  <p>
                    فکت: فریلنسر موفق فردی نیست که با هزاران کارفرما در ارتباطه.
                    بلکه فردیه که با شبکه سازی درست و اصولی تونسته با چند
                    کارفرمای خردمند ارتباط برقرار کنه و با ارائه خدمات با کیفیت
                    به اونها و معرفی شدنش به دیگران. این شبکه رو گسترش بده و
                    گسترش شبکه با کیفیت == پول با کیفیت تر
                  </p>
                </div>
                <div
                  className={`course-content-shadow ${
                    showFullContent ? "hidden" : "block"
                  } absolute bottom-0 right-0 left-0 h-[160px] bg-gradient-to-t from-white dark:from-darker from-0% via-white/[55%] dark:via-darker/[55%] via-70% to-white/0 dark:to-darker/0 to-100%`}
                ></div>
              </div>

              <button
                className="button-xl button-primary w-full sm:w-auto mx-auto mt-5"
                onClick={handlerShowFullContent}
              >
                <span>
                  {showFullContent ? "مشاهده کمتر مطلب" : "مشاهده بیشتر مطلب"}
                </span>
                <MdOutlineKeyboardArrowDown
                  className={`${
                    showFullContent ? "rotate-180" : ""
                  } text-[30px]`}
                />
              </button>
            </div>

            {/* !<-- Headlines --> */}
            <div className="bg-white rounded-2xl p-5 sm:p-5 mt-8">
              <div className="flex items-center gap-x-3 mb-6 sm:mb-7 relative">
                <span className="absolute -right-6 sm:-right-[26px] block w-1.5 h-[34px] md:h-10 bg-sky-500 rounded-r-sm"></span>
                <span className="hidden md:inline-block text-sky-500 text-[35px]">
                  <HiAcademicCap />
                </span>
                <h3 className="font-danaDemibold text-xl md:text-2xl">
                  سرفصل ها
                </h3>
              </div>
              <div className="space-y-4 md:space-y-5">
                {courseInfo.session.map((course) => (
                  <div
                    className="overflow-hidden rounded-[0.75rem] bg-[#f3f4f6]"
                    key={course.id}
                  >
                    <div
                      className={`topic__head flex cursor-pointer items-center justify-between gap-x-5 md:gap-x-20 p-4 md:p-4 transition duration-150 ease-in py-2 ${
                        hoveredItem === course.name
                          ? "bg-slate-700 text-white"
                          : ""
                      }`}
                      onClick={() =>
                        setHoveredItem(
                          hoveredItem === course.name ? null : course.name
                        )
                      }
                    >
                      <span className="inline-block font-danaDemibold lg:line-clamp-3 transition-colors">
                        {course.name}
                      </span>
                      <div className="flex items-center gap-x-3 shrink-0">
                        <div
                          className={`hidden lg:flex items-center gap-x-1.5 text-sm ${
                            hoveredItem === course.name
                              ? "text-whi"
                              : "text-slate-500"
                          } child:transition-colors`}
                        >
                          <span>{course.Episode.length} جلسه</span>
                          <span
                            className={`topic__time-dot block w-1 h-1 ${
                              hoveredItem === course.name
                                ? "bg-white"
                                : "bg-slate-500/50"
                            } rounded-full`}
                          ></span>
                          <span>14 دقیقه</span>
                        </div>
                        <IoIosArrowDown
                          className={
                            hoveredItem === course.name ? `rotate-180` : ""
                          }
                        />
                      </div>
                    </div>
                    {hoveredItem === course.name && (
                      <>
                        {course.Episode.length > 0 ? (
                          // اگر آرایه حاوی آیتم‌ها بود
                          course.Episode.map((episode) => (
                            <div className="topic__body" key={episode.id}>
                              <div className="flex items-start justify-between gap-x-5 gap-y-3 flex-wrap lg:flex-nowrap px-4 py-5 group">
                                <div className="flex items-start flex-grow gap-x-2.5 md:gap-x-3.5 child:transition-colors">
                                  <div className="flex items-center justify-center w-8 h-6 md:h-7 text-sm font-danaDemiBold bg-white group-hover:bg-green-500 group-hover:text-white rounded">
                                    {episode.id}
                                  </div>
                                  <a
                                    href={episode.path}
                                    className="inline-block lg:max-w-3/4 text-sm md:text-base group-hover:text-green-500"
                                  >
                                    {episode.name}
                                  </a>
                                </div>
                                <div className="flex items-center gap-x-1.5 mr-auto text-gray-600 group-hover:text-green-500 child:transition-colors">
                                  <span className="text-sm md:text-base">
                                    03:54
                                  </span>
                                  <ImPlay2 />
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          // اگر آرایه خالی بود
                          <div className="text-gray-500 p-4">
                            هنوز دوره ای قرار داده نشده است .
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* !<-- Related Courses  */}
            <div className="hidden lg:block bg-white rounded-2xl p-5 sm:p-5 mt-8">
              <div className="flex items-center gap-x-2 mb-5 sm:mb-6 relative">
                <span className="absolute -right-6 sm:-right-[26px] block w-2 h-[34px] md:h-10 bg-amber-400 rounded-r-sm "></span>
                <span className="hidden md:inline-block text-amber-400 text-[30px]">
                  <HiSparkles className="text-[35px]"/>
                </span>
                <h3 className="font-danaDemibold text-xl md:text-2xl">
                دوره های مرتبط
                </h3>
              </div>

              <div className="space-y-4 md:space-y-5">
                {/* 1 */}
                <div className="flex items-center justify-between flex-wrap bg-gray-100 dark:bg-dark rounded-lg py-2 pr-2 pl-4">
                  <div className="flex items-center gap-x-4 w-4/5">
                    <img className="w-24 rounded-md aspect-video" src="https://sabzlearn.ir/wp-content/uploads/2023/12/ezgif.com-jpg-to-webp-converted-6-1.webp" alt="آموزش پایتون رایگان مقدماتی تا پیشرفته + پروژه های جذاب"/>
                    <a href="" className="font-danaMedium line-clamp-2">آموزش شبکه با گرایش امنیت | Black Network</a>
                  </div>
                  <a href="" className="flex gap-x-1 items-center justify-between sm:justify-normal text-sky-500 font-danaDemiBold text-sm">
                    مشاهده
                    <BsArrowLeftCircleFill className="text-[20px] mr-1"/>
                  </a>

                </div>
                {/* 2 */}
                <div className="flex items-center justify-between flex-wrap bg-gray-100 dark:bg-dark rounded-lg py-2 pr-2 pl-4">
                  <div className="flex items-center gap-x-4 w-4/5">
                    <img className="w-24 rounded-md aspect-video" src="https://sabzlearn.ir/wp-content/uploads/2023/12/ezgif.com-jpg-to-webp-converted-6-1.webp" alt="آموزش پایتون رایگان مقدماتی تا پیشرفته + پروژه های جذاب"/>
                    <a href="" className="font-danaMedium line-clamp-2">آموزش شبکه با گرایش امنیت | Black Network</a>
                  </div>
                  <a href="" className="flex gap-x-1 items-center justify-between sm:justify-normal text-sky-500 font-danaDemiBold text-sm">
                    مشاهده
                    <BsArrowLeftCircleFill className="text-[20px] mr-1"/>
                  </a>

                </div>
                {/* 3 */}
                <div className="flex items-center justify-between flex-wrap bg-gray-100 dark:bg-dark rounded-lg py-2 pr-2 pl-4">
                  <div className="flex items-center gap-x-4 w-4/5">
                    <img className="w-24 rounded-md aspect-video" src="https://sabzlearn.ir/wp-content/uploads/2023/12/ezgif.com-jpg-to-webp-converted-6-1.webp" alt="آموزش پایتون رایگان مقدماتی تا پیشرفته + پروژه های جذاب"/>
                    <a href="" className="font-danaMedium line-clamp-2">آموزش شبکه با گرایش امنیت | Black Network</a>
                  </div>
                  <a href="" className="flex gap-x-1 items-center justify-between sm:justify-normal text-sky-500 font-danaDemiBold text-sm">
                    مشاهده
                    <BsArrowLeftCircleFill className="text-[20px] mr-1"/>
                  </a>

                </div>
                {/* 4 */}
                <div className="flex items-center justify-between flex-wrap bg-gray-100 dark:bg-dark rounded-lg py-2 pr-2 pl-4">
                  <div className="flex items-center gap-x-4 w-4/5">
                    <img className="w-24 rounded-md aspect-video" src="https://sabzlearn.ir/wp-content/uploads/2023/12/ezgif.com-jpg-to-webp-converted-6-1.webp" alt="آموزش پایتون رایگان مقدماتی تا پیشرفته + پروژه های جذاب"/>
                    <a href="" className="font-danaMedium line-clamp-2">آموزش شبکه با گرایش امنیت | Black Network</a>
                  </div>
                  <a href="" className="flex gap-x-1 items-center justify-between sm:justify-normal text-sky-500 font-danaDemiBold text-sm">
                    مشاهده
                    <BsArrowLeftCircleFill className="text-[20px] mr-1"/>
                  </a>

                </div>

              </div>
              
            </div>

            {/* comments */}
            <div className="bg-white rounded-2xl p-5 sm:p-5 mt-8">
              <div className="flex items-center justify-between mb-6 sm:mb-7">
              <div className="flex items-center gap-x-3 mb-6 sm:mb-7 relative">
                <span className="absolute -right-6 sm:-right-[26px] block w-1.5 h-[34px] md:h-10 bg-red-500 rounded-r-sm"></span>
                <span className="hidden md:inline-block text-red-500 text-[35px]">
                  <HiChatBubbleLeftRight />
                </span>
                <h3 className="font-danaDemibold text-xl md:text-2xl">
                نظرات
                </h3>
              </div>
              {/* new button */}
              <button className="button-primary sm:h-[40px] sm:px-[1rem] mb-5 h-[35px] px-[8px] sm:text-[16px] text-[14px]">
									ایجاد نظر جدید
                  <HiOutlineChatBubbleBottomCenterText className="mr-1"/>
							</button>
              </div>
            </div>
          </div>

          {/* <!-- Students & Rating & Progress --> */}
          <aside className="col-span-12 lg:col-span-4 space-y-8">
            {/* student and complite course */}
            <div className="bg-white rounded-2xl p-5 sm:p-5">
              <div className="flex gap-x-4">
                <div className="flex flex-col sm:flex-row items-center text-center md:text-right gap-y-1 gap-x-3 flex-grow pt-3.5 pb-3 sm:px-3.5 sm:py-2.5 bg-gray-100 rounded-xl">
                  <HiUsers className="w-10 h-10 md:w-11 md:h-11 text-green-500" />
                  <div>
                    <span className="block font-bold text-sm md:text-base">
                      {courseInfo.participants}
                    </span>
                    <span className="block text-sm opacity-70">دانشجو</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center text-center md:text-right gap-y-1 gap-x-3 flex-grow pt-3.5 pb-3 sm:px-3.5 sm:py-2.5 bg-gray-100 rounded-xl">
                  <IoIosStar className="w-10 h-10 md:w-11 md:h-11 text-orange-400" />
                  <div>
                    <span className="block font-bold text-sm md:text-base">
                      {courseInfo.satisfaction}
                    </span>
                    <span className="block text-sm opacity-70">رضایت</span>
                  </div>
                </div>
              </div>

              {/* !<-- ProgressBar -->  */}
              <div className="mt-3 sm:mt-6">
                {/* !<-- Progressbar completion percentage --> */}
                <div className="flex items-center justify-between font-danaDemibold text-sm sm:text-base mb-3">
                  <span>درصد تکمیل دوره</span>
                  <span>20%</span>
                </div>

                {/* !<-- Progress -->  */}
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
            </div>

            {/* !<-- Course teacher --> */}
            <div className="bg-white dark:bg-darker rounded-2xl pt-6 px-5 pb-5 sm:py-8 md:px-5 text-center">
              <img
                className="block mb-4 mx-auto object-cover rounded-full"
                width="90"
                height="90"
                src="https://secure.gravatar.com/avatar/5872841a47b10069777793cbce83eacf?s=96&amp;d=mm&amp;r=g"
                alt={courseInfo.teacher}
              />
              <span className="font-danaDemibold text-lg">
                {courseInfo.teacher} | مدرس دوره
              </span>
              <p className="mt-2"></p>
              <a
                href="https://sabzlearn.ir/teacher/HamidrezaEbadi"
                className="button-primary button-lg button-outline mx-auto my-4 py-2"
              >
                مشاهده پروفایل من
              </a>
            </div>

            {/* !<-- Course short Link --> */}
            <div className="hidden lg:block bg-white dark:bg-darker rounded-2xl py-6 px-8 text-center">
              <span className="font-danaDemibold text-lg">
                لینک کوتاه آموزش
              </span>
              <div className="flex items-center justify-between gap-x-3 py-5 px-6 mt-5 bg-sky-50 text-sky-500 border border-dashed border-sky-500 rounded-lg">
                <button>
                  <HiOutlineClipboardDocument className="text-[30px]" />
                </button>
                <span className="font-danaMedium text-lg w-64 text-ltr text-left truncate">
                  https://sabzlearn.ir/?p=84
                </span>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
