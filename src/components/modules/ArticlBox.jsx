import React from "react";
import Caver from './Articls/cover'
import Button from './Articls/button'
import Icon from './Articls/icon'
import '../../css/ElementProprety/Blog-Banner.css'
import TitleAndDescription from "./Articls/TitleAndDescription";

export default function ArticlBox(props) {
  return (
    <>
      <div className="flex flex-col w-[20rem] overflow-hidden bg-white dark:bg-gray-800 shadow-light dark:shadow-none dark:border border-gray-700 rounded-2xl">
        <Caver img={props.img}/>
        
        <div className="flex flex-col gap-y-8 flex-grow px-5">
            <TitleAndDescription
            title={props.title}
            description={props.desc}
            />
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
