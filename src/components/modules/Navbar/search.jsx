import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

export default function Input() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const searchHandler = (event) => {
    if (event.keyCode === 13) {
      if (search.trim()) {
        navigate(`/courses/search?q=${search}`);
      } else if (!search.trim()) {
        navigate(`/courses`);
      }
    }
  };

  const searchBtnHandler = () => {
    if (search.trim()) {
      navigate(`/courses/search?q=${search}`);
    } else if (!search.trim()) {
      navigate(`/courses`);
    }
  };

  return (
    <>
    <div className="hidden lg:block">
				<div className="hidden xl:block">
					<div className="relative h-13 block">
						<input className="bg-gray-100 text-slate-500 text-sm font-danaMedium rounded-full pr-4 pl-12 xl:w-[20rem] h-[56px] text-right" type="text" 
            placeholder="چیو میخوای یاد بگیری؟" 
            onKeyDown={searchHandler}
            onChange={()=>setSearch(event.target.value)}
            />
						<button className="absolute left-5 top-0 bottom-0 w-7 h-7 my-auto text-slate-500"
            onClick={searchBtnHandler}
            >
              <CiSearch className="text-[30px]" />
						</button>
					</div>
				</div>
			</div>
    </>
  );
}
