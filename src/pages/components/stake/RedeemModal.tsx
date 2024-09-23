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

function RedeemModal() {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const {
    selectedModalData,
    selectedModal,
    closeModal,
    isModalLoading,
    modalSectionMtValue,
  } = useModal<StakeCardProps>();
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
  const { TOS_CONTRACT, TreasuryProxy_CONTRACT } = useCallContract();
  const { StakingV2Proxy } = CONTRACT_ADDRESS;
  const { userTOSBalance, userTOSBNBalance } = useUserBalance();
  const [fiveDaysLockup, setFiveDaysLockup] = useState<boolean>(false);
  const [isAllowance, setIsAllowance] = useState<boolean>(true);
  const [isApproving, setIsApproving] = useState<boolean>(false);

  const [smallerThan1024] = useMediaQuery("(max-width: 1024px)");

  const { bp700px } = useMediaView();

  const { newEndTime } = useStosReward(
    Number(inputValue.stake_modal_balance),
    inputValue.stake_modal_period
  );
  const { newBalanceStos } = useStosStake();
  const [bottomLoading, setBottomLoading] = useRecoilState(
    modalBottomLoadingState
  );
  const [stosLoading, setStosLoading] = useRecoilState(stosLoadingState);

  const { setTx } = useCustomToast();
  const { inputPeriodOver, btnDisabled, zeroInputBalance } =
    useStakeModalCondition();
  const { errMsg, modalMaxWeeks } = constant;

  const closeThisModal = useCallback(() => {
    setResetValue();
    setFiveDaysLockup(false);
    closeModal();
  }, [setResetValue, closeModal]);

  const callStake = useCallback(async () => {
    //Mainnet_maxPeriod = 3years
    //Rinkeby_maxPeriod = 39312
    if (TreasuryProxy_CONTRACT) {
      console.log("---claim()---");
      console.log(convertToWei(inputValue.stake_modal_balance));

      const tx = await TreasuryProxy_CONTRACT.claim(
        convertToWei(inputValue.stake_modal_balance)
      );
      setTx(tx);
      return closeThisModal();
    }
  }, [
    inputValue.stake_modal_balance,
    TreasuryProxy_CONTRACT,
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

  // useEffect(() => {
  //   if (tosAllowance) {
  //     if (tosAllowance === 0) {
  //       return setIsAllowance(false);
  //     }
  //     if (
  //       inputValue.stake_modal_balance?.length <= 0 ||
  //       inputValue.stake_modal_balance === undefined
  //     ) {
  //       return setIsAllowance(true);
  //     }
  //     if (tosAllowance >= Number(inputValue.stake_modal_balance)) {
  //       return setIsAllowance(true);
  //     }
  //     return setIsAllowance(false);
  //   }
  // }, [tosAllowance, inputValue.stake_modal_balance, isAllowance]);

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

  const inputOver = useMemo(() => {
    if (inputValue.stake_modal_balance && userTOSBNBalance) {
      return Number(inputValue.stake_modal_balance) > Number(userTOSBNBalance);
    }
  }, [inputValue.stake_modal_balance, userTOSBNBalance]);

  return (
    <Modal
      isOpen={selectedModal === "stake_redeem_modal"}
      isCentered
      onClose={closeThisModal}
    >
      <ModalOverlay className="modalOverlayDrawer" bg={"none"} />
      <ModalContent
        bg={colorMode === "light" ? "white.100" : "#121318"}
        minW={bp700px ? "350px" : "700px"}
        maxW={bp700px ? "350px" : "700px"}
        mt={modalSectionMtValue}
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
                  Redeem
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
                  justifyContent={"center"}
                  mb={bp700px ? "15px" : "9px"}
                  flexDir={bp700px ? "column" : "row"}
                  alignItems={"center"}
                >
                  <Tile
                    title={"Backing Per TOS"}
                    content={
                      <Flex w={"300px"} justifyContent={"center"}>
                        <Text fontSize={24}>
                          1 <span style={{ fontSize: 14 }}>TOS</span> =
                          0.0000731 <span style={{ fontSize: 14 }}>ETH</span>
                        </Text>
                      </Flex>
                    }
                    tooltip="Amount of treasury asset backed per 1 TOS in ETH"
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
                    maxValue={Number(userTOSBNBalance)}
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
                  <Text>{userTOSBNBalance || "-"} TOS</Text>
                </Flex>
              </Flex>
              {/* Content Bottom */}
              <StakeModal_BottomContent
                fiveDaysLockup={false}
                isRedeem={true}
              />
            </Flex>
            <Flex justifyContent={"center"} mb={"21px"}>
              {isAllowance ? (
                <SubmitButton
                  w={smallerThan1024 ? 310 : 460}
                  h={42}
                  name="Redeem"
                  onClick={callStake}
                  isDisabled={zeroInputBalance || inputOver}
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

export default RedeemModal;
