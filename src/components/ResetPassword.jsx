import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!pass || !cpass) {
      setError("Both fields are required.");
      return;
    }
    if (pass !== cpass) {
      setError("Passwords do not match.");
      return;
    }
    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/.test(pass)) {
      setError(
        "Password must contain at least 1 uppercase letter, 1 digit, 1 special character, and be at least 6 characters long."
      );
      return;
    }

    try {
      const email = localStorage.getItem("email");
      const type = localStorage.getItem("type");

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/resetPassword`,
        {
          email,
          password: pass,
          cpassword: cpass,
        }
      );

      if (response.status === 200) {
        setSuccess("Password changed successfully!");
        localStorage.removeItem("email");
        localStorage.removeItem("type");
        setTimeout(() => {
          navigate(type === "Forgot UserDetails" ? "/login" : "/orglogin");
        }, 1500);
      } else {
        setError("Failed to reset password.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-scree px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Reset Password
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPass(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setCpass(e.target.value)}
          />
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}
          {success && (
            <div className="text-green-600 text-sm text-center">{success}</div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
