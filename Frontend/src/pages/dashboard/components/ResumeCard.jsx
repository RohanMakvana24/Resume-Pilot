import React, { useState } from "react";
import { Eye, Edit3, Trash2, FileText, Calendar, Sparkles } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteThisResume } from "@/Services/resumeAPI";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function ResumeCard({ resume, refreshData }) {
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteThisResume(resume._id);
      refreshData();
      toast.success("Resume deleted successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setOpenAlert(false);
    }
  };

  return (
    <div className="group relative bg-white border border-slate-200 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-1.5 overflow-hidden">
      {/* --- Preview Area --- */}
      <div
        onClick={() => navigate(`/dashboard/edit-resume/${resume._id}`)}
        className="h-48 bg-slate-50 flex items-center justify-center relative cursor-pointer overflow-hidden border-b border-slate-100"
      >
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600" />

        {/* Abstract File Icon */}
        <div className="relative">
          <FileText className="w-16 h-16 text-slate-200 group-hover:scale-110 group-hover:text-blue-100 transition-all duration-700 ease-out" />
          <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Hover Overlay Button */}
        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
          <Button
            variant="secondary"
            className="rounded-full font-bold shadow-xl border-none px-6"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Edit Resume
          </Button>
        </div>
      </div>

      {/* --- Content Area --- */}
      <div className="p-5">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1.5">
              <h3 className="font-extrabold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors tracking-tight">
                {resume.title}
              </h3>
              <div className="flex items-center text-[10px] text-slate-400 font-black uppercase tracking-[0.15em]">
                <Calendar className="w-3 h-3 mr-1 text-slate-300" />
                Active Pilot Mode
              </div>
            </div>

            {/* --- NEW CLEAN ACTION BUTTONS --- */}
            <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-100">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-white hover:shadow-sm transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/dashboard/view-resume/${resume._id}`);
                }}
              >
                <Eye className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenAlert(true);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* --- Quality Indicator --- */}
          <div className="pt-2">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase">
                AI Score
              </span>
              <span className="text-[10px] font-black text-blue-600 uppercase italic">
                Excellent
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full w-[85%] transition-all duration-1000 group-hover:w-[92%]" />
            </div>
          </div>
        </div>
      </div>

      {/* --- Delete Confirmation --- */}
      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent className="rounded-3xl border-none shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-black text-slate-900">
              Delete Resume?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500">
              You are about to delete{" "}
              <span className="font-bold text-blue-600">"{resume.title}"</span>.
              This action is irreversible. Are you sure you want to proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel className="rounded-xl border-slate-200 font-bold">
              Nevermind
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="rounded-xl bg-red-500 hover:bg-red-600 font-bold shadow-lg shadow-red-200"
              disabled={loading}
            >
              {loading ? "Deleting..." : "Yes, Delete It"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ResumeCard;
