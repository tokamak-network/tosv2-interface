import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  useColorMode,
  useTheme,
} from "@chakra-ui/react";
import { inputState } from "atom/global/input";
import React from "react";
import { useRecoilState } from "recoil";

type InputProp = {
  placeHolder?: string;
  w?: number | string;
  h?: number | string;
  isDisabled?: boolean;
  value?: string | number;
  isError?: boolean;
};

const TextInput: React.FC<InputProp> = (props) => {
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

function BalanceInput(props: InputProp) {
  const { placeHolder, w, h, isDisabled, isError } = props;
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const [value, setValue] = useRecoilState(inputState);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <InputGroup>
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
        onChange={onChange}
      ></Input>
      <InputRightElement
        ml={"30px"}
        w={"30px"}
        fontSize={14}
        mr={"12px"}
        cursor={"pointer"}
      >
        <Flex w={"30px"} h={"20px"} color={"#2775ff"}>
          Max
        </Flex>
      </InputRightElement>
    </InputGroup>
  );
}

export { TextInput, BalanceInput };
