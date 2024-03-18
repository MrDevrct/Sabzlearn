import React from "react";
import "../../../css/ElementProprety/button.css";

export default function SortBox({ sortName, onSortChange, active }) {
  return (
    <button
      className={`sort-btn font-danaLight ${active ? "sort-btn--active" : ""}`}
      onClick={() => onSortChange(sortName)}
    >
      {sortName}
    </button>
  );
}
