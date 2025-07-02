import React from "react";
import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

function Footer() {
  return (
    <footer className="w-full absolute left-0 bg-gray-300 text-gray-800 py-4 mt-6 shadow-inner">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-8">
        
        {/* Left Section */}
        <div className="md:w-1/3">
          <h1 className="text-2xl font-bold text-blue-600 mb-2">Parivrajak</h1>
          <p className="text-sm leading-relaxed">
            Parivrajak is your go-to travel companion. Discover unexplored places,
            document your journeys, and revisit your memories with ease. Get multiple packages
            for the same destination, and choose the one that suits you best based on price,
            duration, and preferences.
          </p>
        </div>

        {/* Middle Section: Important Links */}
        <div className="md:w-1/3">
          <h2 className="text-xl font-semibold mb-2">Important Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/explore" className="hover:text-blue-600 transition-colors">Explore</Link>
            </li>
            <li>
              <Link to="/history" className="hover:text-blue-600 transition-colors">History</Link>
            </li>
          </ul>
        </div>

        {/* Right Section: Contact Us */}
        <div className="md:w-1/3">
          <ul className="space-y-2 text-sm mt-6">
            <li>
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-blue-600" />
                <span>+91 70444 93255</span>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-2">
                <IoMail className="text-blue-600" />
                <span>team.parivrajak1@gmail.com</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-6">
        &copy; {new Date().getFullYear()} Parivrajak. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
