import {
  Flex,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  useTheme,
  useColorMode,
  Link,
  Box,
  Input,
  Grid,
  GridItem,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
} from "@chakra-ui/react";
// import { CloseIcon } from "@chakra-ui/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedModalData, selectedModalState } from "atom//global/modal";
import useModal from "hooks/useModal";
import Image from "next/image";
import CLOSE_ICON from "assets/icons/close-modal.svg";
import CustomCheckBox from "common/input/CustomCheckBox";
import SubmitButton from "common/button/SubmitButton";
import { useCallback, useEffect, useState } from "react";
import { TextInput, BalanceInput } from "common/input/TextInput";

import TokenSymbol from "common/token/TokenSymol";
import question from "assets/icons/question.svg";
import useCallContract from "hooks/useCallContract";
import useBondModal from "hooks/bond/useBondModal";
import useInputData from "hooks/bond/useInputData";
import { inputBalanceState, inputState } from "atom/global/input";
import commafy from "@/components/commafy";
import { BondCardProps } from "types/bond";
import { convertToWei } from "@/components/number";
import useUser from "hooks/useUser";
import BasicTooltip from "common/tooltip/index";


function StakeGraph() {
  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };
  const [sliderValue, setSliderValue] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const oldValues = useRecoilValue(inputBalanceState);
  const [value, setValue] = useRecoilState(inputState);

  useEffect(() => {
    setValue({ ...oldValues, stake_stake_modal_period: sliderValue });
  }, [sliderValue]);

  // useEffect(() => {
  //   console.log(value.stake_stake_modal_period);
  //   setSliderValue(Number(value.stake_stake_modal_period));
  // }, [value.stake_stake_modal_period]);

  const { colorMode } = useColorMode();
  return (
    <Flex w={"100%"} h="70px" pos="relative">
      <Slider
        aria-label="slider-ex-1"
        defaultValue={0}
        min={0}
        max={156}
        value={sliderValue}
        onChange={(val: any) => setSliderValue(val)}
        h={"10px"}
        alignSelf={"end"}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <SliderMark value={0} {...labelStyles}>
          7d
        </SliderMark>
        <SliderMark value={8} {...labelStyles}>
          1m
        </SliderMark>
        <SliderMark value={24} {...labelStyles}>
          6m
        </SliderMark>
        <SliderMark value={52} {...labelStyles}>
          1y
        </SliderMark>
        <SliderMark value={104} {...labelStyles}>
          2y
        </SliderMark>
        <SliderMark value={156} {...labelStyles}>
          3y
        </SliderMark>

        {/* <SliderMark value={25} {...labelStyles}>
          25%
        </SliderMark> */}
        {/* <SliderMark
          value={sliderValue}
          textAlign="center"
          bg="blue.500"
          color="white"
          mt="-10"
          ml="-5"
          w="12"
        >
          {sliderValue} STOS
        </SliderMark> */}
        <SliderTrack bg={colorMode === "light" ? "#e7edf3" : "#353d48"}>
          <SliderFilledTrack bg={"#2775ff"} />
        </SliderTrack>
        <Tooltip
          color={colorMode === "light" ? "#07070c" : "#f1f1f1"}
          placement="top"
          bg={"transparent"}
          w={"50px"}
          display="flex"
          alignItems="center"
          justifyContent={"center"}
          textAlign="center"
          fontSize={"15px"}
          fontWeight={600}
          isOpen={showTooltip}
          label={`${sliderValue} sTOS`}
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
    </Flex>
  );
}

function BottomContent(props: {
  title: string;
  content: string;
  tooltip?: boolean;

  tooltipMessage?: string;
  secondTooltip?: string;
}) {
  const { title, content, tooltip,
    tooltipMessage,
    secondTooltip, } = props;
  const { colorMode } = useColorMode();

  return (
    <Flex>
      <Flex
        w={"100%"}
        justifyContent={"space-between"}
        fontSize={14}
        mt={"9px"}
      >

         <Flex>
        <Text color={colorMode === "dark" ? "gray.100" : "gray.1000"} mr={'6px'}>
          {title}
        </Text>
        {tooltip ? <BasicTooltip label={tooltipMessage} /> : <></>}
        </Flex>
        <Flex>
        <Text
          color={colorMode === "dark" ? "white.200" : "gray.800"}
          fontWeight={600}
          mr={'6px'}
        >
          {content}
        </Text>
        {secondTooltip? <BasicTooltip label={secondTooltip} />:<></>}
        </Flex>
      </Flex>
    </Flex>
  );
}

function Tile(props: {
  title: string;
  content: string;
  symbol?: string;
  tooltip: string;
}) {
  const { title, content, symbol, tooltip } = props;

  const { colorMode } = useColorMode();
  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      w={"152px"}
      alignItems={"center"}
      mb={"15px"}
    >
      <Flex alignItems={"center"}>
        <Text
          color={colorMode === "dark" ? "gray.100" : "gray.1000"}
          h={"17px"}
          mb={"3px"}
          fontWeight={600}
          fontSize={12}
          textAlign="center"
          mr={"6px"}
        >
          {title}
        </Text>


        <BasicTooltip label={tooltip} />

      </Flex>

      <Flex fontWeight={"bold"} h={"33px"}>
        <Text
          color={colorMode === "dark" ? "white.100" : "gray.800"}
          fontSize={24}
          mr={2}
        >

          {content || "-"}

        </Text>
        <Text
          color={colorMode === "dark" ? "white.200" : "gray.800"}
          fontSize={14}
          pt={"5px"}
          lineHeight={"33px"}
        >
          {symbol ? symbol : ""}
        </Text>
      </Flex>
    </Box>
  );
}


function BondModal() {

  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { closeModal } = useModal();
  const { selectedModalData, selectedModal } = useModal();
  const { bondModalData } = useBondModal();
  const oldValues = useRecoilValue(inputBalanceState);
  const { bondInputData } = useInputData(oldValues.stake_stake_modal_balance);
  const { BondDepositoryProxy_CONTRACT } = useCallContract();

  const propData = selectedModalData as BondCardProps;
  const marketId = propData.index;

  const contentList = [
    {
      title: "You Give",
      content: `${oldValues.stake_stake_modal_balance || "-"} ETH`,
      tooltip: false,
    },
    {
      title: "You Will Get",
      content: `${bondInputData?.youWillGet || "-"}`,
      tooltip: true,
      tooltipMessage: "You get LTOS based on what you give and sTOS is also based on the lock-up period.",
      secondTooltip: "2,000 TOS. As LTOS index increases, the number of TOS you can get from unstaking LTOS will also increase. ",
    
    },
    {
      title: "End Time",
      content: `${bondInputData?.endTime || "-"}`,
      tooltip: true,

    },
    {
      title: "Current Balance",
      content: "20 LTOS",
      tooltip: true,
      tooltipMessage: "Current LTOS balance without Lock-Up period",
      secondTooltip: "2,000 TOS. As LTOS index increases, the number of TOS you can get from unstaking LTOS will also increase. ",
   
    },
    {
      title: "New Balance",
      content: "100 LTOS",
      tooltip: true,
      tooltipMessage: "ANew LTOS balance without Lock-Up period after staking.",
      secondTooltip: "2,000 TOS. As LTOS index increases, the number of TOS you can get from unstaking LTOS will also increase. ",
   
    },
    // {
    //   title: "Earn sTOS",
    //   content: "1,000 sTOS",
    // },
    // {
    //   title: "TOS APY",
    //   content: "30%",
    // },
  ];

  const callBond = useCallback(() => {
    if (BondDepositoryProxy_CONTRACT) {
      console.log("---");
      console.log(
        marketId,
        convertToWei(oldValues.stake_stake_modal_balance),
        oldValues.stake_stake_modal_period
      );
      return BondDepositoryProxy_CONTRACT.ETHDeposit(
        marketId,
        convertToWei(oldValues.stake_stake_modal_balance),
        { value: convertToWei(oldValues.stake_stake_modal_balance) }
      );
    }
  }, [
    oldValues.stake_stake_modal_balance,
    oldValues.stake_stake_modal_period,
    BondDepositoryProxy_CONTRACT,
    marketId,
  ]);

  return (
    <Modal
      isOpen={selectedModal === "stake_stake_modal"}
      isCentered
      onClose={closeModal}
    >
      <ModalOverlay />
      <ModalContent
        // fontFamily={theme.fonts.roboto}
        bg={colorMode === "light" ? "white.100" : "#121318"}
        minW="43.75em"
        // h="704px"
      >
        <ModalBody px={0} pt={"30px"}>
          <Flex w="100%" flexDir={"column"}>
            {/*TOP Area*/}
            <Flex flexDir={"column"} pos={"relative"}>
              {/* Title Area*/}
              <Flex w={"100%"} justifyContent={"center"} mb={"33px"} h={"28px"}>
                <Text
                  color={colorMode === "light" ? "gray.800" : "white.200"}
                  fontSize={20}
                  fontWeight={600}
                >
                  Stake
                </Text>

                <Flex
                  pos={"absolute"}
                  right={"1.56em"}
                  cursor={"pointer"}
                  onClick={() => closeModal()}
                >
                  <Image src={CLOSE_ICON} alt={"CLOSE_ICON"}></Image>
                </Flex>
              </Flex>
              {/* Content Area*/}
              <Flex w={"100%"} px={"120px"} flexDir={"column"} mb={"29px"}>
                <Flex w={"100%"} justifyContent={"space-between"} mb={"9px"}>
                  <Tile
                    title={"Next rebase"}
                    content={`${bondModalData?.bondPrice}`}
                    tooltip={"Time left until LTOS index is increased."}
                  />
                  <Tile
                    title={"LTOS Index"}
                    content={`${bondModalData?.discount}`}
                    symbol={"TOS"}
                    tooltip={
                      "Number of TOS you get when you unstake 1 LTOS. LTOS index increases every 8 hours."
                    }
                    
                  />

                  <Tile
                    title={"LTOS Index"}
                    content={"100"}
                    symbol={"TOS"}
                    tooltip={
                      "Number of TOS you get when you unstake 1 LTOS. LTOS index increases every 8 hours."
                    }

                  />
                </Flex>
                <Flex mb={"9px"}>
                  <BalanceInput
                    w={"100%"}
                    h={45}
                    placeHolder={"Enter an amount of ETH"}
                    atomKey={"stake_stake_modal_balance"}
                  ></BalanceInput>
                </Flex>
                <Flex
                  fontSize={12}
                  color={colorMode === "dark" ? "#8b8b93" : "gray.1000"}
                  h={"17px"}
                  justifyContent={"space-between"}
                  mb={"12px"}
                >
                  <Text>Your Balance</Text>
                  <Text>1,000 WTON</Text>
                </Flex>
                <Flex fontSize={12} alignItems="center">
                  <Text
                    mr={"24px"}
                    color={colorMode === "light" ? "gray.800" : "white.200"}
                  >
                    Lock-Up Period
                  </Text>
                  <CustomCheckBox
                    pageKey="Bond_screen"
                    value={""}
                    valueKey={""}
                  ></CustomCheckBox>
                  <Text ml={"9px"}>5 days Lock-Up</Text>
                  <TextInput
                    w={"170px"}
                    h={"39px"}
                    atomKey={"stake_stake_modal_period"}
                    placeHolder={"1 Weeks"}
                    style={{ marginLeft: "auto" }}
                  ></TextInput>
                </Flex>
              </Flex>
              <Flex px={"49px"} mb={"30px"}>
                <StakeGraph></StakeGraph>
              </Flex>
              {/* Content Bottom */}
              <Flex
                flexDir={"column"}
                columnGap={"9px"}
                mb={"30px"}
                px={"50px"}
              >
                {contentList.map((content, index) => {
                  return (
                    <BottomContent
                      title={content.title}
                      content={content.content}
                      key={content.title + index}
                      tooltip={content.tooltip}

                      tooltipMessage={content.tooltipMessage}
                      secondTooltip={content.secondTooltip}

                    ></BottomContent>
                  );
                })}
              </Flex>
            </Flex>
            <Flex justifyContent={"center"} mb={"21px"}>
              <SubmitButton
                w={460}
                h={42}
                name="Bond"
                onClick={callBond}
              ></SubmitButton>
            </Flex>
            <Flex
              fontSize={11}
              color={"#64646f"}
              textAlign="center"
              w={"100%"}
              mb={"24px"}
            >
              <Text
                w={"100%"}
                color={colorMode === "dark" ? "gray.200" : "gray.700"}
              >
                If this is First time bonding, Please approve Tonstarter to use
                your DAI for bonding.
              </Text>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default BondModal;
