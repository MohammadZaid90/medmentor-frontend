"use client";
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google"; // ✅ import GoogleLogin
import logo from "../assets/Logo/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[A-Za-z\d@$!%*?&])[A-Za-z\d@#~`^()-_+=$!%*?&]{8,}$/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, rememberMe } = formData;

    if (!validateEmail(email)) return alert("Please enter a valid email!");
    if (!validatePassword(password))
      return alert(
        "Password must be at least 8 characters long and include letters, numbers, or special characters!"
      );

    try {
      const res = await fetch("https://medmentor-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/simulation");
      } else {
        alert(data.msg || "Invalid credentials!");
      }
    } catch (err) {
      alert("Server error! Check backend connection.");
      console.error(err);
    }
  };

  // ✅ Google Sign-In Handler
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const idToken = credentialResponse.credential;

      const res = await fetch("https://medmentor-backend.onrender.com/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/simulation");
      } else {
        alert(data.msg || "Google Sign-In failed!");
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      alert("Google sign-in error. Try again.");
    }
  };

  const isSignIn = location.pathname === "/signin";
  const isSignUp = location.pathname === "/signup";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50 px-4">
      <div className="w-full max-w-md mb-4">
        <Link
          to="/signup"
          className="text-gray-600 hover:text-blue-600 text-sm font-medium flex items-center gap-1"
        >
          ← Back to Home
        </Link>
      </div>

      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6 md:p-8 border border-gray-100">
        <div className="text-center mb-6">
          <img src={logo} alt="Virtual Patient Care Logo" className="w-14 h-14 mx-auto" />
          <h1 className="text-2xl font-semibold text-gray-900 mt-2">Virtual Patient Care</h1>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <div className="flex w-96 bg-gray-200 rounded-full p-1">
            <button
              onClick={() => navigate("/signin")}
              className={`flex-1 py-2 rounded-full font-medium shadow-sm transition ${
                isSignIn ? "bg-white text-black" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className={`flex-1 py-2 rounded-full font-medium transition ${
                isSignUp ? "bg-white text-black" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="doctor@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 cursor-pointer"
              />
              <span className="text-gray-600">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-blue-600 hover:underline font-medium">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="my-4 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* ✅ Google Login */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => alert("Google Sign-In Failed. Please try again!")}
          />
        </div>

        <p className="text-xs text-gray-500 text-center mt-5">
          By continuing, you agree to our{" "}
          <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
