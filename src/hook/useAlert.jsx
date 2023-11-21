import { create } from "zustand";

const useAlertStore = create((set) => ({
  error: "",
  success: "",
  setError: (value) => set(() => ({ error: value })),
  setSuccess: (value) => set(() => ({ success: value })),
}));

export default useAlertStore;
