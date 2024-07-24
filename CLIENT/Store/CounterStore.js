import {create} from 'zustand';

const useCounterStore = create((set) => ({
  user: null,
  cartCount: 0,
  changeUserInformation: (user) => set({ user }),
  updateCartCount: (count) => set({ cartCount: count }),
}));

export default useCounterStore;
