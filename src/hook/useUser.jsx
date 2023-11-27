import { create } from "zustand";

const useDetails = create((set, get) => {
  return {
    details: {
      username: "",
      email: "",
      passPhrase: "",
    },
    setDetails: (field, value) => {
      set((state) => ({
        details: {
          ...state.details,
          [field]: value,
        },
      }));
    },

    reset: () => {
      const { setDetails } = get();
      setDetails({ username: "", email: "", passPhrase: "" });
    },
  };
});

export default useDetails;
