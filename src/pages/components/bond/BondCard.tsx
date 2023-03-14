import { convertTimeStamp, getDuration, getNowTimeStamp } from "@/utils/time";
import {
  Flex,
  Text,
  useMediaQuery,
  useColorMode,
  Progress,
  useTheme,
  Box,
  theme,
} from "@chakra-ui/react";

import { useWeb3React } from "@web3-react/core";
import { selectedTxState } from "atom/global/tx";
import BasicButton from "common/button/BasicButton";
import TokenSymbol from "common/token/TokenSymol";
import useMediaView from "hooks/useMediaView";
import useModal from "hooks/useModal";
import useWallet from "hooks/useWallet";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { BondCardProps } from "types/bond";
import ActiveArrow from "assets/icons/bond/arrow-right2_blue.svg";
import InactiveArrow from "assets/icons/bond/arrow-right2_disabled.svg";
import RepeatIcon from "assets/icons/bond/s-repeat.svg";
import BlueTooltip from "assets/icons/bond/gage_blue_arrow.svg";
import GreenTooltip from "assets/icons/bond/gage_green_arrow.svg";

import Image from "next/image";
import { useWindowDimensions } from "hooks/useWindowDimensions";
import { isProduction } from "constants/production";
import styled from "@emotion/styled";
import CONTRACT_ADDRESS from "services/addresses/contract";
import { accountBar } from "atom/global/sidebar";
import { ZERO_ADDRESS } from "constants/index";
import { selectedToken0, selectedToken1 } from "atom/swap";

function getStatusText() {}

function ContentComponent(props: {
  title: string;
  content: string;
  style?: any;
  ImageSrc?: any;
  setStateTitleAction?: () => void;
  isHighest?: boolean;
  isMinus?: boolean;
}) {
  const {
    title,
    content,
    style,
    ImageSrc,
    setStateTitleAction,
    isHighest,
    isMinus,
  } = props;
  const { colorMode } = useColorMode();

  if (ImageSrc) {
    return (
      <Flex
        justifyContent={"space-between"}
        fontSize={14}
        h={"20px"}
        {...style}
      >
        <Flex>
          <Text
            color={colorMode === "dark" ? "gray.100" : "gray.1000"}
            mr={"6px"}
          >
            {title}
          </Text>
          <Image
            src={ImageSrc}
            alt={"image"}
            style={{ cursor: "pointer" }}
            onClick={() => setStateTitleAction && setStateTitleAction()}
          ></Image>
        </Flex>
        <Text
          color={colorMode === "dark" ? "white.200" : "gray.800"}
          fontWeight={"bold"}
        >
          {content}
        </Text>
      </Flex>
    );
  }
  return (
    <Flex justifyContent={"space-between"} fontSize={14} h={"20px"} {...style}>
      <Text color={colorMode === "dark" ? "gray.100" : "gray.1000"}>
        {title}
      </Text>
      <Text
        color={
          isHighest
            ? "blue.200"
            : isMinus
            ? "red.100"
            : colorMode === "dark"
            ? "white.200"
            : "gray.800"
        }
        fontWeight={"bold"}
      >
        {content}
      </Text>
    </Flex>
  );
}

function BondCard(props: { data: BondCardProps }) {
  const { colorMode } = useColorMode();
  const { data } = props;
  const { openModal } = useModal("bond_bond_modal", data);
  const {} = useMediaView();
  const theme = useTheme();
  const [hoverWTON, setHoverWTON] = useState(false);
  const [hoverETH, setHoverETH] = useState(false);
  const { account } = useWeb3React();
  const { tryActivation } = useWallet();
  const { bp700px } = useMediaView();
  const [titleState, setTitleState] = useState<
    "Time Starts" | "Time Ends" | "Time Left"
  >("Time Starts");
  const [width] = useWindowDimensions();
  const [isOpendAccount, setOpenedAccountBar] = useRecoilState(accountBar);
  const closed = data?.status === "closed";
  const { openModal: openSwapModal } = useModal("swap_interface_modal");

  const [token0, setToken0] = useRecoilState(selectedToken0);
  const { TON_ADDRESS, WTON_ADDRESS, TOS_ADDRESS } = CONTRACT_ADDRESS;

  const timeDiff = data?.endTime - getNowTimeStamp();
  const openTimeDiff = data?.startTime - getNowTimeStamp();

  const countDown = getDuration(timeDiff);
  const openCountDown = getDuration(openTimeDiff);

  const txPending = useRecoilValue(selectedTxState);

  const capacityIsZero = Number(data?.blueProgress) === 100;
  const discountIsMinus = data?.discountRate < 0;

  const isClosed = closed || capacityIsZero;

  const [isOpen, setIsOpen] = useState(timeDiff >= 0 || !capacityIsZero);
  const [isNotOpen, setIsNotOpen] = useState(openTimeDiff > 0);
  const timeLeft = closed
    ? "0 days 0 hours 0 min"
    : `${countDown.days} days ${countDown.hours} hours ${countDown.mins} min`;
  const bondButtonIsDisabled = closed || capacityIsZero || isNotOpen;

  const discountRate = data?.isDiscountMinus
    ? `${data?.discountRate}%`
    : `~ ${data?.discountRate}%`;

  const changeTitleState = useCallback(() => {
    switch (titleState) {
      case "Time Starts":
        return setTitleState("Time Ends");
      case "Time Ends":
        return setTitleState("Time Left");
      case "Time Left":
        return setTitleState("Time Starts");
      default:
        break;
    }
  }, [titleState]);

  const soldoutProgressRef = useRef<HTMLDivElement | null>(null);
  const currentCapacityProgressRef = useRef<HTMLDivElement | null>(null);

  const blueTooltipW: string | undefined = useMemo(() => {
    if (soldoutProgressRef?.current?.childNodes) {
      const soldoutProgressChildNode = soldoutProgressRef.current.childNodes;
      //@ts-ignore
      const width = soldoutProgressChildNode[0].clientWidth;

      return width ? `${width - 4}px` : undefined;
    }
  }, [soldoutProgressRef.current, width]);

  const greenTooltipW: string | undefined = useMemo(() => {
    if (currentCapacityProgressRef?.current?.childNodes) {
      const soldoutProgressChildNode =
        currentCapacityProgressRef.current.childNodes;
      //@ts-ignore
      const width = soldoutProgressChildNode[0].clientWidth;

      return width ? `${width - 4}px` : undefined;
    }
  }, [currentCapacityProgressRef.current, width]);

  //change colorScheme for blue progress(totalSold / totalCapacity)
  useEffect(() => {
    if (soldoutProgressRef?.current?.childNodes) {
      const totalSoldChildNode = soldoutProgressRef.current.childNodes;
      if (isClosed) {
        //@ts-ignore
        totalSoldChildNode[0].style.backgroundColor = "#64646f";
      } else {
        //@ts-ignore
        totalSoldChildNode[0].style.backgroundColor = "#2775ff";
      }
    }
  }, [soldoutProgressRef, isClosed]);

  //change colorScheme for green progress(currentCapacity / totalCapacity)
  useEffect(() => {
    if (currentCapacityProgressRef?.current?.childNodes) {
      const currentCapacityChildNode =
        currentCapacityProgressRef.current.childNodes;
      //@ts-ignore
      currentCapacityChildNode[0].style.backgroundColor = "#2bb415";
    }
  }, [currentCapacityProgressRef]);

  //vierport ref 1134px
  return (
    <Flex
      flexDir={"column"}
      w={["100%", "310px", "362px"]}
      h={"455px"}
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
          <TokenSymbol tokenType={data?.sellTokenType}></TokenSymbol>
          <Flex mx={"12px"}>
            <Image
              src={isClosed ? InactiveArrow : ActiveArrow}
              alt={"arrow"}
            ></Image>
          </Flex>
          <TokenSymbol tokenType={data?.buyTokenType}></TokenSymbol>
        </Flex>
        <Flex
          fontSize={12}
          color={
            colorMode === "dark"
              ? isClosed
                ? "#8b8b93"
                : "blue.200"
              : isClosed
              ? "gray.1000"
              : "gray.800"
          }
          textAlign={"right"}
          alignItems={"flex-end"}
          flexDir={"column"}
          fontWeight={data?.status === "open" ? "bold" : ""}
        >
          {data?.isHighest && <Text>Highest</Text>}
          <Text
            color={
              isNotOpen
                ? "#5eea8d"
                : colorMode === "dark"
                ? isClosed
                  ? "gray.100"
                  : "white.200"
                : isClosed
                ? "#8b8b93"
                : "blue.200"
            }
            fontSize={14}
          >
            {data?.status === "will be open"
              ? openTimeDiff > 86400
                ? `D-${openCountDown.days}`
                : `D-${openCountDown.hours}:${openCountDown.mins}:${openCountDown.secs}`
              : isClosed
              ? "Closed"
              : `${data?.isDiscountMinus ? "" : "~"} ${
                  String(data?.discountRate).split(".")[0]
                }% Off`}
          </Text>
        </Flex>
      </Flex>
      <Flex
        w={"100%"}
        minH={"130px"}
        maxH={"130px"}
        border={"1px solid"}
        borderColor={colorMode === "dark" ? "#313442" : "#e8edf2"}
        borderRadius={10}
        mb={"11px"}
        alignItems={"center"}
        justifyContent={"center"}
        rowGap={"6px"}
        flexDir={"column"}
        textAlign={"center"}
      >
        <Text
          color={colorMode === "dark" ? "white.200" : "gray.800"}
          fontSize={20}
          fontWeight={600}
        >
          ETH Bond {data?.version} ({isProduction() === false && data?.marketId}
          )
        </Text>
        {data?.isDiscountMinus ? (
          <Text fontSize={12} color={"red.100"}>
            Notice: You can purchase TOS at a lower
            <br /> price by using Tokamak Network Swap
            <br />
            <span>(</span>
            <span
              style={{
                color: colorMode === "dark" ? "#f1f1f1" : "#07070c",
                textDecoration: "underline",
                // cursor: hoverWTON ? "pointer" : "default",
                cursor: "pointer",
              }}
              // onClick={openSwapModal}
              onClick={() => {
                setOpenedAccountBar(true);
                openSwapModal();
                setToken0({
                  name: "WTON",
                  address: WTON_ADDRESS,
                  img: "https://tonstarter-symbols.s3.ap-northeast-2.amazonaws.com/wton-symbol%403x.png",
                });
              }}
              onMouseEnter={() => setHoverWTON(true)}
              onMouseLeave={() => setHoverWTON(false)}
            >
              WTON
            </span>
            <span
              style={{ color: colorMode === "dark" ? "#f1f1f1" : "#07070c" }}
            >
              ,{" "}
            </span>
            <span
              style={{
                color: colorMode === "dark" ? "#f1f1f1" : "#07070c",
                textDecoration: "underline",
                cursor: hoverETH ? "pointer" : "default",
              }}
              onMouseEnter={() => setHoverETH(true)}
              onMouseLeave={() => setHoverETH(false)}
              onClick={() => {
                setOpenedAccountBar(true);
                openSwapModal();
                setToken0({
                  name: "ETH",
                  address: ZERO_ADDRESS,
                  img: "",
                });
              }}
            >
              ETH
            </span>
            <span>)</span>
          </Text>
        ) : (
          <Text fontSize={12} color={"gray.100"}>
            Buy TOS for up to {String(data?.discountRate).split(".")[0]}% off
            with your WTON and
            <br /> TOS to improve the liquidity
          </Text>
        )}
      </Flex>
      <Flex flexDir={"column"} rowGap={"5px"} mb={"17px"}>
        <Flex justifyContent={"space-between"}>
          <Flex columnGap={"6px"}>
            <Text
              fontSize={13}
              color={colorMode === "light" ? "#3f536e" : "#dee4ef"}
              fontWeight={600}
            >
              Progress
            </Text>
            <Text
              color={colorMode === "light" ? "#2775ff" : "#8b8b93"}
              fontSize={12}
              fontWeight={"semibold"}
            >
              {data?.blueProgress}%
            </Text>
          </Flex>
          <Flex fontSize={11}>
            <Text
              fontWeight={"semibold"}
              color={colorMode === "light" ? "#3a495f" : "#f1f1f1"}
            >
              {data?.totalSold}&nbsp;
            </Text>
            <Text color={colorMode === "light" ? "#3a495f" : "#8b8b93"}>
              / {data?.bondCapacity} {data?.buyTokenType}
            </Text>
          </Flex>
        </Flex>
        <Flex pos={"relative"} mb={"17px"}>
          <Progress
            ref={soldoutProgressRef}
            value={Number(data?.blueProgress)}
            borderRadius={100}
            h={"5px"}
            w={"100%"}
            // bg={colorMode === "dark" ? "gray.800" : "gray.200"}
            zIndex={100}
          ></Progress>
          {Number(data?.blueProgress) > 0 && !isClosed && (
            <Box pos={"absolute"} w={"100%"} left={blueTooltipW} top={"-5px"}>
              <Image src={BlueTooltip} alt={"BlueTooltip"}></Image>
            </Box>
          )}
          {!isClosed && (
            <Progress
              ref={currentCapacityProgressRef}
              value={Number(data?.currentCapacityProgress)}
              borderRadius={100}
              h={"5px"}
              // bg={colorMode === "dark" ? "gray.800" : "gray.200"}
              w={"100%"}
              pos={"absolute"}
            ></Progress>
          )}
          {Number(data?.currentCapacityProgress) > 0 && !isClosed && (
            <Box pos={"absolute"} w={"100%"} left={greenTooltipW} top={"-5px"}>
              <Image src={GreenTooltip} alt={"GreenTooltip"}></Image>
            </Box>
          )}
        </Flex>
        <Flex flexDir={"column"} rowGap={"9px"}>
          <ContentComponent
            title={titleState}
            content={
              titleState === "Time Starts"
                ? data?.startDay
                : titleState === "Time Left"
                ? data?.status === "closed" || data?.status === "will be open"
                  ? "N/A"
                  : timeLeft
                : data?.endDay
            }
            ImageSrc={RepeatIcon}
            setStateTitleAction={changeTitleState}
          ></ContentComponent>
          <ContentComponent
            title="Discount"
            //remove tilda(~) when it's on minus status
            content={discountRate}
            isHighest={data?.isHighest}
            isMinus={data?.isDiscountMinus}
          ></ContentComponent>
          <ContentComponent
            title="Bond Price"
            content={`${data?.bondingPrice}`}
          ></ContentComponent>
          <ContentComponent
            title="Current Bondable"
            content={data?.currentBondable}
          ></ContentComponent>
          <BasicButton
            name={account ? (isOpen ? "Bond" : "Closed") : "Connect Wallet"}
            w={["100%", "270px", "150px"]}
            h={"33px"}
            style={{
              alignSelf: "center",
              marginTop: "9px",
              fontWeight: "normal",
            }}
            isDisabled={bondButtonIsDisabled}
            isLoading={txPending}
            onClick={account ? openModal : tryActivation}
          ></BasicButton>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default BondCard;
