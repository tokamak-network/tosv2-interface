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
import { useRecoilState, useRecoilValue } from "recoil";
import {
  modalBottomLoadingState,
  selectedModalData,
  selectedModalState,
  stosLoadingState,
} from "atom//global/modal";
import useModal from "hooks/useModal";
import Image from "next/image";
import CLOSE_ICON from "assets/icons/close-modal.svg";
import CustomCheckBox from "common/input/CustomCheckBox";
import SubmitButton from "common/button/SubmitButton";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
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
import useStakeV2 from "hooks/contract/useStakeV2";
import CONTRACT_ADDRESS from "services/addresses/contract";
import { BigNumber } from "ethers";
import useUser from "hooks/useUser";
import Tile from "../common/modal/Tile";
import useStakeId from "hooks/contract/useStakeId";
import useInput from "hooks/useInput";
import useUpdateModalData from "hooks/stake/useUpdateModalData";
import useStosReward from "hooks/stake/useStosReward";
import StakeGraph from "../common/modal/StakeGraph";
import ArrowImg from "assets/icons/arrow-right2.svg";
import BasicTooltip from "common/tooltip/index";
import useCustomToast from "hooks/useCustomToast";
import useUpdateModalConditon from "hooks/stake/useUpdateModalCondition";
import constant from "constant";
import InputPeriod from "common/input/InputPeriod";
import GradientSpinner from "../common/GradientSpinner";
import useModalContract from "hooks/contract/useModalContract";
import Notice from "../global/Notice";
import ManageModal_BottomContent from "./modal/ManageModal_BottomContent";

function UpdateModal() {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { selectedModal, closeModal, isModalLoading } = useModal<{
    ltosAmount: string | undefined;
  }>();
  const { bondModalData } = useBondModal();
  const { stakeV2 } = useStakeV2();
  const { inputValue, setResetValue, setValue } = useInput(
    "Stake_screen",
    "update_modal"
  );
  const { StakingV2Proxy_CONTRACT, TOS_CONTRACT } = useCallContract();
  const { StakingV2Proxy } = CONTRACT_ADDRESS;
  const { userTOSBalance } = useUserBalance();
  const { tosAllowance } = useUser();
  const [isAllowance, setIsAllowance] = useState<boolean>(false);
  const [btnDisable, setBtnDisable] = useState<boolean>(false);
  const [isApproving, setIsApproving] = useState<boolean>(false);

  const [newBalanceType, setNewBalanceType] = useState<1 | 2 | 3 | undefined>(
    undefined
  );
  const { stakeId } = useStakeId();
  const { newEndTime, leftWeeks, leftDays, leftTime } = useUpdateModalData();

  const [smallerThan1024] = useMediaQuery("(max-width: 1024px)");
  const { setTx } = useCustomToast();
  const {
    inputOver,
    inputPeriodOver,
    btnDisabled,
    zeroInputBalance,
    bothConditionsErr,
  } = useUpdateModalConditon(leftWeeks);
  const { errMsg } = constant;

  const [bottomLoading, setBottomLoading] = useRecoilState(
    modalBottomLoadingState
  );
  const [stosLoading, setStosLoading] = useRecoilState(stosLoadingState);

  const callApprove = useCallback(async () => {
    try {
      if (TOS_CONTRACT) {
        const totalSupply = await TOS_CONTRACT.totalSupply();
        const tx = await TOS_CONTRACT.approve(StakingV2Proxy, totalSupply);

        setTx(tx);

        if (tx) {
          await tx.wait();
          setIsApproving(false);
        }
      }
    } catch (e) {
      setIsApproving(false);
    }
  }, [TOS_CONTRACT, StakingV2Proxy, setTx]);

  const closeThisModal = useCallback(() => {
    setResetValue();
    closeModal();
  }, [setResetValue, closeModal]);

  const callUpdate = useCallback(async () => {
    //Mainnet_maxPeriod = 3years
    //Rinkeby_maxPeriod = 39312
    if (StakingV2Proxy_CONTRACT && stakeId && leftWeeks >= 0) {
      //before endTime
      //increaseBeforeEndOrNonEnd(uint256 _stakeId, uint256 _amount uint256, uint256 _unlockWeeks)
      console.log(`StakingV2Proxy_CONTRACT[
        "increaseBeforeEndOrNonEnd(uint256,uint256,uint256)"
      ]`);
      console.log(
        stakeId,
        convertToWei(inputValue.stake_updateModal_tos_balance),
        inputValue.stake_updateModal_period - leftWeeks
      );

      const tx = await StakingV2Proxy_CONTRACT[
        "increaseBeforeEndOrNonEnd(uint256,uint256,uint256)"
      ](
        stakeId,
        convertToWei(inputValue.stake_updateModal_tos_balance),
        inputValue.stake_updateModal_period - leftWeeks
      );
      setTx(tx);
      return closeThisModal();
    }
  }, [
    inputValue.stake_updateModal_tos_balance,
    inputValue.stake_updateModal_period,
    StakingV2Proxy_CONTRACT,
    stakeId,
    leftWeeks,
    closeThisModal,
    setTx,
  ]);

  useEffect(() => {
    if (newBalanceType === 2) {
      return setIsAllowance(true);
    }

    if (tosAllowance) {
      if (tosAllowance === 0) {
        return setIsAllowance(false);
      }
      if (tosAllowance >= Number(inputValue.stake_updateModal_tos_balance)) {
        return setIsAllowance(true);
      }
      return setIsAllowance(false);
    }
  }, [tosAllowance, inputValue.stake_updateModal_tos_balance, newBalanceType]);

  useEffect(() => {
    if (
      inputValue.stake_updateModal_tos_balance !== undefined &&
      inputValue.stake_updateModal_period !== undefined &&
      leftWeeks !== undefined
    ) {
      //https://github.com/Onther-Tech/tosv2-contracts/blob/3f4c3bdb4f4bf3a39adc23e43585456ed98562d5/test/phase1.test.js#L2579-L2599
      //case1
      if (
        Number(inputValue.stake_updateModal_tos_balance) > 0 &&
        inputValue.stake_updateModal_period <= leftWeeks
      ) {
        return setNewBalanceType(1);
      }
      //case2
      if (
        Number(inputValue.stake_updateModal_tos_balance) === 0 &&
        inputValue.stake_updateModal_period > leftWeeks
      ) {
        return setNewBalanceType(2);
      }
      //case3
      return setNewBalanceType(3);
    }
    return setNewBalanceType(undefined);
  }, [inputValue, leftWeeks]);

  useEffect(() => {
    if (userTOSBalance) {
      const tosBalance = userTOSBalance
        ?.replaceAll(",", "")
        .replaceAll(" ", "");
      setValue({
        ...inputValue,
        stake_updateModal_tos_balance: tosBalance,
      });
    }
  }, [userTOSBalance, setValue]);

  useEffect(() => {
    setStosLoading(true);
  }, [inputValue, setStosLoading]);

  useEffect(() => {
    setBottomLoading(true);
  }, [inputValue.stake_modal_balance, setBottomLoading]);

  return (
    <Modal
      isOpen={selectedModal === "stake_update_modal"}
      isCentered
      onClose={closeThisModal}
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
              <Flex w={"100%"} justifyContent={"center"} mb={"33px"}>
                <Flex flexDir={"column"} alignItems={"center"}>
                  <Text
                    color={colorMode === "light" ? "gray.800" : "white.200"}
                    fontSize={20}
                    fontWeight={600}
                  >
                    Manage
                  </Text>
                  <Text
                    height={"21px"}
                    color={"red.100"}
                    fontSize={15}
                    mb={"6px"}
                  >
                    Locked
                  </Text>
                  <Text height={"17px"} fontSize={12} color={"gray.100"}>
                    Increase LTOS & sTOS
                  </Text>
                </Flex>
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
                px={smallerThan1024 ? "20px" : "120px"}
                flexDir={"column"}
                mb={"29px"}
              >
                <Text
                  color={colorMode === "light" ? "gray.800" : "white.200"}
                  fontSize={12}
                  mb={"10px"}
                >
                  Lock additional TOS
                </Text>
                <Flex mb={"9px"}>
                  <BalanceInput
                    w={"100%"}
                    h={45}
                    placeHolder={"Enter an amount of TOS"}
                    pageKey={"Stake_screen"}
                    recoilKey={"update_modal"}
                    atomKey={"stake_updateModal_tos_balance"}
                    maxValue={Number(
                      userTOSBalance?.replaceAll(",", "").replaceAll(" ", "")
                    )}
                    isError={
                      bothConditionsErr ||
                      inputValue?.stake_updateModal_tos_balance === undefined ||
                      inputValue?.stake_updateModal_tos_balance?.length === 0 ||
                      (btnDisable === true && zeroInputBalance) ||
                      inputOver
                    }
                    errorMsg={
                      bothConditionsErr
                        ? undefined
                        : zeroInputBalance
                        ? errMsg.zeroInput
                        : errMsg.balanceExceed
                    }
                    rightUnit={"TOS"}
                  ></BalanceInput>
                </Flex>
                <Flex
                  fontSize={12}
                  color={colorMode === "dark" ? "#8b8b93" : "gray.1000"}
                  h={"17px"}
                  justifyContent={"space-between"}
                  mb={"12px"}
                  px={"6px"}
                >
                  <Text>Your Balance</Text>
                  <Text>{userTOSBalance || "-"} TOS</Text>
                </Flex>
                <Text
                  color={colorMode === "light" ? "gray.800" : "white.200"}
                  fontSize={12}
                  mb={"10px"}
                >
                  New Lock-Up Period
                </Text>
                <Flex
                  fontSize={12}
                  alignItems={smallerThan1024 ? "" : "center"}
                  flexDir={smallerThan1024 ? "column" : "row"}
                >
                  <Flex
                    w={smallerThan1024 ? "100%" : ""}
                    justifyContent={smallerThan1024 ? "space-between" : ""}
                  >
                    <Flex
                      w={"204px"}
                      h={"39px"}
                      border={"1px solid #313442"}
                      borderRadius={8}
                      alignItems={"center"}
                      pl={"15px"}
                      fontSize={14}
                      color={"#64646f"}
                    >
                      <Text>
                        {leftWeeks} {leftWeeks < 2 ? "Week" : "Weeks"}
                      </Text>
                      <Text fontSize={12} ml={"9px"} mr={"3px"}>
                        {leftDays} Days {leftTime}
                      </Text>
                      <BasicTooltip
                        label={
                          "This is the current Lock-Up period. The new Lock-Up period has to be equal or greater than this."
                        }
                      />
                    </Flex>
                    <Flex mx={"14px"}>
                      <Image src={ArrowImg} alt={"ArrowImg"}></Image>
                    </Flex>
                    <InputPeriod
                      w={"220px"}
                      h={"39px"}
                      atomKey={"stake_updateModal_period"}
                      // placeHolder={"1 Weeks"}
                      pageKey={"Stake_screen"}
                      recoilKey={"update_modal"}
                      // style={{ marginLeft: "auto" }}
                      maxValue={constant.modalMaxWeeks}
                      isError={bothConditionsErr || inputPeriodOver}
                      isDisabled={leftWeeks === constant.modalMaxWeeks}
                      isDisabledText={constant.modalMaxWeeks}
                      errorMsg={
                        bothConditionsErr
                          ? undefined
                          : Number(inputValue.stake_updateModal_period) > 155
                          ? errMsg.periodExceedThanMaximum
                          : errMsg.managePeriodExceed
                      }
                      minValue={leftWeeks}
                      leftDays={leftDays}
                      leftTime={leftTime}
                      endTime={
                        bothConditionsErr ||
                        Number(inputValue.stake_updateModal_period) <
                          leftWeeks ||
                        inputValue?.stake_updateModal_period?.length === 0 ||
                        Number(inputValue.stake_updateModal_period) > 155
                          ? undefined
                          : newEndTime
                      }
                      isManageModal={true}
                    ></InputPeriod>
                  </Flex>
                </Flex>
              </Flex>
              <Flex px={smallerThan1024 ? "30px" : "43px"} mb={"30px"}>
                <StakeGraph
                  pageKey={"Stake_screen"}
                  subKey={"update_modal"}
                  periodKey={"stake_updateModal_period"}
                  balanceKey={"stake_updateModal_tos_balance"}
                  isSlideDisabled={false}
                  minValue={leftWeeks}
                ></StakeGraph>
              </Flex>
              {/* Content Bottom */}
              <ManageModal_BottomContent />
            </Flex>
            <Flex justifyContent={"center"} mb={"21px"}>
              {isAllowance ? (
                <SubmitButton
                  w={smallerThan1024 ? 310 : 460}
                  h={42}
                  name="Update"
                  isDisabled={btnDisabled || isModalLoading}
                  onClick={callUpdate}
                ></SubmitButton>
              ) : (
                <SubmitButton
                  w={smallerThan1024 ? 310 : 460}
                  h={42}
                  isDisabled={
                    bothConditionsErr === true ||
                    inputOver ||
                    Number(userTOSBalance?.replaceAll(",", "")) < 0 ||
                    inputValue.stake_updateModal_tos_balance === undefined ||
                    inputValue.stake_updateModal_tos_balance.length === 0 ||
                    inputPeriodOver ||
                    isModalLoading
                  }
                  name="Approve"
                  isLoading={isApproving}
                  onClick={callApprove}
                ></SubmitButton>
              )}
            </Flex>
            {!isAllowance && (
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
                  Please approve your TOS to use this service
                </Text>
              </Flex>
            )}
            {bothConditionsErr && (
              <Flex fontSize={11} textAlign="center" w={"100%"} mb={"24px"}>
                <Text w={"100%"} color={"red.100"} fontWeight={"bold"}>
                  You have to lock additional TOS or/and increase the lock-up
                  period by at least 1 week.
                </Text>
              </Flex>
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
      {/* <Notice></Notice> */}
    </Modal>
  );
}

export default UpdateModal;
