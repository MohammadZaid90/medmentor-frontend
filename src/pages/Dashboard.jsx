"use client";
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import TextType from "../components/TextType";
import CountUp from "../components/CountUp";
import Dock from "../components/Dock";
import SystemWorkSection from "../components/SystemWorkSection";
import PurposeSection from "../components/PurposeSection";
import Footer from "../components/Footer";
import {
  VscHome,
  VscArchive,
  VscAccount,
  VscSettingsGear,
} from "react-icons/vsc";
import logo from "../assets/Logo/logo.png";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Time between each child animating in
    },
  },
};

// 2. For the items inside the hero's left side (fade in + slide up)
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// 3. For sections that animate on scroll (fade in + slide up)
const scrollAnimationVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};
// --------------------------

function VirtualPatientHero() {
  const items = [
    {
      icon: <VscHome size={18} />,
      label: "Home",
      onClick: () => alert("Home!"),
    },
    {
      icon: <VscArchive size={18} />,
      label: "Archive",
      onClick: () => alert("Archive!"),
    },
    {
      icon: <VscAccount size={18} />,
      label: "Profile",
      onClick: () => alert("Profile!"),
    },
    {
      icon: <VscSettingsGear size={18} />,
      label: "Settings",
      onClick: () => alert("Settings!"),
    },
  ];

  return (
    <div className="bg-white min-h-screen mb-6 w-full overflow-x-hidden">
      {" "}
      {/* Added overflow-x-hidden */}
      <Dock
        items={items}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
        logoSrc={logo}
      />
      {/* HERO SECTION */}
      <div className="py-6 pt-28 w-full">
        <div className="max-w-[100%] mx-6 px-0">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-x-14 gap-y-16 w-full">
            {/* LEFT SIDE - Wrapped with motion.div for staggered animation */}
            <motion.div
              className="flex-1 pl-6 pr-6 lg:pl-10 lg:pr-10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Each child item gets the itemVariants */}
              <motion.h1
                className="text-slate-900 md:text-5xl text-4xl font-bold leading-tight"
                variants={itemVariants}
              >
                Real-time{" "}
                <span className="text-blue-700">Clinical Analysis</span>
              </motion.h1>

              <motion.div
                className="text-blue-700 md:text-3xl text-2xl font-semibold mt-3 font-[Share_Tech_Mono]"
                style={{
                  letterSpacing: "1.8px",
                  textShadow: "0 0 1px rgba(37, 99, 235, 0.6)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
                variants={itemVariants}
              >
                <TextType
                  text={[
                    "Train Virtually. Excel Clinically.",
                    "Redefining the Healer's Art.",
                    "Simulate. Decide. Master.",
                    "Interactive Patients. Sharper Decisions.",
                  ]}
                  typingSpeed={60}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="|"
                />
              </motion.div>

              <motion.p
                className="text-slate-800 text-base leading-relaxed mt-6"
                variants={itemVariants}
              >
                Go beyond the textbook. Experience true-to-life clinical
                encounters on high-fidelity models. Challenge your
                decision-making, manage dynamic vitals, and gain real-world
                confidence. This is advanced simulation, reimagined for modern
                medicine.
              </motion.p>

              {/* Buttons */}
              <motion.div
                className="mt-12 flex flex-wrap gap-8"
                variants={itemVariants}
              >
                <Link
                  to="/signin"
                  className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 border border-blue-800 transition-all text-base text-white font-medium rounded-full px-6 py-3 cursor-pointer outline-0 shadow-lg"
                >
                  <svg
                    className="w-5 h-5 -ml-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 21s-7-4.35-9-6.5A5.5 5.5 0 0112 3a5.5 5.5 0 019 11.5C19 16.65 12 21 12 21z"
                      stroke="white"
                      strokeWidth="0.5"
                      fill="rgba(255,255,255,0.12)"
                    />
                    <path
                      d="M12 8v6"
                      stroke="white"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                  Start Simulation
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center gap-2 bg-transparent border border-blue-700 transition-all text-base text-blue-700 font-medium rounded-full px-6 py-3 cursor-pointer outline-0 hover:bg-blue-50"
                >
                  Explore Features
                </a>
              </motion.div>

              {/* STATS */}
              <motion.div className="mt-16" variants={itemVariants}>
                <div className="grid sm:grid-cols-3 gap-x-6 gap-y-6">
                  <div>
                    <h5 className="text-blue-700 font-semibold text-2xl mb-2 flex items-center">
                      <CountUp
                        from={0}
                        to={250}
                        duration={2}
                        className="font-[Share_Tech_Mono]"
                      />
                      <span className="ml-1">+</span>
                    </h5>
                    <p className="text-lg text-slate-600 font-semibold">
                      Simulated Cases
                    </p>
                  </div>
                  <div>
                    <h5 className="text-blue-700 font-semibold text-2xl mb-2 flex items-center">
                      <CountUp
                        from={0}
                        to={10}
                        duration={1.5}
                        className="font-[Share_Tech_Mono]"
                      />
                      <span className="ml-1">+</span>
                    </h5>
                    <p className="text-lg text-slate-600 font-semibold">
                      Clinical Models
                    </p>
                  </div>
                  <div>
                    <h5 className="text-blue-700 font-semibold text-2xl mb-2 flex items-center">
                      <CountUp
                        from={0}
                        to={500}
                        duration={1.8}
                        className="font-[Share_Tech_Mono]"
                      />
                      <span className="ml-1">+</span>
                    </h5>
                    <p className="text-lg text-slate-600 font-semibold">
                      Educational Partners
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT SIDE */}
            <div className="flex-1 flex justify-center lg:justify-end pr-6 lg:pr-10">
              {/* Wrapped card with motion.div for its own animation */}
              <motion.div
                className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 transform hover:-translate-y-2 transition-transform duration-300"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h4 className="text-slate-800 font-semibold">
                      Patient: John Doe
                    </h4>
                    <p className="text-xs text-slate-500">Age: 56 • Ward B</p>
                  </div>
                  <p className="text-sm font-medium text-blue-700">Stable</p>
                </div>

                {/* ECG */}
                <div className="w-full bg-black rounded-md p-3 mb-6">
                  <svg
                    viewBox="0 0 600 120"
                    className="w-full h-28"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="100%" height="100%" fill="#071128" rx="6" />
                    <polyline
                      points="0,60 40,60 80,60 100,30 120,90 140,60 260,60 300,20 320,100 340,60 420,60 460,60 560,60"
                      stroke="#7ef3ff"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* VITALS */}
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-sm text-slate-500">HR</div>
                    <div className="text-lg font-semibold text-blue-700">
                      78
                    </div>
                    <div className="text-xs text-slate-400">bpm</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">BP</div>
                    <div className="text-lg font-semibold text-blue-700">
                      120/78
                    </div>
                    <div className="text-xs text-slate-400">mmHg</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">SpO₂</div>
                    <div className="text-lg font-semibold text-blue-700">
                      98%
                    </div>
                    <div className="text-xs text-slate-400">room air</div>
                  </div>
                </div>

                {/* BADGE */}
                <div className="absolute -top-6 -right-6 bg-blue-700 text-white rounded-full px-4 py-2 shadow-md hidden md:inline-flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 21s-7-4.35-9-6.5A5.5 5.5 0 0112 3a5.5 5.5 0 019 11.5C19 16.65 12 21 12 21z"
                      stroke="white"
                      strokeWidth="0.5"
                      fill="rgba(255,255,255,0.12)"
                    />
                  </svg>
                  <span className="text-sm font-medium">Clinical AI</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      {/* SYSTEM WORK SECTION - Wrapped for scroll animation */}
      <motion.div
        className="mt-36"
        variants={scrollAnimationVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} // Triggers when 20% is visible
      >
        <SystemWorkSection />
      </motion.div>
      {/* PURPOSE SECTION - Wrapped for scroll animation */}
      <motion.div
        className="mt-28"
        variants={scrollAnimationVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <PurposeSection />
      </motion.div>
      {/* FOOTER - Wrapped for scroll animation */}
      <motion.div
        variants={scrollAnimationVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <Footer />{" "}
      </motion.div>
    </div>
  );
}

export default VirtualPatientHero;
