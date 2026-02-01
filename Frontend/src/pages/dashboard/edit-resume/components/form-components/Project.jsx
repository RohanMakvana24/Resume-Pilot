import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, FolderKanban, Save, Code } from "lucide-react";
import SimpeRichTextEditor from "@/components/custom/SimpeRichTextEditor";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { updateThisResume } from "@/Services/resumeAPI";

const formFields = {
  projectName: "",
  techStack: "",
  projectSummary: "",
};

function Project({ resumeInfo, setEnabledNext, setEnabledPrev }) {
  const [projectList, setProjectList] = useState(resumeInfo?.projects || []);
  const [loading, setLoading] = useState(false);
  const { resume_id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addResumeData({ ...resumeInfo, projects: projectList }));
  }, [projectList]);

  const addProject = () => {
    setProjectList([...projectList, formFields]);
  };

  const removeProject = (index) => {
    setEnabledNext(false);
    setEnabledPrev(false);
    const list = [...projectList];
    const newList = list.filter((_, i) => i !== index);
    setProjectList(newList);
  };

  const handleChange = (e, index) => {
    setEnabledNext(false);
    setEnabledPrev(false);
    const { name, value } = e.target;
    const list = [...projectList];
    const newListData = {
      ...list[index],
      [name]: value,
    };
    list[index] = newListData;
    setProjectList(list);
  };

  const handleRichTextEditor = (value, name, index) => {
    const list = [...projectList];
    const newListData = {
      ...list[index],
      [name]: value,
    };
    list[index] = newListData;
    setProjectList(list);
  };

  const onSave = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        projects: projectList,
      },
    };

    if (resume_id) {
      try {
        await updateThisResume(resume_id, data);
        toast.success("Projects updated successfully");
      } catch (error) {
        toast.error(error.message || "Failed to update projects");
        console.error(error.message);
      } finally {
        setEnabledNext(true);
        setEnabledPrev(true);
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 border-t-4 border-t-blue-500 mt-4 md:mt-8 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 md:mb-8">
        <div className="p-2 rounded-full bg-blue-100">
          <FolderKanban className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            Projects
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Showcase your work experience and achievements
          </p>
        </div>
      </div>

      <form onSubmit={onSave}>
        <div className="space-y-6">
          {projectList.length === 0 ? (
            <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg">
              <FolderKanban className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                No projects added yet
              </h3>
              <p className="text-gray-500 mb-4">
                Add your first project to showcase your experience
              </p>
              <Button
                type="button"
                onClick={addProject}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add First Project
              </Button>
            </div>
          ) : (
            projectList.map((project, index) => (
              <div key={index} className="border border-gray-200 rounded-lg shadow-sm p-4 md:p-6">
                {/* Project Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-blue-100">
                      <FolderKanban className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {project.projectName || `Project ${index + 1}`}
                      </h3>
                      {project.techStack && (
                        <p className="text-sm text-gray-500">
                          Technologies: {project.techStack}
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
                      onClick={() => removeProject(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-md"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">Remove</span>
                    </Button>
                  </div>
                </div>

                {/* Project Form */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">
                        <FolderKanban className="h-3 w-3 inline mr-1" />
                        Project Name *
                      </label>
                      <Input
                        type="text"
                        name="projectName"
                        value={project?.projectName || ""}
                        onChange={(e) => handleChange(e, index)}
                        placeholder="e.g., E-commerce Platform"
                        required
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">
                        <Code className="h-3 w-3 inline mr-1" />
                        Technologies Used
                      </label>
                      <Input
                        type="text"
                        name="techStack"
                        value={project?.techStack || ""}
                        onChange={(e) => handleChange(e, index)}
                        placeholder="React, Node.js, MongoDB, etc."
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Separate technologies with commas
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Project Description *
                    </label>
                    <SimpeRichTextEditor
                      index={index}
                      defaultValue={project?.projectSummary || ""}
                      onRichTextEditorChange={(event) =>
                        handleRichTextEditor(event, "projectSummary", index)
                      }
                      resumeInfo={resumeInfo}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Describe your role, responsibilities, and achievements in this project
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
            onClick={addProject}
            variant="outline"
            className="w-full sm:w-auto border-blue-600 text-blue-600 hover:bg-blue-50"
            size="lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            {projectList.length > 0 ? "Add Another Project" : "Add Project"}
          </Button>

          {projectList.length > 0 && (
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
                  Save All Projects
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Project;