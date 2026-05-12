import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import logo from "../assets/Logo/logo.png";

export default function ResetPassword() {
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validatePassword = (password) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      return alert("Please fill all fields!");
    }

    if (!validatePassword(password)) {
      return alert(
        "Password must be at least 8 characters and include letters, numbers & special characters!"
      );
    }

    if (password !== confirmPassword) {
      return alert("Passwords do not match!");
    }

    try {
      const res = await fetch(
        "https://medmentor-backend.onrender.com/api/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, password, confirmPassword }),
        }
      );

      const data = await res.json();

      // 🔥 TOKEN EXPIRED / INVALID HANDLING
      if (!res.ok) {
        if (
          data.msg?.toLowerCase().includes("expired") ||
          data.msg?.toLowerCase().includes("invalid")
        ) {
          alert("Token expired or invalid! Redirecting to login...");

          setTimeout(() => {
            window.close();
            window.location.href = "/";
          }, 2000);

          return;
        }

        alert(data.msg || "Something went wrong!");
        return;
      }

      // ✅ SUCCESS
      alert("Password updated successfully!");

      setTimeout(() => {
        window.close();
        window.location.href = "/";
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("Server error!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6 md:p-8 border border-gray-100">

        <div className="text-center mb-6">
          <img src={logo} alt="Logo" className="w-14 h-14 mx-auto" />
          <h1 className="text-2xl font-semibold mt-2">Reset Password</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Update Password
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Back to{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}