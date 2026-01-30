import Header from "@/components/custom/Header";
import React, { useEffect } from "react";
import heroSnapshot from "@/assets/heroSnapshot.png";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { startUser } from "../../Services/login.js";
import { useDispatch, useSelector } from "react-redux";
import { addUserData } from "@/features/user/userFeatures.js";
import {
  ChevronRight,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";

function HomePage() {
  const user = useSelector((state) => state.editUser.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGithubClick = () => {
    window.open("https://github.com/RohanMakvana24/Resume-Pilot", "_blank");
  };

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await startUser();
        if (response.statusCode === 200) {
          dispatch(addUserData(response.data));
        } else {
          dispatch(addUserData(""));
        }
      } catch (error) {
        console.error("Home Page Error:", error.message);
        dispatch(addUserData(""));
      }
    };
    fetchResponse();
  }, [dispatch]);

  const handleGetStarted = () => {
    user ? navigate("/dashboard") : navigate("/auth/sign-in");
  };

  return (
    <div className="min-h-screen bg-slate-50/50 selection:bg-blue-100">
      <Header user={user} />

      {/* --- Hero Section --- */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-purple-400/10 blur-[120px]" />
        </div>

        <div className="px-6 mx-auto max-w-7xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Resume Transformation</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-8 leading-[1.1]">
            Elevate Your Career <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
              With Precision AI.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
            Stop struggling with formatting. ResumePilot uses advanced
            intelligence to craft professional resumes that bypass ATS and land
            you the interview.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              onClick={handleGetStarted}
              className="w-full sm:w-auto h-14 px-10 text-lg font-bold rounded-2xl bg-slate-900 hover:bg-blue-600 transition-all shadow-xl shadow-blue-900/10 group"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              onClick={handleGithubClick}
              className="w-full sm:w-auto h-14 px-10 text-lg font-bold rounded-2xl border-2 hover:bg-slate-50 transition-all"
            >
              <FaGithub className="mr-2 w-5 h-5" />
              Star on GitHub
            </Button>
          </div>

          {/* --- Hero Image / Mockup --- */}
          <div className="relative mx-auto max-w-5xl group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-white rounded-[1.8rem] border border-slate-200 p-2 shadow-2xl overflow-hidden">
              {/* Browser Header Decor */}
              <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-100">
                <div className="flex gap-2">
                  <FaCircle className="w-3 h-3 text-red-400" />
                  <FaCircle className="w-3 h-3 text-amber-400" />
                  <FaCircle className="w-3 h-3 text-emerald-400" />
                </div>
                <div className="text-xs font-bold text-slate-400 tracking-widest uppercase">
                  resumepilot.app/editor
                </div>
                <div className="w-10" />
              </div>
              <img
                className="w-full h-auto rounded-b-2xl transition duration-700 group-hover:scale-[1.01]"
                src={heroSnapshot}
                alt="ResumePilot Editor Preview"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- Trusted By / Features Lite --- */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <div className="mb-4 p-3 bg-blue-500/10 rounded-xl text-blue-400">
              <Zap />
            </div>
            <h3 className="text-xl font-bold mb-2">Build in Minutes</h3>
            <p className="text-slate-400">
              Lightning fast generation with pre-built professional templates.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-4 p-3 bg-purple-500/10 rounded-xl text-purple-400">
              <ShieldCheck />
            </div>
            <h3 className="text-xl font-bold mb-2">ATS Optimized</h3>
            <p className="text-slate-400">
              Specifically engineered to pass through automated screening
              systems.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
              <ChevronRight />
            </div>
            <h3 className="text-xl font-bold mb-2">Smart Export</h3>
            <p className="text-slate-400">
              Export to PDF or JSON with perfect formatting every single time.
            </p>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              RESUMEPILOT
            </h2>
            <p className="text-sm text-slate-500">
              © 2026 AI Resume Builder. Empowering careers.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-slate-400 hover:text-blue-600 transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-blue-600 transition-colors"
            >
              Terms
            </a>
            <Button variant="ghost" size="icon" onClick={handleGithubClick}>
              <FaGithub className="w-5 h-5 text-slate-600" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
