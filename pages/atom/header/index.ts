import { atom, selector } from "recoil";

const sidebarState = atom({
  key: "isOpen",
  default: false,
});

const sidebarSelectedState = selector({
  key: "sidebarIsOpen", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const isOpen = get(sidebarState);
    return isOpen;
  },
});

export { sidebarState, sidebarSelectedState };
