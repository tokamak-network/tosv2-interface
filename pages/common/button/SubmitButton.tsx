import { Button, useColorMode, useTheme, Spinner } from "@chakra-ui/react";

type SubmitButtonProp = {
  name: string;
  w?: number | string;
  h?: number | string;
  isDisabled?: boolean;
  isLoading?: boolean;
  style?: {};
  onClick?: () => void;
};

const SubmitButton: React.FC<SubmitButtonProp> = (props) => {
  const { name, w, h, isDisabled, isLoading, style, onClick } = props;
  const theme = useTheme();
  const { colorMode } = useColorMode();
  return (
    <Button
      w={w || 150}
      h={h || 42}
      isDisabled={isDisabled}
      isLoading={isLoading}
      _hover={{}}
      fontSize={12}
      spinner={<Spinner size={"md"}></Spinner>}
      {...theme.BUTTON_STYLE.submitButtonStyle(colorMode)}
      bgColor={isDisabled ? "gray.500" : ""}
      onClick={() => onClick()}
      {...style}
    >
      {name}
    </Button>
  );
};

export default SubmitButton;
