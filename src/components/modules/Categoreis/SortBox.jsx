import React from "react";

export default function SortBox({ sortName }) {
  return (
    <a
      href=""
      data-id="default"
      className="sort-btn font-danaLight"
      role="button"
    >
      {sortName}
    </a>
  );
}
