import { Input, useColorMode, useTheme } from "@chakra-ui/react";

type TextInputProp = {
  placeHolder?: string;
  w?: number;
  h?: number;
  isDisabled?: boolean;
  value?: string | number;
  isError?: boolean;
};

const TextInput: React.FC<TextInputProp> = (props) => {
  const { placeHolder, w, h, isDisabled, value, isError } = props;
  const theme = useTheme();
  const { colorMode } = useColorMode();

  return (
    <Input
      isInvalid={isError}
      w={w || 270}
      h={h || 45}
      borderRadius={8}
      borderWidth={1}
      borderColor={colorMode === "light" ? "" : "#313442"}
      fontSize={14}
      color={colorMode === "light" ? "" : "#313442"}
      _placeholder={{ color: "#64646f" }}
      _hover={{ borderColor: "#535353" }}
      focusBorderColor="#8a8a98"
      _focus={{ color: "#f1f1f1", boxShadow: "" }}
      errorBorderColor={"#e23738"}
      value={value}
    ></Input>
  );
};

export default TextInput;
