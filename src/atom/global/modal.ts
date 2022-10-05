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

const modalLoadingState = atom<{
  modal: boolean;
  bottomContents: boolean;
  stosReward: boolean;
}>({
  key: "modalLoadingState",
  default: {
    modal: false,
    bottomContents: false,
    stosReward: false,
  },
});

const modalLoadingValue = selector({
  key: "modalLoadingValue", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const modalLoadingValue = get(modalLoadingState);
    return modalLoadingValue;
  },
});

export {
  modalState,
  modalData,
  selectedModalState,
  selectedModalData,
  modalLoadingState,
  modalLoadingValue,
};
