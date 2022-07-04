import { atom } from "recoil";

const filterState = atom({
  key: "graphFilter",
  default: "1 Week",
});

export { filterState };
