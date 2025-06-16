import React, { useEffect, useState } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { jwtDecode } from "jwt-decode";
import authService from "../../authentication/auth";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
function PostHistoryCard({ product = {},onDelete }) {
  const navigate = useNavigate();
  const { id, title, place, price, orgid } = product;
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) return navigate("/orglogin");

        const { exp } = jwtDecode(token);
        if (exp * 1000 < Date.now()) {
          authService.logoutUser();
          return navigate("/orglogin");
        }

        const image = await axios.get(
          `${import.meta.env.VITE_API_URL}/bannerImage/${id}`,
          {
            responseType: "blob",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (image.status === 200) {
          setImageUrl(URL.createObjectURL(image.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchImage();
  },[id,navigate]);

  const deleteProduct=async()=>{
    try {
      const token = localStorage.getItem("jwtToken");
        if (!token) return navigate("/orglogin");

        const { exp } = jwtDecode(token);
        if (exp * 1000 < Date.now()) {
          authService.logoutUser();
          return navigate("/orglogin");
        }
        const response=await axios.delete(`${import.meta.env.VITE_API_URL}/product/${id}`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        if(response.status===200){
          alert("Product deleted")
          onDelete(id)
        }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full flex flex-col sm:flex-row items-center sm:items-start justify-between border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition gap-4">
      {/* Image Section */}
      <div className=" w-full md:w-1/3">
        <img
          src={imageUrl}
          alt="Post Preview"
          className="w-full h-40 sm:h-25 object-cover rounded-md"
        />
      </div>

      {/* Text Info */}
      <div className="md:w-1/3 flex-1 flex flex-col gap-3 px-0 sm:px-6">
        <h2 className="text-xl sm:text-2xl md:text-left font-semibold text-black">
          {title}
        </h2>
        <div className="flex flex-wrap gap-2 text-gray-700">
          <span className="font-medium">Place:</span>
          <span>{place}</span>
        </div>
        <div className="inline-block w-full md:w-1/3 px-4 py-1 rounded-full bg-orange-500 text-white font-semibold text-sm">
          ₹{price}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-row sm:flex-col gap-4 items-center text-xl text-gray-600">
        <button className="hover:text-red-600 transition" onClick={deleteProduct}>
          <MdDelete/>
        </button>
        <Link to={`/editPost/${id}`}>
          <button className="hover:text-blue-600 transition">
            <MdModeEdit/>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PostHistoryCard;
