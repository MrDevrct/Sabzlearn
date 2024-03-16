import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi2";

export default function Breadcrumb({ links }) {
  return (
    <>
      <ol
        className="flex items-center whitespace-nowrap py-4 px-2 mb-4 bg-white rounded-[1rem] shadow-sm"
        aria-label="Breadcrumb"
      >
        <HiOutlineHome className="text-[24px] mr-4 text-gray-500" />

        {links.map((link, index) => (
          <li className="inline-flex items-center" key={index}>
            <Link
              className="flex items-center font-danaLight text-xl text-gray-500"
              to={link.to}
            >
              {index !== links.length ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="black"
                  className="bi bi-chevron-left flex-shrink-0 mx-2 overflow-visible size-6 text-gray-400 dark:text-neutral-600"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                  />
                </svg>
              ) : null}

              {link.title}
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}
