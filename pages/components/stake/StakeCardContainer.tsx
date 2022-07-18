import { Box, Flex } from "@chakra-ui/react";
import TabButton from "common/button/TabButton";
import { useState } from "react";
import StakeCardSection from "./StakeCardSection";

function StakeCardContainer() {
  const [tab, setTab] = useState<0 | 1>(0);

  return (
    <Flex mt={"48px"} w={"100%"} justifyContent={"center"} flexDir={"column"}>
      <Flex
        justifyContent={tab === 0 ? "flex-end" : "space-between"}
        mt={"30px"}
        mb={"27px"}
        alignItems="center"
      ></Flex>
      <StakeCardSection></StakeCardSection>
    </Flex>
  );
}

export default StakeCardContainer;
