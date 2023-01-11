import { atom, selector } from "recoil";

const introTextHover = atom<1 | 2 | 3 | undefined>({
  key: "selectedText",
  default: undefined,
});

const introTextHoverSelectedState = selector({
  key: "introSelectedText", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const selectedText = get(introTextHover);
    return selectedText;
  },
});

export { introTextHover, introTextHoverSelectedState };
