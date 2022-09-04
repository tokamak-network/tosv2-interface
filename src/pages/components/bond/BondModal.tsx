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
import { selectedModalData, selectedModalState } from "atom//global/modal";
import useModal from "hooks/useModal";
import Image from "next/image";
import CLOSE_ICON from "assets/icons/close-modal.svg";
import CustomCheckBox from "common/input/CustomCheckBox";
import SubmitButton from "common/button/SubmitButton";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TextInput, BalanceInput } from "common/input/TextInput";
import TokenSymbol from "common/token/TokenSymol";
import question from "assets/icons/question.svg";
import useCallContract from "hooks/useCallContract";
import useBondModal from "hooks/bond/useBondModal";
import useInputData from "hooks/bond/useBondModalInputData";
import { inputBalanceState, inputState } from "atom/global/input";
import commafy from "@/components/commafy";
import { BondCardProps } from "types/bond";
import { convertToWei } from "@/components/number";
import { useWeb3React } from "@web3-react/core";
import useUserBalance from "hooks/useUserBalance";
import useInput from "hooks/useInput";
import { Bond_BondModal } from "types/atom";
import StakeGraph from "../common/modal/StakeGraph";
import useBondModalInputData from "hooks/bond/useBondModalInputData";
import BasicTooltip from "common/tooltip";
import Tile from "../common/modal/Tile";

function BottomContent(props: {
  title: string;
  content: string | { ltos: string; stos: string };
  tooltip?: boolean;
  tooltipMessage?: string;
  secondTooltip?: string;
}) {
  const { title, content, tooltip, tooltipMessage, secondTooltip } = props;
  const { colorMode } = useColorMode();

  const ContentComponent = useMemo(() => {
    switch (title) {
      case "You Will Get":
        return (
          <Flex>
            <Text
              color={colorMode === "dark" ? "white.200" : "gray.800"}
              fontWeight={600}
              mr={'6px'}
            >
              {(typeof content !== "string" && content.ltos) || "-"} LTOS
            </Text> 
            <BasicTooltip label={secondTooltip} />
            <Text color={"#64646f"} mx={"5px"}>
              /
            </Text>
            <Text
              color={colorMode === "dark" ? "white.200" : "gray.800"}
              fontWeight={600}
            >
              {(typeof content !== "string" && content.stos) || "-"} sTOS
            </Text>
          </Flex>
        );
      default:
        return (
          <Text
            color={colorMode === "dark" ? "white.200" : "gray.800"}
            fontWeight={600}
          >
            {content as string}
          </Text>
        );
    }
  }, [title, content, colorMode]);

  return (
    <Flex>
      <Flex
        w={"100%"}
        justifyContent={"space-between"}
        fontSize={14}
        mt={"9px"}
      >
        <Flex  alignItems={'center'}>
          <Text
            color={colorMode === "dark" ? "gray.100" : "gray.1000"}
            mr={"6px"}
          >
            {title}
          </Text>
          {tooltip ? (
          
          <BasicTooltip label={tooltipMessage} />
        ) : (
          <></>
        )}
        </Flex>
        {ContentComponent}
      </Flex>
    </Flex>
  );
}


function BondModal() {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { inputValue, setValue, setResetValue } = useInput(
    "Bond_screen",
    "bond_modal"
  );
  const { selectedModalData, selectedModal, closeModal } = useModal();
  const { bondModalData } = useBondModal();
  const { BondDepositoryProxy_CONTRACT } = useCallContract();
  const { userETHBalance } = useUserBalance();
  const [fiveDaysLockup, setFiveDaysLockup] = useState<boolean>(false);

  const propData = selectedModalData as BondCardProps;
  const marketId = propData.index;

  const { youWillGet, endTime, stosReward } = useBondModalInputData(marketId);

  // console.log(youWillGet);
  // console.log(stosReward);

  const contentList = [
    {
      title: "You Give",
      content: `${inputValue.bond_modal_balance || "-"} ETH`,
      tooltip: false,
      tooltipMessage: "",
    },
    {
      title: "You Will Get",
      content:
        {
          ltos: youWillGet || "0",
          stos: fiveDaysLockup ? "0" : stosReward || "0",
        } || "-",
      tooltip: true,
      tooltipMessage: "You get LTOS based on what you give and sTOS is also based on the lock-up period.",
      secondTooltip:'Currently worth 200 TOS. As LTOS index increases, the number of TOS you can get from unstaking LTOS will also increase.'

    },
    {
      title: "End Time",
      content: endTime || "-",
      tooltip: true,
      tooltipMessage: "LTOS can be unstaked after this time. ",
    },
  ];

  const callBond = useCallback(() => {
    if (BondDepositoryProxy_CONTRACT && inputValue.bond_modal_balance) {
      const inputAmount = inputValue.bond_modal_balance;

      if (!fiveDaysLockup && inputValue.bond_modal_period) {
        console.log("---ETHDepositWithSTOS()---");
        console.log(
          marketId,
          convertToWei(inputAmount),
          inputValue.bond_modal_period
        );
        return BondDepositoryProxy_CONTRACT.ETHDepositWithSTOS(
          marketId,
          convertToWei(inputAmount),
          inputValue.bond_modal_period,
          { value: convertToWei(inputAmount) }
        );
      }
      console.log("---ETHDeposit()---");
      console.log(marketId, convertToWei(inputAmount), {
        value: convertToWei(inputAmount),
      });
      return BondDepositoryProxy_CONTRACT.ETHDeposit(
        marketId,
        convertToWei(inputAmount),
        { value: convertToWei(inputAmount) }
      );
    }
  }, [inputValue, BondDepositoryProxy_CONTRACT, marketId, fiveDaysLockup]);

  function closeThisModal() {
    setResetValue();
    closeModal();
  }

  return (
    <Modal
      isOpen={selectedModal === "bond_bond_modal"}
      isCentered
      onClose={() => closeThisModal()}
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
                <TokenSymbol
                  tokenType={"ETH"}
                  h={"30px"}
                  w={"30px"}
                ></TokenSymbol>
                <Text
                  color={colorMode === "light" ? "gray.800" : "white.200"}
                  fontSize={20}
                  fontWeight={600}
                >
                  ETH BOND
                </Text>

                <Flex
                  pos={"absolute"}
                  right={"1.56em"}
                  cursor={"pointer"}
                  onClick={() => closeThisModal()}
                >
                  <Image src={CLOSE_ICON} alt={"CLOSE_ICON"}></Image>
                </Flex>
              </Flex>
              {/* Content Area*/}
              <Flex w={"100%"} px={"120px"} flexDir={"column"} mb={"29px"}>
                <Flex w={"100%"} justifyContent={"space-between"} mb={"9px"}>
                  <Grid
                    templateColumns="repeat(3, 1fr)"
                    templateRows="repeat(2, 1fr)"
                    w={'100%'}
                  >
                    <GridItem display={'flex'} justifyContent='center' >
                      <Tile
                        title={"Bond Price"}
                        content={`${bondModalData?.bondPrice}`}
                        tooltip={"Bonding price for 1 TOS in USD."}
                      />
                    </GridItem>
                    <GridItem>
                      <Tile
                        title={"Market Price"}
                        content={`${bondModalData?.marketPrice}`}
                        tooltip={"Market price for 1 TOS in USD."}
                      />
                    </GridItem>
                    <GridItem>
                      <Tile
                        title={"Discount"}
                        content={`${bondModalData?.discount}`}
                        tooltip={"Discount for bonding."}
                      />
                    </GridItem>
                    <GridItem>
                      <Tile
                        title={"Min Bond"}
                        content={bondModalData?.minBond}
                        symbol={"ETH"}
                        tooltip={
                          "The recommended minimum amount to bond to offset the gas cost."
                        }
                      />
                    </GridItem>
                    <GridItem>
                      <Tile
                        title={"Max Bond"}
                        content={bondModalData?.maxBond}
                        symbol={"ETH"}
                        tooltip={
                          "The maximum bondable amount based on the current bond market capacity."
                        }
                      />
                    </GridItem>
                    <GridItem>
                      <Tile
                        title={"LTOS Index"}
                        content={bondModalData?.ltosIndex}
                        symbol={"TOS"}
                        tooltip={
                          "Number of TOS you get when you unstake 1 LTOS. LTOS index increases every 8 hours."
                        }
                      />
                    </GridItem>
                  </Grid>
                </Flex>
                <Flex mb={"9px"}>
                  <BalanceInput
                    w={"100%"}
                    h={45}
                    placeHolder={"Enter an amount of ETH"}
                    pageKey={"Bond_screen"}
                    recoilKey={"bond_modal"}
                    atomKey={"bond_modal_balance"}
                    maxValue={Number(userETHBalance.replaceAll(",", ""))}
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
                  <Text>{userETHBalance} ETH</Text>
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
                    valueKey={"Bond_Modal"}
                    state={fiveDaysLockup}
                    setState={setFiveDaysLockup}
                  ></CustomCheckBox>
                  <Text ml={"9px"} mr='6px'>5 days Lock-Up</Text>
                  <BasicTooltip label="No sTOS is given for 5 day Lock-up option"/>
                  <TextInput
                    w={"170px"}
                    h={"39px"}
                    pageKey={"Bond_screen"}
                    recoilKey={"bond_modal"}
                    atomKey={"bond_modal_period"}
                    placeHolder={"1 Weeks"}
                    style={{ marginLeft: "auto" }}
                    isDisabled={fiveDaysLockup}
                  ></TextInput>
                </Flex>
              </Flex>
              <Flex px={"49px"} mb={"30px"}>
                <StakeGraph
                  pageKey={"Bond_screen"}
                  subKey={"bond_modal"}
                  periodKey={"bond_modal_period"}
                ></StakeGraph>
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
