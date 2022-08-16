import {
  Button,
  useColorMode,
  useTheme,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import PlusIcon from "assets/icons/Plus.png";

type IconTypes = "Plus" | undefined;

type SubmitButtonProp = {
  name: string;
  w?: number | string;
  h?: number | string;
  isDisabled?: boolean;
  isLoading?: boolean;
  style?: {};
  onClick?: Function;
  iconName?: IconTypes;
};

const getIcon = (iconName: IconTypes) => {
  switch (iconName) {
    case "Plus":
      return (
        <Image
          src={PlusIcon}
          alt={"PlusIcon"}
          style={{ overflow: "visible" }}
        ></Image>
      );
    default:
      return null;
  }
};

const SubmitButton: React.FC<SubmitButtonProp> = (props) => {
  const { name, w, h, isDisabled, isLoading, style, onClick, iconName } = props;
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const icon = getIcon(iconName);
  return (
    <Button
      w={w || 150}
      h={h || 42}
      isDisabled={isDisabled}
      isLoading={isLoading}
      _hover={{}}
      _focus={{ backgroundColor: "#257eee" }}
      fontSize={12}
      spinner={<Spinner size={"md"}></Spinner>}
      {...theme.BUTTON_STYLE.submitButtonStyle(colorMode)}
      bgColor={isDisabled ? "gray.500" : ""}
      onClick={() => onClick && onClick()}
      {...style}
    >
      {icon}
      <Text ml={icon ? "8px" : "0px"}>{name}</Text>
    </Button>
  );
};

export default SubmitButton;
