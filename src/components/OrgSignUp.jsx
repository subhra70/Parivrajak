import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

function OrgSignUp() {
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [errNameMsg, setErrNameMsg] = useState("");
  const [errOrgMsg, setErrOrgMsg] = useState("");
  const [errMobMsg, setErrMobMsg] = useState("");
  const [errEmailMsg, setErrEmailMsg] = useState("");
  const [errPassMsg, setErrPassMsg] = useState("");
  const [errLocMsg, setErrLocMsg] = useState("");
  const [disableSubmit,setDisableSubmit]=useState(false)
  const navigate = useNavigate();
  let errName = true;
  let errOrg = true;
  let errMob = true;
  let errEmail = true;
  let errPass = true;
  let errLoc = true;
  const login = async (data) => {
    setErrorMessage("");
    if (data.name === "") {
      setErrNameMsg("Empty name field");
    } else {
      errName = false;
      setErrNameMsg("");
    }
    if (data.orgname === "") {
      setErrOrgMsg("Empty Organization Name");
    } else {
      errOrg = false;
      setErrOrgMsg("");
    }
    if (!/^(?:\+91[-\s]?|0)?[6-9]\d{9}$/.test(data.phone)) {
      setErrMobMsg("Invalid Mobile Number");
    } else {
      errMob = false;
      setErrMobMsg("");
    }
    if (data.email === "") {
      setErrEmailMsg("Email Id Required");
    } else if (
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(data.email)
    ) {
      setErrEmailMsg("Invalid Email Format");
    } else {
      errEmail = false;
      setErrEmailMsg("");
    }
    if (data.password === "") {
      setErrPassMsg("Empty Password Field");
    } else if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/.test(data.password)
    ) {
      setErrPassMsg(
        "Password must have atleast one capital letter,one special character,one digit and atleast of length 6"
      );
    } else {
      errPass = false;
      setErrPassMsg("");
    }
    if (data.loc === "") {
      setErrLocMsg("Location is required");
    } else {
      errLoc = false;
      setErrLocMsg("");
    }
    if (!errName && !errOrg && !errMob && !errEmail && !errPass && !errLoc) {
      setDisableSubmit(true)
      reset()
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/sendOtp`,
          null,
          {
            params: {
              email: data.email,
            },
          }
        );
        if (response.status === 200) {
          setDisableSubmit(false)
          setError(false);
          reset();
          setErrorMessage("OTP Sent Successfully");
          localStorage.setItem("email", data.email);
          localStorage.setItem("type", "Organizer");
          navigate("/otp", { state: { userData: data } });
        } else {
          setDisableSubmit(false)
          setError(true);
          setErrorMessage("Invalid Email Id");
        }
      } catch (error) {
        if (error.response) {
          setDisableSubmit(false)
          setError(true);
          if (error.response.status === 409) {
            setErrorMessage("Email Already Exists");
          } else {
            setErrorMessage(
              "Something went wrong. Status: " + error.response.status
            );
          }
        } else {
          setDisableSubmit(false)
          setErrorMessage("Network or Server Error");
        }
      }
    }
  };
  return (
    <div className="pt-16 flex items-center justify-center p-4">
      <form
        className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg space-y-6"
        onSubmit={handleSubmit(login)}
      >
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
        <h2 className="text-2xl font-bold text-center text-orange-600">
          Welcome to Parivrajak
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Full Name"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("name")}
            />
            {errName && (
              <div className="text-sm text-red-600 text-left">{errNameMsg}</div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="orgname" className="font-medium">
              Organization
            </label>
            <input
              type="text"
              id="orgname"
              name="orgname"
              placeholder="Enter Your Organization Name"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("orgname")}
            />
            {errOrg && (
              <div className="text-sm text-red-600 text-left">{errOrgMsg}</div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="font-medium">
              Mobile Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Enter Your Mobile Number"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("phone")}
            />
            {errMob && (
              <span className="text-sm text-red-600 text-left">{errMobMsg}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-medium">
              Email Id
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email Id"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("email")}
            />
            {errEmail && (
              <span className="text-sm text-red-600 text-left">{errEmailMsg}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("password")}
            />
            {errPass && (
              <span className="text-sm text-red-600 text-left">{errPassMsg}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="loc" className="font-medium">
              Location
            </label>
            <input
              type="text"
              id="loc"
              name="loc"
              placeholder="Enter Your Location"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("loc")}
            />
            {errLoc && (
              <div className="text-sm text-red-600 text-left">
                {errLocMsg}
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white font-semibold py-3 rounded-md hover:bg-orange-600 transition"
          disabled={disableSubmit}
        >
          {disableSubmit?"Signing Up":"Sign Up"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/orglogin" className="text-orange-600 hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}

export default OrgSignUp;
