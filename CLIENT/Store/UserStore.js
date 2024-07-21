import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const userStore = (set) => ({
  user: null,
  changeUserInformation: (newUserObject) => {
    set((state) => ({
      user: newUserObject
    }));
  },
  clearUserInformation: () => {
    set(() => ({
      user: null
    }));
  }
});

const useUserStore = create(
  devtools(persist(userStore, { name: "Welcome" }))
);

export default useUserStore;