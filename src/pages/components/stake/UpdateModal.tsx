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
import TokenSymbol from "common/token/TokenSymol";
import question from "assets/icons/question.svg";
import useCallContract from "hooks/useCallContract";
import useBondModal from "hooks/bond/useBondModal";
import useInputData from "hooks/bond/useBondModalInputData";
import { inputBalanceState, inputState } from "atom/global/input";
import commafy from "@/components/commafy";
import { BondCardProps } from "types/bond";
import { convertToWei } from "@/components/number";
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

function BottomContent(props: {
  title: string;
  content: string | { ltos: string; stos: string };
  tooltip?: boolean;
}) {
  const { title, content, tooltip } = props;
  const { colorMode } = useColorMode();

  const ContentComponent = useMemo(() => {
    switch (title) {
      case "Current Balance":
        return (
          <Flex>
            <Text
              color={colorMode === "dark" ? "white.200" : "gray.800"}
              fontWeight={600}
            >
              {typeof content !== "string" && content.ltos} LTOS
            </Text>
            <Text color={"#64646f"} mx={"5px"}>
              /
            </Text>
            <Text
              color={colorMode === "dark" ? "white.200" : "gray.800"}
              fontWeight={600}
            >
              {typeof content !== "string" && content.stos} sTOS
            </Text>
          </Flex>
        );
      case "New Balance":
        return (
          <Flex>
            <Text
              color={colorMode === "dark" ? "white.200" : "gray.800"}
              fontWeight={600}
            >
              {typeof content !== "string" && content.ltos} LTOS
            </Text>
            <Text color={"#64646f"} mx={"5px"}>
              /
            </Text>
            <Text
              color={colorMode === "dark" ? "white.200" : "gray.800"}
              fontWeight={600}
            >
              {typeof content !== "string" && content.stos} sTOS
            </Text>
          </Flex>
        );
      default:
        return (
          <Text
            color={colorMode === "dark" ? "white.200" : "gray.800"}
            fontWeight={600}
          >
            {content as string}
          </Text>
        );
    }
  }, [title, content, colorMode]);

  return (
    <Flex>
      <Flex
        w={"100%"}
        justifyContent={"space-between"}
        fontSize={14}
        mt={"9px"}
      >
        <Flex>
          <Text
            color={colorMode === "dark" ? "gray.100" : "gray.1000"}
            mr={"6px"}
          >
            {title}
          </Text>
          {tooltip ? (
            <Tooltip label="" placement="bottom">
              <Image src={question} alt={""} height={"16px"} width={"16px"} />
            </Tooltip>
          ) : (
            <></>
          )}
        </Flex>
        {ContentComponent}
      </Flex>
    </Flex>
  );
}

function UpdateModal() {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { closeModal } = useModal();
  const { selectedModalData, selectedModal } = useModal<{
    ltosAmount: string | undefined;
  }>();
  const { bondModalData } = useBondModal();
  const { stakeV2 } = useStakeV2();
  const { inputValue, setResetValue } = useInput(
    "Stake_screen",
    "update_modal"
  );
  const { StakingV2Proxy_CONTRACT, TOS_CONTRACT } = useCallContract();
  const { StakingV2Proxy } = CONTRACT_ADDRESS;
  const { userTOSBalance } = useUserBalance();
  const { tosAllowance } = useUser();
  const [isAllowance, setIsAllowance] = useState<boolean>(false);
  const [inputError, setInputError] = useState<boolean>(false);
  const [btnDisable, setBtnDisable] = useState<boolean>(false);
  const [newBalanceType, setNewBalanceType] = useState<1 | 2 | 3 | undefined>(
    undefined
  );
  const { stakeId } = useStakeId();
  const { currentBalance, newBalance, currentEndTime, newEndTime, leftWeeks } =
    useUpdateModalData(newBalanceType);
  const { maxWeeks } = useStosReward();
  const ltosAmount = selectedModalData?.ltosAmount;

  const contentList = useMemo(
    () => [
      {
        title: "You Give",
        content: `${inputValue.stake_updateModal_tos_balance || "0"} TOS`,
        tooltip: false,
        tooltipMessage: "",
      },
      {
        title: "Current Balance",
        content: currentBalance,
        tooltip: true,
        tooltipMessage: "Amount of LTOS and sTOS before the update.",
        secondTooltip:
          "Currently worth 200 TOS. As LTOS index increases, the number of TOS you can get from unstaking LTOS will also increase.",
      },
      {
        title: "New Balance",
        content: { ltos: newBalance.ltos, stos: newBalance.stos },
        tooltip: true,
        tooltipMessage: "Amount of LTOS and sTOS after the update.",
        secondTooltip:
          "Currently worth 200 TOS. As LTOS index increases, the number of TOS you can get from unstaking LTOS will also increase.",
      },
      {
        title: "Current End Time",
        content: currentEndTime,
        tooltip: true,
        tooltipMessage:
          "Lock-Up period end time before the update.before the update.",
      },
      {
        title: "New End Time",
        content: newEndTime,
        tooltip: true,
        tooltipMessage:
          "Lock-Up period end time after the update.before the update.",
      },
    ],
    [
      inputValue.stake_updateModal_tos_balance,
      currentBalance,
      newBalance,
      currentEndTime,
      newEndTime,
    ]
  );

  const callUpdate = useCallback(() => {
    //Mainnet_maxPeriod = 3years
    //Rinkeby_maxPeriod = 39312
    if (StakingV2Proxy_CONTRACT && stakeId) {
      //before endTime
      //increaseBeforeEndOrNonEnd(uint256 _stakeId, uint256 _amount uint256, uint256 _unlockWeeks)
      return StakingV2Proxy_CONTRACT[
        "increaseBeforeEndOrNonEnd(uint256,uint256,uint256)"
      ](
        stakeId,
        convertToWei(inputValue.stake_updateModal_tos_balance),
        inputValue.stake_updateModal_period
      );
    }
  }, [
    inputValue.stake_updateModal_tos_balance,
    inputValue.stake_updateModal_period,
    StakingV2Proxy_CONTRACT,
    stakeId,
  ]);

  const callApprove = useCallback(async () => {
    if (TOS_CONTRACT) {
      const totalSupply = await TOS_CONTRACT.totalSupply();
      return TOS_CONTRACT.approve(StakingV2Proxy, totalSupply);
    }
  }, [TOS_CONTRACT, StakingV2Proxy]);

  const closeThisModal = useCallback(() => {
    setResetValue();
    closeModal();
  }, [setResetValue, closeModal]);

  useEffect(() => {
    if (tosAllowance) {
      if (tosAllowance === 0) {
        return setIsAllowance(false);
      }
      if (tosAllowance >= Number(inputValue.stake_updateModal_tos_balance)) {
        return setIsAllowance(true);
      }
      return setIsAllowance(false);
    }
  }, [tosAllowance, inputValue.stake_updateModal_tos_balance]);

  useEffect(() => {
    if (inputValue.stake_updateModal_period && leftWeeks) {
      const inputPeriod = inputValue.stake_updateModal_period;
      if (inputPeriod < leftWeeks) {
        return setInputError(true);
      }
      return setInputError(false);
    }
    return setInputError(true);
  }, [inputValue, leftWeeks]);

  useEffect(() => {
    if (inputError) {
      return setBtnDisable(true);
    }
    if (inputValue.stake_updateModal_tos_balance) {
      if (inputValue.stake_updateModal_tos_balance === "") {
        return setBtnDisable(true);
      }
    }
    return setBtnDisable(false);
  }, [inputError, inputValue]);

  useEffect(() => {
    if (
      inputValue.stake_updateModal_tos_balance &&
      inputValue.stake_updateModal_period &&
      leftWeeks
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

  return (
    <Modal
      isOpen={selectedModal === "stake_update_modal"}
      isCentered
      onClose={closeThisModal}
    >
      <ModalOverlay />
      <ModalContent
        // fontFamily={theme.fonts.roboto}
        bg={colorMode === "light" ? "white.100" : "#121318"}
        minW="43.75em"
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
                    Update
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
              <Flex w={"100%"} px={"120px"} flexDir={"column"} mb={"29px"}>
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
                    maxValue={Number(userTOSBalance?.replaceAll(",", ""))}
                  ></BalanceInput>
                </Flex>
                <Flex
                  fontSize={12}
                  color={colorMode === "dark" ? "#8b8b93" : "gray.1000"}
                  h={"17px"}
                  justifyContent={"space-between"}
                  mb={"12px"}
                >
                  <Text>Your Balance</Text>
                  <Text>{userTOSBalance} TOS</Text>
                </Flex>
                <Flex fontSize={12} alignItems="center">
                  <Text
                    mr={"24px"}
                    color={colorMode === "light" ? "gray.800" : "white.200"}
                  >
                    New Lock-Up Period
                  </Text>
                  <Flex
                    w={"120px"}
                    h={"39px"}
                    border={"1px solid #313442"}
                    borderRadius={8}
                    alignItems={"center"}
                    justifyContent={"center"}
                    fontSize={14}
                    color={"#64646f"}
                  >
                    <Text>{leftWeeks} Weeks</Text>
                  </Flex>
                  <Flex ml={"16px"}>
                    <Image src={ArrowImg} alt={"ArrowImg"}></Image>
                  </Flex>
                  <TextInput
                    w={"150px"}
                    h={"39px"}
                    atomKey={"stake_updateModal_period"}
                    placeHolder={"1 Weeks"}
                    pageKey={"Stake_screen"}
                    recoilKey={"update_modal"}
                    style={{ marginLeft: "auto" }}
                    maxValue={156}
                    isError={inputError}
                    errorMsg={"Invalid Weeks"}
                  ></TextInput>
                </Flex>
              </Flex>
              <Flex px={"49px"} mb={"30px"}>
                <StakeGraph
                  pageKey={"Stake_screen"}
                  subKey={"update_modal"}
                  periodKey={"stake_updateModal_period"}
                  isSlideDisabled={false}
                ></StakeGraph>
              </Flex>
              {/* Content Bottom */}
              <Flex
                flexDir={"column"}
                columnGap={"9px"}
                mb={"30px"}
                px={"50px"}
              >
                {contentList.map((content, index) => {
                  return (
                    <BottomContent
                      title={content.title}
                      content={content.content}
                      key={content.title + index}
                      tooltip={content.tooltip}
                    ></BottomContent>
                  );
                })}
              </Flex>
            </Flex>
            <Flex justifyContent={"center"} mb={"21px"}>
              {isAllowance ? (
                <SubmitButton
                  w={460}
                  h={42}
                  name="Update"
                  isDisabled={btnDisable}
                  onClick={callUpdate}
                ></SubmitButton>
              ) : (
                <SubmitButton
                  w={460}
                  h={42}
                  isDisabled={
                    inputValue.stake_updateModal_tos_balance === "" ||
                    Number(inputValue.stake_updateModal_tos_balance) > 0
                  }
                  name="Approve"
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
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default UpdateModal;
