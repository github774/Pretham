import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const volunteeringTypes = [
  "Environmental (cleanups, planting, conservation)",
  "Community service (food banks, shelters)",
  "Education & tutoring",
  "Health & wellness",
  "Event support",
  "Digital / remote volunteering",
  "Anything — show me everything",
];

const timeAvailabilities = [
  "1 hour or less",
  "2–3 hours",
  "Half day",
  "Full day",
  "Flexible",
];

const schedulePreferences = [
  "Weekdays",
  "Weekends",
  "Evenings",
  "No preference",
];

const locationPreferences = [
  "In-person (near me)",
  "Remote / online",
  "Both",
];

type FormData = {
  volunteeringType: string[];
  timeAvailability: string;
  schedulePreference: string;
  locationPreference: string;
};

const initialFormData: FormData = {
  volunteeringType: [],
  timeAvailability: "",
  schedulePreference: "",
  locationPreference: "",
};

const OnboardingForm: React.FC = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const handleMultiSelect = (option: string) => {
    setFormData((prev) => {
      const alreadySelected = prev.volunteeringType.includes(option);
      return {
        ...prev,
        volunteeringType: alreadySelected
          ? prev.volunteeringType.filter((item) => item !== option)
          : [...prev.volunteeringType, option],
      };
    });
  };

  const handleSingleSelect = (field: keyof Omit<FormData, "volunteeringType">, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        interests: formData.volunteeringType,
        availability: formData.timeAvailability,
        schedule_preference: formData.schedulePreference,
        location_preference: formData.locationPreference,
        onboarding_completed: true,
      })
      .eq("id", user.id);

    if (error) {
      console.error("Error updating profile:", error);
      setLoading(false);
      return;
    }

    setSubmitted(true);
    setLoading(false);
    await refreshProfile();
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Onboarding</h2>
      <form onSubmit={handleSubmit}>
        {step === 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">1. Volunteering Type</h3>
            <p className="mb-2">What kind of volunteering are you interested in? (Select all that apply)</p>
            <div className="flex flex-col gap-2">
              {volunteeringTypes.map((type) => (
                <label
                  key={type}
                  className={`flex items-center gap-2 cursor-pointer rounded px-3 py-2 transition ${
                    formData.volunteeringType.includes(type)
                      ? "bg-blue-100 border-blue-500 border"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.volunteeringType.includes(type)}
                    onChange={() => handleMultiSelect(type)}
                    className="accent-blue-600"
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>
        )}
        {step === 1 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">2. Time Availability</h3>
            <p className="mb-2">How much time can you volunteer at once?</p>
            <div className="flex flex-col gap-2">
              {timeAvailabilities.map((option) => (
                <label
                  key={option}
                  className={`flex items-center gap-2 cursor-pointer rounded px-3 py-2 transition ${
                    formData.timeAvailability === option
                      ? "bg-blue-100 border-blue-500 border"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <input
                    type="radio"
                    name="timeAvailability"
                    checked={formData.timeAvailability === option}
                    onChange={() => handleSingleSelect("timeAvailability", option)}
                    className="accent-blue-600"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">3. Schedule Preference</h3>
            <p className="mb-2">When do you usually volunteer?</p>
            <div className="flex flex-col gap-2">
              {schedulePreferences.map((option) => (
                <label
                  key={option}
                  className={`flex items-center gap-2 cursor-pointer rounded px-3 py-2 transition ${
                    formData.schedulePreference === option
                      ? "bg-blue-100 border-blue-500 border"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <input
                    type="radio"
                    name="schedulePreference"
                    checked={formData.schedulePreference === option}
                    onChange={() => handleSingleSelect("schedulePreference", option)}
                    className="accent-blue-600"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">4. Location Preference</h3>
            <p className="mb-2">Where do you want to volunteer?</p>
            <div className="flex flex-col gap-2">
              {locationPreferences.map((option) => (
                <label
                  key={option}
                  className={`flex items-center gap-2 cursor-pointer rounded px-3 py-2 transition ${
                    formData.locationPreference === option
                      ? "bg-blue-100 border-blue-500 border"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <input
                    type="radio"
                    name="locationPreference"
                    checked={formData.locationPreference === option}
                    onChange={() => handleSingleSelect("locationPreference", option)}
                    className="accent-blue-600"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        )}
        {step === 4 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Review & Submit</h3>
            <div className="mb-4">
              <div>
                <span className="font-medium">Volunteering Type:</span>{" "}
                {formData.volunteeringType.join(", ") || "None selected"}
              </div>
              <div>
                <span className="font-medium">Time Availability:</span>{" "}
                {formData.timeAvailability || "None selected"}
              </div>
              <div>
                <span className="font-medium">Schedule Preference:</span>{" "}
                {formData.schedulePreference || "None selected"}
              </div>
              <div>
                <span className="font-medium">Location Preference:</span>{" "}
                {formData.locationPreference || "None selected"}
              </div>
            </div>
            <p className="text-gray-600 mb-2">Ready to get started? Submit your preferences!</p>
          </div>
        )}

        <div className="flex justify-between mt-8">
          {step > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition"
            >
              Back
            </button>
          )}
          <div className="flex-1" />
          {step < 4 && (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
              disabled={
                (step === 0 && formData.volunteeringType.length === 0) ||
                (step === 1 && !formData.timeAvailability) ||
                (step === 2 && !formData.schedulePreference) ||
                (step === 3 && !formData.locationPreference)
              }
            >
              Next
            </button>
          )}
          {step === 4 && (
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white font-medium transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "Submit"}
            </button>
          )}
        </div>
        {submitted && (
          <div className="mt-6 text-green-700 font-semibold text-center">
            Thank you! Your preferences have been saved.
          </div>
        )}
      </form>
    </div>
  );
};

export default OnboardingForm;
