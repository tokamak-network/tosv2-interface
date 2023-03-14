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
import question from "assets/icons/question.svg";
import USER_GUIDE from "assets/icons/bond/sicon-user_guide.svg";

import CustomCheckBox from "common/input/CustomCheckBox";
import SubmitButton from "common/button/SubmitButton";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TextInput, BalanceInput } from "common/input/TextInput";
import TokenSymbol from "common/token/TokenSymol";
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
import BondModal_Input from "./modal/BondModal_Input";
import BondModal_Period from "./modal/BondModal_Period";
import { bond_modal, bond_modal_state_defaultValue } from "atom/bond/modal";
import { isProduction } from "constants/production";

function BondModal() {
  const theme = useTheme();
  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);

  const { colorMode } = useColorMode();
  const { inputValue, setValue, setResetValue } = useInput(
    "Bond_screen",
    "bond_modal"
  );
  const { selectedModalData, selectedModal, closeModal } =
    useModal<BondCardProps>();
  const { BondDepositoryProxy_CONTRACT } = useCallContract();
  const bondModalRecoilValue = useRecoilValue(bond_modal);
  const { fiveDaysLockup, fiveDaysLockupEndTime } = bondModalRecoilValue;
  const [bondModalRecoilState, setBondModalRecoilState] =
    useRecoilState(bond_modal);

  const marketId = selectedModalData?.index;

  const { bp700px } = useMediaView();

  const {
    youWillGet,
    endTime,
    stosReward,
    originalTosAmount,
    minimumTosPrice,
    isMinusDiscount,
    maxCapacityValue,
  } = useBondModalInputData();

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

  const { inputOver, inputPeriodOver, btnDisabled, zeroInputBalance } =
    useBondModalCondition(maxCapacityValue);
  const { errMsg } = constant;

  const closeThisModal = useCallback(() => {
    setResetValue();
    setBondModalRecoilState(bond_modal_state_defaultValue);
    closeModal();
  }, [closeModal, setResetValue, setBondModalRecoilState]);

  const callBond = useCallback(async () => {
    try {
      if (
        BondDepositoryProxy_CONTRACT &&
        inputValue.bond_modal_balance &&
        minimumTosPrice
      ) {
        const inputAmount = inputValue.bond_modal_balance;
        const periodWeeks = inputValue.bond_modal_period + 1;

        if (!fiveDaysLockup && inputValue.bond_modal_period) {
          console.log("---ETHDepositWithSTOS()---");
          console.log(`marketId : ${marketId}`);
          console.log(`inputAmount : ${convertToWei(inputAmount)}`);
          console.log(`minimumTosPrice : ${minimumTosPrice.toString()}`);
          console.log(`periodWeeks : ${periodWeeks}`);
          console.log(`value : ${convertToWei(inputAmount)}`);

          const gasEstimate =
            await BondDepositoryProxy_CONTRACT.estimateGas.ETHDepositWithSTOS(
              marketId,
              convertToWei(inputAmount),
              minimumTosPrice,
              periodWeeks,
              { value: convertToWei(inputAmount) }
            );

          console.log("gasEstimate");
          console.log(gasEstimate.toString());

          const tx = await BondDepositoryProxy_CONTRACT.ETHDepositWithSTOS(
            marketId,
            convertToWei(inputAmount),
            minimumTosPrice,
            periodWeeks,
            { value: convertToWei(inputAmount) }
          );
          setTx(tx);
          return closeThisModal();
        }

        console.log("---ETHDeposit()---");
        console.log(`marketId : ${marketId}`);
        console.log(`inputAmount : ${convertToWei(inputAmount)}`);
        console.log(`minimumTosPrice : ${minimumTosPrice.toString()}`);
        console.log(`value : ${convertToWei(inputAmount)}`);
        const gasEstimate =
          await BondDepositoryProxy_CONTRACT.estimateGas.ETHDeposit(
            marketId,
            convertToWei(inputAmount),
            minimumTosPrice,
            { value: convertToWei(inputAmount) }
          );

        console.log("gasEstimate");
        console.log(gasEstimate.toString());

        const tx = await BondDepositoryProxy_CONTRACT.ETHDeposit(
          marketId,
          convertToWei(inputAmount),
          minimumTosPrice,
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
    minimumTosPrice,
  ]);

  // useEffect(() => {
  //   setStosLoading(true);
  // }, [inputValue, setBottomLoading, setStosLoading]);

  // useEffect(() => {
  //   setBottomLoading(true);
  // }, [inputValue.bond_modal_balance, setBottomLoading]);

  return (
    <Modal
      isOpen={selectedModal === "bond_bond_modal"}
      isCentered
      onClose={() => closeThisModal()}
    >
      <ModalOverlay className="modalOverlayDrawer" bg={"none"} />
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
              <Flex
                w={"100%"}
                flexDir={"column"}
                mb={"34px"}
                h={"28px"}
                alignItems={"center"}
                rowGap={"6px"}
              >
                {/* <TokenSymbol
                  tokenType={"ETH"}
                  h={"30px"}
                  w={"30px"}
                ></TokenSymbol> */}
                <Flex>
                  <Text
                    color={colorMode === "light" ? "gray.800" : "white.200"}
                    fontSize={20}
                    fontWeight={600}
                  >
                    ETH Bond {selectedModalData?.version}
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
                <Flex
                  columnGap={"6px"}
                  pl={"4px"}
                  cursor={"pointer"}
                  onClick={() => {}}
                >
                  <Image src={USER_GUIDE} alt={"USER_GUIDE"}></Image>
                  <Text fontSize={13} color={"gray.100"}>
                    Bond User Guide
                  </Text>
                </Flex>
              </Flex>
              {/* Content Area*/}
              <Flex
                w={"100%"}
                flexDir={"column"}
                px={bp700px ? "20px" : "50px"}
                mb={"29px"}
              >
                {/* Period input */}
                <BondModal_Period />
                {/* ETH input */}
                <BondModal_Input />
                {/* end of content middle area */}
              </Flex>

              {/* Content Bottom */}
              <BondModal_BottomContent
                fiveDaysLockup={fiveDaysLockup}
                fiveDaysLockupEndTime={fiveDaysLockupEndTime}
              />
            </Flex>
            <Flex justifyContent={"center"}>
              <SubmitButton
                w={bp700px ? 310 : 460}
                h={42}
                name="Bond"
                onClick={() =>
                  isMinusDiscount ? setIsOpenConfirm(true) : callBond()
                }
                isDisabled={fiveDaysLockup ? inputOver : btnDisabled}
              ></SubmitButton>
            </Flex>
            {!isMinusDiscount && (
              <Flex
                fontSize={11}
                textAlign="center"
                w={"100%"}
                mt={"21px"}
                mb={"24px"}
                flexDir={"column"}
                // color={colorMode === "dark" ? "white.200" : "gray.700"}
                color={"#8b8b93"}
                px={bp700px ? "20px" : 0}
              >
                <Flex alignItems={"center"} justifyContent={"center"}>
                  <Text color={"#e23738"} mr={"2px"}>
                    *
                  </Text>
                  <Text>
                    The amount may change slightly based on the slippage
                    (0.034%).
                  </Text>
                </Flex>
                <Text>If the price slips any further, txn will revert.</Text>
              </Flex>
            )}
            {isMinusDiscount && (
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
                      isProduction()
                        ? "https://app.uniswap.org/#/swap?inputCurrency=0xc4A11aaf6ea915Ed7Ac194161d2fC9384F15bff2&outputCurrency=0x409c4D8cd5d2924b9bc5509230d16a61289c8153"
                        : "https://app.uniswap.org/#/swap?inputCurrency=0xe86fCf5213C785AcF9a8BFfEeDEfA9a2199f7Da6&outputCurrency=0x67F3bE272b1913602B191B3A68F7C238A2D81Bb9"
                    }
                    color={colorMode === "dark" ? "white.200" : "gray.800"}
                  >
                    WTON
                  </Link>
                  ,{" "}
                  <Link
                    isExternal={true}
                    textDecoration={"underline"}
                    href={
                      isProduction()
                        ? "https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x409c4D8cd5d2924b9bc5509230d16a61289c8153"
                        : "https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x67F3bE272b1913602B191B3A68F7C238A2D81Bb9"
                    }
                    color={colorMode === "dark" ? "white.200" : "gray.800"}
                  >
                    ETH
                  </Link>
                  )
                </Text>
                <Text>
                  and{" "}
                  <Link
                    isExternal={true}
                    href={
                      isProduction()
                        ? "https://tosv2.tokamak.network/stake"
                        : "https://goerli.tosv2.tokamak.network/stake"
                    }
                    color={colorMode === "dark" ? "white.200" : "gray.800"}
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
