import React from "react";
import { useSelector } from "react-redux";
import PersonalDetailPreview from "./preview-components/PersonalDeatailPreview";
import SummeryPreview from "./preview-components/SummaryPreview";
import ExperiencePreview from "./preview-components/ExperiencePreview";
import ProjectPreview from "./preview-components/ProjectPreview";
import SkillsPreview from "./preview-components/SkillsPreview";
import EducationalPreview from "./preview-components/EducationalPreview";


function PreviewPage() {
  const resumeData = useSelector((state) => state.editResume.resumeData);
  const themeColor = resumeData?.themeColor || "#000000";

  return (
    <div className="p-0 m-0 font-sans text-gray-900 leading-relaxed">
      {/* Header Section */}
      <header className="bg-slate-900 text-white p-10 flex justify-between items-end" style={{ borderBottom: `6px solid ${themeColor}` }}>
        <PersonalDetailPreview resumeInfo={resumeData} isHeader={true} />
      </header>

      <div className="grid grid-cols-12 min-h-[250mm]">
        {/* Main Content (Left) */}
        <div className="col-span-8 p-10 border-r border-gray-100">
          <section className="mb-8">
            <h3 className="text-lg font-bold uppercase tracking-widest mb-2" style={{ color: themeColor }}>Summary</h3>
            <SummeryPreview resumeInfo={resumeData} />
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-bold uppercase tracking-widest mb-5  pb-1" style={{ borderColor: themeColor, color: themeColor }}>Experience</h3>
            <ExperiencePreview resumeInfo={resumeData} />
          </section>

          <section>
            <h3 className="text-lg font-bold uppercase tracking-widest mb-4 pb-1" style={{ borderColor: themeColor, color: themeColor }}>Projects</h3>
            <ProjectPreview resumeInfo={resumeData} />
          </section>
        </div>

        {/* Sidebar (Right) */}
        <div className="col-span-4 p-8 bg-slate-50/50">
          <section className="mb-10">
            <h3 className="text-sm font-black uppercase tracking-widest mb-4 text-slate-400">Skills</h3>
            <SkillsPreview resumeInfo={resumeData} />
          </section>

          <section>
            <h3 className="text-sm font-black uppercase tracking-widest mb-4 text-slate-400">Education</h3>
            <EducationalPreview resumeInfo={resumeData} />
          </section>
        </div>
      </div>
    </div>
  );
}

export default PreviewPage;