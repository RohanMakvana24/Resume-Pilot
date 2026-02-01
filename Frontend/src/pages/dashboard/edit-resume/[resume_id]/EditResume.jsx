// EditResume.jsx - Updated without Shadcn components
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getResumeData } from "@/Services/resumeAPI";
import { addResumeData } from "@/features/resume/resumeFeatures";
import ResumeForm from "../components/ResumeForm";
import PreviewPage from "../components/PreviewPage";
import {
  Download,
  Eye,
  Edit3,
  Layout,
  Palette,
  Settings,
  Home,
} from "lucide-react";
import { Link } from "react-router-dom";

export function EditResume() {
  const { resume_id } = useParams();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("edit");
  const [isPreviewFullscreen, setIsPreviewFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        setIsLoading(true);
        const data = await getResumeData(resume_id);
        dispatch(addResumeData(data.data));
      } catch (error) {
        console.error("Failed to fetch resume data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (resume_id) {
      fetchResumeData();
    }
  }, [resume_id, dispatch]);

  const handleDownloadPDF = () => {
    console.log("Downloading PDF...");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 font-medium">Loading your resume...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-[100px] bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Home className="w-5 h-5 text-gray-600" />
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Layout className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">
                    Resume Editor
                  </h1>
                  <p className="text-xs text-gray-500">
                    Editing Resume #{resume_id?.slice(0, 8)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab("edit")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === "edit"
                    ? "bg-white shadow-sm"
                    : "hover:bg-gray-200"
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <Edit3 className="w-4 h-4" />
                    Edit
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === "preview"
                    ? "bg-white shadow-sm"
                    : "hover:bg-gray-200"
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Preview
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-6">
        {isPreviewFullscreen ? (
          <div className="fixed inset-0 z-50 bg-white p-4 sm:p-8 overflow-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-xl sm:text-2xl font-bold">
                Fullscreen Preview
              </h2>
              <button
                onClick={() => setIsPreviewFullscreen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Exit Fullscreen
              </button>
            </div>
            <div className="max-w-4xl mx-auto">
              <PreviewPage />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Panel - Form */}
            <div
              className={`${activeTab === "preview" ? "hidden lg:block" : ""}`}
            >
              <div className="bg-white rounded-xl shadow-sm border p-0 overflow-hidden mb-[100px]">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Resume Details
                  </h2>
                  <p className="text-sm text-gray-500">
                    Fill in your professional information
                  </p>
                </div>
                <div className="p-4 sm:p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                  <ResumeForm />
                </div>
              </div>
            </div>

            {/* Right Panel - Preview */}
            <div className={`${activeTab === "edit" ? "hidden lg:block" : ""}`}>
              <div className="sticky top-24 bg-white rounded-xl shadow-sm border p-0 overflow-hidden">
                <div className="p-6 border-b">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        Live Preview
                      </h2>
                      <p className="text-sm text-gray-500">
                        Real-time resume preview
                      </p>
                    </div>
                    <div className="text-xs text-gray-500 px-2 py-1 bg-green-50 rounded">
                      Changes auto-save
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-8 bg-gray-50 min-h-[calc(100vh-300px)] overflow-y-auto">
                  <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
                    <PreviewPage />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer Progress */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Auto-save enabled</span>
              <span className="mx-2 hidden sm:inline">•</span>
              <span className="block sm:inline">
                All changes are saved automatically
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Saved</span>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-800">
                Need help?
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default EditResume;
