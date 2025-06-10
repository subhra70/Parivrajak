import React from "react";

function Catagories() {
  return (
    <div className="w-screen left-0 px-5">
      <div className="flex gap-5 overflow-x-auto no-scrollbar items-center">
        <select className="p-1 rounded-full border border-gray-400 bg-none">
          <option value="" className="text-center" selected disabled>
            Price
          </option>
          <option value="1000-2000" className="text-center">
            1000-20000
          </option>
          <option value="2000-4000" className="text-center">
            2000-4000
          </option>
          <option value="4000-6000" className="text-center">
            4000-6000
          </option>
          <option value="6000-8000" className="text-center">
            6000-8000
          </option>
          <option value="8000-12000" className="text-center">
            8000-12000
          </option>
          <option value=">12000-more" className="text-center">
            12000-more
          </option>
        </select>
        <select className="p-1 rounded-full border border-gray-400 bg-none">
          <option value="" className="text-center" selected disabled>
            Duration(Days)
          </option>
          <option value="1-3" className="text-center">
            1-3
          </option>
          <option value="3-6" className="text-center">
            3-6
          </option>
          <option value="6-8" className="text-center">
            6-8
          </option>
          <option value="8-more" className="text-center">
            8-more
          </option>
        </select>
        <select className="p-1 rounded-full border border-gray-400 bg-none">
          <option value="" className="text-center" selected disabled>
            Place
          </option>
          <option value="Beach" className="text-center">
            Beach
          </option>
          <option value="Jungle" className="text-center">
            Jungle
          </option>
          <option value="Mountain" className="text-center">
            Mountain
          </option>
          <option value="Desert" className="text-center">
            Desert
          </option>
        </select>
        <select className="p-1 rounded-full border border-gray-400 bg-none">
          <option value="" className="text-center" selected disabled>
            Month
          </option>
          <option value="January-March" className="text-center">
            Jan-Mar
          </option>
          <option value="April-June" className="text-center">
            Apr-Jun
          </option>
          <option value="July-September" className="text-center">
            Jul-Sept
          </option>
          <option value="October-December" className="text-center">
            Oct-Dec
          </option>
        </select>
      </div>
    </div>
  );
}

export default Catagories;
