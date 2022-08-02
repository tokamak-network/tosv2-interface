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
      if (sCheckbox !== undefined && sCheckbox.length > 0) {
        const isExist = sCheckbox.filter((data) => {
          return data.key === thisCheckboxValue.key;
        });
        // console.log("go");
        // console.log(thisCheckboxValue);
        // console.log(isExist);
        // console.log(sCheckbox);
        // console.log(isExist === sCheckbox);
        if (isExist.length === 0) {
          const values = [...sCheckbox, thisCheckboxValue];
          return setSelectedCheckbox(values);
        } else {
          const values = sCheckbox.filter((data) => {
            return data.key !== thisCheckboxValue.key;
          });
          return setSelectedCheckbox(values);
        }
      }
      const values = [thisCheckboxValue];
      setSelectedCheckbox(values);
    }
  }, [thisCheckboxValue]);

  useEffect(() => {}, [sCheckbox]);

  return {
    selectedCheckbox,
    setSelectedCheckbox,
    setThisCheckboxValue,
  };
}

export default useCheckbox;
