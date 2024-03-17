import React, { useEffect, useState } from "react";
import SectionHeader from "../Home/SectionHeader";
import ArticlBox from "../../modules/ArticlBox";
import apiRequest from "../../../services/Axios/config";

export default function LastArticl() {
  const [articl, setArticl] = useState([]);
  useEffect(() => {
    apiRequest("/articles").then((response) => {
      const articl = response.data;
      setArticl(articl);
    });
  }, []);

  return (
    <section className="sm:mt-[8rem] mt-[6rem]">
      <div className="w-fit container">
        {/* title article */}
        <SectionHeader
          title="مقاله ها"
          desc="پیش به سوی ارتقای مهارت ها"
          btnTitle=""
          path="/category/blog"
        />
        {/* articl boxs */}
        <div className="w-fit grid grid-rows-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 sm:px-0 px-2">
          {articl.map((articl) => (
            <ArticlBox key={articl.id} {...articl} />
          ))}
        </div>
      </div>
    </section>
  );
}
