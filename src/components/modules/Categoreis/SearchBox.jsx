import React from 'react'
import { CiSearch } from "react-icons/ci";

export default function SearchBox({ placeholder }) {
  return (
    <div className="h-17 bg-white rounded-xl p-4 md:p-5">
    <div className="flex justify-between gap-x-6 h-full text-slate-500">
      <input
        type="text"
        name="s"
        className="md:font-danaMedium placeholder-slate-500 bg-transparent flex-grow"
        placeholder={placeholder}
      />
      <button>
        <CiSearch className="w-7 h-7" />
      </button>
    </div>
  </div>
  )
}
