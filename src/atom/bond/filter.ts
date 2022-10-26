import { atom, selector } from "recoil";

export type T_SortValues = "Earliest" | "Latest";

const bond_filter_sort = atom<T_SortValues>({
  key: "bond_filter_sort",
  default: "Earliest",
});

const bond_filter_sort_state = selector({
  key: "bond_filter_sort_state", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const bondFilterSortState = get(bond_filter_sort);
    return bondFilterSortState;
  },
});

export { bond_filter_sort, bond_filter_sort_state };
