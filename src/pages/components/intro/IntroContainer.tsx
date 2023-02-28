import { Box, Flex, Text, useColorMode, useTheme } from "@chakra-ui/react";
import { useWindowDimensions } from "hooks/useWindowDimensions";
import { useMemo, useState } from "react";
import IntroCircle from "./IntroCircle";
import IntroText from "./IntroText";

function IntroContainer() {
  const [selectedTab1, setSelectedTab1] = useState<boolean>(true);
  const [width] = useWindowDimensions();
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const tabButtonStyle = {
    borderBottomWidth: 3,
    borderBottomColor: "white.200",
    paddingBottom: 1,
  };

  return (
    <Flex
      w={"100%"}
      h={"100%"}
      flexDir={"column"}
      mt={"15px"}
      justifyContent={"center"}
      alignItems={"center"}
      mb={width < 530 ? "20px" : "100px"}
      pos="relative"
    >
      <Box fontSize={21} display={"flex"} columnGap={"21px"}>
        <Text
          color={
            colorMode === "light"
              ? selectedTab1
                ? "gray.800"
                : "gray.700"
              : selectedTab1
              ? "white.200"
              : "gray.200"
          }
          fontWeight={"bold"}
          cursor={"pointer"}
          onClick={() => setSelectedTab1(true)}
          borderBottomWidth={selectedTab1 ? 3 : ""}
          borderBottomColor={
            colorMode === "light"
              ? selectedTab1
                ? "gray.800"
                : "gray.700"
              : selectedTab1
              ? "white.200"
              : "gray.200"
          }
          pb={selectedTab1 ? 1 : ""}
        >
          TON⇄TONStarter
        </Text>
        <Text
          color={
            colorMode === "light"
              ? !selectedTab1
                ?"gray.800"
                : "gray.700"
              : !selectedTab1
              ? "white.200"
              : "gray.200"
          }
          fontWeight={"bold"}
          cursor={"pointer"}
          onClick={() => setSelectedTab1(false)}
          borderBottomWidth={!selectedTab1 ? 3 : ""}
          borderBottomColor={
            colorMode === "light"
              ? !selectedTab1
                ? "gray.800"
                : "gray.700"
              : !selectedTab1
              ? "white.200"
              : "gray.200"
          }
          pb={!selectedTab1 ? 1 : ""}
        >
          TOS
        </Text>
      </Box>
      <IntroText selectedTab1={selectedTab1}></IntroText>
      <IntroCircle selectedTab1={selectedTab1}></IntroCircle>
    </Flex>
  );
}

export default IntroContainer;
