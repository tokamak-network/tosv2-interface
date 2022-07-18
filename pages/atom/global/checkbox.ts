import { atom, selector } from "recoil";
import { CheckBoxValuesType } from "types";

const checkboxState = atom<CheckBoxValuesType>({
  key: "checkValues",
  default: undefined,
});

const selectedCheckboxState = selector({
  key: "selectedValues", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const selectedModalState = get(checkboxState);
    return selectedModalState;
  },
});

export { checkboxState, selectedCheckboxState };
