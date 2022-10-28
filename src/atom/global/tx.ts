import { atom, selector } from "recoil";
import { ToastType } from "types/toast";

export type T_TxInfoState = {
  id: string;
  message: string;
  type: ToastType;
} | null;

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

const txInfo = atom<T_TxInfoState>({
  key: "txInfo",
  default: null,
});

const txInfoState = selector<T_TxInfoState>({
  key: "txInfoState", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const selectedTxInfoState = get(txInfo);
    return selectedTxInfoState;
  },
});

export { txState, selectedTxState, txInfo, txInfoState };
