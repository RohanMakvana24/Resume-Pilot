// PreviewPage.jsx - Updated without Shadcn components
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import PersonalDeatailPreview from "./preview-components/PersonalDeatailPreview";
import SummeryPreview from "./preview-components/SummaryPreview";
import ExperiencePreview from "./preview-components/ExperiencePreview";
import EducationalPreview from "./preview-components/EducationalPreview";
import SkillsPreview from "./preview-components/SkillsPreview";
import ProjectPreview from "./preview-components/ProjectPreview";

function PreviewPage() {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  const getProgress = () => {
    const sections = [
      "personal",
      "summary",
      "experience",
      "education",
      "skills",
      "projects",
    ];
    const completed = sections.filter(
      (section) => resumeData?.[section]
    ).length;
    return Math.round((completed / sections.length) * 100);
  };

  const getMissingSections = () => {
    const sections = [
      { key: "personal", label: "Personal Details" },
      { key: "summary", label: "Summary" },
      { key: "experience", label: "Experience" },
      { key: "education", label: "Education" },
      { key: "skills", label: "Skills" },
      { key: "projects", label: "Projects" },
    ];
    return sections
      .filter((section) => !resumeData?.[section.key])
      .map((s) => s.label);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Resume Completion Status */}
      <div className="mb-8 p-4 sm:p-6 bg-white rounded-xl shadow-sm border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Resume Progress
            </h3>
            <p className="text-sm text-gray-500">
              Complete all sections for best results
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              getProgress() === 100
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-gray-100 text-gray-800 border border-gray-200"
            }`}
          >
            {getProgress()}% Complete
          </span>
        </div>
        <div className="space-y-2">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-500 ease-out"
              style={{ width: `${getProgress()}%` }}
            />
          </div>
          {getMissingSections().length > 0 && (
            <p className="text-sm text-amber-600">
              Missing: {getMissingSections().join(", ")}
            </p>
          )}
        </div>
      </div>

      {/* Resume Preview Container */}
      <div className="shadow-2xl border-0 overflow-hidden bg-white rounded-lg">
        {/* Header Banner */}
        <div
          className="h-3 w-full"
          style={{
            backgroundColor: resumeData?.themeColor || "#3b82f6",
          }}
        />

        <div className="p-6 md:p-8 lg:p-12">
          {/* Personal Details Section */}
          <div className="mb-8">
            <PersonalDeatailPreview resumeInfo={resumeData} />
          </div>

          {/* Summary Section */}
          {resumeData?.summary && (
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <div className="w-1 h-6 bg-blue-600 rounded-full mr-3"></div>
                <h2 className="text-xl font-bold text-gray-800">
                  Professional Summary
                </h2>
              </div>
              <SummeryPreview resumeInfo={resumeData} />
            </div>
          )}

          {/* Experience Section */}
          {resumeData?.experience && resumeData.experience.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <div className="w-1 h-6 bg-blue-600 rounded-full mr-3"></div>
                <h2 className="text-xl font-bold text-gray-800">
                  Work Experience
                </h2>
              </div>
              <ExperiencePreview resumeInfo={resumeData} />
            </div>
          )}

          {/* Projects Section */}
          {resumeData?.projects && resumeData.projects.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <div className="w-1 h-6 bg-blue-600 rounded-full mr-3"></div>
                <h2 className="text-xl font-bold text-gray-800">Projects</h2>
              </div>
              <ProjectPreview resumeInfo={resumeData} />
            </div>
          )}

          {/* Education Section */}
          {resumeData?.education && resumeData.education.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <div className="w-1 h-6 bg-blue-600 rounded-full mr-3"></div>
                <h2 className="text-xl font-bold text-gray-800">Education</h2>
              </div>
              <EducationalPreview resumeInfo={resumeData} />
            </div>
          )}

          {/* Skills Section */}
          {resumeData?.skills && resumeData.skills.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <div className="w-1 h-6 bg-blue-600 rounded-full mr-3"></div>
                <h2 className="text-xl font-bold text-gray-800">Skills</h2>
              </div>
              <SkillsPreview resumeInfo={resumeData} />
            </div>
          )}

          {/* Footer Note */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              Generated with Resume Builder • Last updated:{" "}
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewPage;
