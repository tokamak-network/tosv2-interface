import { Box, Checkbox, Input, useColorMode, useTheme } from "@chakra-ui/react";
import useCheckbox from "hooks/useCheckbox";
import usePathName from "hooks/usePathName";
import React, { useEffect, useState } from "react";
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
  } = props;
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { selectedCheckbox, setThisCheckboxValue } = useCheckbox();
  const { pathName } = usePathName();
  const [isCheckedAll, setIsChecked] = useState<boolean>(false);

  // console.log(selectedCheckbox);

  useEffect(() => {
    const isCheckedAll = selectedCheckbox?.filter((data) => {
      if (data.pageKey === pageKey) {
        return data.values === "selectAll";
      }
    });

    if (isCheckedAll) {
      return setIsChecked(isCheckedAll.length > 0);
    }
  }, [selectedCheckbox, pageKey]);

  useEffect(() => {
    // (async () => {
    // })();
  }, [isCheckedAll]);

  return (
    <Checkbox
      size={"lg"}
      style={{ borderRadius: "4px", borderColor: colorMode === 'dark'? '#535353':'#c6cbd9' }}
      isChecked={isCheckedAll}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setIsChecked(isChecked);
        setThisCheckboxValue({
          page: pathName as Pages,
          values: value,
          key: `${pathName}_${valueKey}`,
          pageKey,
        });
      }}
    ></Checkbox>
  );
};

export default CustomCheckBox;
