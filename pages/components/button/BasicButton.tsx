import { Button, useColorMode, useTheme } from "@chakra-ui/react";

type BasicButtonProp = {
  name: string;
  w?: number;
  h?: number;
  isDisabled?: boolean;
};

const BasicButton: React.FC<BasicButtonProp> = (props) => {
  const { name, w, h, isDisabled } = props;
  const theme = useTheme();
  const { colorMode } = useColorMode();
  return (
    <Button
      w={w || 150}
      h={h || 33}
      isDisabled={isDisabled}
      _hover={isDisabled ? {} : { borderColor: "blue.100", color: "blue.100" }}
      fontSize={12}
      {...theme.BUTTON_STYLE.basicButtonStyle(colorMode)}
      //   background={"white.100"}
    >
      {name}
    </Button>
  );
};

export default BasicButton;
