import React from "react";
import Button from "../Button";

function Card({ product = {}, type }) {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-bold text-left">{type} History</h1>
      <div className="flex flex-col w-full md:w-1/3 gap-4 mt-4 bg-white shadow-md rounded-xl p-4">
        <img
          src="https://via.placeholder.com/150"
          alt="Tour"
          className="w-full sm:w-64 h-40 object-cover rounded-md"
        />
        <div className="flex flex-col justify-between gap-3 w-full">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg md:text-2xl font-semibold text-left">
              Tour Title
            </h2>
            <div className="flex flex-wrap gap-2">
              <div className="flex gap-1">
                <span className="font-bold">Organizer:</span>
                <span>Travel Co.</span>
              </div>
              <div className="flex gap-1">
                <span className="font-bold">Destination:</span>
                <span>Goa</span>
              </div>
              <div className="flex gap-1">
                <span className="font-bold">Price:</span>
                <span className="bg-gray-200 rounded-full px-1">
                  ₹50000/person
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <button className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-700 w-full sm:w-auto">
              Delete
            </button>
            <button className="py-2 px-4 bg-orange-600 text-white hover:bg-orange-700 rounded-md w-full sm:w-auto">
              Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
