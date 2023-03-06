import { getNowTimeStamp, getTimeLeft } from "@/utils/time";
import { atom, selector } from "recoil";

export type T_BondModalValues = {
  fiveDaysLockup: boolean;
  fiveDaysLockupEndTime: string;
};

const defaultValue: T_BondModalValues = {
  fiveDaysLockup: false,
  // fiveDaysLockupEndTime: setInterval(() => {
  //   getTimeLeft(getNowTimeStamp(), 5, "YYYY. MM.DD. HH:mm");
  // }, 1000),
  fiveDaysLockupEndTime: "",
};

const bond_modal = atom<T_BondModalValues>({
  key: "bond_modal_values",
  default: defaultValue,
});

const bond_modal_state = selector({
  key: "bond_modal_values_state", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const bondFilterSortState = get(bond_modal);
    return bondFilterSortState;
  },
});

export { bond_modal, bond_modal_state };
