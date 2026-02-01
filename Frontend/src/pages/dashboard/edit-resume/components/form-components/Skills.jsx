import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { LoaderCircle, Plus, Minus, Save, Star, Award, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { updateThisResume } from "@/Services/resumeAPI";

function Skills({ resumeInfo, enanbledNext }) {
  const [loading, setLoading] = React.useState(false);
  const [skillsList, setSkillsList] = React.useState(
    resumeInfo?.skills || [
      {
        name: "",
        rating: 0,
      },
    ]
  );
  const dispatch = useDispatch();
  const { resume_id } = useParams();

  useEffect(() => {
    try {
      dispatch(addResumeData({ ...resumeInfo, skills: skillsList }));
    } catch (error) {
      console.error("Error in skills context update", error);
    }
  }, [skillsList]);

  const AddNewSkills = () => {
    const list = [...skillsList];
    list.push({ name: "", rating: 0 });
    setSkillsList(list);
    if (enanbledNext) enanbledNext(false);
  };

  const RemoveSkill = (index) => {
    if (skillsList.length <= 1) {
      toast.error("You must have at least one skill");
      return;
    }
    const list = [...skillsList];
    list.splice(index, 1);
    setSkillsList(list);
    if (enanbledNext) enanbledNext(false);
  };

  const handleChange = (index, key, value) => {
    if (enanbledNext) enanbledNext(false);
    const list = [...skillsList];
    const newListData = {
      ...list[index],
      [key]: value,
    };
    list[index] = newListData;
    setSkillsList(list);
  };

  const getRatingLabel = (rating) => {
    switch (rating) {
      case 1: return "Beginner";
      case 2: return "Basic";
      case 3: return "Intermediate";
      case 4: return "Advanced";
      case 5: return "Expert";
      default: return "No Rating";
    }
  };

  const getRatingColor = (rating) => {
    switch (rating) {
      case 1: return "text-red-500";
      case 2: return "text-orange-500";
      case 3: return "text-yellow-500";
      case 4: return "text-blue-500";
      case 5: return "text-green-500";
      default: return "text-gray-400";
    }
  };

  const onSave = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        skills: skillsList,
      },
    };

    if (resume_id) {
      try {
        await updateThisResume(resume_id, data);
        toast.success("Skills updated successfully");
        if (enanbledNext) enanbledNext(true);
      } catch (error) {
        toast.error(error.message || "Failed to update skills");
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
          <Award className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            Skills & Expertise
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Showcase your professional skills and proficiency levels
          </p>
        </div>
      </div>

      <form onSubmit={onSave}>
        <div className="space-y-4">
          {skillsList.length === 0 ? (
            <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg">
              <Award className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                No skills added yet
              </h3>
              <p className="text-gray-500 mb-4">
                Add your first skill to showcase your expertise
              </p>
              <Button
                type="button"
                onClick={AddNewSkills}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add First Skill
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skillsList.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Skill Name
                    </label>
                    <div className="flex gap-2">
                      <Input
                        value={item.name}
                        onChange={(e) => handleChange(index, "name", e.target.value)}
                        placeholder="e.g., JavaScript, React, Project Management"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => RemoveSkill(index)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 shrink-0"
                        disabled={skillsList.length <= 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button
              type="button"
              onClick={AddNewSkills}
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
              size="lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>

            {skillsList.length > 1 && (
              <Button
                type="button"
                onClick={() => RemoveSkill(skillsList.length - 1)}
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                size="lg"
              >
                <Minus className="h-4 w-4 mr-2" />
                Remove Last
              </Button>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading || skillsList.length === 0}
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
                Save Skills
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Skills;