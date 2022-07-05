import { Flex, Text } from "@chakra-ui/react";
import { BondCardProps } from "types/bond";

function ContentComponent(props: { title: string; content: string }) {
  const { title, content } = props;
  return (
    <Flex justifyContent={"space-between"} fontSize={14}>
      <Text color={"gray.100"}>{title}</Text>
      <Text color={"white.200"}>{content}</Text>
    </Flex>
  );
}

function BondCard(props: BondCardProps) {
  const { bondCapacity, bondingPrice, discountRate } = props;
  return (
    <Flex
      flexDir={"column"}
      w={"362px"}
      h={"232px"}
      borderWidth={1}
      borderColor={"gray.600"}
      borderRadius={10}
      pt={"18px"}
      px={"20px"}
      pb={"21px"}
    >
      <ContentComponent
        title="Bond Capacity"
        content={bondCapacity}
      ></ContentComponent>
      <ContentComponent
        title="Bonding Price"
        content={bondingPrice}
      ></ContentComponent>
      <ContentComponent
        title="Discount Rate"
        content={discountRate}
      ></ContentComponent>
    </Flex>
  );
}

export default BondCard;
