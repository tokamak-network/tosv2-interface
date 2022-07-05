import { Flex, Text } from "@chakra-ui/react";
import BasicButton from "common/button/BasicButton";
import TokenSymbol from "common/token/TokenSymol";
import { BondCardProps } from "types/bond";

function ContentComponent(props: {
  title: string;
  content: string;
  style?: any;
}) {
  const { title, content, style } = props;
  return (
    <Flex justifyContent={"space-between"} fontSize={14} h={"20px"} {...style}>
      <Text color={"gray.100"}>{title}</Text>
      <Text color={"white.200"}>{content}</Text>
    </Flex>
  );
}

function BondCard(props: BondCardProps) {
  const { bondCapacity, bondingPrice, discountRate, tokenType } = props;
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
      <Flex mb={"18px"}>
        <TokenSymbol tokenType={tokenType}></TokenSymbol>
        <Text
          fontSize={20}
          fontWeight={600}
          textAlign={"center"}
          lineHeight={"46px"}
          color={"white.200"}
          ml={"12px"}
        >
          {tokenType}
        </Text>
      </Flex>
      <ContentComponent
        title="Bond Capacity"
        content={bondCapacity}
        style={{ marginBottom: "9px" }}
      ></ContentComponent>
      <ContentComponent
        title="Bonding Price"
        content={bondingPrice}
        style={{ marginBottom: "9px" }}
      ></ContentComponent>
      <ContentComponent
        title="Discount Rate"
        content={discountRate}
        style={{ marginBottom: "16px" }}
      ></ContentComponent>
      <BasicButton
        name="Bond"
        h={"33px"}
        style={{ alignSelf: "center" }}
      ></BasicButton>
    </Flex>
  );
}

export default BondCard;
