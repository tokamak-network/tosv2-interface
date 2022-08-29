import { atom, selector } from "recoil";

const defaultValue = {
  stake_stake_modal_period: 39312,
  stake_stake_modal_balance: "",
  stake_unstake_modal_balance: "",
};

const inputState = atom({
  key: "inputState",
  default: defaultValue,
});

const inputBalanceState = selector({
  key: "inputBalanceState", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const selectedModalState = get(inputState);
    return selectedModalState;
  },
});

export { inputState, inputBalanceState, defaultValue };
