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
import { selectedModalData, selectedModalState } from "atom//global/modal";
import useModal from "hooks/useModal";
import Image from "next/image";
import CLOSE_ICON from "assets/icons/close-modal.svg";
import CustomCheckBox from "common/input/CustomCheckBox";
import SubmitButton from "common/button/SubmitButton";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TextInput, BalanceInput } from "common/input/TextInput";
import useCallContract from "hooks/useCallContract";
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
import {
  StakeRelockModalInput,
  stake_relockModal_state,
} from "atom/stake/input";
import useStakeInput from "hooks/stake/useStakeInput";
import useInput from "hooks/useInput";
import useUpdateModalAfterEndTime from "hooks/stake/useUpdateModalAfterEndTime";
import BasicTooltip from "common/tooltip/index";
import constant from "constant";
import StakeGraph from "../common/modal/StakeGraph";
import useCustomToast from "hooks/useCustomToast";
import useRelockModalCondition from "hooks/stake/useRelockModalCondition";
import useStosReward from "hooks/stake/useStosReward";
import InputPeriod from "common/input/InputPeriod";
import useStos from "hooks/stake/useStos";
import RelockModal_BottomContent from "./modal/RelockModal_BottomContent";
import useMediaView from "hooks/useMediaView";
import { UserGuide } from "../common/guide/UserGuide";
import Relock_Balance from "./modal/components/relock/Relock_Balance";
import StakeModal_Period from "./modal/components/StakeModal_Period";

function RelockModal() {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { closeModal } = useModal();
  const { selectedModalData, selectedModal, modalSectionMtValue } = useModal<{
    stakeId: string;
    ltosAmount: string;
    ltosWei: string;
  }>();
  const { stakeV2 } = useStakeV2();
  const { inputValue, setResetValue, setValue } =
    useInput<StakeRelockModalInput>("Stake_screen", "relock_modal");

  const ltosBalance = inputValue?.stake_relockModal_ltos_balance?.replaceAll(
    " ",
    ""
  );
  const inputWeeks = inputValue?.stake_relockModal_period;
  const addTos = inputValue?.stake_relockModal_addTos ?? false;

  const { bp700px } = useMediaView();

  const { StakingV2Proxy_CONTRACT, TOS_CONTRACT } = useCallContract();
  const { StakingV2Proxy } = CONTRACT_ADDRESS;
  const { userTOSBalance, userLTOSBalance } = useUserBalance();
  const { tosAllowance } = useUser();
  const [isAllowance, setIsAllowance] = useState<boolean>(false);
  const { newEndTime, inputTosAmount, tosValue } =
    useUpdateModalAfterEndTime(addTos);
  const { leftDays, leftHourAndMin } = useStosReward(
    Number(ltosBalance),
    inputWeeks ? Number(inputWeeks) : 0
  );

  console.log(leftDays, leftHourAndMin, inputWeeks);

  const { setTx } = useCustomToast();

  const stakeId = selectedModalData?.stakeId;
  const ltosAmount = selectedModalData?.ltosAmount;
  const ltowWei = selectedModalData?.ltosWei;

  const { inputOver, inputPeriodOver, btnDisabled, inputPeriodIsEmpty } =
    useRelockModalCondition(Number(ltowWei));
  const { errMsg, stakeModalMaxWeeks } = constant;

  //maxValues
  const [maxLtosValue, setMaxLtosValue] = useState<number | undefined>(
    undefined
  );
  const [maxStosValue, setMaxStosValue] = useState<number | undefined>(
    undefined
  );

  const closeThisModal = useCallback(() => {
    if (setResetValue) {
      setResetValue();
    }
    setAddTos(false);
    closeModal();
  }, [setResetValue, closeModal]);

  const callUpdate = useCallback(async () => {
    //Mainnet_maxPeriod = 3years
    //Rinkeby_maxPeriod = 39312
    if (
      StakingV2Proxy_CONTRACT &&
      stakeId &&
      String(inputValue?.stake_relockModal_period)?.length > 0
    ) {
      const periodWeeks = inputValue.stake_relockModal_period + 1;
      if (
        addTos &&
        (inputValue.stake_relockModal_tos_balance !== undefined ||
          inputValue.stake_relockModal_tos_balance?.length > 0) &&
        ltosAmount
      ) {
        const ltosValue = Number(
          ltosAmount?.replaceAll(",", "").replaceAll(" ", "")
        );
        const ltosBN = convertToWei(ltosValue.toString());
        console.log(
          "resetStakeGetStosAfterLock(uint256,uint256,uint256, uint256)"
        );
        console.log(
          stakeId,
          convertToWei(inputValue.stake_relockModal_tos_balance),
          ltosBN,
          periodWeeks
        );
        const tx = await StakingV2Proxy_CONTRACT[
          "resetStakeGetStosAfterLock(uint256,uint256,uint256,uint256)"
        ](
          stakeId,
          convertToWei(inputValue.stake_relockModal_tos_balance),
          ltosBN,
          periodWeeks
        );
        setTx(tx);
        return closeThisModal();
      }
      //after endTime
      //resetStakeGetStosAfterLock(uint256 _stakeId, uint256 _addAmount, uint256 _claimAmount, uint256 _periodWeeks)
      console.log(
        "resetStakeGetStosAfterLock(uint256,uint256,uint256,uint256)"
      );
      console.log(
        stakeId,
        0,
        convertToWei(inputValue.stake_relockModal_ltos_balance),
        periodWeeks
      );
      const tx = await StakingV2Proxy_CONTRACT[
        "resetStakeGetStosAfterLock(uint256,uint256,uint256,uint256)"
      ](
        stakeId,
        0,
        convertToWei(inputValue.stake_relockModal_ltos_balance),
        periodWeeks
      );
      setTx(tx);
      return closeThisModal();
    }
  }, [
    StakingV2Proxy_CONTRACT,
    stakeId,
    addTos,
    inputValue,
    setTx,
    closeThisModal,
    ltosAmount,
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
                  pl={"50px"}
                  alignItems={"center"}
                  mt={"7px"}
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
                  endTimeInfo={{ leftDays, leftHourAndMin, newEndTime }}
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
