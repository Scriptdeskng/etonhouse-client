import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Address {
  id: string;
  name: string;
  phone: string;
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
}

interface AddressStore {
  addresses: Address[];
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Omit<Address, 'id'>) => void;
  removeAddress: (id: string) => void;
  getAddressById: (id: string) => Address | null;
}

export const useAddressStore = create<AddressStore>()(
  persist(
    (set, get) => ({
      addresses: [],

      addAddress: (address) =>
        set((state) => ({
          addresses: [
            ...state.addresses,
            {
              ...address,
              id: Date.now().toString(),
            },
          ],
        })),

      updateAddress: (id: string, address) =>
        set((state) => ({
          addresses: state.addresses.map((addr) =>
            addr.id === id ? { ...address, id } : addr
          ),
        })),

      removeAddress: (id: string) =>
        set((state) => ({
          addresses: state.addresses.filter((addr) => addr.id !== id),
        })),

      getAddressById: (id: string) =>
        get().addresses.find((addr) => addr.id === id) || null,
    }),
    {
      name: "address-store",
    }
  )
);