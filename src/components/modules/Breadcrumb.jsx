import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi2";
import "../../css/ElementProprety/Breadcrumb.css";

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
              {link.title}

              {link.id !== links.length ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="black"
                  class="bi bi-chevron-left "
                  viewBox="0 0 16 16"
                  className="flex-shrink-0 overflow-visible size-6 text-gray-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                  />
                </svg>
              ) : null}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
