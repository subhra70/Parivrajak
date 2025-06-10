import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import authService from "../authentication/auth";
import axios from "axios";

function OrgSignUp() {
  const { register, handleSubmit} = useForm();
  const [error, setError] = useState(false);
  const [errMob, setErrMob] = useState(false);
  const [errEmail, setErrEmail] = useState(false);
  const [errPass, setErrPass] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();
  const login = async (data) => {
    setErrorMessage("");
    try {
      const result = authService.createOrgAccount(data);
      if (result === 201) {
        // const response = await axios.post(`http://localhost:8080/sendOtp`,null, {
        //   params: {
        //     email: data.email,
        //   },
        // });
        setError(false);
        setErrorMessage("Signup Successfull")
        navigate("/orglogin")
        // if (response.status === 200) {
        //   localStorage.setItem("email",data.email)
        //   localStorage.setItem("type","Organizer")
        //   navigate("/otp");
        // }
        // else{
        //   setErrorMessage("Invalid Email Id")
        //   const msg=await axios.delete(`http://localhost:8080/organizer`,
        //     {
        //       email:data.email
        //     }
        //   )
        //   if(msg.status===200)
        //   {
        //     console.log("Account deleted");
            
        //   }
        // }
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
      } else {
        setErrorMessage("Network or Server Error");
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
              {...register("name", {
                required: true,
              })}
            />
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
              {...register("orgname", {
                required: true,
              })}
            />
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
              {...register("phone", {
                required: true,
                matchPattern: (value) => {
                  if (/^(?:\+91[-\s]?|0)?[6-9]\d{9}$/.test(value)) {
                    setErrMob(false);
                  } else {
                    setErrMob(true);
                  }
                },
              })}
            />
            {errMob && (
              <span className="text-sm text-red-500">
                Invalid Mobile Number
              </span>
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
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) => {
                    if (
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
                    ) {
                      setErrEmail(false);
                    } else {
                      setErrEmail(true);
                    }
                  },
                },
              })}
            />
            {errEmail && (
              <span className="text-sm text-red-500">Invalid Email Id</span>
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
              {...register("password", {
                required: true,
                validate: {
                  matchPattern: (value) => {
                    if (
                      /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/.test(value)
                    ) {
                      setErrPass(false);
                    } else {
                      setErrPass(true);
                    }
                  },
                },
              })}
            />
            {errPass && (
              <span className="text-sm text-red-500">
                Password must contain at least 1 digit, 1 special character, 1
                uppercase letter, and be at least 6 characters long
              </span>
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
              {...register("loc", {
                required: true,
              })}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white font-semibold py-3 rounded-md hover:bg-orange-600 transition"
        >
          Sign Up
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
