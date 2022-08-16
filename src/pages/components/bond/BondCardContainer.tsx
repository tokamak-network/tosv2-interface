import { Box, Flex } from "@chakra-ui/react";
import TabButton from "common/button/TabButton";
import { useState } from "react";
import BondCardSection from "./BondCardSection";
import MyHistory from "./MyHistory";
import SortSelect from "./SortSelect";
import StakeCheckbox from "./StakeCheckbox";

function BondCardContainer() {
  const [tab, setTab] = useState<0 | 1>(0);

  return (
    <Flex mt={"48px"} w={"100%"} justifyContent={"center"} flexDir={"column"}>
      <TabButton
        nameList={["Bond List", "My History"]}
        tabIndex={tab}
        onClick={setTab}
      ></TabButton>
      <Flex
        justifyContent={ "flex-end" }
        mt={"30px"}
        mb={"27px"}
        alignItems="center"
      >
        {/* {tab === 1 && <StakeCheckbox></StakeCheckbox>} */}
        <SortSelect></SortSelect>
      </Flex>
      {tab === 0 ? (
        <BondCardSection></BondCardSection>
      ) : (
        <MyHistory></MyHistory>
      )}
    </Flex>
  );
}

export default BondCardContainer;
