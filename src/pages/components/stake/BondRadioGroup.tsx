import {
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";

function StakeRadioGroup() {
  const [radioValue, setRadioValue] = useState<"All" | "Bond" | "Stake">("All");
  const { colorMode } = useColorMode();
  return (
    <Flex fontSize={14} color={colorMode === "dark" ? "gray.100" : "#535362"}>
      <RadioGroup
        onChange={(value: "All" | "Bond" | "Stake") => setRadioValue(value)}
        value={radioValue}
      >
        <Stack direction="row" columnGap={"34px"} h={"100%"}>
          <Radio value="All">
            <Text
              color={
                radioValue === "All"
                  ? colorMode === "dark"
                    ? "white.200"
                    : "gray.800"
                  : ""
              }
            >
              All
            </Text>
          </Radio>
          <Radio value="Bond">
            <Text
              color={
                radioValue === "Bond"
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
                radioValue === "Stake"
                  ? colorMode === "dark"
                    ? "white.200"
                    : "gray.800"
                  : ""
              }
            >
              Stake
            </Text>
          </Radio>
        </Stack>
      </RadioGroup>
    </Flex>
  );
}

export default StakeRadioGroup;
