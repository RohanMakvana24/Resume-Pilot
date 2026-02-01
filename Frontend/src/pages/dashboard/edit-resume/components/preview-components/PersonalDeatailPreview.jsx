import React from "react";

function PersonalDetailPreview({ resumeInfo }) {
  return (
    <div className="w-full">
      <h1 className="text-4xl font-extrabold uppercase tracking-tighter">
        {resumeInfo?.firstName} <span style={{ color: resumeInfo?.themeColor || '#3b82f6' }}>{resumeInfo?.lastName}</span>
      </h1>
      <p className="text-xl font-light opacity-90 mt-1">{resumeInfo?.jobTitle}</p>
      <div className="flex flex-wrap gap-4 mt-4 text-xs font-medium opacity-80">
        <span>{resumeInfo?.email}</span>
        <span>{resumeInfo?.phone}</span>
        <span>{resumeInfo?.address}</span>
      </div>
    </div>
  );
}
export default PersonalDetailPreview;