import { Flex, Text, useColorMode } from "@chakra-ui/react";
import { useState } from "react";
import BondCardSection from "./BondCardSection";
import MyHistory from "./MyHistory";
import useMediaView from "hooks/useMediaView";
import BondRadioGroup from "./BondRadioGroup";

function BondCardContainer() {
  const [tab, setTab] = useState<0 | 1>(0);
  const { colorMode } = useColorMode();
  const { bp1024px, bp500px } = useMediaView();

  return (
    <Flex mt={"55px"} w={"100%"} justifyContent={"center"} flexDir={"column"}>
      <Flex
        flexDir={bp1024px ? "column" : "row"}
        justifyContent={"space-between"}
        mb={bp500px ? "21px" : "34px"}
      >
        <Text
          fontSize={22}
          fontWeight={"bold"}
          color={colorMode === "dark" ? "white.200" : "gray.800"}
          mb={bp1024px ? "27px" : ""}
        >
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
        <Flex
          w={["100%", "400px", "500px"]}
          columnGap={["6px", "6px", "30px"]}
          justifyContent={bp500px ? "flex-start" : "flex-end"}
          mt={["", "", ""]}
          flexDir={bp500px ? "column" : "row"}
        >
          <BondRadioGroup></BondRadioGroup>
          {/* <BondSortSelect></BondSortSelect> */}
        </Flex>
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
