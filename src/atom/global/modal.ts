import { atom, selector } from "recoil";

const modalState = atom({
  key: "modalType",
  default: "",
});

const modalData = atom({
  key: "modalData",
  default: {} as any,
});

const selectedModalState = selector({
  key: "selectedModal", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const selectedModalState = get(modalState);
    return selectedModalState;
  },
});
const selectedModalData = selector({
  key: "selectedModalData", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const selectedModalData = get(modalData);
    return selectedModalState;
  },
});

export { modalState, modalData, selectedModalState, selectedModalData };
