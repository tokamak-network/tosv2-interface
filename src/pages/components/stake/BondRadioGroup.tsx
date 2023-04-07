import {
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { stake_filter_radio } from "atom/stake/filter";
import { useState } from "react";
import { useRecoilState } from "recoil";

function StakeRadioGroup() {
  const [stakeRadioValue, setStakeRadioValue] =
    useRecoilState(stake_filter_radio);
  const { colorMode } = useColorMode();

  return (
    <Flex fontSize={14} color={colorMode === "dark" ? "gray.100" : "#535362"}>
      <RadioGroup
        onChange={(value: "All" | "Bond" | "Stake") =>
          setStakeRadioValue(value)
        }
        value={stakeRadioValue}
      >
        <Stack direction="row" columnGap={"34px"} h={"100%"}>
          <Radio value="Bond">
            <Text
              color={
                stakeRadioValue === "Bond"
                  ? colorMode === "dark"
                    ? "white.200"
                    : "gray.800"
                  : ""
              }
            >
              Bond
            </Text>
          </Radio>
          <Radio value="Stake">
            <Text
              color={
                stakeRadioValue === "Stake"
                  ? colorMode === "dark"
                    ? "white.200"
                    : "gray.800"
                  : ""
              }
            >
              Stake
            </Text>
          </Radio>
          <Radio value="All">
            <Text
              color={
                stakeRadioValue === "All"
                  ? colorMode === "dark"
                    ? "white.200"
                    : "gray.800"
                  : ""
              }
            >
              All
            </Text>
          </Radio>
        </Stack>
      </RadioGroup>
    </Flex>
  );
}

export default StakeRadioGroup;
