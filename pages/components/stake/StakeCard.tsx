import { Flex, Text, useMediaQuery } from "@chakra-ui/react";
import BasicButton from "common/button/BasicButton";
import CustomCheckBox from "common/input/CustomCheckBox";
import TokenSymbol from "common/token/TokenSymol";
import useModal from "hooks/useModal";
import { BondCardProps } from "types/bond";
import { StakeCardProps } from "types/stake";

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

function StakeCard(props: StakeCardProps) {
  const { amount, discountRate, lockupPeriod, lockupPeriodDate, tokenType } =
    props;
  const { openModal } = useModal("bond_modal");
  const [smallerThan1040] = useMediaQuery("(max-width: 1040px)");

  //vierport ref 1134px

  return (
    <Flex
      flexDir={"column"}
      w={smallerThan1040 ? "49%" : "31.9%"}
      h={"250px"}
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
        title="Amount"
        content={amount}
        style={{ marginBottom: "9px" }}
      ></ContentComponent>
      <ContentComponent
        title="Discount Rate"
        content={discountRate}
        style={{ marginBottom: "9px" }}
      ></ContentComponent>
      <ContentComponent
        title="Lock-Up Period"
        content={lockupPeriod}
      ></ContentComponent>
      <Flex
        fontSize={9}
        justifyContent="flex-end"
        color={"#eaeaf4"}
        mt={"3px"}
        mb={"21px"}
      >
        <Text>{lockupPeriodDate}</Text>
      </Flex>
      <Flex alignItems={"center"}>
        <CustomCheckBox></CustomCheckBox>
        <Text ml={"9px"} mr={"20px"} color={"white.200"} fontSize={12}>
          Select
        </Text>
        <BasicButton name="Stake" h={"33px"} onClick={openModal}></BasicButton>
      </Flex>
    </Flex>
  );
}

export default StakeCard;
