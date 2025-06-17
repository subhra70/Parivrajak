import React from "react";

import background from "../assets/home_bg3.jpg";
import kedarnath from "../assets/kedarnath.jpg";
import meghalaya from "../assets/meghalaya.jpg";
import sundarban from "../assets/sundarban.jpg";
import organizer from "../assets/organizer.jpg";
import { Link } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";
import HomeCard from "./card/HomeCard";

function Home() {
  
  return (
    <div className="absolute min-h-screen no-scrollbar left-0 top-0 w-full bg-black overflow-y-hidden">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 w-full bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col justify-center items-center min-h-[90vh] px-4 text-center py-12">
        <div className="space-y-6 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-orange-300 drop-shadow-md">
            Not All Those Who Wander Are Lost
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-500">
            Some Are <span className="text-orange-400">Parivrajak</span>
          </h2>

          <div className="text-white text-base sm:text-lg md:text-xl font-medium space-y-1">
            <p>People don't take trips,</p>
            <p>Trips take people.</p>
          </div>

          <div className="flex justify-center">
            <Link
              to="#"
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition"
            >
              Explore Now <FaArrowCircleRight size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom text */}
      <div className="relative z-10 text-center p-6">
        <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
          Discover the captivating allure of India's diverse wonders — from
          majestic mountains to tranquil temples — all in one unforgettable
          journey with{" "}
          <span className="text-orange-400 font-semibold">Parivrajak</span>.
        </p>
      </div>

      {/* Cards section */}
      <div className="relative z-10 bg-white py-12 px-4">
        <div className="w-full mx-auto flex flex-col justify-start space-y-6 p-4">
          <h1 className="text-3xl md:text-4xl font-bold text-black">
            Top Deals Of the Month
          </h1>
          <div className="w-full flex gap-6 overflow-x-auto whitespace-nowrap no-scrollbar">
            <div className="min-w-[250px] inline-block">
              <HomeCard img={sundarban} title="Sundarban" />
            </div>
            <div className="min-w-[250px] inline-block">
              <HomeCard img={meghalaya} title="Meghalaya" />
            </div>
            <div className="min-w-[250px] inline-block">
              <HomeCard img={kedarnath} title="Kedarnath" />
            </div>
            <div className="min-w-[250px] inline-block">
              <HomeCard img={sundarban} title="Sundarban" />
            </div>
            <div className="min-w-[250px] inline-block">
              <HomeCard img={meghalaya} title="Meghalaya" />
            </div>
            <div className="min-w-[250px] inline-block">
              <HomeCard img={kedarnath} title="Kedarnath" />
            </div>
          </div>
        </div>
      </div>
      <div className="relative px-4 sm:px-6 py-12 flex justify-center bg-white">
        <div className="max-w-7xl w-full flex flex-col space-y-10 items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-black text-center">
            Are You An Organizer?
          </h1>

          <div className="w-full flex flex-col-reverse md:flex-row items-center justify-between gap-8">
            {/* Text Section */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-4 text-black font-bold">
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-5xl leading-snug">
                Purchase organizer deals and post your custom tour packages.
              </span>
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-blue-700">
                From Purchase to Posting — Start Your Journey as an Organizer!
              </span>
              <Link to={"/dashboard"}>
              <button className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
                Purchase Your Storage
              </button>
              </Link>
            </div>

            {/* Image Section */}
            <div
              className="w-full md:w-1/2 h-64 sm:h-72 md:h-80 bg-center bg-cover rounded-lg shadow-md"
              style={{ backgroundImage: `url(${organizer})` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
