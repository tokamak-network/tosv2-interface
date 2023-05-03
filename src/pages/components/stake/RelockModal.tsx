import {
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  useColorMode,
  Box,
} from "@chakra-ui/react";
// import { CloseIcon } from "@chakra-ui/icons";
import useModal from "hooks/useModal";
import Image from "next/image";
import CLOSE_ICON from "assets/icons/close-modal.svg";
import SubmitButton from "common/button/SubmitButton";
import { useCallback, useEffect, useState } from "react";
import useCallContract from "hooks/useCallContract";
import { convertToWei } from "@/utils/number";
import CONTRACT_ADDRESS from "services/addresses/contract";
import useUser from "hooks/useUser";
import useInput from "hooks/useInput";
import useUpdateModalAfterEndTime from "hooks/stake/useUpdateModalAfterEndTime";
import useCustomToast from "hooks/useCustomToast";
import useRelockModalCondition from "hooks/stake/useRelockModalCondition";
import useStosReward from "hooks/stake/useStosReward";
import RelockModal_BottomContent from "./modal/RelockModal_BottomContent";
import useMediaView from "hooks/useMediaView";
import UserGuide from "../common/guide/UserGuide";
import Relock_Balance from "./modal/components/relock/Relock_Balance";
import StakeModal_Period from "./modal/components/StakeModal_Period";

function RelockModal() {
  const { colorMode } = useColorMode();
  const { closeModal } = useModal();
  const { selectedModalData, selectedModal, modalSectionMtValue } = useModal<{
    stakeId: string;
    ltosAmount: string;
    ltosWei: string;
  }>();
  const { inputValue, setResetValue } = useInput(
    "Stake_screen",
    "relock_modal"
  );

  const inputLtos = inputValue?.stake_relockModal_ltos_balance;
  const inputTos = inputValue?.stake_relockModal_tos_balance;
  const inputWeeks = inputValue?.stake_relockModal_period;
  const addTos: boolean = inputValue?.stake_relockModal_addTos ?? false;

  const { bp700px } = useMediaView();

  const { StakingV2Proxy_CONTRACT, TOS_CONTRACT } = useCallContract();
  const { StakingV2Proxy } = CONTRACT_ADDRESS;
  const { tosAllowance } = useUser();
  const [isAllowance, setIsAllowance] = useState<boolean>(false);
  const { newEndTime, inputTosAmount } = useUpdateModalAfterEndTime(addTos);
  const { leftDays, leftHourAndMin } = useStosReward(
    Number(inputTosAmount),
    inputWeeks ? Number(inputWeeks) : 0
  );

  const { setTx } = useCustomToast();

  const stakeId = selectedModalData?.stakeId;
  const ltowWei = selectedModalData?.ltosWei;

  const { inputPeriodOver, btnDisabled, inputPeriodIsEmpty } =
    useRelockModalCondition(Number(ltowWei));

  const closeThisModal = useCallback(() => {
    if (setResetValue) {
      setResetValue();
    }
    closeModal();
  }, [setResetValue, closeModal]);

  const callUpdate = useCallback(async () => {
    //Mainnet_maxPeriod = 3years
    //Rinkeby_maxPeriod = 39312
    if (
      StakingV2Proxy_CONTRACT &&
      stakeId &&
      inputWeeks &&
      String(inputWeeks)?.length > 0
    ) {
      const periodWeeks = inputWeeks + 1;
      if (addTos && inputTos && inputTos.length > 0) {
        console.log(
          "resetStakeGetStosAfterLock(uint256,uint256,uint256, uint256)"
        );
        console.log(stakeId, convertToWei(inputTos), ltowWei, periodWeeks);
        const tx = await StakingV2Proxy_CONTRACT[
          "resetStakeGetStosAfterLock(uint256,uint256,uint256,uint256)"
        ](stakeId, convertToWei(inputTos), ltowWei, periodWeeks);
        setTx(tx);
        return closeThisModal();
      }
      if (inputLtos) {
        //after endTime
        //resetStakeGetStosAfterLock(uint256 _stakeId, uint256 _addAmount, uint256 _claimAmount, uint256 _periodWeeks)
        console.log(
          "resetStakeGetStosAfterLock(uint256,uint256,uint256,uint256)"
        );
        console.log(stakeId, 0, convertToWei(inputLtos), periodWeeks);
        const tx = await StakingV2Proxy_CONTRACT[
          "resetStakeGetStosAfterLock(uint256,uint256,uint256,uint256)"
        ](stakeId, 0, convertToWei(inputLtos), periodWeeks);
        setTx(tx);
        return closeThisModal();
      }
    }
  }, [
    StakingV2Proxy_CONTRACT,
    stakeId,
    addTos,
    inputLtos,
    inputTos,
    inputWeeks,
    setTx,
    closeThisModal,
    ltowWei,
  ]);

  const callApprove = useCallback(async () => {
    if (TOS_CONTRACT) {
      const totalSupply = await TOS_CONTRACT.totalSupply();
      return TOS_CONTRACT.approve(StakingV2Proxy, totalSupply);
    }
  }, [TOS_CONTRACT, StakingV2Proxy]);

  useEffect(() => {
    if (inputValue?.stake_relockModal_addTos === false) {
      return setIsAllowance(true);
    }
    if (tosAllowance && inputValue?.stake_relockModal_tos_balance) {
      if (tosAllowance === 0) {
        return setIsAllowance(false);
      }
      if (tosAllowance >= Number(inputValue.stake_relockModal_tos_balance)) {
        return setIsAllowance(true);
      }
      return setIsAllowance(false);
    }
  }, [tosAllowance, inputValue]);

  return (
    <Modal
      isOpen={selectedModal === "stake_updateAfterEndTime_modal"}
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
              <Flex
                w={"100%"}
                justifyContent={"center"}
                mb={"33px"}
                pos={"relative"}
              >
                <Flex
                  pos={"absolute"}
                  left={0}
                  pl={bp700px ? "25px" : "50px"}
                  alignItems={"center"}
                  mt={bp700px ? "5px" : "7px"}
                >
                  <Box
                    w={"4px"}
                    h={"4px"}
                    bgColor={"blue.200"}
                    borderRadius={25}
                    mr={"9px"}
                  />
                  <Text color={"blue.200"} fontSize={15}>
                    Unlocked
                  </Text>
                </Flex>
                <Flex flexDir={"column"} alignItems={"center"} rowGap={"6px"}>
                  <Text
                    color={colorMode === "light" ? "gray.800" : "white.200"}
                    fontSize={20}
                    fontWeight={600}
                  >
                    Relock
                  </Text>
                  <Text height={"17px"} fontSize={12} color={"gray.100"}>
                    Relock LTOS and lock more TOS for LTOS & sTOS
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
                px={bp700px ? "20px" : "120px"}
                flexDir={"column"}
                mb={"29px"}
                rowGap={"14px"}
              >
                <Relock_Balance />
                <StakeModal_Period
                  pageKey={"Stake_screen"}
                  recoilKey={"relock_modal"}
                  atomKey={"stake_relockModal_period"}
                  periodKey={"stake_relockModal_period"}
                  inputPeriodOver={inputPeriodOver}
                  inputPeriodIsEmpty={inputPeriodIsEmpty}
                  leftDays={leftDays}
                  leftHourAndMin={leftHourAndMin}
                  newEndTime={newEndTime}
                />
              </Flex>
              <RelockModal_BottomContent addTos={addTos} />
            </Flex>
            <Flex justifyContent={"center"} mb={"21px"}>
              {isAllowance ? (
                <SubmitButton
                  w={bp700px ? 310 : 460}
                  h={42}
                  name="Update"
                  isDisabled={btnDisabled}
                  onClick={callUpdate}
                ></SubmitButton>
              ) : (
                <SubmitButton
                  w={bp700px ? 310 : 460}
                  h={42}
                  name="Approve"
                  onClick={callApprove}
                  isDisabled={btnDisabled}
                ></SubmitButton>
              )}
            </Flex>
            {/* <Flex
              fontSize={11}
              color={"#64646f"}
              textAlign="center"
              w={"100%"}
              mb={"24px"}
              px={bp700px ? "20px" : "50px"}
            >
              <Text
                w={"100%"}
                color={colorMode === "dark" ? "gray.200" : "gray.700"}
              >
                If this is First time bonding, Please approve TONStarter to use
                your DAI for bonding.
              </Text>
            </Flex> */}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default RelockModal;
