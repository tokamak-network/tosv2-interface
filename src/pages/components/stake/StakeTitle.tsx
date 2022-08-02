import {
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import Image from "next/image";
import ARROW_RIGHT from "assets/icons/arrow-right.svg";
import { useState } from "react";
import SubmitButton from "common/button/SubmitButton";
import useModal from "hooks/useModal";

function StakeTitle() {
  const [radioValue, setRadioValue] = useState<"All" | "Bond" | "Stake">("All");
  const [smallerThan1040] = useMediaQuery("(max-width: 1040px)");
  const { openModal } = useModal("stake_stake_modal");

  return (
    <Flex
      // h={"31px"}
      textAlign={"center"}
      lineHeight={"31px"}
      flexDir={smallerThan1040 ? "column" : "row"}
      justifyContent={"space-between"}
      w={"100%"}
    >
      <Flex justifyContent={smallerThan1040 ? "space-between" : {}}>
        <Text fontSize={22} fontWeight={600} color={"white.200"} mr={"12px"}>
          My Staked
        </Text>

        <Flex>
          <Text fontSize={14} color={"blue.200"} mr={"6px"}>
            My sTOS : 100 sTOS
          </Text>
          <Image src={ARROW_RIGHT} alt={"ARROW_RIGHT"}></Image>
        </Flex>
      </Flex>
      {smallerThan1040 && (
        <SubmitButton
          name="Stake"
          w={"100%"}
          style={{ fontSize: 14, marginTop: "20px", marginBottom: "30px" }}
          onClick={openModal}
        ></SubmitButton>
      )}
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
