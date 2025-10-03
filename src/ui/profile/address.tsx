import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlus as PlusIcon } from "react-icons/fa";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { CiMapPin as MapPinIcon } from "react-icons/ci";
import {
  useGetAddresses,
  useCreateAddress,
  useUpdateAddress,
  useDeleteAddress,
  useSetDefaultAddress,
} from "@/services/profile.service";

interface AddressData {
  id?: number;
  label?: string;
  address_type?: string;
  first_name: string;
  last_name: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone: string;
  is_default?: boolean;
}

const AddressModal = ({
  isOpen,
  onClose,
  editingAddress = null,
  createAddress,
  updateAddress,
}: {
  isOpen: boolean;
  onClose: () => void;
  editingAddress?: AddressData | null;
  createAddress: any;
  updateAddress: any;
}) => {
  const [formData, setFormData] = useState<AddressData>({
    label: "",
    address_type: "home",
    first_name: "",
    last_name: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "Nigeria",
    phone: "",
    is_default: false,
  });

  useEffect(() => {
    if (editingAddress) {
      setFormData({
        label: editingAddress.label || "",
        address_type: editingAddress.address_type || "home",
        first_name: editingAddress.first_name || "",
        last_name: editingAddress.last_name || "",
        address_line1: editingAddress.address_line1 || "",
        address_line2: editingAddress.address_line2 || "",
        city: editingAddress.city || "",
        state: editingAddress.state || "",
        postal_code: editingAddress.postal_code || "",
        country: editingAddress.country || "Nigeria",
        phone: editingAddress.phone || "",
        is_default: editingAddress.is_default || false,
      });
    } else {
      resetForm();
    }
  }, [editingAddress, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.first_name.trim()) {
      alert("First name is required");
      return;
    }
    if (!formData.last_name.trim()) {
      alert("Last name is required");
      return;
    }
    if (!formData.phone.trim()) {
      alert("Phone number is required");
      return;
    }
    if (!formData.address_line1.trim()) {
      alert("Street address is required");
      return;
    }
    if (!formData.city.trim()) {
      alert("City is required");
      return;
    }
    if (!formData.state.trim()) {
      alert("State is required");
      return;
    }
    if (!formData.postal_code.trim()) {
      alert("Postal code is required");
      return;
    }
    if (!formData.country.trim()) {
      alert("Country is required");
      return;
    }

    if (editingAddress?.id) {
      await updateAddress.mutateAsync(
        {
          id: editingAddress.id,
          data: formData,
        },
        {
          onSuccess: () => {
            onClose();
            resetForm();
          },
        }
      );
    } else {
      await createAddress.mutateAsync(formData, {
        onSuccess: () => {
          onClose();
          resetForm();
        },
      });
    }
  };

  const resetForm = () => {
    setFormData({
      label: "",
      address_type: "home",
      first_name: "",
      last_name: "",
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      postal_code: "",
      country: "Nigeria",
      phone: "",
      is_default: false,
    });
  };

  const handleChange = (field: keyof AddressData, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">
              {editingAddress ? "Edit Address" : "Add New Address"}
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <IoClose className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.first_name}
                  onChange={(e) => handleChange("first_name", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.last_name}
                  onChange={(e) => handleChange("last_name", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Label (Optional)
              </label>
              <input
                type="text"
                value={formData.label}
                onChange={(e) => handleChange("label", e.target.value)}
                placeholder="e.g., Home, Office"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div> */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Type
              </label>
              <select
                value={formData.address_type}
                onChange={(e) => handleChange("address_type", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              >
                <option value="home">Home</option>
                <option value="office">Office</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Apartment, suite, etc. (Optional)
              </label>
              <input
                type="text"
                value={formData.address_line2}
                onChange={(e) => handleChange("address_line2", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.address_line1}
                onChange={(e) => handleChange("address_line1", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.state}
                onChange={(e) => handleChange("state", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Postal Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.postal_code}
                onChange={(e) => handleChange("postal_code", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.country}
                onChange={(e) => handleChange("country", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_default"
                checked={formData.is_default}
                onChange={(e) => handleChange("is_default", e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="is_default" className="text-sm text-gray-700">
                Set as default address
              </label>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={createAddress.isPending || updateAddress.isPending}
                className="flex-1 w-full rounded-full px-4 py-2 bg-black text-white disabled:opacity-50 hover:bg-gray-800 transition-colors"
              >
                {createAddress.isPending || updateAddress.isPending
                  ? "Saving..."
                  : "Save Address"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Addresses = () => {
  const { data: addressesData, isLoading } = useGetAddresses();
  const deleteAddress = useDeleteAddress();
  const setDefaultAddress = useSetDefaultAddress();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressData | null>(null);

  const addresses = addressesData?.results || [];
  const createAddress = useCreateAddress();
  const updateAddress = useUpdateAddress();

  const handleEdit = (address: AddressData) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this address?")) {
      await deleteAddress.mutateAsync(id);
    }
  };

  const handleSetDefault = async (id: number) => {
    await setDefaultAddress.mutateAsync(id);
  };

  const handleAddNew = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAddress(null);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-black-400">Addresses</h2>
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse">Loading addresses...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-black-400">Addresses</h2>
        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 px-4 py-2 bg-black-400 text-white rounded-full cursor-pointer text-sm"
        >
          <PlusIcon className="w-3 h-3" />
          Add New Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <MapPinIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No addresses saved
          </h3>
          <p className="text-gray-500 mb-6">
            Add your delivery addresses for faster checkout.
          </p>
          <button
            onClick={handleAddNew}
            className="inline-flex items-center gap-2 px-6 py-2 bg-black-400 text-white rounded-full cursor-pointer text-sm"
          >
            <PlusIcon className="w-3 h-3" />
            Add Address
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {addresses.map((address: AddressData) => (
            <div
              key={address.id}
              className="bg-white border border-gray-200 rounded-lg p-4 relative hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3 flex-1">
                  {/* Radio input for default address */}
                  <input
                    type="radio"
                    name="default_address"
                    checked={address.is_default}
                    onChange={() => address.id && handleSetDefault(address.id)}
                    className="mt-1 cursor-pointer"
                  />

                  <div className="space-y-2 flex-1">
                    {address.label && (
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {address.label}
                      </span>
                    )}
                    <h3 className="font-medium text-gray-900">
                      Name:{" "}
                      <span className="text-gray-600 font-light">
                        {address.first_name} {address.last_name}
                      </span>
                    </h3>
                    <p className="text-sm text-gray-900 font-medium">
                      Phone Number:{" "}
                      <span className="text-gray-600 font-light">{address.phone}</span>
                    </p>
                    <div className="text-sm text-gray-900 font-medium">
                      <p>
                        Address:{" "}
                        <span className="text-gray-600 font-light">
                          {address.address_line1}
                          {address.address_line2 && `, ${address.address_line2}`}, {address.city},{" "}
                          {address.state} {address.postal_code}
                        </span>
                      </p>
                    </div>
                    {address.is_default && (
                      <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                        Default Address
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 sm:gap-4">
                  <button
                    onClick={() => handleEdit(address)}
                    className="bg-[#F6F6F6] p-1.5 text-[#747272] border border-[#616161] rounded-md cursor-pointer"
                  >
                    <HiOutlinePencilAlt className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => address.id && handleDelete(address.id)}
                    disabled={deleteAddress.isPending}
                    className="bg-[#FFF5F5] text-[#E14D4D] border border-[#E14D4D] rounded-md p-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <FaRegTrashAlt className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddressModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingAddress={editingAddress}
        createAddress={createAddress}
        updateAddress={updateAddress}
      />
    </div>
  );
};

export default Addresses;