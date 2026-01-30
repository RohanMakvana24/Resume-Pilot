import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getResumeData } from "@/Services/resumeAPI";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { RWebShare } from "react-web-share";
import { toast } from "sonner";
import PreviewPage from "../../edit-resume/components/PreviewPage";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = React.useState({});
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

  const handleStandardDownload = () => {
    window.print();
  };

  const handleFullSizePDFDownload = async () => {
    setIsDownloading(true);
    try {
      const element = resumeRef.current;
      if (!element) return;

      // Hide the progress bar and footer elements
      const elementsToHide = element.querySelectorAll(".no-print");
      elementsToHide.forEach((el) => (el.style.display = "none"));

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save(`${resumeInfo.name || "resume"}-full.pdf`);

      // Show hidden elements again
      elementsToHide.forEach((el) => (el.style.display = ""));

      toast.success("Full-size PDF downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to download PDF");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleHighQualityPDFDownload = async () => {
    setIsDownloading(true);
    try {
      const element = resumeRef.current;
      if (!element) return;

      // Hide the progress bar and footer elements
      const elementsToHide = element.querySelectorAll(".no-print");
      elementsToHide.forEach((el) => (el.style.display = "none"));

      const canvas = await html2canvas(element, {
        scale: 3, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");

      // Calculate dimensions for A4
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Add image to PDF
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resumeInfo.name || "resume"}-high-quality.pdf`);

      // Show hidden elements again
      elementsToHide.forEach((el) => (el.style.display = ""));

      toast.success("High-quality PDF downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to download PDF");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-[100px]">
        <div id="noPrint">
          <div className="my-10 mx-10 md:mx-20 lg:mx-36">
            <h2 className="text-center text-2xl font-medium">
              Congrats! Your Ultimate AI generated Resume is ready!
            </h2>
            <p className="text-center text-gray-400">
              Now you are ready to download your resume and you can share unique
              resume url with your friends and family
            </p>
            <div className="flex flex-wrap justify-center gap-4 my-10 px-4">
              <Button onClick={handleStandardDownload} variant="outline">
                Standard Print
              </Button>
              <Button
                onClick={handleFullSizePDFDownload}
                disabled={isDownloading}
              >
                {isDownloading ? "Generating PDF..." : "Download Full PDF"}
              </Button>
              <Button
                onClick={handleHighQualityPDFDownload}
                disabled={isDownloading}
                variant="secondary"
              >
                {isDownloading ? "Generating..." : "High Quality PDF"}
              </Button>
              <RWebShare
                data={{
                  text: "Check out my resume!",
                  url: `${
                    import.meta.env.VITE_BASE_URL
                  }/dashboard/view-resume/${resume_id}`,
                  title: "My Resume",
                }}
                onClick={() => toast.success("Resume Shared Successfully")}
              >
                <Button variant="outline">Share URL</Button>
              </RWebShare>
            </div>
          </div>
        </div>
        <div ref={resumeRef} id="pdf-content">
          <div
            className="bg-white rounded-lg p-8 print-area mx-auto"
            style={{
              width: "210mm",
              minHeight: "297mm",
              margin: "0 auto",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <PreviewPage />
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewResume;
