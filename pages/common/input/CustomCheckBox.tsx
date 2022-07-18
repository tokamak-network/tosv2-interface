import { Box, Checkbox, Input, useColorMode, useTheme } from "@chakra-ui/react";
import useCheckbox from "hooks/useCheckbox";
import React from "react";

type CheckBoxProp = {
  placeHolder?: string;
  w?: number;
  h?: number;
  isDisabled?: boolean;
  value?: string | number;
  isError?: boolean;
};

const CustomCheckBox: React.FC<CheckBoxProp> = (props) => {
  const { placeHolder, w, h, isDisabled, value, isError } = props;
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { setThisCheckboxValue } = useCheckbox();

  return (
    <Checkbox
      size={"lg"}
      style={{ borderRadius: "4px" }}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        console.log(e);
        setThisCheckboxValue(
          isChecked
            ? {
                page: "Stake",
                values: "",
              }
            : undefined
        );
      }}
    ></Checkbox>
  );
};

export default CustomCheckBox;
