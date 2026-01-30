import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getResumeData } from "@/Services/resumeAPI";
import ResumePreview from "../../edit-resume/components/PreviewPage";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { RWebShare } from "react-web-share";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = React.useState({});
  const { resume_id } = useParams();
  const dispatch = useDispatch();
  const resumeRef = useRef(null);

  useEffect(() => {
    fetchResumeInfo();
  }, []);

  const fetchResumeInfo = async () => {
    const response = await getResumeData(resume_id);
    dispatch(addResumeData(response.data));
  };

  const handlePrint = () => {
    window.print();
  };

  const downloadPDF = async () => {
    if (!resumeRef.current) {
      toast.error("Could not generate PDF");
      return;
    }

    try {
      const element = resumeRef.current;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = 210;
      const pdfHeight = 297;
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`resume_${resume_id || "download"}.pdf`);

      toast.success("PDF downloaded");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to download PDF");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div id="noPrint">
          <div className="my-10 mx-10 md:mx-20 lg:mx-36">
            <h2 className="text-center text-2xl font-medium">
              Congrats! Your Ultimate AI generates Resume is ready !{" "}
            </h2>
            <p className="text-center text-gray-400">
              Now you are ready to download your resume and you can share unique
              resume url with your friends and family{" "}
            </p>
            <div className="flex justify-between px-44 my-10 gap-4">
              <Button onClick={handlePrint}>Print</Button>
              <Button onClick={downloadPDF}>Download PDF</Button>
              <RWebShare
                data={{
                  text: "Hello This is My resume",
                  url:
                    import.meta.env.VITE_BASE_URL +
                    "/dashboard/view-resume/" +
                    resume_id,
                  title: "Flamingos",
                }}
                onClick={() => toast("Resume Shared Successfully")}
              >
                <Button>Share</Button>
              </RWebShare>
            </div>
          </div>
        </div>

        <div ref={resumeRef}>
          <div
            className="bg-white rounded-lg p-8 print-area"
            style={{ width: "210mm", height: "297mm" }}
          >
            <div className="print">
              <ResumePreview />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewResume;
