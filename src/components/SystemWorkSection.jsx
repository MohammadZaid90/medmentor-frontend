import React from "react";
import systemwork from "../assets/system-work.jpeg"; // keep your asset path

// --- Inline SVG icons ---
const LockIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    role="img"
    aria-label="lock"
    className={props.className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const StethoscopeIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    role="img"
    aria-label="stethoscope"
    className={props.className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 3v6a7 7 0 0 0 7 7h0" />
    <path d="M11 16v3a3 3 0 0 0 6 0v-3" />
    <circle cx="19" cy="6" r="2" />
  </svg>
);

const BrainIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    role="img"
    aria-label="ai"
    className={props.className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20v-2" />
    <path d="M8 20v-1" />
    <path d="M16 20v-1" />
    <path d="M12 4v4" />
    <path d="M7 8a5 5 0 0 0 10 0" />
    <path d="M3 12c0 4 4 6 9 6s9-2 9-6" />
  </svg>
);

const ChartIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    role="img"
    aria-label="chart"
    className={props.className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 3v18h18" />
    <path d="M7 13v5" />
    <path d="M12 9v9" />
    <path d="M17 5v13" />
  </svg>
);

// --- Component ---
export default function SystemWorkSection() {
  const cards = [
    {
      title: "Secure Login & Personalized Dashboard",
      description:
        "Access your individual learning environment securely and explore AI-powered training modules tailored to your performance.",
      Icon: LockIcon,
    },
    {
      title: "Interactive Virtual Diagnosis",
      description:
        "Engage with lifelike virtual patients — analyze symptoms, make clinical decisions, and practice real-world diagnostic reasoning.",
      Icon: StethoscopeIcon,
    },
    {
      title: "AI-Driven Performance Evaluation",
      description:
        "Our advanced AI engine evaluates your responses instantly, providing insightful feedback to strengthen critical medical skills.",
      Icon: BrainIcon,
    },
    {
      title: "Comprehensive Progress Analytics",
      description:
        "Gain a clear view of your progress with dynamic charts and data insights that highlight your growth and mastery over time.",
      Icon: ChartIcon,
    },
  ];

  return (
    <section className="max-w-screen-xl mx-auto py-16 px-6">
      {/* Intro */}
      <div className="grid md:grid-cols-2 gap-x-10 gap-y-12 items-center">
        <div className="max-md:text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-700">
            How the System Works
          </h2>
          <p className="text-[15px] text-slate-600 mt-6 leading-relaxed">
            Experience an immersive, AI-enhanced clinical training platform that
            blends simulation, feedback, and analytics to accelerate learning
            and improve real-world decision-making.
          </p>
        </div>

        <div className="max-md:-order-1">
          <div className="w-full aspect-[4/3]">
            <img
              src={systemwork}
              alt="System workflow illustration"
              className="w-full h-full object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid lg:grid-cols-2 sm:grid-cols-2 gap-x-10 gap-y-10 md:mt-16 mt-12">
        {cards.map((c, i) => {
          const Icon = c.Icon;
          return (
            <article
              key={i}
              className="relative group bg-white p-8 rounded-2xl shadow-md border border-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-blue-600/10 to-blue-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl shadow-sm">
                  <Icon className="w-6 h-6 text-blue-700" />
                </div>
                <h3 className="text-lg font-semibold text-blue-900">
                  {c.title}
                </h3>
              </div>

              <p className="text-slate-600 text-[15px] leading-relaxed mt-4 relative z-10">
                {c.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
