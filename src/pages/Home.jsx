import { Link } from "react-router-dom";
import TopBar from "../components/Topbar";
import { Play, Bot, Activity, Gauge, MessageSquareMore } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ecf4fe] via-[#dae6f5] to-[#c0dffc]">
      <TopBar
        className="mt-20"
        label="MedMentor"
        right={
          <div className="flex gap-6">
            <Link
              to="/dashboard"
              className="text-lg font-medium tracking-tight text-neutral-600 hover:text-teal-700 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/simulation"
              className="text-lg font-medium tracking-tight text-neutral-600 hover:text-teal-700 transition-colors"
            >
              Simulation
            </Link>
          </div>
        }
      />
      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl font-extrabold text-teal-700 mb-6 mt-48 tracking-tight">
          AI-Based Virtual Patient for Medical Learning
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Enhance your diagnostic and clinical reasoning skills with our
          AI-driven virtual patient simulation platform. Designed for students,
          educators, and healthcare professionals to learn interactively.
        </p>

        <div className="mt-10">
          <Link
            to="/simulation"
            className="inline-flex items-center gap-2 rounded-lg bg-teal-600 text-white px-6 py-3.5 text-lg font-semibold shadow-md hover:bg-teal-700 transition-colors duration-200 transform hover:scale-105"
          >
            <Play className="w-5 h-5" />
            Start Simulation
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 mt-24 max-w-6xl mx-auto px-6">
        <FeatureCard
          icon={<Bot className="w-10 h-10 text-teal-600" />}
          title="AI-Powered Diagnosis"
          description="Interact with a virtual patient that responds intelligently using advanced medical AI models."
        />
        <FeatureCard
          icon={<Activity className="w-10 h-10 text-teal-600" />}
          title="Real-Time Feedback"
          description="Receive instant, personalized feedback to strengthen your medical decision-making skills."
        />
        <FeatureCard
          icon={<Gauge className="w-10 h-10 text-teal-600" />}
          title="Progress Tracking"
          description="Monitor your growth and performance through analytics and skill evaluations."
        />
      </section>

      {/* Footer */}
      <footer className="mt-24 text-center text-gray-500 pb-10">
        <div className="flex justify-center gap-3 items-center">
          <MessageSquareMore className="w-5 h-5" />
          <span>
            Empowering medical education with intelligent simulations.
          </span>
        </div>
        <p className="mt-2 text-sm">
          © {new Date().getFullYear()} MedMentor — All Rights Reserved
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
      {icon}
      <h3 className="mt-4 text-xl font-semibold text-teal-700">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  );
}
