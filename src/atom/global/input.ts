import { atom, selector } from "recoil";

const inputState = atom({
  key: "inputState",
  default: {
    stake_stake_modal_period: 1,
    stake_stake_modal_balance: "",
  },
});

const inputBalanceState = selector({
  key: "inputBalanceState", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const selectedModalState = get(inputState);

    return selectedModalState;
  },
});

export { inputState, inputBalanceState };
