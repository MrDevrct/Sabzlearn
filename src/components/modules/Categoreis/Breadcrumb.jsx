import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

export default function Breadcrumb({ links }) {
  return (
    <>
      <div className="flex h-[3.25rem] items-center overflow-x-auto bg-white rounded-[0.75rem]">
        {links.map((link) => (
          <div className="flex h-full shrink-0 pr-3" key={link.id}>
            <Link
              className="flex items-center font-danaLight text-xl"
              to={link.to}
            >
              {/* title breadcrumb*/}
              <p>{link.title}</p>

              {link.id !== links.length ? (
                <IoIosArrowBack className="text-slate-300 text-[25px] mr-2"/>
              ) : null}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
