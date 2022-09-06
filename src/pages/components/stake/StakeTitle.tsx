import { Flex, Text, useMediaQuery, useColorMode } from "@chakra-ui/react";
import Image from "next/image";
import ARROW_RIGHT from "assets/icons/arrow-right.svg";
import { useState } from "react";
import SubmitButton from "common/button/SubmitButton";
import useModal from "hooks/useModal";
import useUserBalance from "hooks/useUserBalance";

function StakeTitle() {
  const [radioValue, setRadioValue] = useState<"All" | "Bond" | "Stake">("All");
  const [smallerThan1040] = useMediaQuery("(max-width: 1040px)");
  const { openModal } = useModal("stake_stake_modal");
  const { colorMode } = useColorMode();
  const { userLTOSBalance, userSTOSBalance } = useUserBalance();
  return (
    <Flex
      // h={"31px"}
      textAlign={"center"}
      lineHeight={"31px"}
      flexDir={smallerThan1040 ? "column" : "row"}
      justifyContent={"space-between"}
      w={"100%"}
    >
      <Flex
        justifyContent={smallerThan1040 ? "space-between" : {}}
        alignItems={"center"}
      >
        <Text
          fontSize={22}
          fontWeight={600}
          color={colorMode === "dark" ? "white.200" : "gray.800"}
          mr={"12px"}
        >
          My Staked
        </Text>

        <Flex alignItems={"center"}>
          <Text fontSize={14} color={"blue.200"} mr={"6px"}>
            Balance : {userLTOSBalance} LTOS / {userSTOSBalance}sTOS
          </Text>
          <Image src={ARROW_RIGHT} alt={"ARROW_RIGHT"}></Image>
        </Flex>
      </Flex>
      <Flex fontSize={14}>
        <SubmitButton
          name="Stake"
          w={smallerThan1040 ? "100%" : ""}
          style={
            smallerThan1040
              ? { fontSize: 14, marginTop: "20px", marginBottom: "30px" }
              : { fontSize: 14 }
          }
          onClick={openModal}
          iconName={"Plus"}
          iconLocation={'left'}
        ></SubmitButton>
      </Flex>
    </Flex>
  );
}

export default StakeTitle;
