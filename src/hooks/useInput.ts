import { PageKey } from "types";
import { Stake_InputKey } from "types/atom";
import useStakeInput from "./stake/useStakeInput";

function useInput(key: PageKey, subKey: Stake_InputKey) {
  const { inputValue, value, setValue } = useStakeInput(subKey);
  switch (key) {
    case "Stake_screen":
      return {
        inputValue,
        value,
        setValue,
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
