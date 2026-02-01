import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle, GraduationCap, BookOpen, Calendar, Award, Trash2, Plus, Save } from "lucide-react";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { updateThisResume } from "@/Services/resumeAPI";

const formFields = {
  universityName: "",
  degree: "",
  major: "",
  grade: "",
  gradeType: "CGPA",
  startDate: "",
  endDate: "",
  description: "",
};

function Education({ resumeInfo, enanbledNext }) {
  const [educationalList, setEducationalList] = useState(
    resumeInfo?.education || [{ ...formFields }]
  );
  const { resume_id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(addResumeData({ ...resumeInfo, education: educationalList }));
  }, [educationalList]);

  const AddNewEducation = () => {
    setEducationalList([...educationalList, { ...formFields }]);
    if (enanbledNext) enanbledNext(false);
  };

  const RemoveEducation = (index) => {
    if (educationalList.length <= 1) {
      toast.error("You must have at least one education entry");
      return;
    }
    const list = [...educationalList];
    list.splice(index, 1);
    setEducationalList(list);
    if (enanbledNext) enanbledNext(false);
  };

  const onSave = async (e) => {
    if (e) e.preventDefault();

    if (educationalList.length === 0) {
      toast.error("Please add at least one education entry");
      return;
    }

    setLoading(true);
    const data = {
      data: {
        education: educationalList,
      },
    };

    if (resume_id) {
      try {
        await updateThisResume(resume_id, data);
        toast.success("Education updated successfully");
        if (enanbledNext) enanbledNext(true);
      } catch (error) {
        toast.error(error.message || "Failed to update education");
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e, index) => {
    if (enanbledNext) enanbledNext(false);
    const { name, value } = e.target;
    const list = [...educationalList];
    const newListData = {
      ...list[index],
      [name]: value,
    };
    list[index] = newListData;
    setEducationalList(list);
  };

  const handleSelectChange = (value, index) => {
    if (enanbledNext) enanbledNext(false);
    const list = [...educationalList];
    const newListData = {
      ...list[index],
      gradeType: value,
    };
    list[index] = newListData;
    setEducationalList(list);
  };

  const getDegreeBadge = (degree) => {
    if (!degree) return null;
    const lowerDegree = degree.toLowerCase();
    if (lowerDegree.includes('phd') || lowerDegree.includes('doctor')) {
      return { color: "bg-purple-100 text-purple-800", label: "PhD" };
    }
    if (lowerDegree.includes('master') || lowerDegree.includes('ms') || lowerDegree.includes('mba')) {
      return { color: "bg-blue-100 text-blue-800", label: "Master's" };
    }
    if (lowerDegree.includes('bachelor') || lowerDegree.includes('bs') || lowerDegree.includes('ba')) {
      return { color: "bg-green-100 text-green-800", label: "Bachelor's" };
    }
    if (lowerDegree.includes('associate') || lowerDegree.includes('diploma')) {
      return { color: "bg-yellow-100 text-yellow-800", label: "Associate" };
    }
    return { color: "bg-gray-100 text-gray-800", label: degree };
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 border-t-4 border-t-blue-500 mt-4 md:mt-8 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 md:mb-8">
        <div className="p-2 rounded-full bg-blue-100">
          <GraduationCap className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            Education
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Add your academic qualifications and achievements
          </p>
        </div>
      </div>

      <form onSubmit={onSave}>
        <div className="space-y-6">
          {educationalList.map((item, index) => {
            const degreeBadge = getDegreeBadge(item.degree);
            return (
              <div key={index} className="border border-gray-200 rounded-lg shadow-sm p-4 md:p-6">
                {/* Education Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-blue-100">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.universityName || `Education ${index + 1}`}
                      </h3>
                      {(item.degree || item.major) && (
                        <p className="text-sm text-gray-500">
                          {item.degree} {item.major && `• ${item.major}`}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {degreeBadge && (
                      <span className={`px-3 py-1 text-xs rounded-full ${degreeBadge.color}`}>
                        {degreeBadge.label}
                      </span>
                    )}
                    <span className="px-2 py-1 text-xs border border-gray-300 rounded-full">
                      #{index + 1}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => RemoveEducation(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-md"
                      disabled={educationalList.length <= 1}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">Remove</span>
                    </Button>
                  </div>
                </div>

                {/* Education Form */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">
                        <GraduationCap className="h-3 w-3 inline mr-1" />
                        University/Institution *
                      </label>
                      <Input
                        name="universityName"
                        value={item?.universityName || ""}
                        onChange={(e) => handleChange(e, index)}
                        placeholder="e.g., Stanford University"
                        required
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">
                        <Award className="h-3 w-3 inline mr-1" />
                        Degree *
                      </label>
                      <Input
                        name="degree"
                        value={item?.degree || ""}
                        onChange={(e) => handleChange(e, index)}
                        placeholder="e.g., Bachelor of Science"
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">
                        <BookOpen className="h-3 w-3 inline mr-1" />
                        Major/Field of Study
                      </label>
                      <Input
                        name="major"
                        value={item?.major || ""}
                        onChange={(e) => handleChange(e, index)}
                        placeholder="e.g., Computer Science"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">
                        Grade & Type
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <select
                            value={item?.gradeType || "CGPA"}
                            onChange={(e) => handleSelectChange(e.target.value, index)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          >
                            <option value="CGPA">CGPA</option>
                            <option value="GPA">GPA</option>
                            <option value="Percentage">Percentage</option>
                          </select>
                        </div>
                        <div>
                          <Input
                            name="grade"
                            value={item?.grade || ""}
                            onChange={(e) => handleChange(e, index)}
                            placeholder={item?.gradeType === "Percentage" ? "e.g., 85%" : "e.g., 3.8"}
                            className="w-full"
                          />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {item?.gradeType === "Percentage" ? "Enter percentage (e.g., 85%)" :
                          item?.gradeType === "GPA" ? "Enter GPA (e.g., 3.8/4.0)" :
                            "Enter CGPA (e.g., 8.5/10)"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">
                        <Calendar className="h-3 w-3 inline mr-1" />
                        Start Date *
                      </label>
                      <Input
                        type="month"
                        name="startDate"
                        value={item?.startDate || ""}
                        onChange={(e) => handleChange(e, index)}
                        required
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">
                        <Calendar className="h-3 w-3 inline mr-1" />
                        {item?.endDate ? "End Date" : "Expected Graduation"}
                      </label>
                      <Input
                        type="month"
                        name="endDate"
                        value={item?.endDate || ""}
                        onChange={(e) => handleChange(e, index)}
                        placeholder="Expected graduation"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Description & Achievements
                    </label>
                    <Textarea
                      name="description"
                      value={item?.description || ""}
                      onChange={(e) => handleChange(e, index)}
                      placeholder="e.g., Relevant coursework, honors, thesis topic, extracurricular activities..."
                      className="min-h-[100px] resize-none w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Optional: Include honors, relevant coursework, or achievements
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button
              type="button"
              onClick={AddNewEducation}
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
              size="lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>

            {educationalList.length > 1 && (
              <Button
                type="button"
                onClick={() => RemoveEducation(educationalList.length - 1)}
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                size="lg"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove Last
              </Button>
            )}
          </div>

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
                Save Education
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Education;