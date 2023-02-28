import { atom, selector } from "recoil";
import CONTRACT_ADDRESS from "services/addresses/contract";

export type T_Token = {
  name: string;
  address: string;
  img: string;
};

export type T_swapTX = {
  tx: boolean;
  data: {
    name: string;
  };
};

export type T_focus = "input1" | "input2";

const { TOS_ADDRESS } = CONTRACT_ADDRESS;

const selectedToken0 = atom<T_Token>({
  key: "selectedToken0",
  default: {
    name: "",
    address: "",
    img: "",
  },
});

const selectedToken1 = atom<T_Token>({
  key: "selectedToken1",
  default: {
    name: "TOS",
    address: TOS_ADDRESS,
    img: "https://tonstarter-symbols.s3.ap-northeast-2.amazonaws.com/tos-symbol%403x.png",
  },
});

const swapTX = atom<T_swapTX>({
  key: "swapTX",
  default: {
    tx: false,
    data: {
      name: "",
    },
  },
});

const slip = atom<string>({
  key: "slip",
  default: "1",
});

const focus = atom<T_focus>({
  key: "focus",
  default: "input1",
});

const swapFromAmount = atom<string>({
  key: "swapFromAmount",
  default: "0",
});

const swapToAmount = atom<string>({
  key: "swapToAmount",
  default: "0",
});

const selectedToken0_state = selector<T_Token>({
  key: "selectedToken0_state",
  get: ({ get }) => {
    const selectedToken0State = get(selectedToken0);
    return selectedToken0State;
  },
});

const selectedToken1_state = selector<T_Token>({
  key: "selectedToken1_state",
  get: ({ get }) => {
    const selectedToken1State = get(selectedToken1);
    return selectedToken1State;
  },
});

const swapTX_state = selector<T_swapTX>({
  key: "swapTX_state",
  get: ({ get }) => {
    const swapTXState = get(swapTX);
    return swapTXState;
  },
});

const slip_state = selector<string>({
  key: "slip_state",
  get: ({ get }) => {
    const slipState = get(slip);
    return slipState;
  },
});

const focus_state = selector<string>({
  key: "focus_state",
  get: ({ get }) => {
    const focusState = get(focus);
    return focusState;
  },
});

const swapFromAmount_state = selector<string>({
  key: "swapFromAmount_state",
  get: ({ get }) => {
    const swapFromAmountState = get(swapFromAmount);
    return swapFromAmountState;
  },
});

const swapToAmount_state = selector<string>({
  key: "swapToAmount_state",
  get: ({ get }) => {
    const swapToAmountState = get(swapToAmount);
    return swapToAmountState;
  },
});

export {
  selectedToken0,
  selectedToken0_state,
  selectedToken1,
  selectedToken1_state,
  swapTX,
  swapTX_state,
  slip,
  slip_state,
  focus,
  focus_state,
  swapFromAmount,
  swapFromAmount_state,
  swapToAmount,
  swapToAmount_state,
};
