import { Box, Flex, Text, useColorMode } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import TabButton from "common/button/TabButton";
import { useState } from "react";
import BondCardSection from "./BondCardSection";
import MyHistory from "./MyHistory";
import BondSortSelect from "./BondSortSelect";
import StakeCheckbox from "./StakeCheckbox";

function BondCardContainer() {
  const [tab, setTab] = useState<0 | 1>(0);
  const { account } = useWeb3React();
  const {colorMode} = useColorMode()
  return (
    <Flex mt={"55px"} w={"100%"} justifyContent={"center"} flexDir={"column"}>
      <Text fontSize={22} fontWeight={"bold"} color={colorMode === 'dark'? "white.200":'gray.800'} mb={"34px"}>
        Bond List
      </Text>
      {/* <TabButton
        nameList={["Bond List", "My History"]}
        tabIndex={tab}
        onClick={setTab}
      ></TabButton>
      <Flex
        justifyContent={tab === 0 ? "flex-end" : "flex-end"}
        mt={"30px"}
        mb={"27px"}
        alignItems="center"
      >
        {tab === 0 ||
          (tab === 1 && account && <BondSortSelect></BondSortSelect>)}
      </Flex> */}
      {tab === 0 ? (
        <BondCardSection></BondCardSection>
      ) : (
        <MyHistory></MyHistory>
      )}
    </Flex>
  );
}

export default BondCardContainer;
