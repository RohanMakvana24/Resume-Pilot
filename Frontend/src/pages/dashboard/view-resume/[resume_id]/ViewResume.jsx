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
import { Download, Share2, Printer, ChevronLeft } from "lucide-react";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState({});
  const [isDownloading, setIsDownloading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { resume_id } = useParams();
  const dispatch = useDispatch();
  const resumeRef = useRef(null);

  useEffect(() => {
    fetchResumeInfo();
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  const fetchResumeInfo = async () => {
    try {
      const response = await getResumeData(resume_id);
      setResumeInfo(response.data);
      dispatch(addResumeData(response.data));
    } catch (error) {
      toast.error("Failed to load resume data");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    if (!resumeRef.current) return;

    setIsDownloading(true);
    const toastId = toast.loading("Generating professional PDF...");

    try {
      // Store original styles
      const originalWidth = resumeRef.current.style.width;
      const originalMargin = resumeRef.current.style.margin;

      // Set A4 dimensions for PDF generation
      resumeRef.current.style.width = "210mm";
      resumeRef.current.style.margin = "0 auto";

      const canvas = await html2canvas(resumeRef.current, {
        scale: isMobile ? 3 : 2, // Higher scale for mobile
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        windowWidth: 210 * 3.78, // Convert mm to pixels
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Calculate dimensions to fit page
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Center vertically if content is shorter than page
      const yOffset = imgHeight < pageHeight ? (pageHeight - imgHeight) / 2 : 0;

      pdf.addImage(imgData, "JPEG", 0, yOffset, imgWidth, imgHeight);

      // Restore original styles
      resumeRef.current.style.width = originalWidth;
      resumeRef.current.style.margin = originalMargin;

      pdf.save(`${resumeInfo?.firstName || "Resume"}_${resumeInfo?.lastName || ""}_CV.pdf`.trim() + ".pdf");

      toast.success("PDF downloaded successfully!", { id: toastId });
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF. Please try again.", { id: toastId });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share && isMobile) {
      navigator.share({
        title: `${resumeInfo?.firstName || "My"} Resume`,
        text: "Check out my professional resume",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20 print:bg-white mt-[100px]">
      {/* Control Bar - Hidden on print */}
      <div id="no-print" className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200 print:hidden">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => window.history.back()}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-gray-800">
                  {resumeInfo?.firstName ? `${resumeInfo.firstName}'s Resume` : "Your Resume"}
                </h1>
                <p className="text-sm text-gray-500">Ready to download and share</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                onClick={handleDownload}
                disabled={isDownloading}
                size={isMobile ? "sm" : "default"}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {isDownloading ? "Generating..." : "Download PDF"}
                </span>
              </Button>

              <Button
                onClick={handleShare}
                variant="outline"
                size={isMobile ? "sm" : "default"}
                className="flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {isMobile ? "Share" : "Copy Link"}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 print:py-0">
        {/* Instructions Banner - Hidden on mobile and print */}
        <div id="no-print" className="hidden md:block mb-8 bg-blue-50 border border-blue-100 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Download className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Professional Resume Ready</h3>
              <p className="text-gray-600 mb-3">
                Your AI-generated resume is optimized for ATS scanning and professional review.
                Download the PDF version for best quality.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  ATS-Friendly Format
                </span>
                <span className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  Print-Ready
                </span>
                <span className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                  Mobile Optimized
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Container */}
        <div className="flex flex-col items-center">
          {/* Mobile Preview Notice */}
          {isMobile && (
            <div id="no-print" className="w-full mb-4 p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
              <p className="text-sm text-yellow-800 text-center">
                <strong>Tip:</strong> For best results, rotate your device to landscape or download the PDF
              </p>
            </div>
          )}

          {/* Preview Area with Responsive Sizing */}
          <div
            ref={resumeRef}
            className={`
              w-full max-w-[210mm] 
              min-h-[297mm] 
              bg-white 
              shadow-2xl 
              rounded-lg 
              overflow-hidden 
              print:shadow-none 
              print:rounded-none
              print:max-w-none
              ${isMobile ? 'scale-90' : 'scale-100'}
              transition-transform duration-300
            `}
          >
            <PreviewPage />
          </div>

          {/* Download Stats - Hidden on mobile and print */}
          <div id="no-print" className="hidden md:block mt-8 text-center">
            <p className="text-sm text-gray-500">
              This resume template is used by <strong>1,000+</strong> professionals worldwide
            </p>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          #no-print {
            display: none !important;
          }
          
          body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }
          
          .container {
            max-width: none !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          
          .shadow-2xl, .rounded-lg {
            box-shadow: none !important;
            border-radius: 0 !important;
          }
          
          /* Ensure A4 size */
          @page {
            size: A4;
            margin: 0;
          }
        }
        
        @media screen and (max-width: 768px) {
          .container {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}

export default ViewResume;