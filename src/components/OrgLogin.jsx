import React, { useState } from "react";

import { FcGoogle } from "react-icons/fc";
import AuthService from "../authentication/auth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../Store/authSlice";

function OrgLogin() {
  const [message, setMessage] = useState("");
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disableSubmit, setDisableSubmit] = useState(false);

  const login = async (data) => {
    setError(false);
    setDisableSubmit(true);

    try {
      const response = await AuthService.orgLogin(data);
      console.log("Login response:", response);

      if (response === 200) {
        setMessage("Login Successful");
        setDisableSubmit(false);
        const userData = localStorage.getItem("username");

        if (userData !== "") {
          dispatch(authLogin(userData));
          navigate("/dashboard");
        }
      } else {
        setError(true);
        setDisableSubmit(false);
        setMessage("Invalid Request");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(true);
      setMessage("Invalid Request");
      setDisableSubmit(false);
    }
  };

  return (
    <div className="flex items-center justify-center pt-20 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6">
        {error && (
          <div className="text-center text-red-600 font-medium">{message}</div>
        )}
        <h2 className="text-3xl font-bold text-center text-orange-600">
          Organization Login
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit(login)}>
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
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Invalid email format",
                },
              })}
            />
          </div>

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
              {...register("password", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/.test(
                      value
                    ) ||
                    "Must include 1 uppercase, 1 digit, 1 special character & 6+ chars",
                },
              })}
            />
            {error && (
              <span className="text-sm text-red-600 mt-1 block">{error}</span>
            )}
          </div>

          <button
            type="button"
            className="bg-none float-end underline"
            onClick={() =>
              navigate("/emailInp", { state: { from: "orgLogin" } })
            }
          >
            Forgot Password?
          </button>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-semibold py-2 rounded-full hover:bg-orange-600 transition"
            disabled={disableSubmit}
          >
            {disableSubmit ? "Signing In" : "Sign In"}
          </button>
        </form>

        {/* <button
          className="flex w-full items-center justify-center gap-3 p-2 rounded-full bg-gray-100 text-gray-700 border hover:bg-gray-200 transition"
          type="button"
        >
          <FcGoogle size={24} />
          <span>Continue with Google</span>
        </button> */}

        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/orgSignup"
            className="text-orange-600 hover:underline font-medium"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default OrgLogin;
