import { Flex, Text } from "@chakra-ui/react";
import { useMemo } from "react";

type TopCardProps = {
  title: string;
  price: string;
  priceUnit: string;
  style?: any;
};

const TopCard: React.FC<TopCardProps> = (props) => {
  const { title, price, priceUnit, style } = props;

  const PriceContent = useMemo(() => {
    switch (priceUnit) {
      case "$":
        return (
          <Text fontSize={22} color={"white.200"} fontWeight={"bold"}>
            {priceUnit} {price}
          </Text>
        );
      default:
        return (
          <Flex>
            <Text fontSize={22} color={"white.200"} fontWeight={"bold"}>
              {price}
            </Text>
            <Text alignSelf={"end"} ml={"5px"} fontSize={14} pb={"3px"}>
              {priceUnit}
            </Text>
          </Flex>
        );
    }
  }, [price, priceUnit]);

  return (
    <Flex
      w={556}
      h={110}
      borderWidth={1}
      borderColor={"gray.600"}
      borderRadius={14}
      flexDir={"column"}
      pl={"20px"}
      pr={"18px"}
      pt={"15px"}
      pb={"10px"}
      bgColor={"gray.600"}
      {...style}
    >
      <Text
        color={"gray.100"}
        fontSize={12}
        fontWeight={600}
        h={17}
        mb={"12px"}
      >
        {title}
      </Text>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Text fontSize={22} color={"white.200"} fontWeight={"bold"}>
          {PriceContent}
        </Text>
      </Flex>
    </Flex>
  );
};

export default TopCard;
