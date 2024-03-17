import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "../../../css/ElementProprety/Breadcrumb.css";

export default function Breadcrumb({ links }) {
  return (
    <>
      <div className="breadcrumb">
        {links.map((link) => (
          <div className="breadcrumb__item" key={link.id}>
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
