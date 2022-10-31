import { atom, selector } from "recoil";

//stake & update max weeks
const maxPeriod = 155;

//stake modal states
const bond_bondModal_defaultValue = {
  bond_modal_period: maxPeriod,
  bond_modal_balance: undefined,
};

const bond_bondModal_input = atom({
  key: "bond_bondModal_input",
  default: bond_bondModal_defaultValue,
});

const bond_bondModal_state = selector({
  key: "bond_bondModal_input_state", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const selectedModalState = get(bond_bondModal_input);
    return selectedModalState;
  },
});

export {
  bond_bondModal_defaultValue,
  bond_bondModal_input,
  bond_bondModal_state,
};
