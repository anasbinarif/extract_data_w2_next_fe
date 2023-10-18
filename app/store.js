import { create } from "zustand";
const useStore = create((set) => ({
  username: "",
  token: "",
  setToken: (newToken) => set({ token: newToken }),
  setUsername: (newUsername) => set({ username: newUsername }),
}));
export default useStore;
