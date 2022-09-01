import {
  stake_stakeModal_input,
  stake_stakeModal_state,
  stake_unstakeModal_input,
  stake_unstakeModal_state,
  stake_updateModal_inputState,
  stake_updateModal_state,
} from "atom/stake/input";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { InputKey } from "types/atom";

function useStakeInput(key: InputKey): {
  inputValue: any;
  value: any;
  setValue: any;
  resetValue: any;
} {
  const stakeModal_inputValues = useRecoilValue(stake_stakeModal_state);
  const [stakeModalValue, setStakeModalValue] = useRecoilState(
    stake_stakeModal_input
  );
  const resetStakeModalValue = useResetRecoilState(stake_stakeModal_input);

  const updateModal_inputValues = useRecoilValue(stake_updateModal_state);
  const [updateModalValue, setUpdateModalValue] = useRecoilState(
    stake_updateModal_inputState
  );
  const resetUpdateModalValue = useResetRecoilState(
    stake_updateModal_inputState
  );

  const unstakeModal_inputValues = useRecoilValue(stake_unstakeModal_state);
  const [unstakeModalValue, setUnstakeModalValue] = useRecoilState(
    stake_unstakeModal_input
  );
  const resetUnstakeModalValue = useResetRecoilState(stake_unstakeModal_input);

  switch (key) {
    case "stake_modal":
      return {
        inputValue: stakeModal_inputValues,
        value: stakeModalValue,
        setValue: setStakeModalValue,
        resetValue: resetStakeModalValue,
      };
    case "update_modal":
      return {
        inputValue: updateModal_inputValues,
        value: updateModalValue,
        setValue: setUpdateModalValue,
        resetValue: resetUpdateModalValue,
      };
    case "unstake_modal":
      return {
        inputValue: unstakeModal_inputValues,
        value: unstakeModalValue,
        setValue: setUnstakeModalValue,
        resetValue: resetUnstakeModalValue,
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

export default useStakeInput;
