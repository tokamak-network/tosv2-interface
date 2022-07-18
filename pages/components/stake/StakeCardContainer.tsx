import { Box, Flex } from "@chakra-ui/react";
import TabButton from "common/button/TabButton";
import SortSelect from "components/bond/SortSelect";
import StakeCheckbox from "components/bond/StakeCheckbox";
import { useState } from "react";
import StakeCardSection from "./StakeCardSection";

function StakeCardContainer() {
  return (
    <Flex mt={"48px"} w={"100%"} justifyContent={"center"} flexDir={"column"}>
      <Flex
        justifyContent={"space-between"}
        mt={"30px"}
        mb={"27px"}
        alignItems="center"
      >
        <StakeCheckbox></StakeCheckbox>
        <SortSelect></SortSelect>
      </Flex>
      <StakeCardSection></StakeCardSection>
    </Flex>
  );
}

export default StakeCardContainer;
