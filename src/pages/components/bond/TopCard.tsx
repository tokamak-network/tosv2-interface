import {  Flex, Text, useColorMode,Tooltip, IconButton } from "@chakra-ui/react";
import { useMemo } from "react";
import { QuestionOutlineIcon } from "@chakra-ui/icons";

type TopCardProps = {
  title: string;
  price: string;
  priceUnit: string;
  style?: any;
  tooltip:string;
};

const TopCard: React.FC<TopCardProps> = (props) => {
  const { colorMode } = useColorMode();
  const { title, price, priceUnit, style,tooltip } = props;
  
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
      <Flex alignItems={'center'}   mb={"12px"}  h={17}>
      <Text
        color={colorMode === "dark" ? "gray.100" : "gray.1000"}
        fontSize={12}
        fontWeight={600}
        h={17}
      
        mr={'6px'}
      >
        {title}
      </Text>
      <Tooltip
                label={tooltip}
                bg={colorMode === "dark" ? "#1f2128" : "#fff"}
                borderRadius={"3px"}
                color={colorMode === "light" ? "#07070c" : "#8b8b93"}
                fontSize="12px"
                border={
                  colorMode === "light"
                    ? "solid 1px #e8edf2"
                    : "solid 1px #313442"
                }
              >
                <IconButton
                  aria-label="Search database"
                  h={"16px"}
                  minW={"16px"}
                  icon={<QuestionOutlineIcon />}
                  bg={"transparent"}
                  p={0}
                  _hover={{ bg: "transparent" }}
                  _active={{ bg: "transparent" }}
                />

              </Tooltip>
      </Flex>
     
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
