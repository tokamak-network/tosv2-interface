import {
  Tooltip,
  useColorMode,
  PlacementWithLogical,
  Box,
} from "@chakra-ui/react";

import QuestionLineIcon from "assets/icons/question.svg";
import Image from "next/image";

type tooltipProps = {
  label: string | undefined;
  placement?: PlacementWithLogical;
};

const BasicTooltip: React.FC<tooltipProps> = (props) => {
  const { colorMode } = useColorMode();
  const { label, placement } = props;

  return (
    <Tooltip
      display={label?.length === 0 ? "none" : "flex"}
      placement={placement ?? "top"}
      label={label}
      bg={colorMode === "dark" ? "#1f2128" : "#fff"}
      borderRadius={"3px"}
      color={colorMode === "light" ? "#07070c" : "#8b8b93"}
      fontSize="12px"
      border={colorMode === "light" ? "solid 1px #e8edf2" : "solid 1px #313442"}
    >
      <Box w={"16px"} h={"16px"}>
        <Image src={QuestionLineIcon} alt={"QuestionLineIcon"} />
      </Box>
    </Tooltip>
  );
};

export default BasicTooltip;
