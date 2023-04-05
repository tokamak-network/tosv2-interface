import { bond_bondModal_input, bond_bondModal_state } from "atom/bond/input";
import {
  Resetter,
  SetterOrUpdater,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from "recoil";
import { InputKey, Bond_InputValueType } from "types/atom";

function useBondInput<T>(key: InputKey): {
  inputValue: T | any;
  value: T | any;
  setValue: SetterOrUpdater<any> | undefined;
  resetValue: Resetter | undefined;
} {
  const bondModal_inputValues = useRecoilValue(bond_bondModal_state);
  const [bondModalValue, setBondModalValue] =
    useRecoilState(bond_bondModal_input);
  const resetBondModalValue = useResetRecoilState(bond_bondModal_input);

  switch (key) {
    case "bond_modal":
      return {
        inputValue: bondModal_inputValues,
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
