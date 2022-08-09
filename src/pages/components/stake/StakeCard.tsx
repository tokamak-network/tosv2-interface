import { Flex, Text, useMediaQuery, useColorMode } from "@chakra-ui/react";
import BasicButton from "common/button/BasicButton";
import CustomCheckBox from "common/input/CustomCheckBox";
import TokenSymbol from "common/token/TokenSymol";
import useModal from "hooks/useModal";
import { useState } from "react";
import { BondCardProps } from "types/bond";
import { StakeCardProps } from "types/stake";

function ContentComponent(props: {
  title: string;
  content: string;
  style?: any;
}) {
  const { title, content, style } = props;
  const { colorMode } = useColorMode();

  return (
    <Flex justifyContent={"space-between"} fontSize={14} h={"20px"} {...style}>
      <Text color={colorMode === 'dark'? "gray.100":'gray.1000'}>{title}</Text>
      <Text color={colorMode === 'dark'? "white.200":'gray.800'} fontWeight={600}>{content}</Text>
    </Flex>
  );
}

function StakeCard(props: StakeCardProps) {
  const {
    amount,
    discountRate,
    lockupPeriod,
    lockupPeriodDate,
    tokenType,
    isDisabled,
  } = props;
  const { openModal } = useModal("stake_unstake_modal");
  const [smallerThan1040] = useMediaQuery("(max-width: 1040px)");
  const [smallerThan1440] = useMediaQuery("(max-width: 1440px)");
  const { colorMode } = useColorMode();

  return (
    <Flex
      flexDir={"column"}
      w={smallerThan1040 ? "100%" : "31.9%"}
      h={smallerThan1040 ? "" : "250px"}
      minW={["336px", "310px", "362px"]}
      borderWidth={1}
      borderColor={colorMode === 'dark'? "gray.300": 'gray.900'}
      borderRadius={10}
      pt={"18px"}
      px={"20px"}
      pb={"21px"}
    >
      <Flex mb={"18px"} justifyContent={"space-between"}>
        <Flex>
          <TokenSymbol tokenType={tokenType}></TokenSymbol>
          <Text
            fontSize={20}
            fontWeight={600}
            textAlign={"center"}
            lineHeight={"46px"}
            color={colorMode === 'dark'? "white.200": 'gray.800'}
            ml={"12px"}
          >
            {tokenType}
          </Text>
        </Flex>
        <Flex
          fontSize={12}
          color={isDisabled ? "blue.200" : "red.100"}
          textAlign={"center"}
          alignItems="center"
          justifyContent={"center"}
        >
          <Text>{isDisabled ? "Pending" : "Ended"}</Text>
        </Flex>
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
        <Text color={colorMode==='light'? '#16161e': '#eaeaf4'}>{lockupPeriodDate}</Text>
      </Flex>
      <Flex
        alignItems="center"
        justifyContent={smallerThan1440 ? "flex-end" : "center"}
        flexDir={smallerThan1040 ? "column" : "row"}
        pos={"relative"}
      >
        {isDisabled === false && (
          <Flex
            mb={smallerThan1040 ? "19px" : ""}
            pos={smallerThan1040 ? {} : "absolute"}
            mr={"auto"}
            w={"100%"}
          >
            <CustomCheckBox
              value={{ test: "test" }}
              valueKey={amount}
              pageKey={"Stake_screen"}
            ></CustomCheckBox>
            <Text ml={"9px"} fontSize={12} color={colorMode==='dark'? 'white.200':'gray.800'}>
              Select
            </Text>
          </Flex>
        )}
        <BasicButton
          isDisabled={isDisabled}
          name={isDisabled ? "Pending" : "Unstake"}
          h={"33px"}
          onClick={openModal}
          style={smallerThan1040 ? { width: "100%" } : {}}
        ></BasicButton>
      </Flex>
    </Flex>
  );
}

export default StakeCard;
