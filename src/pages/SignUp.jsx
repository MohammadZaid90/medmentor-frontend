"use client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { GoogleLogin } from "@react-oauth/google";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
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
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, agreeToTerms } = formData;

    if (!validateEmail(email)) return alert("Please enter a valid email!");
    if (!validatePassword(password))
      return alert(
        "Password must be 8+ chars with letters, numbers & special characters!"
      );
    if (password !== confirmPassword)
      return alert("Passwords do not match!");
    if (!agreeToTerms)
      return alert("You must agree to Terms and Privacy Policy!");

    try {
      const res = await fetch("https://medmentor-backend.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword,
          agreeToTerms,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful! Please Sign In now.");
        window.location.href = "/";
      } else {
        alert(data.msg || "Signup failed!");
      }
    } catch (err) {
      alert("Server error! Check backend connection.");
      console.error(err);
    }
  };

  // ✅ Google Signup Handler
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
        alert("Google Sign-In successful!");
        localStorage.setItem("token", data.token);
        window.location.href = "/simulation";
      } else {
        alert(data.msg || "Google Sign-In failed!");
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      alert("Google sign-in error. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-white to-blue-50 px-4 pt-16">
      <div className="w-full max-w-md mb-4">
        <Link
          to="/"
          className="text-gray-600 hover:text-blue-600 text-sm font-medium flex items-center gap-1"
        >
          ← Back to Home
        </Link>
      </div>

      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6 md:p-8 border border-gray-100">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2">
            <img
              src={logo}
              alt="Virtual Patient Care Logo"
              className="w-28 h-28 object-contain"
            />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Virtual Patient Care
          </h1>
        </div>

        <div className="flex justify-center mb-6">
          <div className="flex w-80 bg-gray-100 rounded-full p-1">
            <Link
              to="/signin"
              className="flex-1 py-2 text-gray-600 bg-gray-100 font-medium rounded-full hover:bg-gray-200 transition text-center"
            >
              Sign In
            </Link>
            <button className="flex-1 py-2 bg-white text-black rounded-full font-medium shadow-sm transition">
              Sign Up
            </button>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          Create Account
        </h2>
        <p className="text-sm text-gray-500 mb-5">
          Sign up to start using our virtual patient platform
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Dr. John Smith"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
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

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-gray-500 hover:text-gray-700"
            >
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="w-5 h-5"
              />
            </button>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-8 text-gray-500 hover:text-gray-700"
            >
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
                className="w-5 h-5"
              />
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 cursor-pointer"
              required
            />
            <label className="text-gray-600">
              I agree to the{" "}
              <Link
                to="/terms"
                className="text-blue-600 hover:underline font-medium"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="text-blue-600 hover:underline font-medium"
              >
                Privacy Policy
              </Link>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="my-4 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Login */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => alert("Google Sign-In Failed. Please try again!")}
          />
        </div>

        <p className="text-xs text-gray-500 text-center mt-5">
          By continuing, you agree to our{" "}
          <Link to="/terms" className="text-blue-600 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
