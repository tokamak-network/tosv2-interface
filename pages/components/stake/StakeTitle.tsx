import { Flex, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import ARROW_RIGHT from "assets/icons/arrow-right.svg";
import { useState } from "react";

function StakeTitle() {
  const [radioValue, setRadioValue] = useState<"All" | "Bond" | "Stake">("All");
  return (
    <Flex
      h={"31px"}
      textAlign={"center"}
      lineHeight={"31px"}
      justifyContent={"space-between"}
      w={"100%"}
    >
      <Flex>
        <Text fontSize={22} fontWeight={600} color={"white.200"} mr={"12px"}>
          My Staked
        </Text>
        <Text fontSize={14} color={"blue.200"} mr={"6px"}>
          My sTOS : 100 sTOS
        </Text>
        <Image src={ARROW_RIGHT} alt={"ARROW_RIGHT"}></Image>
      </Flex>
      <Flex fontSize={14} color={"#8b8b93"}>
        <RadioGroup
          onChange={(value: "All" | "Bond" | "Stake") => setRadioValue(value)}
          value={radioValue}
        >
          <Stack direction="row" columnGap={"34px"}>
            <Radio value="All">All</Radio>
            <Radio value="Bond">Bond</Radio>
            <Radio value="Stake">Stake</Radio>
          </Stack>
        </RadioGroup>
      </Flex>
    </Flex>
  );
}

export default StakeTitle;
