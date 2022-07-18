import { checkboxState, selectedCheckboxState } from "atom/global/checkbox";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { CheckBoxValuesType, CheckBoxValueType } from "types";

function useCheckbox() {
  const selectedCheckbox = useRecoilValue(selectedCheckboxState);
  const [sCheckbox, setSelectedCheckbox] =
    useRecoilState<CheckBoxValuesType>(checkboxState);
  const [thisCheckboxValue, setThisCheckboxValue] = useState<
    CheckBoxValueType | undefined
  >(undefined);

  useEffect(() => {
    if (thisCheckboxValue) {
      const values = sCheckbox
        ? [...sCheckbox, thisCheckboxValue]
        : [thisCheckboxValue];
      setSelectedCheckbox(values);
    }
  }, [thisCheckboxValue]);

  console.log(thisCheckboxValue);
  console.log(sCheckbox);
  console.log(selectedCheckbox);

  return {
    selectedCheckbox,
    setSelectedCheckbox,
    setThisCheckboxValue,
  };
}

export default useCheckbox;
