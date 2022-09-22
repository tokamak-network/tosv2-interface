import {
  Tooltip,
  IconButton,
  useColorMode,
  Text,
  forwardRef,
  Icon,
  BoxProps,
} from "@chakra-ui/react";

import { QuestionOutlineIcon, AttachmentIcon } from "@chakra-ui/icons";

type tooltipProps = {
  label: string | undefined;
};

const BasicTooltip: React.FC<tooltipProps> = (props) => {
  const { colorMode } = useColorMode();
  const { label } = props;

  return (
    <Tooltip
      display={label?.length === 0 ? "none" : "flex"}
      label={label}
      bg={colorMode === "dark" ? "#1f2128" : "#fff"}
      borderRadius={"3px"}
      color={colorMode === "light" ? "#07070c" : "#8b8b93"}
      fontSize="12px"
      border={colorMode === "light" ? "solid 1px #e8edf2" : "solid 1px #313442"}
    >
     <QuestionOutlineIcon   display={label?.length === 0 ? "none" : ""}  h={"16px"}
        minW={"16px"}/>
    </Tooltip>
  );
};

export default BasicTooltip;