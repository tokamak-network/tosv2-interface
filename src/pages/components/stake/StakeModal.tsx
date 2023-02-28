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
  Tooltip,
  useMediaQuery,
  Grid,
} from "@chakra-ui/react";
// import { CloseIcon } from "@chakra-ui/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  modalBottomLoadingState,
  modalBottomLoadingValue,
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
import { BondCardProps } from "types/bond";
import { convertToWei } from "@/utils/number";
import { useWeb3React } from "@web3-react/core";
import useUserBalance from "hooks/useUserBalance";
import useStakeV2 from "hooks/contract/useStakeV2";
import CONTRACT_ADDRESS from "services/addresses/contract";
import { BigNumber } from "ethers";
import useUser from "hooks/useUser";
import Tile from "../common/modal/Tile";
import useInput from "hooks/useInput";
import useStakeModaldata from "hooks/stake/useStakeModalData";
import useStosReward from "hooks/stake/useStosReward";
import StakeGraph from "../common/modal/StakeGraph";
import BasicTooltip from "common/tooltip/index";
import useCustomToast from "hooks/useCustomToast";
import { StakeCardProps } from "types/stake";
import useRebaseTime from "hooks/useRebaseTime";
import useLtosIndex from "hooks/gql/useLtosIndex";
import useStakeModalCondition from "hooks/stake/useStakeModalCondition";
import constant from "constant";
import BottomContent from "../common/modal/BottomContent";
import EndTime from "../common/modal/EndTime";
import InputPeriod from "common/input/InputPeriod";
import useStosStake from "hooks/stake/useStosStake";
import commafy from "@/utils/commafy";
import { MobileView } from "react-device-detect";
import StakeModal_BottomContent from "./modal/StakeModal_BottomContent";
import useMediaView from "hooks/useMediaView";

function StakeModal() {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { selectedModalData, selectedModal, closeModal, isModalLoading } =
    useModal<StakeCardProps>();
    const { openModal: openSwapModal } = useModal("swap_interface_modal");

  const { bondModalData } = useBondModal();
  const { inputValue, setValue, setResetValue } = useInput(
    "Stake_screen",
    "stake_modal"
  );
  const {
    ltos,
    currentBalance,
    newBalance,
    currentTosValue,
    newBalanceTosValue,
  } = useStakeModaldata();
  const { StakingV2Proxy_CONTRACT, TOS_CONTRACT } = useCallContract();
  const { StakingV2Proxy } = CONTRACT_ADDRESS;
  const { userTOSBalance } = useUserBalance();
  const { stakeList, tosAllowance } = useUser();

  const [fiveDaysLockup, setFiveDaysLockup] = useState<boolean>(false);
  const [isAllowance, setIsAllowance] = useState<boolean>(false);
  const [isApproving, setIsApproving] = useState<boolean>(false);

  const [smallerThan1024] = useMediaQuery("(max-width: 1024px)");

  const { bp700px } = useMediaView();

  const { newEndTime, leftDays, leftWeeks, leftHourAndMin } = useStosReward(
    Number(inputValue.stake_modal_balance),
    inputValue.stake_modal_period
  );
  const { newBalanceStos } = useStosStake();
  const { ltosIndex } = useLtosIndex();
  const rebaseTime = useRebaseTime(":");
  const [bottomLoading, setBottomLoading] = useRecoilState(
    modalBottomLoadingState
  );
  const [stosLoading, setStosLoading] = useRecoilState(stosLoadingState);

  const { setTx } = useCustomToast();
  const { inputOver, inputPeriodOver, btnDisabled, zeroInputBalance } =
    useStakeModalCondition();
  const { errMsg, modalMaxWeeks } = constant;

  const contentList = fiveDaysLockup
    ? [
        {
          title: "You Give",
          content: `${inputValue.stake_modal_balance || "-"} TOS`,
          tooltip: false,
          tooltipMessage: "",
        },
        {
          title: "You Will Get",
          content: bottomLoading ? "..." : `${ltos} LTOS`,
          tooltip: true,
          tooltipMessage:
            "You get LTOS based on what you give and sTOS is also based on the lock-up period.",
          secondTooltip: `${inputValue.stake_modal_balance} TOS. As LTOS index increases, the number of TOS you can get from unstaking LTOS will also increase.`,
          thirdTooltip:
            "sTOS’s lock-up period is calculated relative to Thursday 00:00 (UTC+0).",
        },
        {
          title: "Current Balance",
          content: `${currentBalance || "-"} LTOS`,
          tooltip: true,
          tooltipMessage: "Current LTOS balance without Lock-Up period",
          secondTooltip: `${currentTosValue} TOS. As LTOS index increases, the number of TOS you can get from unstaking LTOS will also increase.`,
        },
        {
          title: "New Balance",
          content: `${newBalance || "-"} LTOS`,
          tooltip: true,
          tooltipMessage:
            "New LTOS balance without Lock-Up period after staking. ",
          secondTooltip: `${newBalanceTosValue} TOS. As LTOS index increases, the number of TOS you can get from unstaking LTOS will also increase.`,
        },
      ]
    : [
        {
          title: "You Give",
          content: `${inputValue.stake_modal_balance || "-"} TOS`,
          tooltip: false,
          tooltipMessage: "",
        },
        {
          title: "You Will Get",
          content: {
            ltos: bottomLoading ? "..." : ltos,
            stos: stosLoading ? "..." : commafy(newBalanceStos),
          },
          tooltip: true,
          tooltipMessage:
            "You get LTOS based on what you give and sTOS is also based on the lock-up period.",
          secondTooltip: `${commafy(
            inputValue.stake_modal_balance
          )} TOS. As LTOS index increases, the number of TOS you can get from unstaking LTOS will also increase.`,
          thirdTooltip:
            "sTOS’s lock-up period is calculated relative to Thursday 00:00 (UTC+0).",
        },
        {
          title: "End Time",
          content: `${newEndTime || "-"}`,
          tooltip: true,
          tooltipMessage: "LTOS can be unstaked after this time. ",
        },
      ];

  const closeThisModal = useCallback(() => {
    setResetValue();
    setFiveDaysLockup(false);
    closeModal();
  }, [setResetValue, closeModal]);

  const callStake = useCallback(async () => {
    //Mainnet_maxPeriod = 3years
    //Rinkeby_maxPeriod = 39312
    if (StakingV2Proxy_CONTRACT) {
      if (fiveDaysLockup) {
        console.log("---stake()---");
        console.log(inputValue.stake_modal_balance);

        const tx = await StakingV2Proxy_CONTRACT.stake(
          convertToWei(inputValue.stake_modal_balance)
        );
        setTx(tx);
        return closeThisModal();
      }
      const periodWeeks = inputValue.stake_modal_period + 1;
      console.log("---stakeGetStos()---");
      console.log(convertToWei(inputValue.stake_modal_balance), periodWeeks);

      const tx = await StakingV2Proxy_CONTRACT.stakeGetStos(
        convertToWei(inputValue.stake_modal_balance),
        periodWeeks
      );
      setTx(tx);
      return closeThisModal();
    }
  }, [
    inputValue.stake_modal_balance,
    inputValue.stake_modal_period,
    StakingV2Proxy_CONTRACT,
    fiveDaysLockup,
    closeThisModal,
    setTx,
  ]);

  const callApprove = useCallback(async () => {
    try {
      if (TOS_CONTRACT) {
        setIsApproving(true);
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

  useEffect(() => {
    if (tosAllowance) {
      if (tosAllowance === 0) {
        return setIsAllowance(false);
      }
      if (
        inputValue.stake_modal_balance?.length <= 0 ||
        inputValue.stake_modal_balance === undefined
      ) {
        return setIsAllowance(true);
      }
      if (tosAllowance >= Number(inputValue.stake_modal_balance)) {
        return setIsAllowance(true);
      }
      return setIsAllowance(false);
    }
  }, [tosAllowance, inputValue.stake_modal_balance, isAllowance]);

  useEffect(() => {
    if (selectedModalData?.stakedType === "LTOS Staking") {
      return setFiveDaysLockup(true);
    }
    return setFiveDaysLockup(false);
  }, [selectedModalData]);

  useEffect(() => {
    if (userTOSBalance) {
      setValue({
        ...inputValue,
        stake_modal_balance: String(userTOSBalance.replaceAll(",", "")),
      });
    }
  }, [userTOSBalance, setValue, selectedModal]);

  useEffect(() => {
    setStosLoading(true);
  }, [inputValue, setStosLoading]);

  useEffect(() => {
    setBottomLoading(true);
  }, [inputValue.stake_modal_balance, setBottomLoading]);

  return (
    <Modal
      isOpen={selectedModal === "stake_stake_modal"}
      isCentered
      onClose={closeThisModal}
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
                  onClick={() => closeThisModal()}
                >
                  <Image src={CLOSE_ICON} alt={"CLOSE_ICON"}></Image>
                </Flex>
              </Flex>
              {/* Content Area*/}
              <Flex
                w={"100%"}
                px={bp700px ? "20px" : "120px"}
                flexDir={"column"}
                mb={"29px"}
              >
                <Flex
                  w={"100%"}
                  justifyContent={bp700px ? "center" : "space-between"}
                  mb={bp700px ? "15px" : "9px"}
                  flexDir={bp700px ? "column" : "row"}
                  alignItems={"center"}
                >
                  <Tile
                    title={"Next Rebase"}
                    content={rebaseTime}
                    tooltip="Time left until LTOS index is increased."
                  />

                  <Tile
                    title={"LTOS Index"}
                    content={ltosIndex}
                    symbol={"TOS"}
                    tooltip="Number of TOS you get when you unstake 1 LTOS. LTOS index increases every 8 hours."
                  />
                </Flex>
                <Flex mb={"9px"} w={"100%"}>
                  <BalanceInput
                    w={"100%"}
                    h={45}
                    placeHolder={"Enter an amount of TOS"}
                    pageKey={"Stake_screen"}
                    recoilKey={"stake_modal"}
                    atomKey={"stake_modal_balance"}
                    maxValue={Number(userTOSBalance?.replaceAll(",", ""))}
                    isError={zeroInputBalance || inputOver}
                    errorMsg={
                      zeroInputBalance
                        ? errMsg.bondZeroInput
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
                  mb={bp700px ? "22px" : "12px"}
                  px="6px"
                >
                  <Text>Your Balance</Text>
                  <Flex>
                  <Text
                color={'blue.200'}
                  fontSize='12px'
                  onClick={openSwapModal}
                  _hover={{cursor:'pointer'}}
                  mr='5px'
                >
                  Buy More</Text>
                    <Text>{userTOSBalance || "-"} TOS</Text>
                  </Flex>
                </Flex>

                <Flex flexDir={"column"}>
                  <Flex
                    // templateColumns={
                    //   bp700px ? "repeat(2, 1fr)" : "repeat(3, 1fr)"
                    // }

                    flexDir={bp700px ? "column" : "row"}
                    fontSize={12}
                    alignItems="center"
                  >
                    <Flex
                      justifyContent={"space-between"}
                      w={bp700px ? "100%" : ""}
                      mb={bp700px ? "10px" : ""}
                    >
                      <Text
                        mr={"24px"}
                        color={colorMode === "light" ? "gray.800" : "white.200"}
                      >
                        Lock-Up Period
                      </Text>
                      <Flex alignSelf={"flex-end"}>
                        <CustomCheckBox
                          pageKey="Bond_screen"
                          value={""}
                          valueKey={"Bond_Modal"}
                          state={fiveDaysLockup}
                          setState={setFiveDaysLockup}
                        ></CustomCheckBox>
                        <Text ml={"9px"}>No Lock-Up</Text>
                      </Flex>
                    </Flex>
                    <InputPeriod
                      w={bp700px ? "310px" : "220px"}
                      h={"39px"}
                      pageKey={"Stake_screen"}
                      recoilKey={"stake_modal"}
                      atomKey={"stake_modal_period"}
                      placeHolder={"1 Weeks"}
                      style={{ marginLeft: "auto" }}
                      isDisabled={fiveDaysLockup}
                      maxValue={modalMaxWeeks}
                      isError={inputPeriodOver}
                      errorMsg={errMsg.stakePeriodExceed}
                      leftDays={fiveDaysLockup ? undefined : leftDays}
                      leftTime={fiveDaysLockup ? undefined : leftHourAndMin}
                      endTime={
                        fiveDaysLockup ||
                        inputPeriodOver ||
                        inputOver ||
                        zeroInputBalance
                          ? undefined
                          : newEndTime
                      }
                    ></InputPeriod>
                  </Flex>
                </Flex>
              </Flex>
              <Flex px={bp700px ? "30px" : "43px"} mb={"30px"}>
                <StakeGraph
                  pageKey={"Stake_screen"}
                  subKey={"stake_modal"}
                  periodKey={"stake_modal_period"}
                  isSlideDisabled={fiveDaysLockup}
                  minValue={0}
                ></StakeGraph>
              </Flex>
              {/* Content Bottom */}
              <StakeModal_BottomContent fiveDaysLockup={fiveDaysLockup} />
            </Flex>
            <Flex justifyContent={"center"} mb={"21px"}>
              {isAllowance ? (
                <SubmitButton
                  w={smallerThan1024 ? 310 : 460}
                  h={42}
                  name="Stake"
                  onClick={callStake}
                  isDisabled={
                    (fiveDaysLockup
                      ? zeroInputBalance || inputOver
                      : btnDisabled) || isModalLoading
                  }
                ></SubmitButton>
              ) : (
                <SubmitButton
                  w={smallerThan1024 ? 310 : 460}
                  h={42}
                  name="Approve"
                  onClick={callApprove}
                  isDisabled={zeroInputBalance || inputOver || isModalLoading}
                  isLoading={isApproving}
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
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default StakeModal;
