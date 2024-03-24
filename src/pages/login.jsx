import React, { useEffect, useState } from "react";
import "../css/ElementProprety/FormInput.css";
import { FaRegEnvelope } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import Input from "../components/modules/Input";
import apiRequset from "../services/Axios/config";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

// alert toastify
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../components/modules/Button";
import apiRequest from "../services/Axios/config";

export default function Login() {
  const navigate = useNavigate();
  // form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  useEffect(() => {
    const token = Cookies.get('Token');
    if (token) {
      const fetchUser = async () => {
        try {
          window.location.pathname = '/';
          const response = await apiRequest.get("/users");
          const users = response.data;
          const user = users.find(user => user.email === token);
          if (user) {
            navigate('/desired-page'); // استفاده از navigate به جای history.push
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchUser();
    }
  }, [navigate]);


  // set form data value
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await apiRequset.get("/users");
      const users = response.data;
      const isLogin = users.find((users) => users.email === formData.email);

      if (isLogin) {
        const isPasswordValid = isLogin.password === formData.password;
        if (isPasswordValid) {
          toast.success('با موفقیت به وارد شدید.', {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            rtl: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });

          Cookies.set('Token', isLogin.email , { expires: 7, domain: 'localhost', httpOnly: false});
          window.location.pathname = '/'
        } 
        else {
        toast.error("رمز یا ایمیل وارد شده استباه است .", {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            rtl: true,
            transition: Bounce,
        });
        }
      } 
      else {
      toast.error("کاربری با این ایمیل و رمز عبور یافت نشد.", {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          rtl: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
      });
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <main className="flex justify-center items-center flex-col relative px-4 py-6 min-h-screen">
        {/* !<-- logo sabzlearn -->  */}
        <a href="/" className="flex items-center gap-x-3 sm:mb-10 mb-4">
          <img
            src="https://sabzlearn.ir/wp-content/themes/sabzlearn-theme/images/logo.webp"
            alt="logo"
            className="h-[62px]"
          />
          <div className="w-[138px] h-[62px] sm:mb-3 sm:mt-0 mt-10">
            <h2 className="sm:text-[30px] text-[20px] font-danaDemibold">
              سبزلرن
            </h2>
            <h2 className="sm:text-[18px] text-[12px] font-danaLight">
              S a b z l e a r n . i r
            </h2>
          </div>
        </a>

        {/* !<-- page Body -->  */}
        <div className="max-w-[330px] w-full pt-5 pb-6 px-6 text-center bg-white rounded-2xl">
          <h4 className="font-danaMedium text-xl mb-4 sm:mb-5">عضویت</h4>
          <p className="mb-5">
            قبلا ثبت نام نکرده اید؟{" "}
            <a href="/register" className="font-danaDemibold text-green-500 ">
              ثبت نام کنید
            </a>
          </p>

          {/* !<-- form data --> */}
          <form
            className="form-data space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* email */}
            <Input
              type="text"
              name="email"
              placeholder="ادرس ایمیل"
              icon={FaRegEnvelope}
              onChange={handleInputChange}
            />

            {/* password */}
            <Input
              type="password"
              name="password"
              placeholder="رمز عبور"
              icon={FiLock}
              onChange={handleInputChange}
            />

            <Button
              text='ورود'
              onClick={handleSubmit}
            />
            
          </form>

          <div className="flex items-center justify-between font-danaMedium text-sm text-slate-500 mt-5">
            <a href="https://sabzlearn.ir/login?after=https%3A%2F%2Fsabzlearn.ir%2F">
              ورود با موبایل
            </a>
            <a
              href="https://sabzlearn.ir/login/lost-password?after=https%3A%2F%2Fsabzlearn.ir%2F"
              className="underline underline-offset-2"
            >
              فراموشی رمز عبور
            </a>
          </div>
        </div>

        {/* footer page */}
        <div className="max-w-[330px] w-full mx-auto text-center mt-7 sm:mt-8 font-danaMedium">
          با عضویت در سایت، تمامی قوانین و شرایط استفاده از خدمت{" "}
          <a href="https://sabzlearn.ir" className="text-green-500">
            سبزلرن{" "}
          </a>
          را پذیرفته اید.
        </div>

        {/* bgraund */}
        <div className="hidden lg:block absolute top-0 left-0 w-[300px] h-[300px] bg-sky-500 opacity-20 blur-[120px] rounded-full"></div>
        <div className="hidden lg:block absolute bottom-0 right-0 w-[300px] h-[300px] bg-amber-400 opacity-20 blur-[120px] rounded-full"></div>

        {/* alert notifiction */}
        <ToastContainer />
      </main>
    </>
  );
}
