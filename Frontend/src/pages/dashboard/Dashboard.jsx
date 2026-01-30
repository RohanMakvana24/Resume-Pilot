import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllResumeData } from "@/Services/resumeAPI";
import AddResume from "./components/AddResume";
import ResumeCard from "./components/ResumeCard";
import { LayoutGrid, Sparkles } from "lucide-react";

function Dashboard() {
  const user = useSelector((state) => state.editUser.userData);
  const [resumeList, setResumeList] = useState([]);

  const fetchAllResumeData = async () => {
    try {
      const resumes = await getAllResumeData();
      setResumeList(resumes.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllResumeData();
  }, [user]);

  return (
    <div className="min-h-screen bg-slate-50/50 mt-[100px] p-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="font-black text-4xl text-slate-900 tracking-tight flex items-center gap-3">
              My Workspace
            </h2>
            <p className="text-slate-500 mt-2 font-medium">
              Create and manage high-performance resumes with AI.
            </p>
          </div>

          <div className="bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-sm flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Sparkles className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm font-bold text-slate-700">
              {resumeList.length} Resumes Created
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AddResume />
          {resumeList.length > 0 &&
            resumeList.map((resume) => (
              <ResumeCard
                key={resume._id}
                resume={resume}
                refreshData={fetchAllResumeData}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
