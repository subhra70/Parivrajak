import React, { useEffect, useState } from "react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import authService from "../../authentication/auth";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function Card({ type, product = {}, onDelete }) {
  const { id, title, organizer, price, destination } = product;
  const navigate = useNavigate();
  const [banner, setBanner] = useState("");
  useEffect(() => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) return navigate("/login");

      const { exp } = jwtDecode(token);
      if (exp * 1000 < Date.now()) {
        authService.logoutUser();
        return navigate("/login");
      }
      fetchBanner(token);
    } catch (error) {
      console.log(error);
    }
  }, [id]);
  const fetchBanner = async (token) => {
    try {
      const image = await axios.get(
        `${import.meta.env.VITE_API_URL}/bannerImage/${id}`,
        {
          responseType: "blob",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (image.status === 200) {
        setBanner(URL.createObjectURL(image.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteProduct = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) navigate("/login");

      const { exp } = jwtDecode(token);
      if (exp * 1000 < Date.now()) {
        authService.logoutUser();
        navigate("/login");
      }

      if (type === "Saved") {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/deleteSavedProduct/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 200) {
          alert("Product Deleted");
          console.log("Saved Product Deleted");
          onDelete && onDelete(id,type);
        }
      }
      else{
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/deletePurchasedProduct/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 200) {
          alert("Product Deleted");
          console.log("Purchased Product Deleted");
          onDelete && onDelete(id,type);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col gap-5">
      {/* <h1 className="text-3xl font-bold text-left">{type} History</h1> */}
      <div className="flex flex-col w-full md:w-1/3 gap-4 mt-4 bg-white shadow-md rounded-xl p-4">
        <img
          src={banner}
          alt={`Image ${banner}`}
          className="w-full sm:w-64 h-40 object-cover rounded-md mx-auto"
        />
        <div className="flex flex-col justify-between gap-3 w-full">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg md:text-2xl font-semibold text-left">
              {title}
            </h2>
            <div className="flex flex-wrap gap-2">
              <div className="flex gap-1">
                <span className="font-bold">Organizer:</span>
                <span>{organizer}</span>
              </div>
              <div className="flex gap-1">
                <span className="font-bold">Destination:</span>
                <span>{destination}</span>
              </div>
              <div className="flex gap-1">
                <span className="font-bold">Price:</span>
                <span className="bg-gray-200 rounded-full px-1">
                  ₹{price}/person
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-700 w-full sm:w-auto"
              onClick={deleteProduct}
            >
              Delete
            </button>
            {type !== "Purchased" && (
              <button className="py-2 px-4 bg-orange-600 text-white hover:bg-orange-700 rounded-md w-full sm:w-auto">
                Purchase
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
