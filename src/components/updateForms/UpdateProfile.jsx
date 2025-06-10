import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import authService from "../../authentication/auth";

function UpdateProfile() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // States for controlled inputs
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loc, setLoc] = useState("");

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        navigate("/orglogin");
        return;
      }

      try {
        const { exp } = jwtDecode(token);
        if (exp * 1000 < Date.now()) {
          await authService.logoutUser();
          navigate("/orglogin");
          return;
        }

        const { data, status } = await axios.get("http://localhost:8080/organizer", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (status === 200 && data) {
          setName(data.username);
          setOrganization(data.organization);
          setPhone(data.phone);
          setEmail(data.email);
          setLoc(data.location);

          // Initialize react-hook-form values
          setValue("name", data.username);
          setValue("orgname", data.organization);
          setValue("phone", data.phone);
          setValue("email", data.email);
          setValue("loc", data.location);
        }
      } catch (err) {
        console.log(err);
        await authService.logoutUser();
        navigate("/orglogin");
      }
    };

    init();
  }, [navigate, setValue]);

  const update = async ({ name, orgname, phone, email, loc }) => {
    setErrorMessage("");
    try {
      const updatedAccount = await axios.put(
        `http://localhost:8080/organizer`,
        {
          username: name,
          organization: orgname,
          phone: phone,
          email: email,
          location: loc,
        },
        {
          withCredentials: true,
        }
      );
      if (updatedAccount.status === 200) {
        setError(false);
        setErrorMessage("Updation Successful");
      } else {
        setError(true);
        setErrorMessage("Updation Unsuccessful");
      }
    } catch (error) {
      console.log(error);
      setError(true);
      setErrorMessage("Update unsuccessful");
    }
  };
  return (
    <div className="pt-16 flex items-center justify-center p-4">
      <form
        className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg space-y-6"
        onSubmit={handleSubmit(update)}
      >
        {errorMessage && (
          <div className={`text-center font-medium ${error ? "text-red-600" : "text-green-600"}`}>
            {errorMessage}
          </div>
        )}

        <h2 className="text-2xl font-bold text-center text-orange-600">Update Profile</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-medium">Name</label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              value={name}
              placeholder="Enter Full Name"
              className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <span className="text-sm text-red-500">{errors.name.message}</span>}
          </div>

          {/* Organization */}
          <div className="flex flex-col gap-1">
            <label htmlFor="orgname" className="font-medium">Organization</label>
            <input
              type="text"
              id="orgname"
              {...register("orgname", { required: "Organization is required" })}
              value={organization}
              placeholder="Enter Your Organization Name"
              className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.orgname ? "border-red-500" : "border-gray-300"
              }`}
              onChange={(e) => setOrganization(e.target.value)}
            />
            {errors.orgname && <span className="text-sm text-red-500">{errors.orgname.message}</span>}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="font-medium">Mobile Number</label>
            <input
              type="text"
              id="phone"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^(?:\+91[-\s]?|0)?[6-9]\d{9}$/,
                  message: "Invalid mobile number",
                },
              })}
              value={phone}
              placeholder="Enter Your Mobile Number"
              className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <span className="text-sm text-red-500">{errors.phone.message}</span>}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-medium">Email Id</label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Invalid email address",
                },
              })}
              value={email}
              placeholder="Enter Your Email Id"
              className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-medium">Password</label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
                  message:
                    "Password must contain at least 1 digit, 1 special character, 1 uppercase letter, and be at least 6 characters long",
                },
              })}
              placeholder="Enter Password"
              className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
          </div>

          {/* Location */}
          <div className="flex flex-col gap-1">
            <label htmlFor="loc" className="font-medium">Location</label>
            <input
              type="text"
              id="loc"
              {...register("loc", { required: "Location is required" })}
              value={loc}
              placeholder="Enter Your Location"
              className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.loc ? "border-red-500" : "border-gray-300"
              }`}
              onChange={(e) => setLoc(e.target.value)}
            />
            {errors.loc && <span className="text-sm text-red-500">{errors.loc.message}</span>}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 w-full justify-center">
          <button
            type="submit"
            className="bg-orange-500 text-white font-semibold px-3 py-3 rounded-md hover:bg-orange-600 transition"
          >
            Save Changes
          </button>
          <Link to={"/dashboard"}>
            <button
              type="button"
              className="bg-red-500 text-white font-semibold px-3 py-3 rounded-md hover:bg-red-600 transition"
            >
              Back
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default UpdateProfile;
