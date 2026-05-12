"use client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo/logo.png";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [linkSent, setLinkSent] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email) {
    alert("Please enter your email!");
    return;
  }

  try {
    const res = await fetch(
      "https://medmentor-backend.onrender.com/api/auth/forgot-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert(data.msg || "Reset link sent successfully!");
      setLinkSent(true); // keep your UI popup
    } else {
      alert(data.msg || "Something went wrong!");
    }
  } catch (error) {
    console.error(error);
    alert("Server error! Please try again later.");
  }
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50 px-4 pt-10">
      {/* Back to Home */}
      <div className="w-full max-w-md mb-4">
        <Link
          to="/"
          className="text-gray-600 hover:text-blue-600 text-sm font-medium flex items-center gap-1"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6 md:p-8 border border-gray-100">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2">
            <img
              src={logo}
              alt="Virtual Patient Care Logo"
              className="w-14 h-14 object-contain"
            />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Virtual Patient Care
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <div className="flex w-80 bg-gray-100 rounded-full p-1">
            <Link
              to="/"
              className="flex-1 py-2 text-gray-600 bg-gray-100 font-medium rounded-full hover:bg-gray-200 transition text-center"
            >
              Sign In
            </Link>
            <button className="flex-1 py-2 bg-white text-black rounded-full font-medium shadow-sm transition">
              Forgot Password
            </button>
          </div>
        </div>

        {/* Header Text */}
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          Forgot your password?
        </h2>
        <p className="text-sm text-gray-500 mb-5">
          Enter your registered email to receive password reset instructions.
        </p>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="doctor@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Send Reset Link
          </button>
        </form>

        {/* Bottom Text */}
        <p className="text-sm text-gray-600 text-center mt-6">
          Remember your password?{" "}
          <Link to="/" className="text-blue-600 hover:underline font-medium">
            Back to Sign In
          </Link>
        </p>
      </div>
      {linkSent && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-gradient-to-r from-blue-400 to-blue-400 text-white px-6 py-5 rounded-xl shadow-xl text-center transform animate-slide-up">
            <div className="text-3xl mb-2">✅</div>
            <h3 className="text-lg font-semibold mb-1">
              Link Sent Successfully!
            </h3>
            <p className="text-sm text-blue-100">
              A password reset link has been sent to your email.
              <br />
              Please check your inbox.
            </p>
            <button
              onClick={() => setLinkSent(false)}
              className="mt-4 bg-white text-blue-600 font-medium px-4 py-1.5 rounded-lg hover:bg-blue-50 transition-all"
            >
              OK
            </button>
          </div>
        </div>
      )}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in {
            animation: fadeIn 0.4s ease-in-out forwards;
          }
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .animate-slide-up {
            animation: slideUp 0.4s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
}
