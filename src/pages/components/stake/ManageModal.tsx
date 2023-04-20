import {
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  useTheme,
  useColorMode,
  Box,
} from "@chakra-ui/react";
// import { CloseIcon } from "@chakra-ui/icons";
import { useRecoilState } from "recoil";
import { modalBottomLoadingState, stosLoadingState } from "atom//global/modal";
import useModal from "hooks/useModal";
import Image from "next/image";
import CLOSE_ICON from "assets/icons/close-modal.svg";
import SubmitButton from "common/button/SubmitButton";
import { useCallback, useEffect, useState } from "react";
import useCallContract from "hooks/useCallContract";
import { convertToWei } from "@/utils/number";
import useUserBalance from "hooks/useUserBalance";
import useStakeV2 from "hooks/contract/useStakeV2";
import CONTRACT_ADDRESS from "services/addresses/contract";
import useUser from "hooks/useUser";
import useStakeId from "hooks/contract/useStakeId";
import useInput from "hooks/useInput";
import useUpdateModalData from "hooks/stake/useUpdateModalData";
import StakeGraph from "../common/modal/StakeGraph";
import useCustomToast from "hooks/useCustomToast";
import useManageModalConditon from "hooks/stake/useManageModalCondition";
import constant from "constant";
import ManageModal_BottomContent from "./modal/ManageModal_BottomContent";
import useMediaView from "hooks/useMediaView";
import StakeModal_Input from "@/stakeComponents/modal/components/StakeModal_Input";
import Manage_Period from "@/stakeComponents/modal/components/Manage_Period";
import UserGuide from "../common/guide/UserGuide";

function ManageModal() {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { selectedModal, closeModal, isModalLoading } = useModal<{
    ltosAmount: string | undefined;
  }>();
  const { stakeV2 } = useStakeV2();
  const { inputValue, setResetValue } = useInput(
    "Stake_screen",
    "update_modal"
  );
  const { StakingV2Proxy_CONTRACT, TOS_CONTRACT } = useCallContract();
  const { StakingV2Proxy } = CONTRACT_ADDRESS;
  const { userTokenBalance } = useUserBalance();
  const { tosAllowance } = useUser();
  const [isAllowance, setIsAllowance] = useState<boolean>(false);
  const [btnDisable, setBtnDisable] = useState<boolean>(false);
  const [isApproving, setIsApproving] = useState<boolean>(false);

  const [newBalanceType, setNewBalanceType] = useState<1 | 2 | 3 | undefined>(
    undefined
  );
  const { stakeId } = useStakeId();
  const { newEndTime, leftWeeks, leftDays, leftTime } = useUpdateModalData();

  const { bp700px } = useMediaView();

  const { setTx } = useCustomToast();
  const {
    inputOver,
    inputPeriodOver,
    btnDisabled,
    zeroInputBalance,
    inputBalanceIsEmpty,
    inputPeriodIsEmpty,
    bothConditionsErr,
  } = useManageModalConditon(leftWeeks);
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
    if (setResetValue) {
      setResetValue();
    }
    closeModal();
  }, [setResetValue, closeModal]);

  const callUpdate = useCallback(async () => {
    //Mainnet_maxPeriod = 3years
    //Rinkeby_maxPeriod = 39312
    if (StakingV2Proxy_CONTRACT && stakeId && leftWeeks >= 0) {
      //before endTime
      //increaseBeforeEndOrNonEnd(uint256 _stakeId, uint256 _amount uint256, uint256 _unlockWeeks)
      const stakeAmount = inputValue.stake_updateModal_tos_balance.replaceAll(
        " ",
        ""
      );
      console.log(`StakingV2Proxy_CONTRACT[
        "increaseBeforeEndOrNonEnd(uint256,uint256,uint256)"
      ]`);
      console.log(
        stakeId,
        convertToWei(stakeAmount),
        inputValue.stake_updateModal_period - leftWeeks
      );

      const tx = await StakingV2Proxy_CONTRACT[
        "increaseBeforeEndOrNonEnd(uint256,uint256,uint256)"
      ](
        stakeId,
        convertToWei(stakeAmount),
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
    if (newBalanceType === undefined) {
      return setIsAllowance(true);
    }
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
      <ModalOverlay className="modalOverlayDrawer" bg={"none"} />
      <ModalContent
        // fontFamily={theme.fonts.roboto}
        bg={colorMode === "light" ? "white.100" : "#121318"}
        minW={bp700px ? "350px" : "700px"}
        maxW={bp700px ? "350px" : "700px"}
        // h="704px"
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
                    bgColor={"red.100"}
                    borderRadius={25}
                    mr={"9px"}
                  />
                  <Text color={"red.100"} fontSize={15}>
                    Locked
                  </Text>
                </Flex>
                <Flex flexDir={"column"} alignItems={"center"} rowGap={"6px"}>
                  <Text
                    color={colorMode === "light" ? "gray.800" : "white.200"}
                    fontSize={20}
                    fontWeight={600}
                  >
                    Manage
                  </Text>
                  <Text height={"17px"} fontSize={12} color={"gray.100"}>
                    Increase LTOS & sTOS
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
              >
                <Text
                  color={colorMode === "light" ? "gray.800" : "white.200"}
                  fontSize={12}
                  mb={"10px"}
                >
                  Lock additional TOS
                </Text>
                <Flex mb={"24px"}>
                  <StakeModal_Input
                    pageKey={"Stake_screen"}
                    recoilKey={"update_modal"}
                    atomKey={"stake_updateModal_tos_balance"}
                    defaultValue={undefined}
                    maxValue={userTokenBalance?.TOS?.balanceWei}
                    inputTokenType={"TOS"}
                    tokenBalance={userTokenBalance?.TOS?.balanceCommified}
                    err={{
                      zeroInputBalance: false,
                      inputOver,
                      inputBalanceIsEmpty,
                    }}
                  ></StakeModal_Input>
                </Flex>
                <Manage_Period />
              </Flex>
            </Flex>
            <Flex px={bp700px ? "30px" : "43px"} mb={"30px"}>
              <StakeGraph
                pageKey={"Stake_screen"}
                subKey={"update_modal"}
                periodKey={"stake_updateModal_period"}
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
                w={bp700px ? 310 : 460}
                h={42}
                name="Update"
                isDisabled={btnDisabled || isModalLoading}
                onClick={callUpdate}
              ></SubmitButton>
            ) : (
              <SubmitButton
                w={bp700px ? 310 : 460}
                h={42}
                // isDisabled={
                //   bothConditionsErr === true ||
                //   inputOver ||
                //   Number(userTOSBalance?.replaceAll(",", "")) < 0 ||
                //   inputValue.stake_updateModal_tos_balance === undefined ||
                //   inputValue.stake_updateModal_tos_balance.length === 0 ||
                //   inputPeriodOver ||
                //   isModalLoading
                // }
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
                {errMsg.stake.amountAndPeriodErr}
              </Text>
            </Flex>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ManageModal;
