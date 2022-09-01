import { PageKey } from "types";
import { Stake_InputKey, Bond_InputKey } from "types/atom";
import useBondInput from "./bond/useBondInput";
import useStakeInput from "./stake/useStakeInput";

function useInput(key: PageKey, subKey: Bond_InputKey | Stake_InputKey) {
  const { inputValue, value, setValue } = useStakeInput(subKey);
  const {
    inputValue: bondInputValue,
    value: bondValue,
    setValue: setBondvalue,
  } = useBondInput(subKey);

  switch (key) {
    case "Stake_screen":
      return {
        inputValue,
        value,
        setValue,
      };
    case "Bond_screen":
      return {
        inputValue: bondInputValue,
        value: bondValue,
        setValue: setBondvalue,
      };
    default:
      return {
        inputValue: undefined,
        value: undefined,
        setValue: undefined,
      };
  }
}

export default useInput;
