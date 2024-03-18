// use this
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../../services/Redux/actions";
import apiRequest from "../../../services/Axios/config";
import moment from "jalali-moment";

// component
import CourseDetailBox from "../../modules/CourseInfo/CourseDetailBox";
import Breadcrumb from "../../modules/Categoreis/Breadcrumb";

// icon
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { LuHome } from "react-icons/lu";
import { HiUsers } from "react-icons/hi2";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { IoIosStar } from "react-icons/io";
import { IoDocumentText } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { HiAcademicCap } from "react-icons/hi";

// icon course details box
import { BsInfoCircle } from "react-icons/bs";
import { CiVideoOn } from "react-icons/ci";
import { HiOutlineBriefcase } from "react-icons/hi2";
import { HiOutlineUsers } from "react-icons/hi2";
import { RxCalendar } from "react-icons/rx";
import { CiClock2 } from "react-icons/ci";

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
  
  const formattedDate = formatDate(courseInfo.time);

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

        {/* <!-- course info and video  --> */}
        <section className="grid lg:grid-cols-2 lg:gap-5 gap-4 mt-8 bg-white lg:bg-transparent p-5 rounded-[2rem]">
          {/* <!-- course description and title -->  */}
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
                <div className="flex items-center justify-between gap-x-2 mb-3">
                  {courseInfo.price !== 0 ? (
                    <>
                      <span className="text-green-500 text-2xl ml-1 font-IRANSNumber">
                        {addCommas(courseInfo.price)}{" "}
                      </span>
                      <img
                        src="../../../public/toman.svg"
                        className="hidden sm:block w-8 h-8"
                        alt="toman-icon"
                      />
                    </>
                  ) : (
                    <span className="hidden sm:block text-green-500 font-danaDemibold text-2xl mt-2 lg:mb-0">
                      رایگان!{" "}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* <!-- course video  --> */}
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
            <div className="bg-white rounded-2xl p-5 sm:p-5 mt-8">
              {/* title description */}
              <div className="flex items-center gap-x-2 mb-5 sm:mb-6 relative">
                <span className="absolute -right-6 sm:-right-[26px] block w-2 h-[34px] md:h-9.5 bg-amber-400 rounded-r-sm "></span>
                <span className="hidden md:inline-block text-amber-400 text-[30px]">
                  <IoDocumentText />
                </span>
                <h3 className="font-danaDemibold text-xl md:text-2xl">
                  توضیحات
                </h3>
              </div>
              {/* text description */}
              <div className="relative overflow-hidden">
                <div className="course-content max-w-none max-h-[800px] leading-10 font-danaLight text-[16px]">
                  <p>
                    حقیقت تلخ شماره ۱: درصد زیادی از افرادی که یک مسیر رو شروع
                    میکنن. درنهایت شکست میخورن و نتیجه ای نمیگیرن
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
                </div>
                <div></div>
              </div>

              <button className="button-xl button-primary w-full sm:w-auto mx-auto mt-5">
                <span>مشاهده بیشتر مطلب</span>
                <MdOutlineKeyboardArrowDown className="text-[30px]" />
              </button>
            </div>

            {/* <!-- Headlines --> */}
            <div className="bg-white rounded-2xl p-5 sm:p-5 mt-8">
              <div className="flex items-center gap-x-3 mb-6 sm:mb-7 relative">
                <span className="absolute -right-6 sm:-right-[26px] block w-1.5 h-[34px] md:h-9.5 bg-sky-500 rounded-r-sm"></span>
                <span className="hidden md:inline-block text-sky-500 text-[30px]"><HiAcademicCap /></span>
                <h3 className="font-danaDemibold text-xl md:text-2xl">سرفصل ها</h3>
              </div>

              <div className="space-y-4 md:space-y-5">

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
                      1978
                    </span>
                    <span className="block text-sm opacity-70">دانشجو</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center text-center md:text-right gap-y-1 gap-x-3 flex-grow pt-3.5 pb-3 sm:px-3.5 sm:py-2.5 bg-gray-100 rounded-xl">
                  <IoIosStar className="w-10 h-10 md:w-11 md:h-11 text-orange-400" />
                  <div>
                    <span className="block font-bold text-sm md:text-base">
                      5.0
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
