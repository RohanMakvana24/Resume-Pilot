import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle, Trash2, Plus, Building, MapPin, Calendar, Briefcase, Save } from "lucide-react";
import RichTextEditor from "@/components/custom/RichTextEditor";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { useParams } from "react-router-dom";
import { updateThisResume } from "@/Services/resumeAPI";
import { toast } from "sonner";

const formFields = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  currentlyWorking: false,
  workSummary: "",
};

function Experience({ resumeInfo, enanbledNext, enanbledPrev }) {
  const [experienceList, setExperienceList] = useState(resumeInfo?.experience || []);
  const [loading, setLoading] = useState(false);
  const { resume_id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(addResumeData({ ...resumeInfo, experience: experienceList }));
    } catch (error) {
      console.error("Error in experience context update", error.message);
    }
  }, [experienceList]);

  const addExperience = () => {
    setExperienceList([...experienceList, formFields]);
    if (enanbledNext) enanbledNext(false);
    if (enanbledPrev) enanbledPrev(false);
  };

  const removeExperience = (index) => {
    const list = [...experienceList];
    const newList = list.filter((_, i) => i !== index);
    setExperienceList(newList);
    if (enanbledNext) enanbledNext(false);
    if (enanbledPrev) enanbledPrev(false);
  };

  const handleChange = (e, index) => {
    if (enanbledNext) enanbledNext(false);
    if (enanbledPrev) enanbledPrev(false);
    const { name, value, type, checked } = e.target;
    const list = [...experienceList];
    const newListData = {
      ...list[index],
      [name]: type === 'checkbox' ? checked : value,
    };
    list[index] = newListData;
    setExperienceList(list);
  };

  const handleCheckboxChange = (checked, index) => {
    if (enanbledNext) enanbledNext(false);
    if (enanbledPrev) enanbledPrev(false);
    const list = [...experienceList];
    const newListData = {
      ...list[index],
      currentlyWorking: checked,
      endDate: checked ? "" : list[index].endDate,
    };
    list[index] = newListData;
    setExperienceList(list);
  };

  const handleRichTextEditor = (value, name, index) => {
    const list = [...experienceList];
    const newListData = {
      ...list[index],
      [name]: value,
    };
    list[index] = newListData;
    setExperienceList(list);
  };

  const calculateDuration = (startDate, endDate, currentlyWorking) => {
    if (!startDate) return "";

    const start = new Date(startDate);
    const end = currentlyWorking ? new Date() : new Date(endDate);

    if (isNaN(start.getTime())) return "";

    const years = end.getFullYear() - start.getFullYear();
    const months = end.getMonth() - start.getMonth();

    let totalMonths = years * 12 + months;
    if (totalMonths < 0) totalMonths = 0;

    const yearsPart = Math.floor(totalMonths / 12);
    const monthsPart = totalMonths % 12;

    const durationParts = [];
    if (yearsPart > 0) durationParts.push(`${yearsPart} yr${yearsPart !== 1 ? 's' : ''}`);
    if (monthsPart > 0) durationParts.push(`${monthsPart} mo${monthsPart !== 1 ? 's' : ''}`);

    return durationParts.join(' ') || "0 months";
  };

  const onSave = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        experience: experienceList,
      },
    };

    if (resume_id) {
      try {
        await updateThisResume(resume_id, data);
        toast.success("Experience updated successfully");
        if (enanbledNext) enanbledNext(true);
        if (enanbledPrev) enanbledPrev(true);
      } catch (error) {
        toast.error(error.message || "Failed to update experience");
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 border-t-4 border-t-blue-500 mt-4 md:mt-8 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 md:mb-8">
        <div className="p-2 rounded-full bg-blue-100">
          <Briefcase className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            Work Experience
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            List your professional work history, starting with the most recent
          </p>
        </div>
      </div>

      <form onSubmit={onSave}>
        <div className="space-y-6">
          {experienceList.length === 0 ? (
            <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg">
              <Briefcase className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                No experience added yet
              </h3>
              <p className="text-gray-500 mb-4">
                Add your first work experience to showcase your career journey
              </p>
              <Button
                type="button"
                onClick={addExperience}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add First Experience
              </Button>
            </div>
          ) : (
            experienceList.map((experience, index) => (
              <div key={index} className="border border-gray-200 rounded-lg shadow-sm p-4 md:p-6">
                {/* Experience Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-blue-100">
                      <Building className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {experience.title || `Experience ${index + 1}`}
                      </h3>
                      {experience.companyName && (
                        <p className="text-sm text-gray-500">
                          {experience.companyName}
                          {experience.city && ` • ${experience.city}, ${experience.state}`}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-xs border border-gray-300 rounded-full">
                      #{index + 1}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExperience(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-md"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">Remove</span>
                    </Button>
                  </div>
                </div>

                {/* Experience Form */}
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-4">
                      Basic Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">
                          <Briefcase className="h-3 w-3 inline mr-1" />
                          Position Title *
                        </label>
                        <Input
                          type="text"
                          name="title"
                          value={experience?.title || ""}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="e.g., Senior Software Engineer"
                          required
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">
                          <Building className="h-3 w-3 inline mr-1" />
                          Company Name *
                        </label>
                        <Input
                          type="text"
                          name="companyName"
                          value={experience?.companyName || ""}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="e.g., Google, Microsoft"
                          required
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">
                          <MapPin className="h-3 w-3 inline mr-1" />
                          City
                        </label>
                        <Input
                          type="text"
                          name="city"
                          value={experience?.city || ""}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="e.g., San Francisco"
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">
                          <MapPin className="h-3 w-3 inline mr-1" />
                          State / Province
                        </label>
                        <Input
                          type="text"
                          name="state"
                          value={experience?.state || ""}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="e.g., California"
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dates */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-4">
                      Employment Period
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">
                          <Calendar className="h-3 w-3 inline mr-1" />
                          Start Date *
                        </label>
                        <Input
                          type="month"
                          name="startDate"
                          value={experience?.startDate || ""}
                          onChange={(e) => handleChange(e, index)}
                          required
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">
                          <Calendar className="h-3 w-3 inline mr-1" />
                          End Date
                        </label>
                        <Input
                          type="month"
                          name="endDate"
                          value={experience?.endDate || ""}
                          onChange={(e) => handleChange(e, index)}
                          disabled={experience?.currentlyWorking}
                          placeholder={experience?.currentlyWorking ? "Present" : ""}
                          className={`w-full ${experience?.currentlyWorking ? 'bg-gray-100' : ''}`}
                        />
                      </div>

                      <div className="flex items-center space-x-2 pt-6">
                        <input
                          type="checkbox"
                          id={`currentlyWorking-${index}`}
                          checked={experience?.currentlyWorking || false}
                          onChange={(e) => handleCheckboxChange(e.target.checked, index)}
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <label htmlFor={`currentlyWorking-${index}`} className="text-sm text-gray-700 cursor-pointer">
                          I currently work here
                        </label>
                      </div>
                    </div>

                    {/* Duration Display */}
                    {(experience.startDate || experience.endDate) && (
                      <div className="text-sm text-gray-600 flex items-center gap-2 mt-3">
                        <Calendar className="h-3 w-3" />
                        <span>
                          Duration: {calculateDuration(
                            experience.startDate,
                            experience.endDate,
                            experience.currentlyWorking
                          )}
                          {experience.currentlyWorking && " • Present"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Work Summary */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Work Summary & Achievements *
                    </label>
                    <RichTextEditor
                      index={index}
                      defaultValue={experience?.workSummary || ""}
                      onRichTextEditorChange={(event) =>
                        handleRichTextEditor(event, "workSummary", index)
                      }
                      resumeInfo={resumeInfo}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Describe your responsibilities, achievements, and key contributions
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-200">
          <Button
            type="button"
            onClick={addExperience}
            variant="outline"
            className="w-full sm:w-auto border-blue-600 text-blue-600 hover:bg-blue-50"
            size="lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            {experienceList.length > 0 ? "Add Another Experience" : "Add Experience"}
          </Button>

          {experienceList.length > 0 && (
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto min-w-[140px] bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              {loading ? (
                <>
                  <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save All Experiences
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Experience;