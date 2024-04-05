import React from "react";
import "../../../css/ElementProprety/Breadcrumb.css";

export default function Breadcrumb({ links }) {
  return (
    <>
      <div class="breadcrumb">
        {links.map((link) => (
          <div class="breadcrumb__item">
            <a href={link.to} class="breadcrumb__link">
              {link.title}
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
