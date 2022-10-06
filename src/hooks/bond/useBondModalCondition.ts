import useInput from "hooks/useInput";
import { useEffect, useState } from "react";
import { BondModalInput } from "types/bond";

function useBondModalCondition(maxValue: number | undefined) {
  const [inputOver, setInputOver] = useState<boolean>(true);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);

  const { inputValue, setValue, setResetValue } = useInput(
    "Bond_screen",
    "bond_modal"
  );

  useEffect(() => {
    if (
      inputValue.bond_modal_balance === undefined ||
      inputValue.bond_modal_balance === ""
    ) {
      return setInputOver(false);
    }
    if (maxValue && inputValue.bond_modal_balance) {
      if (Number(inputValue.bond_modal_balance) > maxValue) {
        return setInputOver(true);
      }
      return setInputOver(false);
    }
  }, [inputValue, maxValue]);

  //   useEffect(() => {
  //     if (inputValue.bond_modal_balance === "") {
  //       return setBtnDisabled(true);
  //     }
  //     if (
  //       inputValue.bond_modal_balance === "" ||
  //       inputValue.bond_modal_balance === undefined ||
  //       inputValue.bond_modal_balance === "0" ||
  //       inputValue.bond_modal_balance === 0
  //     ) {
  //       return setBtnDisabled(true);
  //     }
  //     return setBtnDisabled(false);
  //   }, [inputValue]);

  return { inputOver, btnDisabled };
}

export default useBondModalCondition;