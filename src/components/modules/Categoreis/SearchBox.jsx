  import React, { useState } from "react";
  import { CiSearch } from "react-icons/ci";

  export default function SearchBox({ placeholder }) {
    // search values
    const [searchValues, setSearchValues] = useState(null);

    const searchHandler = (event) => {
      if (event.key === 'Enter') { // استفاده از event.key برای بررسی کلید Enter
        event.preventDefault(); // جلوگیری از رفتار پیش‌فرض
        console.log(searchValues);
      }
    };
    

    return (
      <div className="h-17 bg-white rounded-xl p-4 md:p-5">
        <div className="flex justify-between gap-x-6 h-full text-slate-500">
          <input
            type="text"
            name="s"
            className="md:font-danaMedium placeholder-slate-500 bg-transparent flex-grow"
            placeholder={placeholder}
            onChange={() => setSearchValues(event.target.value)}
            onKeyDown={searchHandler}
          />
          <button>
            <CiSearch className="w-7 h-7" />
          </button>
        </div>
      </div>
    );
  }
