import { Box, Flex, Text, useColorMode, Tooltip } from "@chakra-ui/react";
import Image from "next/image";
import question from "assets/icons/question.svg";

function Tile(props: {
  title: string;
  content: string | undefined;
  symbol?: string;
}) {
  const { title, content, symbol } = props;
  const { colorMode } = useColorMode();
  return (
    <Box display={"flex"} flexDir={"column"} mb={"15px"} alignItems={"center"}>
      <Flex alignItems={"center"}>
        <Text
          color={colorMode === "dark" ? "gray.100" : "gray.1000"}
          h={"17px"}
          mb={"3px"}
          fontWeight={600}
          fontSize={12}
          textAlign="center"
          mr={"6px"}
        >
          {title}
        </Text>
        <Tooltip label="" placement="bottom">
          <Image src={question} alt={""} height={"16px"} width={"16px"} />
        </Tooltip>
      </Flex>

      <Flex fontWeight={"bold"} h={"33px"}>
        <Text
          color={colorMode === "dark" ? "white.100" : "gray.800"}
          fontSize={24}
          mr={2}
        >
          {content || "-"}
        </Text>
        <Text
          color={colorMode === "dark" ? "white.200" : "gray.800"}
          fontSize={14}
          pt={"5px"}
          lineHeight={"33px"}
        >
          {symbol ? symbol : ""}
        </Text>
      </Flex>
    </Box>
  );
}

export default Tile;
