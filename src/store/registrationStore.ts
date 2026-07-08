import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserRole } from "../types/registration";

interface RegistrationState {
  phone: string;
  role: UserRole | null;
  otpVerified: boolean;
  lastName: string;
  firstName: string;
  middleName?: string;
  email: string;
  password: string;
  idNumber: string;
  setPhone: (v: string) => void;
  setRole: (v: UserRole) => void;
  setOtpVerified: (v: boolean) => void;
  setProfileData: (data: Partial<RegistrationState>) => void;
  reset: () => void;
}

const initialState = {
  phone: "",
  role: null,
  otpVerified: false,
  lastName: "",
  firstName: "",
  middleName: "",
  email: "",
  password: "",
  idNumber: "",
};

export const useRegistrationStore = create<RegistrationState>()(
  persist(
    (set) => ({
      ...initialState,
      setPhone: (phone) => set({ phone }),
      setRole: (role) => set({ role }),
      setOtpVerified: (otpVerified) => set({ otpVerified }),
      setProfileData: (data) => set(data),
      reset: () => set(initialState),
    }),
    { name: "registration-storage" },
  ),
);
