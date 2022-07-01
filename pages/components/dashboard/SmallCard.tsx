import { Flex, Text } from "@chakra-ui/react";
import { Dashboard_SmallCardType } from "types/dashboard";

const SmallCard: React.FC<Dashboard_SmallCardType> = (props) => {
  const { title, price, priceChangePercent } = props;
  return (
    <Flex
      w={266}
      h={110}
      borderWidth={1}
      borderColor={"gray.600"}
      borderRadius={14}
      flexDir={"column"}
      pl={"20px"}
      pr={"18px"}
      pt={"15px"}
      pb={"10px"}
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
          $ {price}
        </Text>
        <Text
          fontSize={18}
          color={priceChangePercent > 0 ? "red.100" : "blue.200"}
        >
          {priceChangePercent > 0 ? "+" : "-"}
          {priceChangePercent} %
        </Text>
      </Flex>
      <Flex fontSize={11} alignSelf={"end"}>
        than yesterday
      </Flex>
    </Flex>
  );
};

export default SmallCard;
