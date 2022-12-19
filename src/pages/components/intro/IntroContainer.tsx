import { Box, Flex, Text } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import IntroText from "./IntroText";

function IntroContainer() {
  const [selectedTab1, setSelectedTab1] = useState<boolean>(true);
  const tabButtonStyle = {
    borderBottomWidth: 3,
    borderBottomColor: "white.200",
    paddingBottom: 1,
  };
  return (
    <Flex
      w={"100%"}
      flexDir={"column"}
      mt={"15px"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box fontSize={21} display={"flex"} columnGap={"21px"}>
        <Text
          color={selectedTab1 ? "white.200" : "gray.200"}
          fontWeight={"bold"}
          cursor={"pointer"}
          onClick={() => setSelectedTab1(true)}
          borderBottomWidth={selectedTab1 ? 3 : ""}
          borderBottomColor={selectedTab1 ? "white.200" : ""}
          pb={selectedTab1 ? 1 : ""}
        >
          TON⇄TONStarter
        </Text>
        <Text
          color={!selectedTab1 ? "white.200" : "gray.200"}
          fontWeight={"bold"}
          cursor={"pointer"}
          onClick={() => setSelectedTab1(false)}
          borderBottomWidth={!selectedTab1 ? 3 : ""}
          borderBottomColor={!selectedTab1 ? "white.200" : ""}
          pb={!selectedTab1 ? 1 : ""}
        >
          TOS
        </Text>
      </Box>
      <IntroText selectedTab1={selectedTab1}></IntroText>
    </Flex>
  );
}

export default IntroContainer;
