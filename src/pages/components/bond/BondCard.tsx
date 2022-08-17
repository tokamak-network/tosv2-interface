import { convertTimeStamp, getNowTimeStamp } from "@/components/convertTime";
import { Flex, Text, useMediaQuery, useColorMode } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import BasicButton from "common/button/BasicButton";
import TokenSymbol from "common/token/TokenSymol";
import useModal from "hooks/useModal";
import { useState } from "react";
import { BondCardProps } from "types/bond";

function ContentComponent(props: {
  title: string;
  content: string;
  style?: any;
}) {
  const { title, content, style } = props;
  const { colorMode } = useColorMode();
  return (
    <Flex justifyContent={"space-between"} fontSize={14} h={"20px"} {...style}>
      <Text color={colorMode === "dark" ? "gray.100" : "gray.1000"}>
        {title}
      </Text>
      <Text color={colorMode === "dark" ? "white.200" : "gray.800"}>
        {content}
      </Text>
    </Flex>
  );
}

function BondCard(props: { data: BondCardProps }) {
  const { colorMode } = useColorMode();
  const { data } = props;
  // const {
  //   bondCapacity,
  //   bondingPrice,
  //   discountRate,
  //   tokenType,
  //   totalSold,
  //   timeLeft,
  // } = data;
  const { openModal } = useModal("bond_modal");
  const [smallerThan1040] = useMediaQuery("(max-width: 1040px)");
  const [smallerThan726] = useMediaQuery("(max-width: 726px)");
  const [isOpen, setIsOpen] = useState(true);
  const { account } = useWeb3React();

  const timeDiff = data?.endTime - getNowTimeStamp();
  const splitedTimeDiff = convertTimeStamp(timeDiff, `DD.HH.mm`).split(".");
  const timeLeft =
    timeDiff < 1
      ? "0 days 0 hours 0 min"
      : `${splitedTimeDiff[0]} days ${splitedTimeDiff[1]} hours ${splitedTimeDiff[2]} min`;

  //vierport ref 1134px
  return (
    <Flex
      flexDir={"column"}
      w={smallerThan1040 ? "100%" : "31.9%"}
      h={"290px"}
      minW={["336px", "310px", "362px"]}
      borderWidth={1}
      borderColor={colorMode === "light" ? "gray.900" : "gray.300"}
      borderRadius={10}
      pt={"18px"}
      bg={colorMode === "light" ? "white.100" : "#1f2128"}
      px={"20px"}
      pb={"21px"}
    >
      <Flex mb={"18px"} justifyContent={"space-between"} alignItems="center">
        <Flex>
          <TokenSymbol tokenType={data?.tokenType}></TokenSymbol>
          <Text
            fontSize={20}
            fontWeight={600}
            textAlign={"center"}
            lineHeight={"46px"}
            color={colorMode === "light" ? "gray.800" : "white.200"}
            ml={"12px"}
          >
            {data?.tokenType}
          </Text>
        </Flex>
        <Flex
          fontSize={12}
          color={isOpen ? "#5eea8d" : "red.100"}
          textAlign={"center"}
          alignItems="center"
          justifyContent={"center"}
        >
          <Text>{isOpen ? "Open" : "Closed"}</Text>
        </Flex>
      </Flex>
      <ContentComponent
        title="Bond Price"
        content={data?.bondingPrice}
        style={{ marginBottom: "9px" }}
      ></ContentComponent>
      <ContentComponent
        title="Discount"
        content={data?.discountRate}
        style={{ marginBottom: "16px" }}
      ></ContentComponent>
      <ContentComponent
        title="Capacity"
        content={data?.bondCapacity}
        style={{ marginBottom: "9px" }}
      ></ContentComponent>
      <ContentComponent
        title="Total Sold"
        content={data?.totalSold}
        style={{ marginBottom: "9px" }}
      ></ContentComponent>
      <ContentComponent
        title="Time Left"
        content={timeLeft}
        style={{ marginBottom: "9px" }}
      ></ContentComponent>
      <BasicButton
        name={account ? "Bond" : "Connect Wallet"}
        h={"33px"}
        style={{ alignSelf: "center" }}
        isDisabled={!account}
        onClick={openModal}
      ></BasicButton>
    </Flex>
  );
}

export default BondCard;
