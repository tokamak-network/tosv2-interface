import { Box, Button, Tooltip, useColorMode, useTheme } from "@chakra-ui/react";
import Image from "next/image";
import { useCallback, useMemo } from "react";
import QuestionIcon from "assets/icons/question.svg";
import BasicTooltip from "common/tooltip/index";

type ButtonIconNames = "Question" | undefined;

type BasicButtonProp = {
  name: string;
  w?: number | string;
  h?: number | string;
  isDisabled?: boolean;
  style?: any;
  onClick?: () => void;
  tooltip?: string;
};

const BasicButton: React.FC<BasicButtonProp> = (props) => {
  const { name, w, h, isDisabled, style, onClick, tooltip } = props;
  const theme = useTheme();
  const { colorMode } = useColorMode();
  return (
    <Button
      w={w || 150}
      h={h || 33}
      isDisabled={isDisabled}
      _hover={isDisabled ? {} : { borderColor: "blue.100", color: "blue.100" }}
      _focus={{ backgroundColor: "transparent" }}
      _disabled={{
        border:
          colorMode === "dark" ? "1px solid #535353" : "1px solid #c6cbd9",
        color: colorMode === "light" ? "#c6cbd9" : "#5a5a5a",
        cursor: "not-allowed",
      }}
      _active={{ backgroundColor: "transparent" }}
      fontSize={12}
      {...theme.BUTTON_STYLE.basicButtonStyle(colorMode)}
      color={colorMode === "dark" ? "#f1f1f1" : "#07070c"}
      {...style}
      //   background={"white.100"}
      onClick={onClick ? () => onClick() : null}
      zIndex={10}
    >
      <Box mx={"6px"}>{name}</Box>

      {name === "Manage" ? <BasicTooltip label={tooltip} /> : <></>}
    </Button>
  );
};

export default BasicButton;
