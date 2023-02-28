import { Flex, Text, useColorMode, Button } from "@chakra-ui/react";
import { useWindowDimensions } from "hooks/useWindowDimensions";
import { useMemo, useState } from "react";
import { Dashboard_SmallCardType } from "types/dashboard";
import BasicTooltip from "common/tooltip";

const SmallCard: React.FC<Dashboard_SmallCardType> = (props) => {
  const {
    title,
    price,
    priceUnit,
    priceChangePercent,
    style,
    tooltip,
    tooltipMessage,
  } = props;
  const [width] = useWindowDimensions();
  const [unit, setUnit] = useState("$");
  const isMobile = width < 490;
  const { colorMode } = useColorMode();
  const PriceContent = useMemo(() => {
    switch (priceUnit) {
      case "$":
        return (
          <Text
            fontSize={22}
            fontWeight={"bold"}
            color={colorMode === "dark" ? "white.200" : "gray.800"}
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
              color={colorMode === "dark" ? "white.200" : "gray.800"}
            >
              {price}
            </Text>
            <Text
              alignSelf={"end"}
              ml={"5px"}
              fontSize={14}
              pb={"3px"}
              color={colorMode === "dark" ? "white.200" : "gray.800"}
            >
              {priceUnit}
            </Text>
          </Flex>
        );
    }
  }, [price, priceUnit, colorMode]);

  return (
    <Flex
      h={110}
      borderWidth={isMobile ? "none" : 1}
      borderColor={
        isMobile ? "" : colorMode === "dark" ? "gray.300" : "gray.900"
      }
      borderRadius={isMobile ? "none" : 14}
      flexDir={"column"}
      pl={"20px"}
      pr={"18px"}
      pt={"15px"}
      pb={"10px"}
      bgColor={colorMode === "dark" ? "gray.600" : "white.100"}
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

        <Flex fontSize={10} fontWeight={600} color={'white.100'}>
          <Button
            h={"23px"}
            w="30px"
            bg={unit === '$'? 'blue.200':''}
            onClick={()=>setUnit('$')}
            // border="1px solid red"
            borderRightWidth={"0.5px"}
            borderRightRadius={"0px"}
          >
            $
          </Button>
          <Button
            h={"23px"}
            w="30px"
            bg={unit === 'ETH'? 'blue.200':''}
            // border="1px solid red"
            onClick={()=>setUnit('ETH')}
            borderLeftWidth={"0.5px"}
            borderLeftRadius={"0px"}
          >
            ETH
          </Button>
        </Flex>
      </Flex>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Flex
          fontSize={22}
          color={colorMode === "dark" ? "white.200" : "gray.800"}
          fontWeight={"bold"}
        >
          {PriceContent}
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
