import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import authService from "../../authentication/auth";

function DestForm() {
  const [product, setProduct] = useState({
    ptitle: "",
    destination: "",
    price: 0,
    discount: 0,
    minDays: 1,
    maxDays: 1,
    type: [],
  });

  const [image, setImage] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });
  const [destImg, setDestImg] = useState(null);
  const [addStatus, setAddStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        navigate("/orglogin");
      }
      try {
        const { exp } = jwtDecode(token);
        if (exp * 1000 < Date.now()) {
          await authService.logoutUser();
          navigate("/orglogin");
        }
      } catch (e) {
        console.log(e);
      }
    };
    init();
  }, [navigate]);

  const handleInputChange = (e) => {
  const { name, value } = e.target;
  const numericFields = ["price", "discount", "minDays", "maxDays"];

  setProduct({
    ...product,
    [name]: numericFields.includes(name) ? Number(value) : value,
  });
};


  const handleDestImage = (e) => {
    setDestImg(e.target.files[0]);
  };

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [field]: checked
        ? [...prev[field], value]
        : prev[field].filter((item) => item !== value),
    }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setImage({ ...image, [name]: files[0] });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!product.ptitle.trim()) newErrors.ptitle = "Post Title is required";
    if (!product.destination.trim())
      newErrors.destination = "Destination is required";
    if (!product.price) newErrors.price = "Price is required";
    if (!destImg) newErrors.destImg = "Destination Banner Image is required";
    if (!product.minDays) newErrors.minDays = "Minimum Days is required";
    if (!product.maxDays) newErrors.maxDays = "Maximum Days is required";
    if (product.type.length === 0)
      newErrors.type = "Select at least one trip type";
    if (!image.image1 || !image.image2 || !image.image3 || !image.image4) {
      newErrors.images = "All 4 hotel images are required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setAddStatus(false);
      return;
    }

    try {
      const token = localStorage.getItem("jwtToken");
      const formData = new FormData();
      formData.append("destImg", destImg);
      formData.append("imageFile1", image.image1);
      formData.append("imageFile2", image.image2);
      formData.append("imageFile3", image.image3);
      formData.append("imageFile4", image.image4);
      formData.append(
        "product",
        new Blob([JSON.stringify(product)], { type: "application/json" })
      );

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setAddStatus(true);
        setErrors({});
        navigate("/dashboard");
      } else {
        setAddStatus(false);
      }
    } catch (error) {
      console.log(error);
      setAddStatus(false);
    }
  };

  return (
    <div className="pt-16 flex items-center justify-center px-4">
      <form
        className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg space-y-6"
        onSubmit={handleSubmit}
      >
        {addStatus === true && (
          <span className="text-sm text-green-600 font-bold">
            Product Added
          </span>
        )}
        {addStatus === false && (
          <span className="text-sm text-red-600 font-bold">
            Product Addition Failed
          </span>
        )}

        <h2 className="text-2xl font-bold text-center text-orange-600">
          Create Your Post
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="ptitle" className="font-medium">
              Post Title
            </label>
            <input
              type="text"
              id="ptitle"
              name="ptitle"
              placeholder="Enter Your Post Title"
              onChange={handleInputChange}
              value={product.ptitle}
              className="w-full border rounded-md px-3 py-2"
            />
            {errors.ptitle && (
              <span className="text-red-600 text-sm">{errors.ptitle}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="destination" className="font-medium">
              Destination
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              placeholder="Enter Destination"
              onChange={handleInputChange}
              value={product.destination}
              className="w-full border rounded-md px-3 py-2"
            />
            {errors.destination && (
              <span className="text-red-600 text-sm">{errors.destination}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="price" className="font-medium">
              Package Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              min={0}
              placeholder="Enter Price"
              onChange={handleInputChange}
              className="w-full border rounded-md px-3 py-2"
            />
            {errors.price && (
              <span className="text-red-600 text-sm">{errors.price}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="discount" className="font-medium">
              Discount (%)
            </label>
            <input
              type="number"
              id="discount"
              name="discount"
              min={0}
              placeholder="Enter Discount"
              onChange={handleInputChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="minDays" className="font-medium">
              Minimum Days
            </label>
            <input
              type="number"
              id="minDays"
              name="minDays"
              placeholder="Enter Minimum Days"
              onChange={handleInputChange}
              min={1}
              className="w-full border rounded-md px-3 py-2"
            />
            {errors.minDays && (
              <span className="text-red-600 text-sm">{errors.minDays}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="maxDays" className="font-medium">
              Maximum Days
            </label>
            <input
              type="number"
              id="maxDays"
              name="maxDays"
              placeholder="Enter Maximum Days"
              onChange={handleInputChange}
              min={1}
              className="w-full border rounded-md px-3 py-2"
            />
            {errors.maxDays && (
              <span className="text-red-600 text-sm">{errors.maxDays}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="destImg" className="font-medium">
              Destination Banner Image
            </label>
            <input
              type="file"
              id="destImg"
              accept="image/*"
              onChange={handleDestImage}
              className="w-full border rounded-md px-3 py-2"
            />
            {errors.destImg && (
              <span className="text-red-600 text-sm">{errors.destImg}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-medium">Trip Type</span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { label: "Family", value: "family" },
              { label: "Friends", value: "friends" },
              { label: "Solo", value: "solo" },
              { label: "Adventure", value: "adventure" },
              { label: "Nature", value: "nature" },
            ].map(({ label, value }) => (
              <label key={value} className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  value={value}
                  checked={product.type.includes(value)}
                  onChange={(e) => handleCheckboxChange(e, "type")}
                  className="form-checkbox text-orange-600"
                />
                {label}
              </label>
            ))}
          </div>
          {errors.type && (
            <span className="text-red-600 text-sm">{errors.type}</span>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-medium">Hotel Images</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col gap-1">
                <label htmlFor={`hotelImg${i}`} className="font-medium">
                  Hotel Image {i}
                </label>
                <input
                  type="file"
                  id={`hotelImg${i}`}
                  name={`image${i}`}
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-sm file:bg-orange-500 file:text-white file:px-4 file:py-2 file:rounded-md"
                />
              </div>
            ))}
          </div>
          {errors.images && (
            <span className="text-red-600 text-sm">{errors.images}</span>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
          <button
            type="submit"
            className="bg-orange-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-orange-600"
          >
            Submit
          </button>
          <Link to="/" className="md:ml-2">
            <button
              type="button"
              className="bg-red-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-red-600"
            >
              Back
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default DestForm;
