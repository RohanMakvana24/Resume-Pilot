import React from "react";

function EducationalPreview({ resumeInfo }) {
  const themeColor = resumeInfo?.themeColor || "#000000";

  return (
    <div className="flex flex-col gap-6">
      {resumeInfo?.education?.map((edu, index) => (
        <div key={index} className="group">
          <h4 className="text-sm font-bold text-slate-800 leading-tight">
            {edu.universityName}
          </h4>
          <p className="text-[13px] font-medium mt-1" style={{ color: themeColor }}>
            {edu.degree} {edu.major ? `in ${edu.major}` : ""}
          </p>
          <div className="flex justify-between items-center mt-1 text-[11px] font-semibold text-slate-500 italic">
            <span>{edu.startDate} — {edu.endDate}</span>
            {edu.grade && <span className="bg-slate-100 px-2 py-0.5 rounded">{edu.gradeType}: {edu.grade}</span>}
          </div>
          {edu.description && (
            <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
              {edu.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default EducationalPreview;