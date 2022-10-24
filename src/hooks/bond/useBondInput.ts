import { bond_bondModal_input, bond_bondModal_state } from "atom/bond/input";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { InputKey, Bond_InputValueType } from "types/atom";

function useBondInput(key: InputKey): {
  inputValue: any;
  value: any;
  setValue: any;
  resetValue: any;
} {
  const stakeModal_inputValues = useRecoilValue(bond_bondModal_state);
  const [bondModalValue, setBondModalValue] =
    useRecoilState(bond_bondModal_input);
  const resetBondModalValue = useResetRecoilState(bond_bondModal_input);

  switch (key) {
    case "bond_modal":
      return {
        inputValue: stakeModal_inputValues,
        value: bondModalValue,
        setValue: setBondModalValue,
        resetValue: resetBondModalValue,
      };
    default:
      return {
        inputValue: undefined,
        value: undefined,
        setValue: undefined,
        resetValue: undefined,
      };
  }
}

export default useBondInput;
