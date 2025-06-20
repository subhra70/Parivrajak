import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function EmailInput() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const location = useLocation();
  const from=location?.state?.from;
  
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/sendOtp`,
        null,
        {
          params: {
            email: email,
          },
        }
      );
      if (response.status === 200) {
        setError(false);
        setErrorMessage("OTP Sent Successfully");
        localStorage.setItem("email", email);
        if (from === "userLogin") {
          localStorage.setItem("type", "Forgot UserDetails");
        } else {
          localStorage.setItem("type", "Forgot OrgDetails");
        }
        navigate("/otp", { state: { userData: email } });
      } else {
        setError(true);
        setErrorMessage("Invalid Email Id");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center gap-2">
      {error ? (
        <span className="text-sm text-red-600">{errorMessage}</span>
      ) : (
        <span className="text-sm text-green-500">{errorMessage}</span>
      )}
      <div className="w-full flex justify-center pt-10 gap-2 flex-wrap">
        <input
          type="email"
          name="email"
          id="email"
          className="p-2 rounded-md border w-full md:w-1/3 border-gray-500"
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex justify-center gap-2">
          <button
            type="submit"
            className="p-2 rounded-md bg-blue-500 hover:bg-blue-700 text-white"
            onClick={submitHandler}
          >
            Submit
          </button>
          <button
            className="p-2 rounded-md bg-red-500 hover:bg-red-600 text-white"
            onClick={() => {
              if (from === "userLogin") {
                navigate("/login");
              } else {
                navigate("/orglogin");
              }
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmailInput;
