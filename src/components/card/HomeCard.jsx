import React from "react";

function HomeCard({ img, title = "" }) {
  return (
    <div
      className="relative w-64 h-40 bg-cover bg-center rounded-xl overflow-hidden shadow-lg"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="absolute bottom-4 left-2 text-white text-xl font-semibold bg-black bg-opacity-50 px-2 py-1 rounded">
        {title}
      </div>
    </div>
  );
}

export default HomeCard;
