import { atom, selector } from "recoil";
import { CheckBoxValuesType, PageKey } from "types";

const checkboxAll = atom<PageKey | undefined>({
  key: "checkAllValue",
  default: undefined,
});

const checkboxsState = atom<any[]>({
  key: "checkboxValue",
  default: [],
});

const selectedCheckboxState = selector({
  key: "selectedCheckboxValues", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const selectedModalState = get(checkboxsState);
    return selectedModalState;
  },
  set: ({ set }, newValue) => {
    set(checkboxsState, newValue);
  },
});

export { checkboxAll, checkboxsState, selectedCheckboxState };
