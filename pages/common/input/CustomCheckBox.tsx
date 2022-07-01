import { Box, Checkbox, Input, useColorMode, useTheme } from "@chakra-ui/react";

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

  return <Checkbox size={"lg"} style={{ borderRadius: "4px" }}></Checkbox>;
};

export default CustomCheckBox;
