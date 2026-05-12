import React from "react";
import purpose1 from "../assets/PurposeImages/Purpose1.png";
import purpose2 from "../assets/PurposeImages/Purpose2.jpg";
import purpose3 from "../assets/PurposeImages/Purpose3.jpg";
import purpose4 from "../assets/PurposeImages/Purpose4.jpg";

export default function PurposeSection() {
  return (
    <div className="max-w-5xl max-md:max-w-xl mx-auto py-24 px-6">
      {/* Intro Section */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-blue-700 text-4xl font-bold text-center mb-6">
          Purpose Behind the Development
        </h1>
        <p className="text-slate-500 text-[15px] leading-relaxed">
          We developed the{" "}
          <span className="font-semibold text-blue-800">
            Clinical Analysis System
          </span>{" "}
          to revolutionize medical education and clinical training through
          cutting-edge technology. Traditional learning methods often lack
          realistic, hands-on experience — our platform bridges this gap by
          delivering immersive, AI-driven simulations and continuous skill
          evaluation.
        </p>
      </div>

      {/* Content Blocks */}
      <div className="space-y-28">
        {/* 1️⃣ Safe & Repeatable Simulations */}
        <div className="grid md:grid-cols-2 items-center gap-48">
          <div className="w-full aspect-[488/332]">
            <img
              src={purpose1}
              alt="Virtual patient simulation"
              className="w-full h-full object-cover rounded-xl shadow-xl"
            />
          </div>
          <div className="max-md:text-center md:pl-10">
            <h3 className="text-slate-900 text-2xl font-semibold mb-5">
              Safe & Repeatable Simulations
            </h3>
            <p className="text-slate-500 text-[15px] leading-relaxed">
              Our system provides a risk-free training environment where medical
              students can practice clinical scenarios repeatedly, learning from
              mistakes and improving decision-making before treating real
              patients.
            </p>
          </div>
        </div>

        {/* 2️⃣ Instant Feedback & Assessment */}
        <div className="grid md:grid-cols-2 items-center gap-20">
          <div className="max-md:order-1 max-md:text-center md:pr-10">
            <h3 className="text-slate-900 text-2xl font-semibold mb-5">
              Instant Feedback & Assessment
            </h3>
            <p className="text-slate-500 text-[15px] leading-relaxed">
              Using AI-driven analytics, the system evaluates every diagnosis
              and treatment in real-time — offering personalized insights and
              performance tracking that accelerate clinical skill development.
            </p>
          </div>
          <div className="w-full aspect-[488/332]">
            <img
              src={purpose2}
              alt="AI evaluation illustration"
              className="w-full h-full object-cover rounded-xl shadow-xl"
            />
          </div>
        </div>

        {/* 3️⃣ Accessible Learning */}
        <div className="grid md:grid-cols-2 items-center gap-48">
          <div className="w-full aspect-[488/332]">
            <img
              src={purpose3}
              alt="Global accessibility"
              className="w-full h-full object-cover rounded-xl shadow-xl"
            />
          </div>
          <div className="max-md:text-center md:pl-10">
            <h3 className="text-slate-900 text-2xl font-semibold mb-5">
              Accessible Learning, Anytime & Anywhere
            </h3>
            <p className="text-slate-500 text-[15px] leading-relaxed">
              Train remotely from any device. Our platform ensures that learners
              worldwide can access high-quality simulations and evaluations —
              breaking geographical barriers in medical education.
            </p>
          </div>
        </div>

        {/* 4️⃣ Ethical & Future-Ready */}
        <div className="grid md:grid-cols-2 items-center gap-20">
          <div className="max-md:order-1 max-md:text-center md:pr-10">
            <h3 className="text-slate-900 text-2xl font-semibold mb-5">
              Ethical & Future-Ready Education
            </h3>
            <p className="text-slate-500 text-[15px] leading-relaxed">
              We aim to make medical education more interactive, ethical, and
              future-driven — preparing healthcare professionals to adapt
              confidently in a tech-integrated medical landscape.
            </p>
          </div>
          <div className="w-full aspect-[488/332]">
            <img
              src={purpose4}
              alt="Ethical education concept"
              className="w-full h-full object-cover rounded-xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
