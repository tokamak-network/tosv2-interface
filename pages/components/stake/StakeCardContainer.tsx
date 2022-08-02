import { Box, Flex } from "@chakra-ui/react";
import TabButton from "common/button/TabButton";
import SortSelect from "components/bond/SortSelect";
import StakeCheckbox from "components/bond/StakeCheckbox";
import { useState } from "react";
import StakeCardSection from "./StakeCardSection";
import StakeTitle from "./StakeTitle";

function StakeCardContainer() {
  return (
    <Flex mt={"48px"} w={"100%"} justifyContent={"center"} flexDir={"column"}>
      <Flex
        justifyContent={"space-between"}
        mt={"60px"}
        mb={"27px"}
        alignItems="center"
      >
        <StakeTitle></StakeTitle>
      </Flex>
      <Flex
        flexDir={["column", "row", "row"]}
        justifyContent={"space-between"}
        mb={"27px"}
        alignItems="center"
      >
        <StakeCheckbox></StakeCheckbox>
        <Flex
          w={["100%", "400px", "360px"]}
          columnGap={["6px", "6px", "12px"]}
          justifyContent={"space-between"}
          mt={["24px", "", ""]}
        >
          <SortSelect></SortSelect>
          <SortSelect></SortSelect>
        </Flex>
      </Flex>
      <StakeCardSection></StakeCardSection>
    </Flex>
  );
}

export default StakeCardContainer;
