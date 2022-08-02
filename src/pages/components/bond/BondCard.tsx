import { Flex, Text, useMediaQuery } from "@chakra-ui/react";
import BasicButton from "common/button/BasicButton";
import TokenSymbol from "common/token/TokenSymol";
import useModal from "hooks/useModal";
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
  const { openModal } = useModal("bond_modal");
  const [smallerThan1040] = useMediaQuery("(max-width: 1040px)");
  const [smallerThan726] = useMediaQuery("(max-width: 726px)");

  //vierport ref 1134px

  return (
    <Flex
      flexDir={"column"}
      w={smallerThan1040 ? "100%" : "31.9%"}
      h={"232px"}
      minW={["336px", "310px", "362px"]}
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
        onClick={openModal}
      ></BasicButton>
    </Flex>
  );
}

export default BondCard;
