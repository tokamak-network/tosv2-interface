import { Box, Checkbox, Input, useColorMode, useTheme } from "@chakra-ui/react";
import useCheckbox from "hooks/useCheckbox";
import usePathName from "hooks/usePathName";
import React, { SetStateAction, useEffect, useState } from "react";
import { PageKey, Pages } from "types";

type CheckBoxProp = {
  placeHolder?: string;
  w?: number;
  h?: number;
  isDisabled?: boolean;
  value: any;
  valueKey: any;
  pageKey: PageKey;
  isError?: boolean;
  isChecked?: boolean;
  state?: boolean;
  setState?: React.Dispatch<SetStateAction<boolean>>;
};

const CustomCheckBox: React.FC<CheckBoxProp> = (props) => {
  const {
    placeHolder,
    w,
    h,
    isDisabled,
    value,
    valueKey,
    pageKey,
    isError,
    isChecked,
    state,
    setState,
  } = props;
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { selectedCheckbox, setThisCheckboxValue } = useCheckbox();
  const { pathName } = usePathName();
  const [isCheckedAll, setIsChecked] = useState<boolean>(false);

  // useEffect(() => {
  //   const isCheckedAll = selectedCheckbox?.filter((data) => {
  //     if (data.pageKey === pageKey) {
  //       return data.values === "selectAll";
  //     }
  //   });

  //   if (isCheckedAll) {
  //     return setIsChecked(isCheckedAll.length > 0);
  //   }
  // }, [selectedCheckbox, pageKey]);

  // useEffect(() => {
  //   // (async () => {
  //   // })();
  // }, [isCheckedAll]);

  return (
    <Checkbox
      size={"lg"}
      style={{
        borderRadius: "4px",
        borderColor: colorMode === "dark" ? "#535353" : "#c6cbd9",
      }}
      isChecked={state}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        if (setState) {
          setState(isChecked);
        }
        // setIsChecked(isChecked);
        // setThisCheckboxValue({
        //   page: pathName as Pages,
        //   values: isChecked,
        //   key: `${pathName}_${valueKey}`,
        //   pageKey,
        // });
      }}
    ></Checkbox>
  );
};

export default CustomCheckBox;
