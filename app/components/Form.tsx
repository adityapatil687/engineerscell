import { useState, useRef } from "react";
import districtsData from "../data/districtsData.json";
import translations from "../public/translations";
import { useLanguage } from "../context/LanguageContext";
import ProfilePictureUploader from "./profile-picture-uploader";
import SuccessDialog from "./success-dialog-component";
import NPSP_banner from "../assets/banner/NPSP banner.jpg";

const branches = [
  "Computer Engineering",
  "Information Technology Engineering",
  "Electronics and Telecommunication Engineering",
  "Electronics and Computer Engineering",
  "Electronics Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Other",
];

export default function Form() {
  const { language } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [taluka, setTaluka] = useState("");
  const [branch, setBranch] = useState("");
  const [customBranch, setCustomBranch] = useState("");
  const [message, setMessage] = useState("");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [platformId, setPlatformId] = useState("");

  const profilePictureUploaderRef = useRef<{ resetImage: () => void } | null>(
    null
  );

  const handleProfilePictureUpload = (base64Image: string) => {
    setProfilePicture(base64Image);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setDistrict("");
    setTaluka("");
    setBranch("");
    setCustomBranch("");
    setMessage("");
    setProfilePicture(null);
    profilePictureUploaderRef.current?.resetImage();
  };

  const errorMessages: Record<number, string> = {
    409: "User already registered with this email or phone number.",
    404: "No users found.",
    500: "Failed to initialize database.",
    // Add more mappings if needed
    // You can also handle generic server errors if desired
    // e.g., default: "Server error occurred."
  };

  const handleErrorMessage = (statusCode: number) => {
    const message = errorMessages[statusCode] || "An unexpected error occurred.";
    alert(message);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !district || !taluka || !branch) {
      setError("All fields except message are required.");
      return;
    }

    const selectedBranch = branch === "Other" ? customBranch.trim() : branch;

    if (branch === "Other" && !customBranch) {
      setError("Please enter your branch.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      district: district.trim(),
      taluka: taluka.trim(),
      branch: selectedBranch,
      message: message.trim(),
      prof_img: profilePicture,
    };

    try {
      const response = await fetch(
        "https://wzigldvkde.execute-api.ap-south-1.amazonaws.com/default/engineers-cell-register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        handleErrorMessage(response.status); // Call the error handler with status code
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.platformId) {
        setPlatformId(result.platformId);
        resetForm();
        setIsSuccessDialogOpen(true);
      } else {
        throw new Error("Registration successful, but no Platform ID was returned.");
      }
      
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("An unexpected error occurred."); // Fallback for unexpected errors
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg my-0 md:my-8">
     
     <div className="rounded-lg overflow-hidden"> 
        <img
            src={NPSP_banner.src}
            alt="NPSP Banner"
            className="w-full h-auto object-cover"
        />
    </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-center">
          {translations[language].title}
        </h2>
        <div className="p-8">
          <ProfilePictureUploader
            onImageUpload={handleProfilePictureUpload}
            ref={profilePictureUploaderRef}
          />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder={translations[language].name}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder={translations[language].email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder={translations[language].phoneNumber}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder={translations[language].address}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="border border-gray-300 p-3 w-full rounded h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={district}
            onChange={(e) => {
              setDistrict(e.target.value);
              setTaluka("");
            }}
            required
            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">{translations[language].selectDistrict}</option>
            {districtsData.map((district) => (
              <option key={district.name} value={district.name}>
                {district.name}
              </option>
            ))}
          </select>
          <select
            value={taluka}
            onChange={(e) => setTaluka(e.target.value)}
            required
            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">{translations[language].selectTaluka}</option>
            {districtsData
              .find((d) => d.name === district)
              ?.tahasil.map((tahasil) => (
                <option key={tahasil} value={tahasil}>
                  {tahasil}
                </option>
              ))}
          </select>
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            required
            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">{translations[language].selectBranch}</option>
            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
          {branch === "Other" && (
            <input
              type="text"
              placeholder="Enter your branch"
              value={customBranch}
              onChange={(e) => setCustomBranch(e.target.value)}
              required
              className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          <textarea
            placeholder={translations[language].message}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Submitting..." : translations[language].submit}
          </button>
        </form>
        <SuccessDialog
          isOpen={isSuccessDialogOpen}
          onClose={() => setIsSuccessDialogOpen(false)}
          platformId={platformId}
        />
      </div>
    </div>
  );
}
