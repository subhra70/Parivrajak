import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import authService from "../../authentication/auth";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [organization, setOrganization] = useState(null);
  const [hotelImages, setHotelImages] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState(0);
  const [person, setPerson] = useState(1);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) return navigate("/login");

        const { exp } = jwtDecode(token);
        if (exp * 1000 < Date.now()) {
          await authService.logoutUser();
          return navigate("/login");
        }

        const res = await axios.get(`http://localhost:8080/product/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status !== 200) throw new Error("Fetch failed");

        const p = res.data;
        setProduct(p);
        setDiscount(res.data.discount);
        fetchImages();
        fetchOrganization();
        setSelectedDuration(p.minDays);
      } catch (err) {
        console.error(err);
        alert("Error fetching product");
      }
    })();
  }, [discount, id, navigate]);

  const fetchOrganization = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) return navigate("/login");

      const { exp } = jwtDecode(token);
      if (exp * 1000 < Date.now()) {
        await authService.logoutUser();
        return navigate("/login");
      }
      if (product.orgId !== undefined && product.orgId !== null) {
        const org = await axios.get(
          `http://localhost:8080/organizer/${product.orgId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (org.status === 200) setOrganization(org.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchImages = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) return navigate("/login");

      const { exp } = jwtDecode(token);
      if (exp * 1000 < Date.now()) {
        await authService.logoutUser();
        return navigate("/login");
      }

      const imgRes = await axios.get(
        `http://localhost:8080/bannerImage/${id}`,
        {
          responseType: "blob",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (imgRes.status === 200 && imgRes.data) {
        setImageUrl(URL.createObjectURL(imgRes.data));
      }

      const hotelRes = await axios.get(
        `http://localhost:8080/hotelImages/${product.hotelId}`,
        { responseType: "json", headers: { Authorization: `Bearer ${token}` } }
      );
      const images = hotelRes.data.map(
        (img) => `data:${img.type};base64,${img.data}`
      );
      setHotelImages(images);
    } catch (err) {
      console.error(err);
    }
  };
  const savePackage = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        navigate("/login");
        return;
      }
      const { exp } = jwtDecode(token);
      if (exp * 1000 < Date.now()) {
        authService.logoutUser();
        return navigate("/login");
      }

      const response = await axios.post(
        "http://localhost:8080/saveProduct",
        {
          userId: -1,
          destId: id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        alert("Package Saved");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const purchase = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        navigate("/login");
        return;
      }
      const { exp } = jwtDecode(token);
      if (exp * 1000 < Date.now()) {
        authService.logoutUser();
        return navigate("/login");
      }

      const response = await axios.post(
        "http://localhost:8080/purchase",
        {
          userId: -1,
          destId: id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        alert("Package Saved");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const basePrice = product?.price ?? 0;
  const dayDiff = selectedDuration - (product?.minDays ?? 0);
  const perDayPrice = (product?.price ?? 0) / (product?.minDays ?? 1);

  const pricePerPerson =
    ((basePrice + (perDayPrice - 100) * dayDiff) * (100 - discount)) / 100;
  const totalPrice = pricePerPerson * person;
  if (!product) return <p className="p-4 text-center">Loading…</p>;

  return (
    <form className="w-full max-w-5xl mx-auto bg-white rounded-3xl shadow-xl px-6 py-10 mt-12 space-y-10">
      {/* Cover image */}
      <div className="flex justify-center">
        <img
          src={imageUrl}
          alt={product.title}
          className="w-full md:w-4/5 h-64 object-cover rounded-2xl shadow-lg"
        />
      </div>

      {/* Title */}
      <h2 className="text-center text-4xl font-extrabold text-blue-900 tracking-tight">
        {product.title}
      </h2>

      {/* Info Row */}
      <div className="flex flex-wrap justify-evenly gap-4 text-sm px-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-700">Ratings:</span>
          <Star size={16} className="fill-current text-yellow-500" />
          <span>{product.ratings}/5</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-700">Destination:</span>
          <span className="text-gray-800">{product.place}</span>
        </div>

        {organization && (
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-700">Organizer:</span>
            <span className="text-indigo-600 font-bold text-base">
              {organization.organization}
            </span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-700">Price:</span>
          <span className="px-3 py-1 rounded-full bg-orange-500 text-white font-semibold">
            ₹{totalPrice}
          </span>
        </div>

        <label className="flex items-center gap-2">
          <span className="font-semibold text-gray-700">Trip Type:</span>
          <div className="flex gap-1 flex-wrap">
            {product.destType.map((item, index) => (
              <span
                key={index}
                className="bg-gray-100 px-2 py-0.5 rounded-full text-gray-800 text-xs font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </label>
      </div>

      {/* Selectors */}
      <div className="flex flex-wrap justify-center gap-10">
        <label className="flex flex-col text-sm w-40">
          <span className="font-semibold mb-2 text-gray-700">
            Select Duration
          </span>
          <select
            id="duration"
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(Number(e.target.value))}
            className="rounded border px-3 py-2 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          >
            {Array.from(
              { length: product.maxDays - product.minDays + 1 },
              (_, i) => product.minDays + i
            ).map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col text-sm w-40">
          <span className="font-semibold mb-2 text-gray-700">
            No. of Person(s)
          </span>
          <input
            type="number"
            min={1}
            value={person}
            onChange={(e) => setPerson(Number(e.target.value))}
            className="rounded border px-3 py-2 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </label>
      </div>

      {/* Hotel gallery */}
      {hotelImages.length > 0 && (
        <div className="space-y-3 px-4">
          <h3 className="text-2xl font-bold text-blue-700">Hotel Gallery</h3>
          <div className="flex gap-4 overflow-x-auto snap-x pb-2">
            {hotelImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Hotel ${idx + 1}`}
                className="h-36 w-56 flex-shrink-0 rounded-lg object-cover snap-start shadow-md"
              />
            ))}
          </div>
        </div>
      )}

      {/* Hotel Info Card */}
      {product.hotelName && (
        <div className="rounded-2xl shadow-md border p-6 bg-gray-50 space-y-4">
          <h3 className="text-xl font-bold text-blue-700 border-b pb-2">
            Hotel Information
          </h3>

          <div className="flex flex-col md:flex-row gap-4">
            {hotelImages.length > 0 && (
              <img
                src={hotelImages[0]}
                alt="Hotel"
                className="w-full md:w-64 h-44 object-cover rounded-lg shadow-md"
              />
            )}
            {/* You can add more hotel info here if needed */}
          </div>
        </div>
      )}

      {/* CTA Button */}
      <div className="flex flex-col md:flex-row md:gap-2 justify-center">
        <button
          onClick={savePackage}
          className="rounded-xl px-4 bg-green-600 py-3 font-semibold text-white hiver:bg-green-700 transition-shadow shadow-md hover:shadow-lg"
        >
          Save
        </button>
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="rounded-xl px-4 bg-orange-600 py-3 font-semibold text-white hiver:bg-orange-700 transition-shadow shadow-md hover:shadow-lg"
        >
          Back
        </button>
        <button
          type="submit"
          onClick={purchase}
          className="rounded-xl px-4 bg-blue-600 py-3 font-semibold text-white text-lg hover:bg-blue-700 transition-shadow shadow-md hover:shadow-lg"
        >
          Purchase
        </button>
      </div>
    </form>
  );
}

export default Details;
