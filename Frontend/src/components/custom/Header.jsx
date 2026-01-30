import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/Services/login";
import { addUserData } from "@/features/user/userFeatures";
import {
  Sparkles,
  LayoutDashboard,
  LogOut,
  ChevronRight,
  Menu,
} from "lucide-react";

function Header({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response.statusCode === 200) {
        dispatch(addUserData(""));
        navigate("/");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] px-4 py-4 md:px-10 transition-all duration-300">
      <nav
        className={`mx-auto max-w-7xl flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 ${
          scrolled
            ? "bg-white/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/40"
            : "bg-transparent border border-transparent"
        }`}
      >
        {/* --- UNIQUE LOGO: ResumePilot --- */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
            <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-white">
              <Sparkles className="h-5 w-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          {/* Logo Text - hidden on mobile */}
          <div className="hidden md:block">
            <h1 className="text-xl font-black tracking-tighter text-slate-900 flex items-center">
              RESUME<span className="text-blue-600 ml-1">PILOT</span>
              <span className="ml-1 flex h-2 w-2 rounded-full bg-cyan-500 animate-bounce"></span>
            </h1>
            <p className="text-[10px] font-bold text-slate-400 tracking-[0.3em] uppercase -mt-1">
              Build Beyond
            </p>
          </div>
        </Link>

        {/* --- DYNAMIC ACTIONS --- */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => navigate("/dashboard")}
                className="rounded-full font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600"
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Console
              </Button>
              <Button
                onClick={handleLogout}
                className="bg-slate-900 text-white rounded-full px-6 hover:bg-red-600 transition-colors shadow-lg shadow-slate-200"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/auth/sign-in"
                className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
              >
                Login
              </Link>
              <Button
                onClick={() => navigate("/auth/sign-in")}
                className="relative group overflow-hidden rounded-full bg-blue-600 px-8 py-5 text-white shadow-[0_10px_20px_rgba(37,99,235,0.2)] transition-all hover:scale-105 hover:shadow-[0_15px_30px_rgba(37,99,235,0.3)]"
              >
                <span className="relative z-10 flex items-center font-bold">
                  Get Started{" "}
                  <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
