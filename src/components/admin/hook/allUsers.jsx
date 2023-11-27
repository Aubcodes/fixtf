import { create } from "zustand";

const allUserStore = create((set) => {
  return {
    loading: true,
    setLoading: (loading) => set({ loading }),
    users: [],
    setUsers: (users) => set({ users }),
  };
});

export default allUserStore;
