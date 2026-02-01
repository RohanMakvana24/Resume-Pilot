import React from "react";

function ProjectPreview({ resumeInfo }) {
  const themeColor = resumeInfo?.themeColor || "#1e293b";

  if (!resumeInfo?.projects || resumeInfo.projects.length === 0) return null;

  return (
    <div className="flex flex-col gap-6">
      {resumeInfo.projects.map((project, index) => (
        <div key={index} className="relative">
          {/* Project Title & Link Placeholder */}
          <div className="flex justify-between items-baseline mb-1">
            <h4 className="font-bold text-md text-slate-800 tracking-tight">
              {project?.projectName}
            </h4>
            {project?.startDate && (
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                {project.startDate}
              </span>
            )}
          </div>

          {/* Tech Stack - Styled as subtle labels */}
          {project?.techStack && (
            <div className="flex flex-wrap gap-1 mb-2">
              {project.techStack.split(",").map((tech, i) => (
                <span
                  key={i}
                  className="text-[10px] font-medium px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded border border-slate-200"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
          )}

          {/* Project Summary - Bullet points or description */}
          <div
            className="text-xs text-slate-600 leading-relaxed prose-sm prose-li:list-disc"
            dangerouslySetInnerHTML={{ __html: project?.projectSummary }}
          />

          {/* Subtle separator for multiple projects except the last one */}
          {index !== resumeInfo.projects.length - 1 && (
            <div className="mt-6 border-b border-slate-50 w-1/4" />
          )}
        </div>
      ))}
    </div>
  );
}

export default ProjectPreview;