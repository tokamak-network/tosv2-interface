import { atom, selector } from "recoil";
import { ModalType } from "types/modal";

const modalState = atom<ModalType | undefined>({
  key: "modalType",
  default: undefined,
});

const modalData = atom({
  key: "modalData",
  default: {} as any | [] as any,
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

const modalLoadingState = atom<boolean>({
  key: "modalLoadingState",
  default: false,
});

const modalLoadingValue = selector({
  key: "modalLoadingValue", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const modalLoadingValue = get(modalLoadingState);
    return modalLoadingValue;
  },
});

const modalBottomLoadingState = atom<boolean>({
  key: "modalBottomLoadingState",
  default: false,
});

const modalBottomLoadingValue = selector({
  key: "modalBottomLoadingValue", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const modalBottomLoadingValue = get(modalBottomLoadingState);
    return modalBottomLoadingValue;
  },
});

const stosLoadingState = atom<boolean>({
  key: "stosLoadingState",
  default: false,
});

const stosLoadingValue = selector({
  key: "stosLoadingValue", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const stosLoadingValue = get(stosLoadingState);
    return stosLoadingValue;
  },
});

const subModalState = atom<null | "bond_confirm">({
  key: "subModalState",
  default: null,
});

const subModalValue = selector({
  key: "subModalValue", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const subModalValue = get(subModalState);
    return subModalValue;
  },
});

export {
  modalState,
  modalData,
  selectedModalState,
  selectedModalData,
  modalLoadingState,
  modalLoadingValue,
  modalBottomLoadingState,
  modalBottomLoadingValue,
  stosLoadingState,
  stosLoadingValue,
  subModalState,
  subModalValue,
};
