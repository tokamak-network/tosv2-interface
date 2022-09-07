import { atom, selector } from "recoil";

const txState = atom({
  key: "txState",
  default: false,
});

const selectedTxState = selector<boolean>({
  key: "tx/get", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const selectedModalState = get(txState);
    return selectedModalState;
  },
  set: ({ set }, newValue) => {
    set(txState, newValue);
  },
});
export { txState, selectedTxState };
