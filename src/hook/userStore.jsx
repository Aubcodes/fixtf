import { create } from "zustand";

const userStore = create((set) => {
  return {
    user: {
      username: "",
      email: "",
      imageUrl: "",
    },
    setUser: (user) => set({ user }),
  };
});

export default userStore;
