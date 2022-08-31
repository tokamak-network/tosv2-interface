import { atom, selector } from "recoil";

//stake & update max weeks
const maxPeriod = 156;

//stake modal states
const stake_stakeModal_defaultValue = {
  stake_modal_period: maxPeriod,
  stake_modal_balance: "0",
};

const stake_stakeModal_input = atom({
  key: "stake_stakeModal_input",
  default: stake_stakeModal_defaultValue,
});

const stake_stakeModal_state = selector({
  key: "stake_stakeModal_input_state", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const selectedModalState = get(stake_stakeModal_input);
    return selectedModalState;
  },
});

//unstake modal states
const stake_unstakeModal_defaultValue = {
  stake_unstakeModal_balance: "0",
};

const stake_unstakeModal_input = atom({
  key: "stake_unstakeModal_input",
  default: stake_unstakeModal_defaultValue,
});

const stake_unstakeModal_state = selector({
  key: "stake_unstakeModal_input_state", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const selectedModalState = get(stake_unstakeModal_input);
    return selectedModalState;
  },
});

//update modal states
const stake_updateModal_defaultValue = {
  stake_updateModal_period: maxPeriod,
  stake_updateModal_ltos_balance: undefined,
  stake_updateModal_tos_balance: undefined,
};

const stake_updateModal_inputState = atom({
  key: "stake_updateModal_input",
  default: stake_updateModal_defaultValue,
});

const stake_updateModal_state = selector({
  key: "stake_updateModal_input_state", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const selectedInputState = get(stake_updateModal_inputState);
    return selectedInputState;
  },
});

export {
  stake_stakeModal_defaultValue,
  stake_stakeModal_input,
  stake_stakeModal_state,
  stake_unstakeModal_defaultValue,
  stake_unstakeModal_input,
  stake_unstakeModal_state,
  stake_updateModal_inputState,
  stake_updateModal_state,
  stake_updateModal_defaultValue,
};
