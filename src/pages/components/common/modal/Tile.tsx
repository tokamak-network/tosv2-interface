import {
  Box,
  Flex,
  Text,
  useColorMode,
  Tooltip,
  useMediaQuery,
} from "@chakra-ui/react";
import Image from "next/image";
import question from "assets/icons/question.svg";
import BasicTooltip from "common/tooltip";
import useModal from "hooks/useModal";
import GradientSpinner from "../GradientSpinner";

function Tile(props: {
  title: string;
  content: string | undefined;
  symbol?: string;
  tooltip: string;
  isWarning?: boolean;
}) {
  const { title, content, symbol, tooltip, isWarning } = props;
  const { colorMode } = useColorMode();
  const [smallerThan1024] = useMediaQuery("(max-width: 1024px)");
  const { isModalLoading } = useModal();

  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      w={smallerThan1024 ? "155px" : "152px"}
      alignItems={"center"}
      mb={"15px"}
    >
      <Flex alignItems={"center"} mb={"6px"}>
        <Text
          color={colorMode === "dark" ? "gray.100" : "gray.1000"}
          h={"17px"}
          fontWeight={600}
          fontSize={12}
          textAlign="center"
          mr={"6px"}
        >
          {title}
        </Text>
        <BasicTooltip label={tooltip} />
      </Flex>

      <Flex
        fontWeight={600}
        justifyContent="center"
        h={smallerThan1024 ? "28px" : "25px"}
      >
        {isModalLoading ? (
          <Flex w={"100px"} h={"30px"}>
            <GradientSpinner></GradientSpinner>
          </Flex>
        ) : (
          <>
            <Text
              color={
                isWarning
                  ? "red.100"
                  : colorMode === "dark"
                  ? "white.100"
                  : "gray.800"
              }
              fontSize={18}
              mr={2}
            >
              {content || "-"}
            </Text>
            <Text
              color={colorMode === "dark" ? "white.200" : "gray.800"}
              fontSize={12}
              lineHeight={"33px"}
            >
              {symbol ? symbol : ""}
            </Text>
          </>
        )}
      </Flex>
    </Box>
  );
}

export default Tile;
