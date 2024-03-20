import React, { useEffect, useState } from "react";
import HeaderCategories from "../Categories/HeaderCategories";
import ArticlBox from "../../modules/Articls/ArticlBox";
import apiRequest from "../../../services/Axios/config";
import SearchBox from "../../modules/Categoreis/SearchBox";
import SortBox from "../../modules/Categoreis/SortBox";
import { LuArrowUpDown } from "react-icons/lu";


export default function Articl() {
  const [articl, setArticl] = useState([]);
  const [defulte, setDefulte] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    apiRequest("/articles").then((response) => {
      const articl = response.data;
      setArticl(articl);
      setDefulte(articl)
    });
  }, []);

  const handleSortChange = (sortName) => {
    let sortedArticles = [...articl];
    if (sortName === "جدیدترین") {
      sortedArticles.sort((a, b) => new Date(b.time) - new Date(a.time));
    } else if (sortName === "قدیمی ترین") {
      sortedArticles.sort((a, b) => new Date(a.time) - new Date(b.time));
    } else if (sortName === "پر نظر ها") {
      sortedArticles.sort((a, b) => b.participants - a.participants);
    } else {
      sortedArticles = defulte;
    }
    setArticl(sortedArticles);
    setActive(sortName)
  };

  return (
    <main className="mt-20">
      <div className="w-fit container">
        {/* <!-- title page --> */}

        <HeaderCategories
          titlePage="مقاله ها"
          quantityCourses={articl.length}
        />

        {/* <!-- content --> */}
        <section className="grid grid-cols-12 gap-y-5 md:gap-x-7">
          {/* <!-- search and filters --> */}
          <div className="col-span-full lg:col-span-4 xl:col-span-3 lg:sticky top-6 space-y-6">
            <form className="space-y-6">
              
              {/* <!-- search box --> */}
              <SearchBox placeholder="جستجو بین مفالات"/>

            </form>
          </div>

          <section className="col-span-full lg:col-span-8 xl:col-span-9 order-1 lg:order-2">
            {/* <!-- sort in courses --> */}
            <div className="hidden lg:flex items-center gap-x-6 px-5 mb-8 h-16 bg-white shadow-normal rounded-xl">
              <div className="flex items-center shrink-0 gap-x-2 px-4">
                <LuArrowUpDown className="text-[25px]" />
                <span className="font-danaMedium">مرتب سازی بر اساس :</span>
              </div>
              <div className="flex items-center font-danaLight gap-x-2 lg:gap-x-8 h-full">
                <SortBox sortName="عادی"  onSortChange={handleSortChange} active={ active === "عادی"}/>
                <SortBox sortName="جدیدترین"  onSortChange={handleSortChange} active={ active === "جدیدترین"}/>
                <SortBox sortName="قدیمی ترین"  onSortChange={handleSortChange} active={ active === "قدیمی ترین"}/>
                <SortBox sortName="پر نظر ها"  onSortChange={handleSortChange} active={ active === "پر نظر ها"}/>
              </div>
            </div>

            {/* <!-- courses --> */}
            <div className="posts_wrap grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7 sm:px-0 px-2">
              {
                articl.map((articl) => (
                  <ArticlBox key={articl.id} {...articl} />
                ))
              }
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

