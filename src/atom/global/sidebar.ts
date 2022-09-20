import { atom, selector } from "recoil";

const accountBar = atom<boolean>({
  key: "sideBar",
  default: false,
});

const accountBarStatus = selector({
  key: "sideBarStatus", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const selectedSideBarStatus = get(accountBar);
    return selectedSideBarStatus;
  },
});

export { accountBar, accountBarStatus };
