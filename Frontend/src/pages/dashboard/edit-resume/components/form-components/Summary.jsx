import React, { useState } from "react";
import { Sparkles, LoaderCircle, BookOpen, Check, Copy, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { AIChatSession } from "@/Services/AiModel";
import { updateThisResume } from "@/Services/resumeAPI";

const prompt = `As a professional resume writer, generate 3 compelling professional summaries for a {jobTitle} position. Each summary should be:
1. Fresher/Entry Level (0-2 years experience)
2. Mid Level (3-7 years experience)
3. Senior Level (8+ years experience)

Each summary should be 3-4 lines long, written in active voice, and highlight relevant skills and value propositions. Return in JSON format with fields: experience_level and summary.`;

function Summary({ resumeInfo, enanbledNext, enanbledPrev }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(resumeInfo?.summary || "");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const { resume_id } = useParams();

  const handleInputChange = (e) => {
    enanbledNext(false);
    enanbledPrev(false);
    dispatch(
      addResumeData({
        ...resumeInfo,
        [e.target.name]: e.target.value,
      })
    );
    setSummary(e.target.value);
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      data: { summary },
    };

    if (resume_id) {
      try {
        await updateThisResume(resume_id, data);
        toast.success("Summary updated successfully");
        enanbledNext(true);
        enanbledPrev(true);
      } catch (error) {
        toast.error(error.message || "Failed to update summary");
      } finally {
        setLoading(false);
      }
    }
  };

  const setSummery = (summary) => {
    dispatch(
      addResumeData({
        ...resumeInfo,
        summary: summary,
      })
    );
    setSummary(summary);
    toast.success("Summary applied");
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const GenerateSummeryFromAI = async () => {
    if (!resumeInfo?.jobTitle) {
      toast.error("Please add a job title in Personal Details first");
      return;
    }

    setAiLoading(true);
    setAiGenerateSummeryList(null);

    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);

    try {
      const result = await AIChatSession(PROMPT);

      // Parse the result if it's a string
      let parsedResult = result;
      if (typeof result === 'string') {
        try {
          parsedResult = JSON.parse(result);
        } catch (e) {
          parsedResult = [
            { experience_level: "Entry Level", summary: result },
            { experience_level: "Mid Level", summary: result },
            { experience_level: "Senior Level", summary: result }
          ];
        }
      }

      // Ensure it's an array
      if (!Array.isArray(parsedResult)) {
        parsedResult = [parsedResult];
      }

      setAiGenerateSummeryList(parsedResult);
      toast.success("AI suggestions generated!");
    } catch (error) {
      console.error("AI Error:", error);
      toast.error("Failed to generate AI suggestions");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 md:space-y-8">
      {/* Main Summary Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 border-t-4 border-t-blue-500 p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-full bg-blue-100">
            <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Professional Summary
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              Write a compelling summary that highlights your experience and qualifications
            </p>
          </div>
        </div>

        <form onSubmit={onSave}>
          <div className="space-y-6">
            {/* Character Counter & AI Button */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Your Professional Summary
                </label>
                <p className="text-xs text-gray-500">
                  Write 3-4 lines highlighting your key achievements and skills
                </p>
              </div>

              <Button
                type="button"
                onClick={GenerateSummeryFromAI}
                disabled={aiLoading || !resumeInfo?.jobTitle}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
                size="sm"
              >
                {aiLoading ? (
                  <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4 mr-2" />
                )}
                {aiLoading ? "Generating..." : "Generate with AI"}
              </Button>
            </div>

            {/* Textarea */}
            <div className="space-y-2">
              <Textarea
                name="summary"
                value={summary || resumeInfo?.summary || ""}
                onChange={handleInputChange}
                placeholder={`Experienced ${resumeInfo?.jobTitle || 'professional'} with a proven track record of...`}
                className="min-h-[180px] resize-none text-base w-full"
                required
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>
                  {summary.length} characters • {summary.split(/\s+/).length} words
                </span>
                <span>Recommended: 150-300 characters</span>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <Button
                type="submit"
                disabled={loading || !summary.trim()}
                className="min-w-[140px] bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                {loading ? (
                  <>
                    <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Save Summary
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* AI Suggestions */}
      {aiGeneratedSummeryList && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 md:p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-full bg-purple-100">
              <Wand2 className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                AI-Powered Suggestions
              </h2>
              <p className="text-gray-600">
                Click any suggestion to apply it to your summary
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="flex overflow-x-auto border-b border-gray-200">
              <button
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('all')}
              >
                All Levels
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeTab === 'entry' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('entry')}
              >
                Entry Level
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeTab === 'mid' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('mid')}
              >
                Mid Level
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeTab === 'senior' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('senior')}
              >
                Senior Level
              </button>
            </div>
          </div>

          {/* Suggestions */}
          <div className="space-y-4">
            {aiGeneratedSummeryList.map((item, index) => (
              <div
                key={index}
                className="border-2 border-gray-200 hover:border-blue-500 rounded-lg p-4 transition-all cursor-pointer hover:shadow-md"
                onClick={() => {
                  enanbledNext(false);
                  enanbledPrev(false);
                  setSummery(item?.summary);
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`
                      px-3 py-1 text-xs rounded-full border
                      ${item?.experience_level?.toLowerCase().includes('senior') ? 'bg-purple-100 text-purple-700 border-purple-200' :
                        item?.experience_level?.toLowerCase().includes('mid') ? 'bg-blue-100 text-blue-700 border-blue-200' :
                          'bg-green-100 text-green-700 border-green-200'}
                    `}>
                      {item?.experience_level}
                    </span>
                    <span className="text-xs text-gray-500">
                      {item?.summary?.length} characters
                    </span>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(item?.summary, index);
                    }}
                    className="shrink-0"
                  >
                    {copiedIndex === index ? (
                      <Check className="h-4 w-4 mr-1 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 mr-1" />
                    )}
                    {copiedIndex === index ? "Copied!" : "Copy"}
                  </Button>
                </div>

                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {item?.summary}
                </p>
              </div>
            ))}
          </div>

          {/* Tips Section */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Writing Tips
            </h4>
            <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
              <li>Start with your most relevant experience and key achievements</li>
              <li>Include quantifiable results when possible</li>
              <li>Tailor the summary to match the job title</li>
              <li>Keep it concise and professional</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Summary;