import { atom, selector } from "recoil";
import constant from "constant";

const stake_filter_radio = atom({
  key: "stake_filter_radio",
  default: "All",
});

const stake_filter_radio_state = selector({
  key: "stake_filter_radio_state", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const stakeFilterRadioState = get(stake_filter_radio);
    return stakeFilterRadioState;
  },
});

const stake_filter_sort = atom({
  key: "stake_filter_sort",
  default: "Earliest",
});

const stake_filter_sort_state = selector({
  key: "stake_filter_sort_state", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const stakeFilterSortState = get(stake_filter_radio);
    return stakeFilterSortState;
  },
});

export {
  stake_filter_radio,
  stake_filter_radio_state,
  stake_filter_sort,
  stake_filter_sort_state,
};
