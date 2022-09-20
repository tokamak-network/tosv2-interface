import { Box, Flex, Text } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import TabButton from "common/button/TabButton";
import useStakeList from "hooks/stake/useStakeList";
import SortSelect from "pages/components/bond/SortSelect";
import StakeCheckbox from "pages/components/bond/StakeCheckbox";
import { useState } from "react";
import StakeRadioGroup from "./BondRadioGroup";
import StakeCardSection from "./StakeCardSection";
import StakeTitle from "./StakeTitle";

function MsgComponent(props: { msg: string }) {
  const { msg } = props;
  return (
    <Flex pt={"20px"} w={"100%"} justifyContent={"center"}>
      <Text fontSize={24} fontWeight={600} color={"#f1f1f1"}>
        {msg}
      </Text>
    </Flex>
  );
}

function StakeCardContainer() {
  const { stakeCards } = useStakeList();
  const { account } = useWeb3React();

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
      {!account ? (
        <MsgComponent msg={"Need to connect to the wallet"}></MsgComponent>
      ) : stakeCards && stakeCards?.length > 1 ? (
        <>
          <Flex
            flexDir={["column", "row", "row"]}
            justifyContent={"space-between"}
            mb={"27px"}
            alignItems="center"
          >
            <StakeCheckbox></StakeCheckbox>
            <Flex
              w={["100%", "400px", "500px"]}
              columnGap={["6px", "6px", "30px"]}
              justifyContent={"flex-end"}
              mt={["", "", ""]}
            >
              <StakeRadioGroup></StakeRadioGroup>
              <SortSelect></SortSelect>
            </Flex>
          </Flex>
          <StakeCardSection></StakeCardSection>
        </>
      ) : (
        <MsgComponent msg={"No Staking History"}></MsgComponent>
      )}
    </Flex>
  );
}

export default StakeCardContainer;
