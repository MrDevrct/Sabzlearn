import React from "react";
import Caver from './Articls/cover'
import Button from './Articls/button'
import Icon from './Articls/icon'
import '../../css/ElementProprety/Blog-Banner.css'

export default function ArticlBox(props) {
  return (
    <>
      <div className="flex flex-col overflow-hidden bg-white dark:bg-gray-800 shadow-light dark:shadow-none dark:border border-gray-700 rounded-2xl">
        <Caver img={props.img}/>
        
        <div className="flex flex-col gap-y-8 flex-grow px-5">
          <div className="relative pt-1.5">
            <h4 className="font-danaMedium max-h-12 line-clamp-2 text-zinc-700 dark:text-white mb-2.5">
              <a href="#">
                {props.title}
              </a>
            </h4>
            <p className="font-danaLight text-[18px] line-clamp-4 text-slate-500 dark:text-slate-400">
              {props.desc}
            </p>
          </div>
          <div className="mt-auto space-y-2">
            <Icon data={props}/>
            <hr className="text-[#647488]"/>
            <Button/>
          </div>
        </div>
      </div>
    </>
  );
}
