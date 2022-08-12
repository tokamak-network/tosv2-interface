import {  Flex, Text, useColorMode } from "@chakra-ui/react";
import { useMemo } from "react";

type TopCardProps = {
  title: string;
  price: string;
  priceUnit: string;
  style?: any;
};

const TopCard: React.FC<TopCardProps> = (props) => {
  const { colorMode } = useColorMode();
  const { title, price, priceUnit, style } = props;
  
  const PriceContent = useMemo(() => {
    
    switch (priceUnit) {
      case "$":
        return (
          <Flex>
          <Text
           fontSize={22}
           color={colorMode === "dark" ? "#f1f1f1" : "#07070c"}
           fontWeight={"bold"}
          >
            {priceUnit}
          </Text>
          <Text
           
            fontSize={22}
            color={colorMode === "dark" ? "#f1f1f1" : "#07070c"}
            fontWeight={"bold"}
            >
            {price}
          </Text>
        </Flex>
        );
      default:
        return (
          <Flex>
            <Text
              fontSize={22}
              color={colorMode === "dark" ? "#f1f1f1" : "#07070c"}
              fontWeight={"bold"}
            >
              {price}
            </Text>
            <Text
              alignSelf={"end"}
              ml={"5px"}
              color={colorMode === "dark" ? "#f1f1f1" : "#07070c"}
              fontSize={14}
              pb={"3px"}>
              {priceUnit}
            </Text>
          </Flex>
        );
    }
  }, [price, priceUnit,colorMode]);

  return (
    <Flex
      w={["48.9%", "48.9%", "48.9%"]}
      h={110}
      borderWidth={1}
      borderColor={colorMode === "dark" ? "gray.300" : "gray.900"}
      borderRadius={14}
      flexDir={"column"}
      pl={"20px"}
      pr={"18px"}
      pt={"15px"}
      pb={"10px"}
      bgColor={colorMode === "dark" ? "gray.600" : "white.100"}
      {...style}
    >
      <Text
        color={colorMode === "dark" ? "gray.100" : "gray.200"}
        fontSize={12}
        fontWeight={600}
        h={17}
        mb={"12px"}
      >
        {title}
      </Text>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Flex
          fontWeight={"bold"}
          fontSize={22}
          color={colorMode === "dark" ? "#f1f1f1" : "#07070c"}
        >
          {PriceContent}
        </Flex>
        {/* <Text
          fontSize={22}
        
          // color={colorMode === "dark" ?  "white.200" : "#07070c"}
          fontWeight={"bold"}
        >
          {PriceContent}
        </Text> */}
      </Flex>
    </Flex>
  );
};

export default TopCard;
