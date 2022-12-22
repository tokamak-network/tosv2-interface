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
  useMediaQuery,
} from "@chakra-ui/react";
// import { CloseIcon } from "@chakra-ui/icons";
import {
  modalBottomLoadingState,
  modalLoadingState,
  modalLoadingValue,
  selectedModalData,
  selectedModalState,
  stosLoadingState,
} from "atom//global/modal";
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
import commafy from "@/utils/commafy";
import { BondCardProps } from "types/bond";
import { convertToWei } from "@/utils/number";
import { useWeb3React } from "@web3-react/core";
import useUserBalance from "hooks/useUserBalance";
import useInput from "hooks/useInput";
import { Bond_BondModal } from "types/atom";
import StakeGraph from "../common/modal/StakeGraph";
import useBondModalInputData from "hooks/bond/useBondModalInputData";
import BasicTooltip from "common/tooltip";
import { getNowTimeStamp, getTimeLeft, convertTimeStamp } from "utils/time";
import useCustomToast from "hooks/useCustomToast";
import useLtosIndex from "hooks/gql/useLtosIndex";
import { useRecoilState, useRecoilValue } from "recoil";
import useBondModalCondition from "hooks/bond/useBondModalCondition";
import constant from "constant";
import GradientSpinner from "../common/GradientSpinner";
import Tile from "../common/modal/Tile";
import BottomContent from "../common/modal/BottomContent";
import InputPeriod from "common/input/InputPeriod";
import useStosReward from "hooks/stake/useStosReward";
import BondConfirm from "./modal/BondConfirm";
import BondModal_BottomContent from "./modal/BondModal_BottomContent";
import useMediaView from "hooks/useMediaView";

function BondModal() {
  const theme = useTheme();
  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);

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
  const fiveDaysLater = getTimeLeft(getNowTimeStamp(), 5, "YYYY. MM.DD. HH:mm");
  const [fiveDaysLockupEndTime, setFiveDaysLockupEndTime] =
    useState(fiveDaysLater);

  const propData = selectedModalData as BondCardProps;
  const marketId = propData?.index;

  const { bp700px } = useMediaView();

  const { youWillGet, endTime, stosReward, originalTosAmount } =
    useBondModalInputData(marketId);
  const { leftDays, leftWeeks, leftHourAndMin } = useStosReward(
    inputValue.bond_modal_balance,
    inputValue.bond_modal_period
  );

  const { setTx } = useCustomToast({
    confirmedMessage: "Bond purchase success! Go to",
    confirmedLink: "Stake_screen",
  });
  const { ltosIndex } = useLtosIndex();
  const { modalMaxWeeks: LOCKTOS_maxWeeks } = constant;

  const [bottomLoading, setBottomLoading] = useRecoilState(
    modalBottomLoadingState
  );
  const [stosLoading, setStosLoading] = useRecoilState(stosLoadingState);
  const [maxValue, setMaxValue] = useState<number | undefined>(undefined);
  const { inputOver, inputPeriodOver, btnDisabled, zeroInputBalance } =
    useBondModalCondition(maxValue);
  const { errMsg } = constant;

  const closeThisModal = useCallback(() => {
    setResetValue();
    setFiveDaysLockup(false);
    closeModal();
  }, [closeModal, setResetValue]);

  const callBond = useCallback(async () => {
    try {
      if (BondDepositoryProxy_CONTRACT && inputValue.bond_modal_balance) {
        const inputAmount = inputValue.bond_modal_balance;
        const periodWeeks = inputValue.bond_modal_period + 1;

        if (!fiveDaysLockup && inputValue.bond_modal_period) {
          console.log("---ETHDepositWithSTOS()---");
          console.log(marketId, convertToWei(inputAmount), periodWeeks);
          const tx = await BondDepositoryProxy_CONTRACT.ETHDepositWithSTOS(
            marketId,
            convertToWei(inputAmount),
            periodWeeks,
            { value: convertToWei(inputAmount) }
          );
          setTx(tx);
          return closeThisModal();
        }

        console.log("---ETHDeposit()---");
        console.log(marketId, convertToWei(inputAmount), {
          value: convertToWei(inputAmount),
        });
        const tx = await BondDepositoryProxy_CONTRACT.ETHDeposit(
          marketId,
          convertToWei(inputAmount),
          { value: convertToWei(inputAmount) }
        );
        setTx(tx);
        return closeThisModal();
      }
    } catch (e) {
      // console.log(e);
      // return errToast();
    } finally {
      setIsOpenConfirm(false);
    }
  }, [
    inputValue,
    BondDepositoryProxy_CONTRACT,
    marketId,
    fiveDaysLockup,
    setTx,
    closeThisModal,
  ]);

  useEffect(() => {
    if (fiveDaysLockup) {
      setInterval(() => {
        const fiveDaysLater = getTimeLeft(
          getNowTimeStamp(),
          5,
          "YYYY. MM.DD. HH:mm"
        );
        setFiveDaysLockupEndTime(fiveDaysLater);
      }, 1000);
    }
  }, [fiveDaysLockup]);

  useEffect(() => {
    setStosLoading(true);
  }, [inputValue, setBottomLoading, setStosLoading]);

  useEffect(() => {
    setBottomLoading(true);
  }, [inputValue.bond_modal_balance, setBottomLoading]);

  useEffect(() => {
    if (bondModalData && userETHBalance) {
      const mValue =
        bondModalData && Number(bondModalData?.maxBond) > Number(userETHBalance)
          ? Number(userETHBalance.replaceAll(",", ""))
          : Number(bondModalData?.maxBond.replaceAll(",", ""));

      if (Number(bondModalData?.maxBond) === 0) {
        return setMaxValue(Number(userETHBalance.replaceAll(",", "")));
      }
      setMaxValue(mValue);
    }
  }, [bondModalData, userETHBalance]);

  const capacityIsZero =
    Number(propData?.discountRate?.replaceAll("%", "")) <= 0;

  return (
    <Modal
      isOpen={selectedModal === "bond_bond_modal"}
      isCentered
      onClose={() => closeThisModal()}
    >
      <ModalOverlay className="modalOverlay" />
      <ModalContent
        bg={colorMode === "light" ? "white.100" : "#121318"}
        minW={bp700px ? "350px" : "700px"}
        maxW={bp700px ? "350px" : "700px"}
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
                  ml="9px"
                >
                  ETH Bond
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
              <Flex
                w={"100%"}
                flexDir={"column"}
                px={bp700px ? "20px" : "120px"}
                mb={"29px"}
              >
                <Flex mb={"9px"} w={"100%"} justifyContent="center">
                  <Grid
                    templateColumns={
                      bp700px ? "repeat(2, 1fr)" : "repeat(3, 1fr)"
                    }
                    templateRows={bp700px ? "repeat(3, 1fr)" : "repeat(2, 1fr)"}
                  >
                    <GridItem>
                      <Tile
                        title={"Bond Price"}
                        //@ts-ignore
                        content={`$${selectedModalData?.bondingPrice}`}
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
                        content={`${propData?.discountRate}`}
                        tooltip={"Discount for bonding."}
                        isWarning={capacityIsZero}
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
                        content={ltosIndex}
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
                    maxValue={maxValue}
                    isError={bondModalData && (zeroInputBalance || inputOver)}
                    errorMsg={
                      zeroInputBalance
                        ? errMsg.bondZeroInput
                        : "Input has exceeded maximum bondable amount per 1 transaction"
                    }
                    rightUnit={"ETH"}
                  ></BalanceInput>
                </Flex>
                <Flex
                  fontSize={12}
                  color={colorMode === "dark" ? "#8b8b93" : "gray.1000"}
                  h={"17px"}
                  justifyContent={"space-between"}
                  mb={"12px"}
                  px="6px"
                >
                  <Text>Your Balance</Text>
                  <Text>{userETHBalance} ETH</Text>
                </Flex>
                <Flex
                  fontSize={12}
                  flexDir={bp700px ? "column" : "row"}
                  alignItems="center"
                  mt="10px"
                >
                  <Flex
                    w={"100%"}
                    justifyContent={bp700px ? "space-between" : ""}
                    mb={bp700px ? "10px" : ""}
                  >
                    <Text
                      mr={"6px"}
                      color={colorMode === "light" ? "gray.800" : "white.200"}
                    >
                      Lock-Up Period
                    </Text>
                    <Flex>
                      <CustomCheckBox
                        pageKey="Bond_screen"
                        value={""}
                        valueKey={"Bond_Modal"}
                        state={fiveDaysLockup}
                        setState={setFiveDaysLockup}
                      ></CustomCheckBox>
                      <Text ml={"6px"} mr="3px">
                        5 Days Lock-Up
                      </Text>

                      <BasicTooltip label="No sTOS is given for 5 day Lock-up option" />
                    </Flex>
                  </Flex>
                  <InputPeriod
                    w={bp700px ? "310px" : "220px"}
                    h={"39px"}
                    pageKey={"Bond_screen"}
                    recoilKey={"bond_modal"}
                    atomKey={"bond_modal_period"}
                    placeHolder={"1 Weeks"}
                    style={{ marginLeft: "auto" }}
                    isDisabled={fiveDaysLockup}
                    isDisabledText={"5 Days"}
                    rightUnit={"Weeks"}
                    maxValue={LOCKTOS_maxWeeks}
                    minValue={1}
                    isError={inputPeriodOver}
                    errorMsg={errMsg.periodExceed}
                    leftTime={leftHourAndMin}
                    leftDays={leftDays}
                    endTime={
                      fiveDaysLockup || inputPeriodOver ? undefined : endTime
                    }
                  ></InputPeriod>
                </Flex>
              </Flex>
              <Flex px={bp700px ? "30px" : "43px"} mb={"30px"}>
                <StakeGraph
                  pageKey={"Bond_screen"}
                  subKey={"bond_modal"}
                  periodKey={"bond_modal_period"}
                  isSlideDisabled={fiveDaysLockup}
                  minValue={1}
                ></StakeGraph>
              </Flex>
              {/* Content Bottom */}
              <BondModal_BottomContent
                fiveDaysLockup={fiveDaysLockup}
                fiveDaysLockupEndTime={fiveDaysLockupEndTime}
              />
            </Flex>
            <Flex justifyContent={"center"} mb={capacityIsZero ? "" : "40px"}>
              <SubmitButton
                w={bp700px ? 310 : 460}
                h={42}
                name="Bond"
                // onClick={callBond}
                onClick={() =>
                  capacityIsZero ? setIsOpenConfirm(true) : callBond()
                }
                isDisabled={fiveDaysLockup ? inputOver : btnDisabled}
              ></SubmitButton>
            </Flex>
            {capacityIsZero && (
              <Flex
                fontSize={11}
                textAlign="center"
                w={"100%"}
                mt={"21px"}
                mb={"24px"}
                flexDir={"column"}
                // color={colorMode === "dark" ? "white.200" : "gray.700"}
                color={"#e23738"}
                px={bp700px ? "20px" : 0}
              >
                <Text>
                  Currently, it is cheaper to purchase TOS from Uniswap V3 (
                  <Link
                    isExternal={true}
                    textDecoration={"underline"}
                    href={
                      "https://app.uniswap.org/#/swap?inputCurrency=0xc4A11aaf6ea915Ed7Ac194161d2fC9384F15bff2&outputCurrency=0x409c4D8cd5d2924b9bc5509230d16a61289c8153"
                    }
                    color={"white.200"}
                  >
                    WTON
                  </Link>
                  ,{" "}
                  <Link
                    isExternal={true}
                    textDecoration={"underline"}
                    href={
                      "https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x409c4D8cd5d2924b9bc5509230d16a61289c8153"
                    }
                    color={"white.200"}
                  >
                    ETH
                  </Link>
                  )
                </Text>
                <Text>
                  and{" "}
                  <Link
                    isExternal={true}
                    href={"https://tosv2.tokamak.network/stake"}
                    color={"white.200"}
                    textDecoration={"underline"}
                  >
                    stake
                  </Link>{" "}
                  them for LTOS. You can continue bonding,
                </Text>
                <Text>
                  if you would like to purchase LTOS without impacting the
                  price.
                </Text>
              </Flex>
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
      <BondConfirm
        isOpenConfirm={isOpenConfirm}
        setIsOpenConfirm={setIsOpenConfirm}
        callBond={callBond}
      ></BondConfirm>
    </Modal>
  );
}

export default BondModal;
