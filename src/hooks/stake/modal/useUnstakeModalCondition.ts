import { useCheckInput } from "hooks/input/useCheckInput";
import useInput from "hooks/useInput";
import useModal from "hooks/useModal";

export default function useUnstakeModalCondition() {
  const { selectedModalData, selectedModal } = useModal<{
    hasInput: boolean;
    stakedId: string;
    ltosAmount: string;
    ltosWei: string;
  }>();
  const { inputValue } = useInput<"stake_unstakeModal_balance">(
    "Stake_screen",
    "unstake_modal"
  );
  const ltosInput = inputValue.stake_unstakeModal_balance;
  const ltosWei = selectedModalData?.ltosWei;
  const inputBalanceIsEmpty = useCheckInput(ltosInput);
  const inputOver = Number(ltosInput) > Number(ltosWei);
  const zeroInputBalance = Number(ltosInput) === 0;

  const btnDisabled = inputBalanceIsEmpty || inputOver || zeroInputBalance;

  return { inputBalanceIsEmpty, inputOver, zeroInputBalance, btnDisabled };
}
