import { Flex, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import { bond_filter_sort, T_SortValues } from "atom/bond/filter";
import { useCustomColorMode } from "hooks/style/useCustomColorMode";
import useMediaView from "hooks/useMediaView";
import { useRecoilState } from "recoil";

function BondRadioGroup() {
  const [bondRadioValue, setBondRadiouValue] =
    useRecoilState<T_SortValues>(bond_filter_sort);
  const { bp500px, bp1024px } = useMediaView();
  const { isDark } = useCustomColorMode();

  return (
    <Flex w={"100%"} color={isDark ? "gray.100" : "#535362"}>
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
          justifyContent={
            bp500px ? "space-between" : bp1024px ? "flex-start" : "flex-end"
          }
          alignItems={"center"}
        >
          <Flex columnGap={"12px"} m={0}>
            <Radio
              value="open"
              border={isDark ? "solid 2px #535353" : "solid 2px #c6cbd9"}
              size={"lg"}
              bgColor={bondRadioValue === "open" ? "blue.300" : ""}
            ></Radio>
            <Text
              fontSize={14}
              color={
                bondRadioValue === "open"
                  ? isDark
                    ? "white.200"
                    : "gray.800"
                  : ""
              }
            >
              Open
            </Text>
          </Flex>
          <Flex columnGap={"12px"} ml={"0 !important"}>
            <Radio
              value="future"
              border={isDark ? "solid 2px #535353" : "solid 2px #c6cbd9"}
              w={"20px"}
              h={"20px"}
              size={"lg"}
            ></Radio>
            <Text
              fontSize={14}
              color={
                bondRadioValue === "future"
                  ? isDark
                    ? "white.200"
                    : "gray.800"
                  : ""
              }
            >
              Upcoming
            </Text>
          </Flex>
          <Flex columnGap={"12px"} ml={"0 !important"}>
            <Radio
              value="closed"
              borderColor={"none !important"}
              border={isDark ? "solid 2px #535353" : "solid 2px #c6cbd9"}
              w={"20px"}
              h={"20px"}
              size={"lg"}
            ></Radio>
            <Text
              fontSize={14}
              color={
                bondRadioValue === "closed"
                  ? isDark
                    ? "white.200"
                    : "gray.800"
                  : ""
              }
            >
              Closed
            </Text>
          </Flex>
          <Flex columnGap={"12px"} ml={"0 !important"}>
            <Radio
              value="default"
              borderColor={"none !important"}
              border={isDark ? "solid 2px #535353" : "solid 2px #c6cbd9"}
              w={"20px"}
              h={"20px"}
              size={"lg"}
            ></Radio>
            <Text
              fontSize={14}
              color={
                bondRadioValue === "default"
                  ? isDark
                    ? "white.200"
                    : "gray.800"
                  : ""
              }
            >
              All
            </Text>
          </Flex>
        </Stack>
      </RadioGroup>
    </Flex>
  );
}

export default BondRadioGroup;
