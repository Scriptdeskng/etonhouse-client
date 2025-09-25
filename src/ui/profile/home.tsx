import { useState, useEffect } from "react";
import { PiPencilSimpleLineThin } from "react-icons/pi";
import { useGetUserProfile, useUpdateUserProfile } from "@/services/profile.service";
import useAuthStore from "@/store/authStore";

const Profile = () => {
  const { user } = useAuthStore();
  const { data: profile, isLoading } = useGetUserProfile();
  const updateProfile = useUpdateUserProfile();

  const [isEditing, setIsEditing] = useState({
    first_name: false,
    last_name: false,
    phone: false,
  });

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        phone: profile.phone || "",
        email: profile.email || "",
      });
    }
  }, [profile]);

  const handleEdit = (field: keyof typeof isEditing) => {
    setIsEditing(prev => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    const updateData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone: formData.phone,
    };

    updateProfile.mutate(updateData, {
      onSuccess: () => {
        setIsEditing({
          first_name: false,
          last_name: false,
          phone: false,
        });
      },
    });
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-[20vh]">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-black-400 sm:text-2xl">Profile</h2>
      
      <div className="bg-white rounded-lg shadow-sm p-2 sm:p-6 space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.first_name}
              onChange={(e) => handleInputChange("first_name", e.target.value)}
              disabled={!isEditing.first_name}
              className={`w-full px-4 py-3 border border-[#E7E7E9] rounded-lg focus:outline-none ${
                !isEditing.first_name 
                  ? "bg-gray-50 text-gray-600" 
                  : "bg-white border-gray-300"
              }`}
            />
            {!isEditing.first_name && (
              <button
                onClick={() => handleEdit("first_name")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <PiPencilSimpleLineThin  className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.last_name}
              onChange={(e) => handleInputChange("last_name", e.target.value)}
              disabled={!isEditing.last_name}
              className={`w-full px-4 py-3 border border-[#E7E7E9] rounded-lg focus:outline-none ${
                !isEditing.last_name 
                  ? "bg-gray-50 text-gray-600" 
                  : "bg-white border-gray-300"
              }`}
            />
            {!isEditing.last_name && (
              <button
                onClick={() => handleEdit("last_name")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <PiPencilSimpleLineThin  className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <div className="relative">
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              disabled={!isEditing.phone}
              className={`w-full px-4 py-3 border border-[#E7E7E9] rounded-lg focus:outline-none ${
                !isEditing.phone 
                  ? "bg-gray-50 text-gray-600" 
                  : "bg-white border-gray-300"
              }`}
            />
            {!isEditing.phone && (
              <button
                onClick={() => handleEdit("phone")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <PiPencilSimpleLineThin  className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            disabled
            className="w-full px-4 py-3 border border-[#E7E7E9] rounded-lg bg-gray-50 text-gray-600"
          />
        </div>

        {(isEditing.first_name || isEditing.last_name || isEditing.phone) && (
          <div className="w-full sm:flex sm:justify-end">
          <button
            onClick={handleSave}
            disabled={updateProfile.isPending}
            className="w-full sm:w-auto px-6 py-3 bg-[#141414] text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {updateProfile.isPending ? "Saving..." : "Save Changes"}
          </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;