"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Dock from "../components/Dock";
import logo from "../assets/Logo/logo.png";
import youngManGif from "../assets/CharactersGifs/YoungLady.gif";
import { useNavigate } from "react-router-dom";
import {
  VscHome,
  VscArchive,
  VscAccount,
  VscSettingsGear,
} from "react-icons/vsc";

export default function VirtualPatientScreen() {
  const navigate = useNavigate();

  const items = [
    {
      icon: <VscHome size={18} />,
      label: "Home",
      onClick: () => navigate("/"),
    },
    {
      icon: <VscArchive size={18} />,
      label: "Archive",
      onClick: () => navigate("/archive"),
    },
    {
      icon: <VscAccount size={18} />,
      label: "Profile",
      onClick: () => navigate("/profile"),
    },
    {
      icon: <VscSettingsGear size={18} />,
      label: "Settings",
      onClick: () => navigate("/settings"),
    },
  ];

  // ------------------------------
  // 🎭 Patient Data
  // ------------------------------
  const diseases = [
    {
      name: "flu",
      intro:
        "Hello, I'm your virtual patient. My name is John. I’ve been feeling unwell for the past few days. I think I might have the flu.",
      symptoms:
        "I have a fever, sore throat, and body aches. Sometimes I also feel tired and weak.",
      progress: "It's getting worse every day. I started coughing too.",
    },
    {
      name: "migraine",
      intro:
        "Hello, I’m your virtual patient. My name is Sarah. I’ve been suffering from severe headaches lately.",
      symptoms:
        "The pain usually starts on one side of my head and I feel nauseous when it happens.",
      progress:
        "Light and noise make it worse, and painkillers don’t help much.",
    },
    {
      name: "stomach infection",
      intro:
        "Hey there, I'm Alex. Lately, I’ve had a stomach infection and haven’t been eating properly.",
      symptoms:
        "I often feel nausea, cramps, and loose motion. Sometimes I feel dizzy too.",
      progress:
        "It started two days ago after eating outside food. I feel dehydrated now.",
    },
  ];

  // ------------------------------
  // 🧠 State Management
  // ------------------------------
  const [conversation, setConversation] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [message, setMessage] = useState("");
  const [patient, setPatient] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [fallbackText, setFallbackText] = useState("");

  const recognitionRef = useRef(null);
  const stageRef = useRef(0);
  const waitingForUserRef = useRef(false);

  // ------------------------------
  // 🧠 Initialize Patient
  // ------------------------------
  useEffect(() => {
    const randomPatient = diseases[Math.floor(Math.random() * diseases.length)];
    setPatient(randomPatient);
    setMessage(randomPatient.intro);
    setConversation([{ speaker: "patient", text: randomPatient.intro }]);
  }, []);

  // ------------------------------
  // 🎤 Speech Recognition Setup
  // ------------------------------
  useEffect(() => {
    const SR =
      window.SpeechRecognition || window.webkitSpeechRecognition || null;
    if (!SR) {
      console.warn("Speech Recognition not supported.");
      recognitionRef.current = null;
      return;
    }

    const recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      console.log("🎙️ Microphone listening started...");
      setIsListening(true);
    };

    recognition.onerror = (event) => {
      if (event.error === "no-speech") {
        console.log("⚠️ No speech detected, advancing turn.");
        waitingForUserRef.current = false;
        handleUserTurn("");
      } else {
        console.error("❌ Speech recognition error:", event.error);
      }
    };

    recognition.onend = () => {
      console.log("🛑 Microphone listening stopped.");
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const userSpeech = event.results[0][0].transcript || "";
      console.log("🎤 User said:", userSpeech);
      waitingForUserRef.current = false;
      handleUserTurn(userSpeech);
    };

    recognitionRef.current = recognition;
  }, []);

  // ------------------------------
  // 🔊 Speech Synthesis (Fixed)
  // ------------------------------
  const speak = (text, onEnd) => {
    if (!("speechSynthesis" in window)) {
      console.warn("Speech Synthesis not supported.");
      if (onEnd) onEnd();
      return;
    }
    // Cancel any ongoing speech before starting a new one
    window.speechSynthesis.cancel();

    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 1;
    u.pitch = 1;
    u.volume = 1;
    u.onend = () => {
      if (onEnd) onEnd();
    };
    u.onerror = (e) => {
      console.error("Speech Synthesis error:", e);
      if (onEnd) onEnd();
    };

    // Delay helps Chrome process new utterance properly
    setTimeout(() => window.speechSynthesis.speak(u), 300);
  };

  // ------------------------------
  // 🗣️ Speak & then Listen (Fixed)
  // ------------------------------
  const speakAndThenListen = (text) => {
    setMessage("");
    animateTyping(text);

    speak(text, () => {
      // Add slight delay before listening again
      setTimeout(() => {
        startListeningForUser();
      }, 800);
    });
  };

  // ------------------------------
  // ▶️ Start Listening
  // ------------------------------
  const startListeningForUser = () => {
    const recognition = recognitionRef.current;
    if (!recognition || isListening) return;
    try {
      waitingForUserRef.current = true;
      recognition.start();
    } catch (e) {
      console.warn("recognition.start error", e);
      waitingForUserRef.current = true;
    }
  };

  // ------------------------------
  // ⏹ Stop Listening
  // ------------------------------
  const stopListening = () => {
    const recognition = recognitionRef.current;
    if (recognition) {
      try {
        recognition.stop();
      } catch (e) {}
    }
    waitingForUserRef.current = false;
    setIsListening(false);
  };

  // ------------------------------
  // 💬 Handle User Turn
  // ------------------------------
  const handleUserTurn = (userSpeech) => {
    setConversation((prev) => [
      ...prev,
      { speaker: "user", text: userSpeech || "..." },
    ]);

    if (!patient) return;
    let reply = "";

    if (stageRef.current === 0) reply = patient.symptoms;
    else if (stageRef.current === 1) reply = patient.progress;
    else
      reply =
        "That’s all I can share for now. Thank you for your diagnosis check!";

    stageRef.current++;
    stopListening();

    setTimeout(() => {
      setConversation((prev) => [...prev, { speaker: "patient", text: reply }]);
      speakAndThenListen(reply);
    }, 700);
  };

  // ------------------------------
  // ⌨️ Typing Animation
  // ------------------------------
  const animateTyping = (text) => {
    let i = 0;
    setMessage("");
    const typing = setInterval(() => {
      setMessage((prev) => prev + (text[i] || ""));
      i++;
      if (i >= text.length) clearInterval(typing);
    }, 30);
  };

  // ------------------------------
  // 🚀 Start Conversation
  // ------------------------------
  const handleConversationStart = () => {
    console.log("🚀 Conversation started with patient:", patient?.name);
    setHasStarted(true);
    speakAndThenListen(patient.intro);
  };

  // ------------------------------
  // 📝 Text Fallback
  // ------------------------------
  const handleFallbackSubmit = (e) => {
    e.preventDefault();
    if (!fallbackText.trim()) return;
    if (!hasStarted) {
      setHasStarted(true);
      handleUserTurn(fallbackText);
    } else {
      handleUserTurn(fallbackText || "...");
    }
    setFallbackText("");
  };

  // ------------------------------
  // 🖼️ UI
  // ------------------------------
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 px-6">
      <Dock
        items={items}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
        logoSrc={logo}
      />

      {/* Character */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative flex flex-col items-center mt-24"
      >
        <motion.div
          animate={{ y: [0, -8, 0], scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="relative rounded-full overflow-hidden shadow-2xl border-4 border-blue-300 w-60 h-60 md:w-72 md:h-72 bg-white"
        >
          <img
            src={youngManGif}
            alt="Virtual Patient"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute w-72 h-72 md:w-80 md:h-80 rounded-full border-4 border-blue-400 opacity-40"
        ></motion.div>
      </motion.div>

      {/* Chat Bubble */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 bg-blue-50 text-blue-900 backdrop-blur-md p-5 rounded-2xl shadow-md max-w-md text-lg text-center border border-blue-300 min-h-[120px] flex items-center justify-center"
      >
        <p className="font-medium">{message || "..."}</p>
      </motion.div>

      {/* Controls */}
      <div className="mt-6 flex flex-col items-center gap-3">
        <div className="text-sm text-gray-600 h-5">
          {recognitionRef.current ? (
            hasStarted ? (
              isListening ? (
                <span className="inline-flex items-center gap-2 text-red-600 font-medium">
                  ● Listening...
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 text-gray-500">
                  Waiting for patient...
                </span>
              )
            ) : (
              <span className="text-gray-500">Click below to start</span>
            )
          ) : (
            <span className="text-gray-500">
              Speech Recognition not available — use text input below.
            </span>
          )}
        </div>

        {!recognitionRef.current && (
          <form
            onSubmit={handleFallbackSubmit}
            className="flex gap-2 items-center"
          >
            <input
              value={fallbackText}
              onChange={(e) => setFallbackText(e.target.value)}
              placeholder="Type and press Send"
              className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-full"
            >
              Send
            </button>
          </form>
        )}

        {recognitionRef.current && !hasStarted && (
          <button
            onClick={handleConversationStart}
            className="px-6 py-2 rounded-full text-white font-medium shadow-lg bg-blue-600 hover:bg-blue-700"
          >
            🎙️ Start Conversation
          </button>
        )}
      </div>
    </div>
  );
}
