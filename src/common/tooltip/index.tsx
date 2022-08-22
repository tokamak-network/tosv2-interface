import {
    Tooltip,
    IconButton,
    useColorMode
  } from "@chakra-ui/react";

  import { QuestionOutlineIcon } from "@chakra-ui/icons";

  type tooltipProps = {
    label: string| undefined;
  }

  const BasicTooltip: React.FC<tooltipProps> = (props) => {
    const { colorMode } = useColorMode();
    const {label} = props
    return (
        <Tooltip
        label={label}
        bg={colorMode === "dark" ? "#1f2128" : "#fff"}
        borderRadius={"3px"}
        defaultIsOpen={false}
        color={colorMode === "light" ? "#07070c" : "#8b8b93"}
        fontSize="12px"
        border={
          colorMode === "light"
            ? "solid 1px #e8edf2"
            : "solid 1px #313442"
        }
      >
        <IconButton
          aria-label="Search database"
          h={"16px"}
          minW={"16px"}
          icon={<QuestionOutlineIcon/>}
          bg={"transparent"}
          p={0}
          _hover={{ bg: "transparent" }}
          _active={{ bg: "transparent" }}
        />
    
      </Tooltip>
    )
  }

  export default BasicTooltip;