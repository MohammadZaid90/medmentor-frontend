import { useEffect } from "react";

export default function Simulation() {
  useEffect(() => {
    // Redirect immediately when page opens
    window.location.replace("https://med-mentor-orcin.vercel.app");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <p className="text-gray-600 text-lg">
        Redirecting to simulation...
      </p>
    </div>
  );
}