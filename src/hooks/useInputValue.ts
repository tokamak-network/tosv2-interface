import { inputBalanceState } from "atom/global/input";
import { useRecoilValue } from "recoil";

function useInputValue() {
  const inputValues = useRecoilValue(inputBalanceState);

  return { inputValues };
}

export default useInputValue;
