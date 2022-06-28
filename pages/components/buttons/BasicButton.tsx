import { Button, useColorMode, useTheme } from "@chakra-ui/react";

type BasicButtonProp = {
  name: string;
  w?: number;
  h?: number;
};

const BasicButton: React.FC<BasicButtonProp> = (props) => {
  const { name, w, h } = props;
  const theme = useTheme();
  const { colorMode } = useColorMode();
  console.log(colorMode);
  console.log(theme.BUTTON_STYLE.buttonStyle(colorMode));
  return (
    <Button
      w={w || 150}
      h={h || 33}
      {...theme.BUTTON_STYLE.buttonStyle(colorMode)}
      //   background={"white.100"}
    >
      {name}
    </Button>
  );
};

export default BasicButton;
