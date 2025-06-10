import React from 'react'
import { CiSearch } from "react-icons/ci";

function Search() {
  return (
    <div className='hidden w-full md:w-10/12 md:max-w-sm lg:max-w-md mx-auto md:flex items-center rounded-xl overflow-hidden hover:focus-within:ring-2 focus-within:ring-yellow-600 transition-shadow'>
      <input
        type="search"
        placeholder='Search here...'
        className='flex-grow md:px-1 md:py-2 lg:px-5 lg:py-3 text-gray-700 focus:outline-none'
      />
      <button
        className='bg-yellow-600 text-white md:p-2 lg:p-3 hover:bg-yellow-700 transition-colors duration-300'
        aria-label="Search"
      >
        <CiSearch size={24} />
      </button>
    </div>
  )
}

export default Search;
