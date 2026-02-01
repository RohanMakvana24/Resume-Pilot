import React from "react";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { LoaderCircle, User, Mail, Phone, MapPin, Briefcase } from "lucide-react";
import { toast } from "sonner";
import { updateThisResume } from "@/Services/resumeAPI";

function PersonalDetails({ resumeInfo, enanbledNext }) {
  const { resume_id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    firstName: resumeInfo?.firstName || "",
    lastName: resumeInfo?.lastName || "",
    jobTitle: resumeInfo?.jobTitle || "",
    address: resumeInfo?.address || "",
    phone: resumeInfo?.phone || "",
    email: resumeInfo?.email || "",
  });

  const handleInputChange = (e) => {
    enanbledNext(false);
    dispatch(
      addResumeData({
        ...resumeInfo,
        [e.target.name]: e.target.value,
      })
    );
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSave = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      data: {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        jobTitle: e.target.jobTitle.value,
        address: e.target.address.value,
        phone: e.target.phone.value,
        email: e.target.email.value,
      },
    };
    if (resume_id) {
      try {
        const response = await updateThisResume(resume_id, data);
        toast.success("Personal details updated successfully");
      } catch (error) {
        toast.error(error.message || "Failed to update resume");
        console.error(error.message);
      } finally {
        enanbledNext(true);
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 border-t-4 border-t-blue-500 mt-4 md:mt-8 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 md:mb-8">
        <div className="p-2 rounded-full bg-blue-100">
          <User className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            Personal Details
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Start with your basic information
          </p>
        </div>
      </div>

      <form onSubmit={onSave}>
        <div className="space-y-6 md:space-y-8">
          {/* Name Section */}
          <div className="space-y-4">
            <h3 className="text-base md:text-lg font-semibold text-gray-700 flex items-center gap-2">
              <User className="h-4 w-4" />
              Name & Title
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  First Name *
                </label>
                <div className="relative">
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    required
                    onChange={handleInputChange}
                    className="pl-10"
                    placeholder="John"
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Last Name *
                </label>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  required
                  onChange={handleInputChange}
                  placeholder="Doe"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Job Title
                </label>
                <Input
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  placeholder="e.g., Senior Frontend Developer"
                />
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-base md:text-lg font-semibold text-gray-700">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address *
                </label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  required
                  onChange={handleInputChange}
                  placeholder="john.doe@example.com"
                  className="pl-10"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number *
                </label>
                <Input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  required
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Address *
              </label>
              <Input
                name="address"
                value={formData.address}
                required
                onChange={handleInputChange}
                placeholder="123 Main St, City, State, ZIP Code"
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-200">
          <div className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
            * Required fields must be filled
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
              "Save Details"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetails;