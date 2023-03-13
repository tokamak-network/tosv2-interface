import {
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { bond_filter_sort, T_SortValues } from "atom/bond/filter";
import useMediaView from "hooks/useMediaView";
import { useState } from "react";
import { useRecoilState } from "recoil";

function BondRadioGroup() {
  const [bondRadioValue, setBondRadiouValue] =
    useRecoilState<T_SortValues>(bond_filter_sort);
  const { colorMode } = useColorMode();
  const { bp500px } = useMediaView();

  return (
    <Flex
      w={"100%"}
      fontSize={14}
      color={colorMode === "dark" ? "gray.100" : "#535362"}
    >
      <RadioGroup
        onChange={(value: T_SortValues) => setBondRadiouValue(value)}
        value={bondRadioValue}
        w={"100%"}
      >
        <Stack
          direction="row"
          columnGap={bp500px ? "" : "34px"}
          w={"100%"}
          h={"100%"}
          justifyContent={bp500px ? "space-between" : "flex-start"}
        >
          <Radio value="default">
            <Text
              color={
                bondRadioValue === "default"
                  ? colorMode === "dark"
                    ? "white.200"
                    : "gray.800"
                  : ""
              }
            >
              All
            </Text>
          </Radio>
          <Radio value="open">
            <Text
              color={
                bondRadioValue === "open"
                  ? colorMode === "dark"
                    ? "white.200"
                    : "gray.800"
                  : ""
              }
            >
              Open
            </Text>
          </Radio>
          <Radio value="future">
            <Text
              color={
                bondRadioValue === "future"
                  ? colorMode === "dark"
                    ? "white.200"
                    : "gray.800"
                  : ""
              }
            >
              Future
            </Text>
          </Radio>
          <Radio value="closed">
            <Text
              color={
                bondRadioValue === "closed"
                  ? colorMode === "dark"
                    ? "white.200"
                    : "gray.800"
                  : ""
              }
            >
              Closed
            </Text>
          </Radio>
        </Stack>
      </RadioGroup>
    </Flex>
  );
}

export default BondRadioGroup;
