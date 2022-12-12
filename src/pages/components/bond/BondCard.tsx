import {
  convertTimeStamp,
  getDuration,
  getNowTimeStamp,
} from "@/components/time";
import { Flex, Text, useMediaQuery, useColorMode } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { selectedTxState } from "atom/global/tx";
import BasicButton from "common/button/BasicButton";
import TokenSymbol from "common/token/TokenSymol";
import useModal from "hooks/useModal";
import useWallet from "hooks/useWallet";
import { useState } from "react";
import { useRecoilValue } from "recoil";
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
  const { openModal } = useModal("bond_bond_modal", data);
  const [smallerThan1040] = useMediaQuery("(max-width: 1040px)");
  const [smallerThan726] = useMediaQuery("(max-width: 726px)");
  const { account } = useWeb3React();
  const { tryActivation } = useWallet();

  const timeDiff = data?.endTime - getNowTimeStamp();
  const countDown = getDuration(timeDiff);
  const txPending = useRecoilValue(selectedTxState);

  const capacityIsZero = Number(data?.bondCapacity.replaceAll("%", "")) <= 0;
  const discountIsMinus = Number(data?.discountRate.replaceAll("%", "")) < 0;

  const [isOpen, setIsOpen] = useState(timeDiff >= 0 || !capacityIsZero);
  const bondIsDisabled = timeDiff < 0;
  const timeLeft = bondIsDisabled
    ? "0 days 0 hours 0 min"
    : `${countDown.days} days ${countDown.hours} hours ${countDown.mins} min`;
  const bondButtonIsDisabled =
    bondIsDisabled || capacityIsZero || discountIsMinus;

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
      <Flex flexDir={"column"} rowGap={"9px"}>
        <ContentComponent
          title="Bond Price"
          content={`$ ${data?.bondingPrice}`}
        ></ContentComponent>
        <ContentComponent
          title="Discount"
          content={data?.discountRate}
        ></ContentComponent>
        <ContentComponent
          title="Capacity"
          content={`${data?.bondCapacity} TOS`}
        ></ContentComponent>
        <ContentComponent
          title="Total Sold"
          content={data?.totalSold}
        ></ContentComponent>
        <ContentComponent
          title="Time Left"
          content={timeLeft}
        ></ContentComponent>
        <BasicButton
          name={account ? (isOpen ? "Bond" : "Closed") : "Connect Wallet"}
          h={"33px"}
          style={{ alignSelf: "center", marginTop: "9px" }}
          isDisabled={bondButtonIsDisabled}
          isLoading={txPending}
          onClick={account ? openModal : tryActivation}
        ></BasicButton>
      </Flex>
    </Flex>
  );
}

export default BondCard;
