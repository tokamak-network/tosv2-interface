import { Box, Checkbox, Input, useColorMode, useTheme } from "@chakra-ui/react";

type CheckBoxProp = {
  placeHolder?: string;
  w?: number;
  h?: number;
  isDisabled?: boolean;
  value?: string | number;
  isError?: boolean;
};

const CheckBox: React.FC<CheckBoxProp> = (props) => {
  const { placeHolder, w, h, isDisabled, value, isError } = props;
  const theme = useTheme();
  const { colorMode } = useColorMode();

  return (
    <input
      type={"checkbox"}
      style={{ width: 20, height: 20, backgroundColor: "#000000" }}
    ></input>
  );
};

export default CheckBox;
