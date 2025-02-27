import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Search() {
  const [query, setQuery] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const isDisabled = query.trim() === "";

  return (
    <>
      <div className="mt-20 flex justify-center">
        <form className="flex flex-row rounded-lg lg:w-[700px]  ">
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={handleInputChange}
            className="px-2 py-2 pl-[2.5rem] rounded-l-full
             outline-none duration-200 w-full 
              bg-[#0e0e0f] 
               hover:bg-[#0e0e0f] hover:bg-opacity-35 
                 hover:duration-150"
          />

          <div>
            <Link
              to={`/Search/${query}`}
              className={isDisabled ? "pointer-events-none opacity-50" : ""}
            >
              <button
                type="submit"
                className="rounded-r-full bg-[#1b1b1d] p-1.5"
                disabled={isDisabled}
              >
                <svg
                  className="opacity-45"
                  width="40px"
                  height="30px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.0392 15.6244C18.2714 14.084 19.0082 12.1301 19.0082 10.0041C19.0082 5.03127 14.9769 1 10.0041 1C5.03127 1 1 5.03127 1 10.0041C1 14.9769 5.03127 19.0082 10.0041 19.0082C12.1301 19.0082 14.084 18.2714 15.6244 17.0392L21.2921 22.707C21.6828 23.0977 22.3163 23.0977 22.707 22.707C23.0977 22.3163 23.0977 21.6828 22.707 21.2921L17.0392 15.6244ZM10.0041 17.0173C6.1308 17.0173 2.99087 13.8774 2.99087 10.0041C2.99087 6.1308 6.1308 2.99087 10.0041 2.99087C13.8774 2.99087 17.0173 6.1308 17.0173 10.0041C17.0173 13.8774 13.8774 17.0173 10.0041 17.0173Z"
                    fill="#F5F5F7"
                  ></path>
                </svg>
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Search;
