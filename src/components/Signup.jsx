import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  let isNameErr = true;
  let isEmailErr = true;
  let isPassErr = true;
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [disableSubmit,setDisableSubmit]=useState(false)

  const signup = async (data) => {
    setErrorMessage("");
    if (data.name === "") {
      setNameError("Empty or Invalid Name");
    } else {
      isNameErr = false;
      setNameError("");
    }
    if (data.email === "") {
      setEmailError("Empty email");
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
      setEmailError("Invalid Email Format");
    } else {
      isEmailErr = false;
      setEmailError("");
    }
    if (data.password === "") {
      setPassError("Empty Password");
    } else if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/.test(data.password)
    ) {
      setPassError(
        "Password must have atleast one capital letter,one special character,one digit and atleast of length 6"
      );
    } else {
      isPassErr = false;
      setPassError("");
    }
    if (!isNameErr && !isEmailErr && !isPassErr) {
      setDisableSubmit(true)
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/sendOtp`,
          {},
          {
            params: {
              email: data.email,
            },
          }
        );
        if (response.status === 200) {
          setError(false);
          setDisableSubmit(false)
          setErrorMessage("OTP Sent Successfully");
          localStorage.setItem("email", data.email);
          localStorage.setItem("type", "User");
          navigate("/otp", { state: { userData: data } });
        } else {
          setError(true);
          setDisableSubmit(false)
          setErrorMessage("Invalid Email Id");
        }
      } catch (error) {
        if (error.response) {
          setError(true);
          if (error.response.status === 409) {
            setErrorMessage("Email Already Exists");
          } else {
            setErrorMessage(
              "Something went wrong. Status: " + error.response.status
            );
          }
          setDisableSubmit(false)
        } else {
          setDisableSubmit(false)
          setErrorMessage("Network or Server Error");
        }
      }
    }
  };

  return (
    <div className="flex items-center justify-center pt-12 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6">
        {!error && (
          <div className="text-center text-green-600 font-medium">
            {errorMessage}
          </div>
        )}
        {error && (
          <div className="text-center text-red-600 font-medium">
            {errorMessage}
          </div>
        )}
        <h2 className="text-3xl font-bold text-center text-orange-600">
          Welcome to Parivrajak
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(signup)}>
          {/* First Name */}
          <div>
            <label
              htmlFor="name"
              className="float-left block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
              {...register("name")}
            />
            {isNameErr && (
              <div className="text-sm text-red-600 text-left">{nameError}</div>
            )}
          </div>

          {/* Organization */}
          {/* <div>
            <label
              htmlFor="orgname"
              className="float-left block text-sm font-medium text-gray-700 mb-1"
            >
              Organization
            </label>
            <input
              type="text"
              id="orgname"
              placeholder="Enter your organization name"
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
              {...register("orgname", { required: true })}
            />
          </div> */}

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="float-left block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
              {...register("email")}
            />
            {isEmailErr && (
              <div className="text-sm text-red-600 text-left">{emailError}</div>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="float-left block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
              {...register("password")}
            />
            {isPassErr && (
              <div className="text-sm text-red-600 text-left">{passError}</div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-semibold py-2 rounded-full hover:bg-orange-600 transition"
            disabled={disableSubmit}
          >
            {disableSubmit?"Signing Up":"Sign Up"}
          </button>
        </form>

        {/* Google Sign In */}
        <button className="flex w-full items-center justify-center gap-3 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition border border-gray-300">
          <FcGoogle size={24} />
          <span className="font-medium text-gray-700">
            Continue with Google
          </span>
        </button>

        {/* Redirect to Login */}
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-600 font-semibold hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
