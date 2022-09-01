import { bond_bondModal_input, bond_bondModal_state } from "atom/bond/input";
import { useRecoilState, useRecoilValue } from "recoil";
import { InputKey, Bond_InputValueType } from "types/atom";

function useBondInput(key: InputKey): {
  inputValue: any;
  value: any;
  setValue: any;
} {
  const stakeModal_inputValues = useRecoilValue(bond_bondModal_state);
  const [bondModalValue, setBondModalValue] =
    useRecoilState(bond_bondModal_input);

  switch (key) {
    case "bond_modal":
      return {
        inputValue: stakeModal_inputValues,
        value: bondModalValue,
        setValue: setBondModalValue,
      };
    default:
      return {
        inputValue: undefined,
        value: undefined,
        setValue: undefined,
      };
  }
}

export default useBondInput;
