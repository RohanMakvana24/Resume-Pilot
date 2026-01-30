// ResumeForm.jsx - Updated without Shadcn components
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PersonalDetails from "./form-components/PersonalDetails";
import Summary from "./form-components/Summary";
import Experience from "./form-components/Experience";
import Education from "./form-components/Education";
import Skills from "./form-components/Skills";
import Project from "./form-components/Project";
import {
  ArrowLeft,
  ArrowRight,
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Code,
  Folder,
  CheckCircle2,
  Save,
} from "lucide-react";

function ResumeForm() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const resumeInfo = useSelector((state) => state.editResume.resumeData);

  const sections = [
    {
      id: 0,
      title: "Personal Details",
      icon: User,
      component: PersonalDetails,
    },
    { id: 1, title: "Summary", icon: FileText, component: Summary },
    { id: 2, title: "Experience", icon: Briefcase, component: Experience },
    { id: 3, title: "Projects", icon: Folder, component: Project },
    { id: 4, title: "Education", icon: GraduationCap, component: Education },
    { id: 5, title: "Skills", icon: Code, component: Skills },
  ];

  const calculateProgress = () => {
    const totalSections = sections.length;
    const completedSections = sections.filter((section) => {
      const sectionKey = section.title.toLowerCase().replace(/\s+/g, "");
      return resumeInfo?.[sectionKey];
    }).length;
    return Math.round((completedSections / totalSections) * 100);
  };

  useEffect(() => {
    setProgress(calculateProgress());
  }, [resumeInfo]);

  const CurrentComponent = sections[currentIndex].component;

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Build Your Resume
            </h2>
            <p className="text-gray-500 text-sm">
              Step {currentIndex + 1} of {sections.length}
            </p>
          </div>
          <span className="px-3 py-1 border border-gray-300 rounded-full text-sm font-medium bg-gray-50">
            {progress}% Complete
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const sectionKey = section.title.toLowerCase().replace(/\s+/g, "");
            const isCompleted = resumeInfo?.[sectionKey];

            return (
              <button
                key={section.id}
                onClick={() => setCurrentIndex(index)}
                className={`flex flex-col items-center justify-center h-20 gap-2 p-2 rounded-lg transition-all relative ${
                  currentIndex === index
                    ? "bg-blue-50 border border-blue-200"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="relative">
                  <Icon
                    className={`w-5 h-5 ${
                      currentIndex === index ? "text-blue-600" : "text-gray-400"
                    }`}
                  />
                  {isCompleted && (
                    <CheckCircle2 className="w-4 h-4 text-green-500 absolute -top-1 -right-1" />
                  )}
                </div>
                <span className="text-xs font-medium text-center">
                  {section.title}
                </span>
                {currentIndex === index && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-xl shadow-sm border p-0 overflow-hidden">
        <div className="p-4 sm:p-6 border-b">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {React.createElement(sections[currentIndex].icon, {
                className: "w-6 h-6 text-blue-600",
              })}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {sections[currentIndex].title}
                </h3>
                <p className="text-sm text-gray-500">
                  {currentIndex === 0 &&
                    "Add your personal and contact information"}
                  {currentIndex === 1 &&
                    "Write a compelling professional summary"}
                  {currentIndex === 2 &&
                    "Detail your work experience and achievements"}
                  {currentIndex === 3 &&
                    "Showcase your projects and accomplishments"}
                  {currentIndex === 4 && "List your educational background"}
                  {currentIndex === 5 && "Add your skills and proficiencies"}
                </p>
              </div>
            </div>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
              {currentIndex + 1}/{sections.length}
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div className="min-h-[300px] sm:min-h-[400px]">
            <CurrentComponent
              resumeInfo={resumeInfo}
              enanbledNext={() => {}}
              enanbledPrev={() => {}}
              setEnabledNext={() => {}}
              setEnabledPrev={() => {}}
              enabledPrev={() => {}}
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-6 mt-6 border-t gap-4">
            <div className="flex items-center gap-2">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                className={`px-4 py-2 border rounded-lg flex items-center gap-2 text-sm font-medium ${
                  currentIndex === 0
                    ? "border-gray-200 text-gray-400 cursor-not-allowed"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
              {currentIndex === 0 && (
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm font-medium">
                  <Save className="w-4 h-4" />
                  Save Draft
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              {currentIndex < sections.length - 1 ? (
                <button
                  onClick={() =>
                    setCurrentIndex(
                      Math.min(sections.length - 1, currentIndex + 1)
                    )
                  }
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Complete Resume
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      {currentIndex === 1 && (
        <div className="border border-blue-100 bg-blue-50 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-900">Tip for Summary</h4>
              <p className="text-sm text-blue-700">
                Keep your summary concise (2-3 sentences). Focus on your key
                achievements and what you bring to the table.
              </p>
            </div>
          </div>
        </div>
      )}

      {currentIndex === 2 && (
        <div className="border border-amber-100 bg-amber-50 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Briefcase className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-amber-900">Experience Tips</h4>
              <p className="text-sm text-amber-700">
                Use action verbs and quantify achievements with numbers when
                possible. List experiences in reverse chronological order.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumeForm;
