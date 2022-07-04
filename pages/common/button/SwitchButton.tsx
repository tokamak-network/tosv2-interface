import { Button, useColorMode, useTheme } from "@chakra-ui/react";

type SwitchButtonProps = {
  name: string;
  w?: number | string;
  h?: number | string;
  isDisabled?: boolean;
  isSelected?: boolean;
  style?: any;
};

const SwitchButton: React.FC<SwitchButtonProps> = (props) => {
  const { name, w, h, isDisabled, isSelected, style } = props;
  const theme = useTheme();
  const { colorMode } = useColorMode();

  console.log("--");
  console.log(isSelected);
  return (
    <Button
      w={w || 150}
      h={h || 33}
      isDisabled={isDisabled}
      _hover={
        isDisabled
          ? {}
          : isSelected
          ? { color: "white.100" }
          : { color: "blue.100" }
      }
      fontSize={12}
      {...theme.BUTTON_STYLE.basicButtonStyle(colorMode)}
      border={"1px solid #313442"}
      color={isSelected ? "white.100" : "gray.200"}
      fontWeight={0}
      bgColor={isSelected ? "blue.200" : ""}
      {...style}
      //   background={"white.100"}
    >
      {name}
    </Button>
  );
};

export default SwitchButton;
