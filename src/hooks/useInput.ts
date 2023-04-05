import { useEffect } from "react";
import { Resetter, SetterOrUpdater } from "recoil";
import { PageKey } from "types";
import { InputKey } from "types/atom";
import useBondInput from "./bond/useBondInput";
import useStakeInput from "./stake/useStakeInput";
import useModal from "./useModal";

function useInput<T>(
  key: PageKey,
  subKey: InputKey
): {
  inputValue: T | any;
  value: any | any;
  setValue: SetterOrUpdater<any> | any;
  setResetValue: Resetter | any;
} {
  const { inputValue, value, setValue, resetValue } = useStakeInput<T>(subKey);
  const {
    inputValue: bondInputValue,
    value: bondValue,
    setValue: setBondvalue,
    resetValue: setResetBondValue,
  } = useBondInput<T>(subKey);

  switch (key) {
    case "Stake_screen":
      return {
        inputValue,
        value,
        setValue,
        setResetValue: resetValue,
      };
    case "Bond_screen":
      return {
        inputValue: bondInputValue,
        value: bondValue,
        setValue: setBondvalue,
        setResetValue: setResetBondValue,
      };
    default:
      return {
        inputValue: undefined,
        value: undefined,
        setValue: undefined,
        setResetValue: undefined,
      };
  }
}

export default useInput;
