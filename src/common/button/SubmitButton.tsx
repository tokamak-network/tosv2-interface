import {
  Button,
  useColorMode,
  useTheme,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import PlusIcon from "assets/icons/Plus.png";
import ResourcesIcon from "assets/icons/resources_icon@3x.png";
type IconTypes = "Plus" | "ResourcesIcon" | undefined;

type SubmitButtonProp = {
  name: string;
  w?: number | string;
  h?: number | string;
  isDisabled?: boolean;
  isLoading?: boolean;
  style?: {};
  onClick?: Function;
  iconName?: IconTypes;
  iconLocation?: string;
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

    case "ResourcesIcon":
      return (
        <Image
          src={ResourcesIcon}
          alt={"ResourcesIcon"}
          style={{ overflow: "visible" }}
        />
      );
    default:
      return null;
  }
};

const SubmitButton: React.FC<SubmitButtonProp> = (props) => {
  const {
    name,
    w,
    h,
    isDisabled,
    isLoading,
    style,
    onClick,
    iconName,
    iconLocation,
  } = props;
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
      fontSize={16}
      spinner={<Spinner size={"md"}></Spinner>}
      {...theme.BUTTON_STYLE.submitButtonStyle(colorMode)}
      bgColor={isDisabled ? (colorMode === "dark" ? "#1e1e24" : "#e9edf1") : ""}
      color={
        isDisabled ? (colorMode === "dark" ? "#5a5a5a" : "#a9a9b7") : "#f1f1f1"
      }
      onClick={() => onClick && onClick()}
      _disabled={{ opacity: 1 }}
      _active={{}}
      {...style}
    >
      {iconLocation === "left" && getIcon(iconName)}
      <Text ml={icon ? "8px" : "0px"} mr={icon ? "23px" : "0px"}>
        {name}
      </Text>
      {iconLocation === "right" && getIcon(iconName)}
    </Button>
  );
};

export default SubmitButton;
