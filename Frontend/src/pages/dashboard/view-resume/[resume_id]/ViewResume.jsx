import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getResumeData } from "@/Services/resumeAPI";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { RWebShare } from "react-web-share";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PreviewPage from "../../edit-resume/components/PreviewPage";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState({});
  const [isDownloading, setIsDownloading] = useState(false);
  const { resume_id } = useParams();
  const dispatch = useDispatch();
  const resumeRef = useRef(null);

  useEffect(() => {
    fetchResumeInfo();
  }, []);

  const fetchResumeInfo = async () => {
    const response = await getResumeData(resume_id);
    setResumeInfo(response.data);
    dispatch(addResumeData(response.data));
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    const element = resumeRef.current;

    try {
      const canvas = await html2canvas(element, {
        scale: 2, // High resolution
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const widthRatio = pageWidth / canvas.width;
      const finalWidth = canvas.width * widthRatio;
      const finalHeight = canvas.height * widthRatio;

      pdf.addImage(imgData, "JPEG", 0, 0, finalWidth, finalHeight);
      pdf.save(`${resumeInfo?.firstName || "Resume"}_CV.pdf`);
      toast.success("Resume downloaded!");
    } catch (error) {
      toast.error("Download failed");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 mt-[100px]">
      <div id="no-print" className="py-10 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Your Resume is Ready</h2>
        <p className="text-gray-500 mb-6">Download your professional CV below</p>
        <div className="flex justify-center gap-4">
          <Button onClick={handleDownload} disabled={isDownloading}>
            {isDownloading ? "Generating..." : "Download Professional PDF"}
          </Button>
        </div>
      </div>

      <div ref={resumeRef} className="w-[210mm] min-h-[297mm] mx-auto bg-white shadow-2xl overflow-hidden">
        <PreviewPage />
      </div>
    </div>
  );
}

export default ViewResume;