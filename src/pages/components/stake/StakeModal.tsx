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
import { stake_stakeModal_defaultValue } from "atom/stake/input";
import StakeModal_Input from "./modal/components/StakeModal_Input";
import StakeModal_Period from "./modal/components/StakeModal_Period";
import { UserGuide } from "../common/guide/UserGuide";

function StakeModal() {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { selectedModalData, selectedModal, closeModal, isModalLoading } =
    useModal<StakeCardProps>();
  const { inputValue, setValue, setResetValue } = useInput(
    "Stake_screen",
    "stake_modal"
  );
  const fiveDaysLockup = inputValue.stake_modal_fivedaysLockup;

  const { StakingV2Proxy_CONTRACT, TOS_CONTRACT } = useCallContract();
  const { StakingV2Proxy } = CONTRACT_ADDRESS;
  const { userTOSBalance, userTokenBalance } = useUserBalance();
  const { stakeList, tosAllowance } = useUser();

  const [isAllowance, setIsAllowance] = useState<boolean>(false);
  const [isApproving, setIsApproving] = useState<boolean>(false);

  const [smallerThan1024] = useMediaQuery("(max-width: 1024px)");

  const { bp700px } = useMediaView();

  const { newBalanceStos } = useStosStake(
    "Stake_screen",
    "stake_modal",
    "stake_modal_balance",
    "stake_modal_period"
  );
  const { ltosIndex } = useLtosIndex();
  const rebaseTime = useRebaseTime(":");
  const [stosLoading, setStosLoading] = useRecoilState(stosLoadingState);

  const { newEndTime, leftDays, leftWeeks, leftHourAndMin } = useStosReward(
    Number(inputValue.stake_modal_balance),
    inputValue.stake_modal_period ?? 0
  );
  const {
    inputOver,
    inputPeriodOver,
    btnDisabled,
    zeroInputBalance,
    inputBalanceIsEmpty,
    inputPeriodIsEmpty,
  } = useStakeModalCondition();

  const { setTx } = useCustomToast();

  const { errMsg, stakeModalMaxWeeks } = constant;

  const closeThisModal = useCallback(() => {
    setResetValue();
    closeModal();
  }, [closeModal]);

  const callStake = useCallback(async () => {
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
    if (tosAllowance !== undefined) {
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
      return setValue({
        ...inputValue,
        stake_modal_fivedaysLockup: true,
      });
    }
    return setValue({
      ...inputValue,
      stake_modal_fivedaysLockup: false,
    });
  }, [selectedModalData]);

  return (
    <Modal
      isOpen={selectedModal === "stake_stake_modal"}
      isCentered
      onClose={closeThisModal}
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
              <Flex w={"100%"} justifyContent={"center"} mb={"33px"}>
                <Flex flexDir={"column"}>
                  <Text
                    color={colorMode === "light" ? "gray.800" : "white.200"}
                    fontSize={20}
                    fontWeight={600}
                    textAlign={"center"}
                    mb={"6px"}
                  >
                    Stake
                  </Text>
                  <UserGuide />
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
                px={bp700px ? "20px" : ""}
                flexDir={"column"}
                justifyContent={"center"}
              >
                <Flex
                  w={"100%"}
                  justifyContent={"center"}
                  mb={bp700px ? "15px" : "9px"}
                  flexDir={bp700px ? "column" : "row"}
                  alignItems={"center"}
                  columnGap={"75px"}
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
                <Flex flexDir={"column"} rowGap={"24px"}>
                  <StakeModal_Input
                    defaultValue={undefined}
                    maxValue={userTokenBalance?.TOS?.balanceWei}
                    tokenBalance={userTokenBalance?.TOS?.balanceCommified}
                    inputTokenType={"TOS"}
                    pageKey={"Stake_screen"}
                    recoilKey={"stake_modal"}
                    atomKey={"stake_modal_balance"}
                    err={{
                      zeroInputBalance,
                      inputOver,
                      inputBalanceIsEmpty,
                    }}
                  />
                  <StakeModal_Period
                    pageKey={"Stake_screen"}
                    recoilKey={"stake_modal"}
                    atomKey={"stake_modal_period"}
                    periodKey={"stake_modal_period"}
                    inputPeriodOver={inputPeriodOver}
                    inputPeriodIsEmpty={inputPeriodIsEmpty}
                    endTimeInfo={{ leftDays, leftHourAndMin, newEndTime }}
                    hasFivedaysLockup={true}
                  />
                </Flex>
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
