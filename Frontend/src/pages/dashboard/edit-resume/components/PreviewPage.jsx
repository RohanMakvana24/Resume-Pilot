// PreviewPage.jsx - Updated for PDF generation
import React from "react";
import { useSelector } from "react-redux";
import SummaryPreview from "./preview-components/SummaryPreview";
import ExperiencePreview from "./preview-components/ExperiencePreview";
import EducationalPreview from "./preview-components/EducationalPreview";
import SkillsPreview from "./preview-components/SkillsPreview";
import ProjectPreview from "./preview-components/ProjectPreview";
import PersonalDeatailPreview from "./preview-components/PersonalDeatailPreview";

function PreviewPage() {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  return (
    <div className="resume-container print:shadow-none print:border-0">
      {/* Resume Content */}
      <div className="print:shadow-none print:border-0">
        {/* Header Banner */}
        <div
          className="h-3 w-full mb-8"
          style={{
            backgroundColor: resumeData?.themeColor || "#3b82f6",
          }}
        />

        <div className="p-6 md:p-8 lg:p-12 print:p-4">
          {/* Personal Details Section */}
          <div className="mb-10">
            <PersonalDeatailPreview resumeInfo={resumeData} />
          </div>

          {/* Summary Section */}
          {resumeData?.summary && (
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <div
                  className="w-1 h-6 rounded-full mr-3"
                  style={{
                    backgroundColor: resumeData?.themeColor || "#3b82f6",
                  }}
                ></div>
                <h2 className="text-xl font-bold text-gray-800 print:text-lg">
                  Professional Summary
                </h2>
              </div>
              <SummaryPreview resumeInfo={resumeData} />
            </div>
          )}

          {/* Experience Section */}
          {resumeData?.experience && resumeData.experience.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <div
                  className="w-1 h-6 rounded-full mr-3"
                  style={{
                    backgroundColor: resumeData?.themeColor || "#3b82f6",
                  }}
                ></div>
                <h2 className="text-xl font-bold text-gray-800 print:text-lg">
                  Work Experience
                </h2>
              </div>
              <ExperiencePreview resumeInfo={resumeData} />
            </div>
          )}

          {/* Projects Section */}
          {resumeData?.projects && resumeData.projects.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <div
                  className="w-1 h-6 rounded-full mr-3"
                  style={{
                    backgroundColor: resumeData?.themeColor || "#3b82f6",
                  }}
                ></div>
                <h2 className="text-xl font-bold text-gray-800 print:text-lg">
                  Projects
                </h2>
              </div>
              <ProjectPreview resumeInfo={resumeData} />
            </div>
          )}

          {/* Education Section */}
          {resumeData?.education && resumeData.education.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <div
                  className="w-1 h-6 rounded-full mr-3"
                  style={{
                    backgroundColor: resumeData?.themeColor || "#3b82f6",
                  }}
                ></div>
                <h2 className="text-xl font-bold text-gray-800 print:text-lg">
                  Education
                </h2>
              </div>
              <EducationalPreview resumeInfo={resumeData} />
            </div>
          )}

          {/* Skills Section */}
          {resumeData?.skills && resumeData.skills.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <div
                  className="w-1 h-6 rounded-full mr-3"
                  style={{
                    backgroundColor: resumeData?.themeColor || "#3b82f6",
                  }}
                ></div>
                <h2 className="text-xl font-bold text-gray-800 print:text-lg">
                  Skills
                </h2>
              </div>
              <SkillsPreview resumeInfo={resumeData} />
            </div>
          )}

          {/* Footer Note - Hidden in PDF */}
          <div className="no-print mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              Generated with Resume Builder • Last updated:{" "}
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Print-specific styles */}
      <style>
        {`
          @media print {
            .no-print {
              display: none !important;
            }
            body {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .resume-container {
              margin: 0 !important;
              padding: 0 !important;
            }
            .print-area {
              box-shadow: none !important;
              border: none !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default PreviewPage;
