import React from "react";

export default function SortBox({ sortName, onSortChange }) {
  return (
    <button
      className="sort-btn font-danaLight"
      onClick={() => onSortChange(sortName)}
    >
      {sortName}
    </button>
  );
}