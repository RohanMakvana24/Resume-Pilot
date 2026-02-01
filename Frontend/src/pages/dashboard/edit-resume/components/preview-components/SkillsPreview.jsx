import React from "react";

function SkillsPreview({ resumeInfo }) {
  return (
    <div className="flex flex-wrap gap-2">
      {resumeInfo?.skills?.map((skill, index) => (
        <div
          key={index}
          className="px-3 py-1 text-[10px] font-bold border rounded-full uppercase tracking-tight"
          style={{ borderColor: `${resumeInfo?.themeColor}44`, color: '#334155' }}
        >
          {skill.name}
        </div>
      ))}
    </div>
  );
}
export default SkillsPreview;