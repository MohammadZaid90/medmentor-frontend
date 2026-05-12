import React from "react";
import logo from "../assets/Logo/logo.png";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#343fdc] via-slate-900 to-[#4957f9] text-white w-full mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-14 tracking-wide">
        {/* Logo and Intro */}
        <div className="max-w-2xl mx-auto text-center">
          <img src={logo} alt="logo" className="w-44 mx-auto" />
          <p className="text-sm mt-6 text-slate-300 leading-relaxed">
            MedMentor is an advanced platform designed to enhance medical
            education through realistic, AI-powered clinical simulations.
            Whether you're a medical student or professional, it provides
            immersive, hands-on training experiences that improve diagnostic
            skills and decision-making in a safe, digital environment.
          </p>

          {/* Social Icons */}
          <ul className="flex flex-wrap justify-center gap-6 mt-8">
            <li>
              <a href="#" className="hover:scale-110 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-blue-600 w-8 h-8"
                  viewBox="0 0 49.652 49.652"
                >
                  <path d="M24.826 0C11.137 0 0 11.137 0 24.826c0 13.688 11.137 24.826 24.826 24.826 13.688 0 24.826-11.138 24.826-24.826C49.652 11.137 38.516 0 24.826 0zM31 25.7h-4.039v14.396h-5.985V25.7h-2.845v-5.088h2.845v-3.291c0-2.357 1.12-6.04 6.04-6.04l4.435.017v4.939h-3.219c-.524 0-1.269.262-1.269 1.386v2.99h4.56z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="#" className="hover:scale-110 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  viewBox="0 0 112.196 112.196"
                >
                  <circle cx="56.098" cy="56.097" r="56.098" fill="#007ab9" />
                  <path
                    fill="#fff"
                    d="M89.616 60.611v23.128H76.207V62.161c0-5.418-1.936-9.118-6.791-9.118-3.705 0-5.906 2.491-6.878 4.903-.353.862-.444 2.059-.444 3.268v22.524h-13.41s.18-36.546 0-40.329h13.411v5.715c1.782-2.742 4.96-6.662 12.085-6.662 8.822 0 15.436 5.764 15.436 18.149zM34.656 23.969c-4.587 0-7.588 3.011-7.588 6.967 0 3.872 2.914 6.97 7.412 6.97h.087c4.677 0 7.585-3.098 7.585-6.97-.089-3.956-2.908-6.967-7.496-6.967zm-6.791 59.77H41.27v-40.33H27.865v40.33z"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a href="#" className="hover:scale-110 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  viewBox="0 0 152 152"
                >
                  <linearGradient
                    id="a"
                    x1="22.26"
                    x2="129.74"
                    y1="22.26"
                    y2="129.74"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="#fae100" />
                    <stop offset=".3" stopColor="#ff7950" />
                    <stop offset="1" stopColor="#6c1cd1" />
                  </linearGradient>
                  <rect width="152" height="152" rx="76" fill="url(#a)" />
                  <path
                    fill="#fff"
                    d="M94 36H58a22 22 0 0 0-22 22v36a22 22 0 0 0 22 22h36a22 22 0 0 0 22-22V58a22 22 0 0 0-22-22zm15 54.84A18.16 18.16 0 0 1 90.84 109H61.16A18.16 18.16 0 0 1 43 90.84V61.16A18.16 18.16 0 0 1 61.16 43h29.68A18.16 18.16 0 0 1 109 61.16z"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Grid */}
        <ul className="grid max-sm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mt-20 text-slate-300">
          <li>
            <span className="block text-sm font-medium">Tel</span>
            <span>180-548-2588</span>
          </li>
          <li>
            <span className="block text-sm font-medium">Mail</span>
            <span>info@example.com</span>
          </li>
          <li>
            <span className="block text-sm font-medium">Address</span>
            <span>123 Main Street City, Country</span>
          </li>
          <li>
            <span className="block text-sm font-medium">Fax</span>
            <span>+1-548-2588</span>
          </li>
        </ul>

        <hr className="mt-14 mb-6 border-gray-600" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-slate-300 text-sm">
          <ul className="flex flex-wrap gap-4 justify-center md:justify-start">
            <li>
              <a href="#" className="hover:underline">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Security
              </a>
            </li>
          </ul>
          <p className="text-center md:text-right">
            © MedMentor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
