import React, { useState } from "react";
import {
  FaUser,
  FaLock,
  FaSignInAlt,
  FaUserPlus,
  FaEye,
  FaEyeSlash,
  FaEnvelope,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { loginUser, registerUser } from "@/Services/login";
import { Loader2, ArrowLeft, Rocket } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = isSignUp
        ? await registerUser(data)
        : await loginUser(data);
      if (response?.statusCode === 200 || response?.statusCode === 201) {
        navigate(isSignUp ? "/auth/sign-in" : "/");
        if (isSignUp) setIsSignUp(false);
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50">
      {/* --- Left Side: Branding/Marketing --- */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500 blur-[120px]" />
        </div>

        <Link
          to="/"
          className="flex items-center gap-2 z-10 text-white no-underline"
        >
          <div className="bg-blue-600 p-2 rounded-lg">
            <Rocket className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter italic">
            Resume<span className="text-blue-400 not-italic">Pilot</span>
          </span>
        </Link>

        <div className="z-10">
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            Your journey to a <br />
            <span className="text-blue-400 underline decoration-blue-400/30 underline-offset-8">
              dream job
            </span>{" "}
            starts here.
          </h2>
          <p className="text-slate-400 text-lg max-w-md">
            Join 10,000+ professionals using AI to craft resumes that get
            noticed by top-tier recruiters.
          </p>
        </div>

        <p className="text-slate-500 text-sm z-10">
          © 2026 ResumePilot AI. All rights reserved.
        </p>
      </div>

      {/* --- Right Side: Auth Form --- */}
      <div className="flex items-center justify-center p-6 sm:p-12 relative">
        <Link
          to="/"
          className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-[400px]"
        >
          <div className="mb-10">
            <h1 className="text-3xl font-black text-slate-900 mb-2">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="text-slate-500">
              {isSignUp
                ? "Join us to start building your future."
                : "Please enter your details to sign in."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {isSignUp && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1"
                >
                  <label className="text-sm font-bold text-slate-700 ml-1">
                    Full Name
                  </label>
                  <div className="relative flex items-center group">
                    <FaUser className="absolute left-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                    <input
                      name="fullName"
                      placeholder="John Doe"
                      required
                      className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all shadow-sm"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Email Address
              </label>
              <div className="relative flex items-center group">
                <FaEnvelope className="absolute left-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-slate-700">
                  Password
                </label>
                {!isSignUp && (
                  <a
                    href="#"
                    className="text-xs text-blue-600 font-bold hover:underline"
                  >
                    Forgot?
                  </a>
                )}
              </div>
              <div className="relative flex items-center group">
                <FaLock className="absolute left-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-12 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm font-medium text-center"
              >
                {error}
              </motion.div>
            )}

            <Button
              disabled={loading}
              className="w-full py-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg shadow-blue-200 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : isSignUp ? (
                "Create Account"
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-slate-500">
              {isSignUp ? "Already have an account?" : "New to ResumePilot?"}{" "}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError("");
                }}
                className="text-blue-600 font-bold hover:underline"
              >
                {isSignUp ? "Sign In" : "Create an account"}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AuthPage;
