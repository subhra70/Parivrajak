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
              to="/explore"
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
            Visit Places Like Below
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
      <footer className="w-full relative bg-gray-300 text-gray-800 py-4 shadow-inner">
        <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-8">
          {/* Left Section */}
          <div className="md:w-1/2">
            <h1 className="text-2xl font-bold text-blue-600 mb-2">
              Parivrajak
            </h1>
            <p className="text-sm leading-relaxed">
              Parivrajak is your go-to travel companion. Discover unexplored
              places, document your journeys, and revisit your memories with
              ease. Get more than one packages from for same destination, choose
              one which is better for you based on price, duration etc.
            </p>
          </div>

          {/* Right Section */}
          <div className="md:w-1/3">
            <h2 className="text-xl font-semibold mb-2">Important Links</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/explore"
                  className="hover:text-blue-600 transition-colors"
                >
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  to="/history"
                  className="hover:text-blue-600 transition-colors"
                >
                  History
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 mt-6">
          &copy; {new Date().getFullYear()} Parivrajak. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Home;
