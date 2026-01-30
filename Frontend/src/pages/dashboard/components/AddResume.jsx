import React, { useState } from "react";
import { Plus, Loader2, Sparkles, FilePlus2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createNewResume } from "@/Services/resumeAPI";
import { useNavigate } from "react-router-dom";

function AddResume() {
  const [isDialogOpen, setOpenDialog] = useState(false);
  const [resumetitle, setResumetitle] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createResume = async () => {
    if (!resumetitle.trim()) return;

    setLoading(true);
    const data = {
      data: {
        title: resumetitle,
        themeColor: "#2563eb", // Default to a professional blue
      },
    };

    try {
      const res = await createNewResume(data);
      navigate(`/dashboard/edit-resume/${res.data.resume._id}`);
    } catch (error) {
      console.error("Creation failed", error);
    } finally {
      setLoading(false);
      setResumetitle("");
      setOpenDialog(false);
    }
  };

  return (
    <>
      {/* --- ADD RESUME BUTTON --- */}
      <div
        className="group relative h-[315px] flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white hover:border-blue-500 hover:bg-blue-50/30 transition-all duration-500 cursor-pointer overflow-hidden"
        onClick={() => setOpenDialog(true)}
      >
        {/* Subtle Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="relative flex flex-col items-center gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-90 transition-all duration-500 shadow-sm">
            <Plus className="w-8 h-8" />
          </div>
          <div className="text-center">
            <h3 className="font-bold text-slate-600 group-hover:text-blue-700 transition-colors">
              Create New
            </h3>
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest mt-1">
              Blank Template
            </p>
          </div>
        </div>

        {/* AI Badge Decoration */}
        <div className="absolute bottom-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 group-hover:bg-blue-100 transition-colors">
          <Sparkles className="w-3 h-3 text-slate-400 group-hover:text-blue-600" />
          <span className="text-[10px] font-bold text-slate-500 group-hover:text-blue-700 uppercase">
            AI Ready
          </span>
        </div>
      </div>

      {/* --- CREATE DIALOG --- */}
      <Dialog open={isDialogOpen} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[425px] rounded-3xl border-none shadow-2xl p-8">
          <DialogHeader className="items-center text-center">
            <div className="h-12 w-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-2">
              <FilePlus2 className="text-blue-600 w-6 h-6" />
            </div>
            <DialogTitle className="text-2xl font-black text-slate-900 tracking-tight">
              New Resume
            </DialogTitle>
            <DialogDescription className="text-slate-500 font-medium">
              Give your new professional journey a title.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                Resume Title
              </label>
              <Input
                autoFocus
                className="h-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 font-medium px-4 shadow-sm"
                placeholder="e.g., Senior Frontend Engineer - 2026"
                value={resumetitle}
                onChange={(e) => setResumetitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && createResume()}
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end mt-2">
            <Button
              variant="ghost"
              className="rounded-xl font-bold text-slate-500 hover:text-slate-900"
              onClick={() => setOpenDialog(false)}
            >
              Cancel
            </Button>
            <Button
              className="rounded-xl bg-slate-900 hover:bg-blue-600 px-8 font-bold transition-all shadow-lg shadow-slate-200"
              onClick={createResume}
              disabled={!resumetitle.trim() || loading}
            >
              {loading ? (
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
              ) : (
                "Continue"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddResume;
