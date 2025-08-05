import React, { useEffect, useState } from "react";
import { LogOut, Star } from "lucide-react"; // optional: star icon
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import authService from "../../authentication/auth";

function ExploreCard({ destination }) {
  const [banner, setBanner] = useState("");
  const { id, title, ratings, price, discount, destType, orgId, place } =
    destination;
  const navigate = useNavigate();
  const discountedPrice =
    discount > 0 ? price - Math.round((price * discount) / 100) : price;

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/bannerImage/${id}`,
          {
            responseType: "blob",
          }
        );
        if (response.status === 200 && response.data) {
          setBanner(URL.createObjectURL(response.data));
        }
      } catch (error) {
        console.error("Error fetching banner image:", error);
      }
    };

    fetchBanner();
  }, [id, navigate]);

  const savePackage = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        navigate("/login");
        return;
      }
      const { exp } = jwtDecode(token);
      if (exp * 1000 < Date.now()) {
        authService.logoutUser();
        navigate("/login");
        return
      }
      console.log(token);
      console.log("Save called:",id);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/saveProduct`,
        {
          userId: -1,
          destId: id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        console.log("Save successfull");
        alert("Package Saved");
      }
      console.log(response.status);
    } catch (error) {
      console.log("Save failed");
      console.log(error);
    }
  };
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is 0-based
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const purchase = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        navigate("/login");
        return;
      }
      const { exp } = jwtDecode(token);
      if (exp * 1000 < Date.now()) {
        authService.logoutUser();
        navigate("/login");
        return;
      }
      const date = getCurrentDate();

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/purchase`,
        {
          orgId: orgId.id,
          place: place,
          amount: discountedPrice,
          date: date,
          destId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("Package Purchased");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col bg-white rounded-lg shadow hover:shadow-lg transition duration-300 w-full">
      {/* ─── image ─── */}
      <img
        src={banner}
        alt={title || "Destination Banner"}
        className="h-48 w-full object-cover rounded-t-lg"
        loading="lazy"
      />

      {/* ─── content ─── */}
      <div className="p-4 flex flex-col flex-1">
        {/* title */}
        <h3 className="text-2xl font-bold mb-2 truncate">{title}</h3>

        {/* ratings + price row */}
        <div className="flex justify-between items-center mb-4">
          {/* ratings */}
          <div>
            <span className="font-bold text-sm md:text-base">Ratings:</span>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Star size={16} className="fill-current text-yellow-500" />
              <span className="font-medium text-sm md:text-base">
                {ratings}
              </span>
            </div>
          </div>

          {/* Type */}
          <div>
            <span className="font-bold text-sm md:text-base">Tour Type</span>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              {destType.map((item, index) => (
                <span key={index} className="font-medium text-sm md:text-base">
                  {item}{" "}
                </span>
              ))}
            </div>
          </div>

          {/* price */}
          <div className="text-right">
            {discount > 0 ? (
              <>
                <span className="block line-through text-xs text-gray-500">
                  ₹{price}
                </span>
                <span className="block text-md md:text-lg font-bold text-green-600">
                  ₹{discountedPrice}
                </span>
              </>
            ) : (
              <span className="block text-lg font-bold text-green-600">
                ₹{price}
              </span>
            )}
            <span className="text-xs text-green-600">Per Person</span>
          </div>
        </div>

        {/* buttons */}
        <div className="mt-auto flex flex-row justify-center md:justify-between gap-1 md:gap-2">
          <button
            type="button"
            onClick={purchase}
            className="bg-blue-500 hover:bg-blue-600 text-white px-2 md:px-3 py-2 rounded-md text-sm md:text-base"
          >
            Purchase
          </button>
          <button
            type="button"
            onClick={savePackage}
            className="rounded-md bg-green-500 px-2 md:px-3 text-white hiver:bg-green-700 transition-shadow shadow-md hover:bg-green-600"
          >
            Save
          </button>

          <Link to={`/details/${id}`}>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-2 md:px-3 py-2 rounded-md text-sm md:text-base">
              Customize
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ExploreCard;
