import React from "react";

function ExperiencePreview({ resumeInfo }) {
  return (
    <div className="space-y-6">
      {resumeInfo?.experience?.map((exp, index) => (
        <div key={index} className="relative">
          <div className="flex justify-between items-baseline">
            <h4 className="font-bold text-md text-slate-800">{exp.title}</h4>
            <span className="text-xs font-bold text-slate-500">{exp.startDate} — {exp.currentlyWorking ? "Present" : exp.endDate}</span>
          </div>
          <p className="text-sm font-semibold mb-2" style={{ color: resumeInfo?.themeColor }}>{exp.companyName}</p>
          <div
            className="text-xs text-slate-600 prose-sm prose-li:list-disc"
            dangerouslySetInnerHTML={{ __html: exp.workSummary }}
          />
        </div>
      ))}
    </div>
  );
}
export default ExperiencePreview;