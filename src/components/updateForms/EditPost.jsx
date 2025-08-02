import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import authService from "../../authentication/auth";
import { useDispatch } from "react-redux";
import { updateDetails } from "../../Store/destSlice";

function EditPost() {
  const { id } = useParams();
  const dispatch=useDispatch()
  const [product, setProduct] = useState({
    ptitle: "",
    price: 0,
    destination: "",
    discount: 0,
    minDays: 1,
    maxDays: 1,
    type: [],
  });
  const [hotel, setHotel] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [hotelImages, setHotelImages] = useState([]);
  const [disableSubmit,setDisableSubmit]=useState(false)
  const [image, setImage] = useState({
    destImage: null,
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const [errors, setErrors] = useState({});
  const [addStatus, setAddStatus] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("jwtToken");
      if (!token) return navigate("/orglogin");

      const { exp } = jwtDecode(token);
      if (exp * 1000 < Date.now()) {
        await authService.logoutUser();
        return navigate("/orglogin");
      }

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/product/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.status === 200) {
          const data = res.data;
          setProduct({
            ptitle: data.title || "",
            destination: data.place || "",
            price: data.price || 0,
            discount: data.discount || 0,
            minDays: data.minDays || 1,
            maxDays: data.maxDays || 1,
            type: data.destType || [],
          });

          setHotel(data.hotelId);
          fetchImages(data.hotelId);
        }
      } catch (err) {
        console.error(err);
      }
    };
    init();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const fetchImages = async (data) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const { exp } = jwtDecode(token);
      if (exp * 1000 < Date.now()) {
        await authService.logoutOrganizer();
        return navigate("/orglogin");
      }

      const imgRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/bannerImage/${id}`,
        {
          responseType: "blob",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (imgRes.status === 200 && imgRes.data) {
        setImageUrl(URL.createObjectURL(imgRes.data));
      }

      const hotelRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/hotelImages/${data.hotelId}`,
        {
          responseType: "json",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const images = hotelRes.data.map(
        (img) => `data:${img.type};base64,${img.data}`
      );
      setHotelImages(images);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDestImage = (e) => {
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    const { name, files } = e.target;
    setImage({ ...image, [name]: files[0] });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setImage({ ...image, [name]: files[0] });
  };

  const handleCheckboxChange = (e, field) => {
    const value = e.target.value;
    if (field === "type") {
      setProduct((prev) => ({
        ...prev,
        type: e.target.checked
          ? [...prev.type, value]
          : prev.type.filter((t) => t !== value),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisableSubmit(true)
    setErrors({});

    const imageData = new FormData();
    imageData.append("destImage", image.destImage);
    imageData.append("image1", image.image1);
    imageData.append("image2", image.image2);
    imageData.append("image3", image.image3);
    imageData.append("image4", image.image4);

    try {
      const token = localStorage.getItem("jwtToken");
      const { exp } = jwtDecode(token);
      if (exp * 1000 < Date.now()) {
        await authService.logoutOrganizer();
        return navigate("/orglogin");
      }
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/product/${id}`,
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const imageResponse = await axios.put(
        `${import.meta.env.VITE_API_URL}/productImages/${hotel.hotelId}/${id}`,
        imageData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const success=response.status === 200 && imageResponse.status === 200
      if(imageResponse.status!==0)
      {
        console.log("Not called");
      }
      setAddStatus(success);
      if(success)
      {
        dispatch(updateDetails(response.data))
        console.log("Updated");
        
        setDisableSubmit(false)
      }
    } catch (err) {
      console.error(err);
      setAddStatus(false);
      setErrors((prev) => ({
        ...prev,
        general: "Failed to update post. Please try again.",
      }));
      setDisableSubmit(false)
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
            Product Updated
          </span>
        )}
        {addStatus === false && (
          <span className="text-sm text-red-600 font-bold">
            Product Updation Failed
          </span>
        )}

        <h2 className="text-2xl font-bold text-center text-orange-600">
          Edit Your Post
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
              value={product.ptitle}
              onChange={handleInputChange}
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
              value={product.destination}
              onChange={handleInputChange}
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
              value={product.price}
              min={0}
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
              value={product.discount}
              min={0}
              onChange={handleInputChange}
              className="w-full border rounded-md px-3 py-2"
            />
            {errors.discount && (
              <span className="text-red-600 text-sm">{errors.discount}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="minDays" className="font-medium">
              Minimum Days
            </label>
            <input
              type="number"
              id="minDays"
              name="minDays"
              value={product.minDays}
              min={0}
              onChange={handleInputChange}
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
              value={product.maxDays}
              min={0}
              onChange={handleInputChange}
              className="w-full border rounded-md px-3 py-2"
            />
            {errors.maxDays && (
              <span className="text-red-600 text-sm">{errors.maxDays}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="destImage" className="font-medium">
              Destination Banner Image
            </label>
            <input
              type="file"
              id="destImage"
              name="destImage"
              accept="image/*"
              onChange={handleDestImage}
              className="w-full border rounded-md px-3 py-2"
            />
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Destination Banner"
                className="w-full h-32 object-cover rounded-md mt-2"
              />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-medium">Trip Type</span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {["Family", "Friends", "Solo", "Adventure", "Nature"].map(
              (label) => {
                const value = label.toLowerCase();
                return (
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
                );
              }
            )}
          </div>
          {errors.type && (
            <span className="text-red-600 text-sm">{errors.type}</span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              {hotelImages[i - 1] && (
                <img
                  src={hotelImages[i - 1]}
                  alt={`Hotel ${i}`}
                  className="w-full h-32 object-cover rounded-md mt-2"
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
          <button
            type="submit"
            className="bg-orange-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-orange-600"
            disabled={disableSubmit}
          >
            {disableSubmit?"Submit in Process":"Submit"}
          </button>
          <Link to="/dashboard" className="md:ml-2">
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

export default EditPost;