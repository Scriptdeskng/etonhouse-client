import { useState } from "react";
import { useAddressStore, Address } from "@/store/addressStore";
import { IoClose } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlus as PlusIcon } from "react-icons/fa";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { CiMapPin as MapPinIcon } from "react-icons/ci";


const AddressModal = ({
  isOpen,
  onClose,
  editingAddress = null
}: {
  isOpen: boolean;
  onClose: () => void;
  editingAddress?: Address | null;
}) => {
  const { addAddress, updateAddress } = useAddressStore();
  const [formData, setFormData] = useState({
    name: editingAddress?.name || "",
    phone: editingAddress?.phone || "",
    street_address: editingAddress?.street_address || "",
    city: editingAddress?.city || "",
    state: editingAddress?.state || "",
    postal_code: editingAddress?.postal_code || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingAddress) {
      updateAddress(editingAddress.id, formData);
    } else {
      addAddress(formData);
    }

    onClose();
    setFormData({
      name: "",
      phone: "",
      street_address: "",
      city: "",
      state: "",
      postal_code: "",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
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
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <IoClose className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address
              </label>
              <input
                type="text"
                required
                value={formData.street_address}
                onChange={(e) => handleChange("street_address", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
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
                State
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
                Postal Code
              </label>
              <input
                type="text"
                value={formData.postal_code}
                onChange={(e) => handleChange("postal_code", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="flex-1 w-full rounded-full px-4 py-2 bg-black-400 cursor-pointer text-white"
              >
                Save Address
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Addresses = () => {
  const { addresses, removeAddress } = useAddressStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this address?")) {
      removeAddress(id);
    }
  };

  const handleAddNew = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAddress(null);
  };

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
          {addresses.map((address) => (
            <div
              key={address.id}
              className="bg-white border border-gray-200 rounded-lg p-4 relative hover:shadow-md transition-shadow flex justify-between items-start sm:items-center"
            >
              <div className="pr-16 space-y-2">
                <h3 className="font-medium text-gray-900">Name: <span className="text-gray-600 font-light">{address.name}</span></h3>
                <p className="text-sm text-gray-900 font-medium">Phone Number: <span className="text-gray-600 font-light">{address.phone}</span></p>
                <div className="text-sm text-gray-900 font-medium">
                  <p>Address: <span className="text-gray-600 font-light">{address.street_address}, {address.city}, {address.state} {address.postal_code}</span></p>
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
                  onClick={() => handleDelete(address.id)}
                  className="bg-[#FFF5F5] text-[#E14D4D] border border-[#E14D4D] rounded-md p-1.5 cursor-pointer"
                >
                  <FaRegTrashAlt className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddressModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingAddress={editingAddress}
      />
    </div>
  );
};

export default Addresses;