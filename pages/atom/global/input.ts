import { atom, selector } from "recoil";

const inputState = atom({
  key: "inputState",
  default: "",
});

const inputBalanceState = selector({
  key: "inputBalanceState", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const selectedModalState = get(inputState);

    return selectedModalState;
  },
});

export { inputState, inputBalanceState };
