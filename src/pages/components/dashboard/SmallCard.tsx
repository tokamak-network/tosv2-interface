import { Flex, Text, Button } from "@chakra-ui/react";
import { useWindowDimensions } from "hooks/useWindowDimensions";
import { useMemo, useState } from "react";
import { Dashboard_SmallCardType } from "types/dashboard";
import BasicTooltip from "common/tooltip";
import { useCustomColorMode } from "hooks/style/useCustomColorMode";

const SmallCard: React.FC<Dashboard_SmallCardType> = (props) => {
  const {
    title,
    price,
    priceUnit,
    style,
    tooltipMessage,
    switchButton,
    switchPrice,
  } = props;
  const [width] = useWindowDimensions();
  const [unit, setUnit] = useState<"$" | "ETH">("$");
  const isMobile = width < 490;
  const { isDark } = useCustomColorMode();

  const PriceContent = useMemo(() => {
    if (switchButton) {
      switch (unit) {
        case "$":
          return (
            <Text
              fontSize={22}
              fontWeight={"bold"}
              color={isDark ? "white.200" : "gray.800"}
            >
              {priceUnit === "$" ? priceUnit : switchPrice}{" "}
              {priceUnit === "$" ? price : switchPrice}
            </Text>
          );
        case "ETH":
          return (
            <Flex>
              <Text
                fontSize={22}
                fontWeight={"bold"}
                color={isDark ? "white.200" : "gray.800"}
              >
                {switchPrice}
              </Text>
              <Text
                alignSelf={"end"}
                ml={"5px"}
                fontSize={14}
                pb={"3px"}
                color={isDark ? "white.200" : "gray.800"}
              >
                {"ETH"}
              </Text>
            </Flex>
          );
        default:
          return <></>;
      }
    }

    switch (priceUnit) {
      case "$":
        return (
          <Text
            fontSize={22}
            fontWeight={"bold"}
            color={isDark ? "white.200" : "gray.800"}
          >
            {priceUnit} {price}
          </Text>
        );
      default:
        return (
          <Flex>
            <Text
              fontSize={22}
              fontWeight={"bold"}
              color={isDark ? "white.200" : "gray.800"}
            >
              {price}
            </Text>
            <Text
              alignSelf={"end"}
              ml={"5px"}
              fontSize={14}
              pb={"3px"}
              color={isDark ? "white.200" : "gray.800"}
            >
              {priceUnit}
            </Text>
          </Flex>
        );
    }
  }, [price, priceUnit, isDark, switchButton, switchPrice, unit]);

  return (
    <Flex
      h={110}
      borderWidth={isMobile ? "none" : 1}
      borderColor={isMobile ? "" : isDark ? "gray.300" : "gray.900"}
      borderRadius={isMobile ? "none" : 14}
      flexDir={"column"}
      pl={"20px"}
      pr={"18px"}
      pt={"15px"}
      pb={"10px"}
      bgColor={isDark ? "gray.600" : "white.100"}
      {...style}
    >
      <Flex justifyContent={"space-between"}>
        <Flex>
          <Text
            color={"gray.100"}
            fontSize={12}
            fontWeight={600}
            h={17}
            mb={"12px"}
            mr={"6px"}
          >
            {title}
          </Text>
          <BasicTooltip label={tooltipMessage} />
        </Flex>
        {!isMobile && switchButton && (
          <Flex
            w="80px"
            borderWidth={"1px"}
            borderColor={isDark ? "#313442" : "#e8edf2"}
            borderRadius="5px"
            h={"21px"}
          >
            <Button
              h={"19px"}
              fontSize={"12px"}
              borderRadius="4px"
              fontWeight={600}
              _hover={{ cursor: "pointer" }}
              _active={{}}
              color={
                unit === "$" ? (isDark ? "white.100" : "#07070c") : "#64646f"
              }
              w="50%"
              bg={
                unit === "$"
                  ? isDark
                    ? "#0f0f12"
                    : "transparent"
                  : isDark
                  ? "transparent"
                  : "#fafbfc"
              }
              onClick={() => setUnit("$")}
            >
              $
            </Button>
            <Button
              h={"19px"}
              fontSize={"12px"}
              borderRadius="5px"
              w="50%"
              color={
                unit === "ETH" ? (isDark ? "white.100" : "#07070c") : "#64646f"
              }
              fontWeight={500}
              _hover={{ cursor: "pointer" }}
              _active={{}}
              bg={
                unit === "ETH"
                  ? isDark
                    ? "#0f0f12"
                    : "transparent"
                  : isDark
                  ? "transparent"
                  : "#fafbfc"
              }
              onClick={() => setUnit("ETH")}
            >
              ETH
            </Button>
          </Flex>
        )}
      </Flex>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Flex
          fontSize={22}
          color={isDark ? "white.200" : "gray.800"}
          fontWeight={"bold"}
          w={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          {PriceContent}
          {isMobile && switchButton && (
            <Flex
              w="80px"
              borderWidth={"1px"}
              borderColor={isDark ? "#313442" : "#e8edf2"}
              borderRadius="5px"
              h={"21px"}
            >
              <Button
                h={"19px"}
                fontSize={"12px"}
                borderRadius="4px"
                fontWeight={600}
                _hover={{ cursor: "pointer" }}
                _active={{}}
                color={
                  unit === "$" ? (isDark ? "white.100" : "#07070c") : "#64646f"
                }
                w="50%"
                bg={
                  unit === "$"
                    ? isDark
                      ? "#0f0f12"
                      : "transparent"
                    : isDark
                    ? "transparent"
                    : "#fafbfc"
                }
                onClick={() => setUnit("$")}
              >
                $
              </Button>
              <Button
                h={"19px"}
                fontSize={"12px"}
                borderRadius="5px"
                w="50%"
                color={
                  unit === "ETH"
                    ? isDark
                      ? "white.100"
                      : "#07070c"
                    : "#64646f"
                }
                fontWeight={500}
                _hover={{ cursor: "pointer" }}
                _active={{}}
                bg={
                  unit === "ETH"
                    ? isDark
                      ? "#0f0f12"
                      : "transparent"
                    : isDark
                    ? "transparent"
                    : "#fafbfc"
                }
                onClick={() => setUnit("ETH")}
              >
                ETH
              </Button>
            </Flex>
          )}
        </Flex>
        {/* {priceChangePercent !== undefined && (
          <Text
            fontSize={18}
            color={
              priceChangePercent > 0
                ? "red.100"
                : priceChangePercent === 0
                ? colorMode === "light"
                  ? "gray.700"
                  : "gray.200"
                : "blue.200"
            }
          >
            {priceChangePercent > 0 ? "+" : ""}
            {priceChangePercent} {"%"}
          </Text>
        )} */}
      </Flex>
      {/* {priceChangePercent !== undefined && (
        <Flex
          fontSize={11}
          alignSelf={"end"}
          color={colorMode === "light" ? "gray.700" : "gray.200"}
        >
          than yesterday
        </Flex>
      )} */}
    </Flex>
  );
};

export default SmallCard;
