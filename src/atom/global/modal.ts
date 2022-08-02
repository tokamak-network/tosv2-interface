import { atom, selector } from "recoil";

const modalState = atom({
  key: "modalType",
  default: "",
});

const selectedModalState = selector({
  key: "selectedModal", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const selectedModalState = get(modalState);

    return selectedModalState;
  },
});

export { modalState, selectedModalState };
