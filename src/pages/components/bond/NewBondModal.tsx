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
import { useRecoilState, useRecoilValue } from "recoil";
import useBondModalCondition from "hooks/bond/useBondModalCondition";
import constant from "constant";
import GradientSpinner from "../common/GradientSpinner";
import Tile from "../common/modal/Tile";
import BottomContent from "../common/modal/BottomContent";
import InputPeriod from "common/input/InputPeriod";
import useStosReward from "hooks/stake/useStosReward";
import BondModal_BottomContent from "./modal/BondModal_BottomContent";
import BondModal_TopContent from "./modal/BondModal_TopContent";

function NewBondModal() {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { inputValue, setValue, setResetValue } = useInput(
    "Bond_screen",
    "bond_modal"
  );
  const { selectedModalData, selectedModal, closeModal } =
    useModal<BondCardProps>();
  const marketId = selectedModalData?.index as number;

  const { bondModalData } = useBondModal();
  const { BondDepositoryProxy_CONTRACT } = useCallContract();
  const { userETHBalance } = useUserBalance();
  const [fiveDaysLockup, setFiveDaysLockup] = useState<boolean>(false);
  const fiveDaysLater = getTimeLeft(getNowTimeStamp(), 5, "YYYY. MM.DD. HH:mm");
  const [fiveDaysLockupEndTime, setFiveDaysLockupEndTime] =
    useState(fiveDaysLater);

  const [smallerThan1024] = useMediaQuery("(max-width: 1024px)");

  const { leftDays, leftWeeks, leftHourAndMin } = useStosReward(
    inputValue.bond_modal_balance,
    inputValue.bond_modal_period
  );

  const { setTx } = useCustomToast({
    confirmedMessage: "Bond purchase success! Go to",
    confirmedLink: "Stake_screen",
  });
  const { modalMaxWeeks: LOCKTOS_maxWeeks } = constant;

  const [bottomLoading, setBottomLoading] = useRecoilState(
    modalBottomLoadingState
  );
  const [stosLoading, setStosLoading] = useRecoilState(stosLoadingState);
  const [maxValue, setMaxValue] = useState<number | undefined>(undefined);
  const { inputOver, inputPeriodOver, btnDisabled, zeroInputBalance } =
    useBondModalCondition(maxValue);
  const { endTime } = useBondModalInputData(marketId);
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
      console.log(e);
      // return errToast();
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

  return (
    <Modal
      isOpen={selectedModal === "bond_newBond_modal"}
      isCentered
      onClose={() => closeThisModal()}
    >
      <ModalOverlay className="modalOverlay" />
      <ModalContent
        // fontFamily={theme.fonts.roboto}
        bg={colorMode === "light" ? "white.100" : "#121318"}
        minW={smallerThan1024 ? "350px" : "43.75em"}
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
                px={smallerThan1024 ? "20px" : "120px"}
                mb={"29px"}
              >
                <BondModal_TopContent />
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
                {smallerThan1024 ? (
                  <Flex flexDir={"column"} justifyContent="center" w="100%">
                    <Flex
                      justifyContent={"space-between"}
                      fontSize={12}
                      pr="6px"
                      mb="10px"
                      mt="22px"
                    >
                      {" "}
                      <Text
                        mr={"24px"}
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
                        <Text ml={"9px"} mr="6px">
                          5 Days Lock-Up
                        </Text>
                        <BasicTooltip label="No sTOS is given for 5 day lock-up option" />
                      </Flex>
                    </Flex>
                    <BalanceInput
                      w={"100%"}
                      h={"39px"}
                      pageKey={"Bond_screen"}
                      recoilKey={"bond_modal"}
                      atomKey={"bond_modal_period"}
                      placeHolder={"1 Weeks"}
                      style={{ marginLeft: "auto" }}
                      isDisabled={fiveDaysLockup}
                      rightUnit={"ETH"}
                    ></BalanceInput>
                  </Flex>
                ) : (
                  <Flex fontSize={12} alignItems="center" mt="10px">
                    <Text
                      mr={"6px"}
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
                    <Text ml={"6px"} mr="3px">
                      5 Days Lock-Up
                    </Text>
                    <BasicTooltip label="No sTOS is given for 5 day Lock-up option" />
                    <InputPeriod
                      w={"220px"}
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
                )}
              </Flex>
              <Flex px={smallerThan1024 ? "30px" : "43px"} mb={"30px"}>
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
            <Flex justifyContent={"center"} mb={"40px"}>
              <SubmitButton
                w={smallerThan1024 ? 310 : 460}
                h={42}
                name="Bond"
                onClick={callBond}
                isDisabled={fiveDaysLockup ? inputOver : btnDisabled}
              ></SubmitButton>
            </Flex>
            {/* <Flex
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
            </Flex> */}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default NewBondModal;
