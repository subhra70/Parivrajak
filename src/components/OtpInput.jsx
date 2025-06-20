import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import authService from "../authentication/auth";
const OtpInput = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.userData;
  const otpLength = 6;
  const inputRefs = useRef([]);
  const [resendMessage, setResendMessage] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^\d$/.test(value)) {
      e.target.value = value;
      if (index < otpLength - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      e.target.value = "";
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    const otp = inputRefs.current.map((input) => input.value).join("");
    const email = localStorage.getItem("email");
    const type = localStorage.getItem("type");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/verifyOtp`,
        null,
        {
          params: {
            email: email,
            otp: otp,
            type: type,
          },
        }
      );

      if (response.status === 200) {
        setMessage("OTP verification successful.");
        setIsError(false);
        if (type === "User") {
          localStorage.removeItem("email");
          localStorage.removeItem("type");
          const result = await authService.createUserAccount(data);
          if (result === 201) {
            navigate("/login");
          } else if (result === 409) {
            setMessage("User Already Exist.");
            setIsError(true);
            navigate("/");
          }
        } else if (type === "Organizer") {
          localStorage.removeItem("email");
          localStorage.removeItem("type");
          const result = await authService.createOrgAccount(data);
          if (result === 201) {
            navigate("/orglogin");
          } else if (result === 409) {
            setMessage("Organizer Already Exist.");
            setIsError(true);
            navigate("/");
          }
        } else {
          navigate("/resetPass")
        }
      }
    } catch (err) {
      setMessage("Invalid OTP or server error.");
      console.log(err);
      setIsError(true);
    }
  };

  const handleResendOtp = async () => {
    const email = localStorage.getItem("email");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/sendOtp`,
        null,
        {
          params: { email: email },
        }
      );

      if (response.status === 200) {
        setResendMessage("OTP resent successfully.");
      }
    } catch (err) {
      setResendMessage("Failed to resend OTP. Try again.");
      console.log(err);
    }

    setTimeout(() => setResendMessage(""), 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 pt-10">
      {message && (
        <span
          className={`text-sm ${isError ? "text-red-500" : "text-green-500"}`}
        >
          {message}
        </span>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex gap-1 justify-center items-center pt-5"
      >
        {[...Array(otpLength)].map((_, index) => (
          <input
            key={index}
            type="number"
            maxLength="1"
            className="w-8 h-8 md:w-12 md:h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
          />
        ))}

        <button
          type="submit"
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Verify
        </button>
      </form>

      <p
        className="text-sm text-blue-600 hover:underline cursor-pointer"
        onClick={handleResendOtp}
      >
        Resend OTP
      </p>

      {resendMessage && (
        <p className="text-sm text-green-600">{resendMessage}</p>
      )}
    </div>
  );
};

export default OtpInput;
