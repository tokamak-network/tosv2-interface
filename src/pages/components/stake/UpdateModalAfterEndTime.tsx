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
import useCallContract from "hooks/useCallContract";
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
import { stake_relockModal_state } from "atom/stake/input";
import useStakeInput from "hooks/stake/useStakeInput";
import useInput from "hooks/useInput";
import useUpdateModalAfterEndTime from "hooks/stake/useUpdateModalAfterEndTime";
import BasicTooltip from "common/tooltip/index";
import constant from "constant";
import StakeGraph from "../common/modal/StakeGraph";

function BottomContent(props: {
  title: string;
  content: string | { ltos: string; stos: string; tos: string };
  tooltip?: boolean;
  tooltipMessage?: string;
  secondTooltip?: string;
}) {
  const { title, content, tooltip, tooltipMessage, secondTooltip } = props;
  const { colorMode } = useColorMode();

  const ContentComponent = useMemo(() => {
    switch (title) {
      case "You Will Get":
        return (
          <Flex>
            <Text
              color={colorMode === "dark" ? "white.200" : "gray.800"}
              fontWeight={600}
              mr="6px"
            >
              {(typeof content !== "string" && content.ltos) || "-"} LTOS
            </Text>
            <BasicTooltip label={secondTooltip} />
            <Text color={"#64646f"} mx={"5px"}>
              /
            </Text>
            <Text
              color={colorMode === "dark" ? "white.200" : "gray.800"}
              fontWeight={600}
            >
              {(typeof content !== "string" && content.stos) || "-"} sTOS
            </Text>
            <Text color={"#64646f"} mx={"5px"}>
              /
            </Text>
            <Text
              color={colorMode === "dark" ? "white.200" : "gray.800"}
              fontWeight={600}
            >
              {(typeof content !== "string" && content.tos) || "-"} TOS
            </Text>
          </Flex>
        );

      case "You Give":
        return (
          <Flex>
            <Text
              color={colorMode === "dark" ? "white.200" : "gray.800"}
              fontWeight={600}
              mr="6px"
            >
              {content as string}
            </Text>
            <BasicTooltip label={secondTooltip} />
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
  }, [title, content, colorMode, secondTooltip]);

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
          {tooltip ? <BasicTooltip label={tooltipMessage} /> : <></>}
        </Flex>
        {ContentComponent}
      </Flex>
    </Flex>
  );
}

function UpdateModalAfterEndTime() {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { closeModal } = useModal();
  const { selectedModalData, selectedModal } = useModal();
  const { stakeV2 } = useStakeV2();
  const [addTos, setAddTos] = useState<boolean>(false);
  const { inputValue, setResetValue, setValue } = useInput(
    "Stake_screen",
    "relock_modal"
  );

  const { StakingV2Proxy_CONTRACT, TOS_CONTRACT } = useCallContract();
  const { StakingV2Proxy } = CONTRACT_ADDRESS;
  const { userTOSBalance, userLTOSBalance } = useUserBalance();
  const { tosAllowance } = useUser();
  const [isAllowance, setIsAllowance] = useState<boolean>(false);
  const { newBalance, newEndTime } = useUpdateModalAfterEndTime(addTos);

  const stakeId = selectedModalData.stakeId;
  const ltosAmount = selectedModalData?.ltosAmount;

  const contentList = [
    {
      title: "You Give",
      content: `${
        addTos
          ? inputValue.stake_relockModal_tos_balance
          : inputValue.stake_relockModal_ltos_balance || "0"
      } ${addTos ? "TOS" : "LTOS"}`,
      tooltip: true,
      tooltipMessage: "Amount of LTOS and TOS used for staking.",
      secondTooltip:
        "Currently worth 200 TOS. As LTOS index increases, the number of TOS you can get from unstaking LTOS will also increase.",
    },
    {
      title: "You Will Get",
      content: addTos
        ? {
            ltos: newBalance.ltos,
            stos: newBalance.stos,
            tos: inputValue.stake_relockModal_tos_balance,
          }
        : {
            ltos: inputValue.stake_relockModal_ltos_balance,
            stos: newBalance.stos,
            tos: newBalance.tos,
          },
      tooltip: true,
      tooltipMessage:
        "Amount of LTOS, sTOS, and TOS you will get after the update. ",
      secondTooltip:
        "Currently worth 200 TOS. As LTOS index increases, the number of TOS you can get from unstaking LTOS will also increase.",
    },
    {
      title: "New End Time",
      content: newEndTime,
      tooltip: true,
      tooltipMessage: "LTOS can be unstaked after this time.",
    },
  ];

  const callUpdate = useCallback(() => {
    //Mainnet_maxPeriod = 3years
    //Rinkeby_maxPeriod = 39312
    if (
      StakingV2Proxy_CONTRACT &&
      stakeId &&
      inputValue.stake_relockModal_period
    ) {
      if (addTos && inputValue.stake_relockModal_tos_balance) {
        return StakingV2Proxy_CONTRACT[
          "resetStakeGetStosAfterLock(uint256,uint256,uint256)"
        ](
          stakeId,
          convertToWei(inputValue.stake_relockModal_tos_balance),
          inputValue.stake_relockModal_period
        );
      }
      //after endTime
      //resetStakeGetStosAfterLock(uint256 _stakeId, uint256 _addAmount, uint256 _claimAmount, uint256 _periodWeeks)
      console.log(
        "resetStakeGetStosAfterLock(uint256 _stakeId, uint256 _addAmount, uint256 _claimAmount, uint256 _periodWeeks"
      );
      console.log(
        stakeId,
        convertToWei(inputValue.stake_relockModal_ltos_balance),
        inputValue.stake_relockModal_period
      );
      return StakingV2Proxy_CONTRACT[
        "resetStakeGetStosAfterLock(uint256,uint256,uint256)"
      ](
        stakeId,
        convertToWei(inputValue.stake_relockModal_ltos_balance),
        inputValue.stake_relockModal_period
      );
    }
  }, [StakingV2Proxy_CONTRACT, stakeId, addTos, inputValue]);

  const callApprove = useCallback(async () => {
    if (TOS_CONTRACT) {
      const totalSupply = await TOS_CONTRACT.totalSupply();
      return TOS_CONTRACT.approve(StakingV2Proxy, totalSupply);
    }
  }, [TOS_CONTRACT, StakingV2Proxy]);

  const closeThisModal = useCallback(() => {
    setResetValue();
    setAddTos(false);
    closeModal();
  }, [setResetValue, closeModal]);

  useEffect(() => {
    if (tosAllowance && inputValue.stake_relockModal_tos_balance) {
      if (tosAllowance === 0) {
        return setIsAllowance(false);
      }
      if (tosAllowance >= Number(inputValue.stake_relockModal_tos_balance)) {
        return setIsAllowance(true);
      }
      return setIsAllowance(false);
    }
  }, [tosAllowance, inputValue.stake_relockModal_tos_balance]);

  // useEffect(() => {
  //   if (addTos === false) {
  //     return setValue({ ...inputValue, stake_relockModal_tos_balance: "" });
  //   } else {
  //     return setValue({ ...inputValue, stake_relockModal_ltos_balance: "" });
  //   }
  // }, [addTos, setValue, inputValue]);

  return (
    <Modal
      isOpen={selectedModal === "stake_updateAfterEndTime_modal"}
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
              <Flex w={"100%"} justifyContent={"center"} mb={"33px"} h={"28px"}>
                <Text
                  color={colorMode === "light" ? "gray.800" : "white.200"}
                  fontSize={20}
                  fontWeight={600}
                >
                  Update
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
              <Flex w={"100%"} px={"120px"} flexDir={"column"} mb={"29px"}>
                <Flex w={"100%"} justifyContent={"space-between"} mb={"9px"}>
                  <Tile
                    title={"Next Rebase"}
                    content={stakeV2?.nextRebase}
                    tooltip="Time left until LTOS index is increased."
                  />
                  <Tile
                    title={"LTOS Index"}
                    content={stakeV2?.ltosIndex}
                    symbol={"TOS"}
                    tooltip="Number of TOS you get when you unstake 1 LTOS. LTOS index increases every 8 hours."
                  />
                </Flex>
                <Flex
                  mb={"9px"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Flex>
                    <BalanceInput
                      w={"335px"}
                      h={45}
                      placeHolder={"Enter an amount of LTOS"}
                      atomKey={"stake_relockModal_ltos_balance"}
                      pageKey={"Stake_screen"}
                      recoilKey={"relock_modal"}
                      isDisabled={addTos}
                      maxValue={Number(ltosAmount?.replaceAll(",", ""))}
                    ></BalanceInput>
                  </Flex>
                  <Flex>
                    <CustomCheckBox
                      state={addTos}
                      setState={setAddTos}
                    ></CustomCheckBox>
                    <Text
                      ml={"14px"}
                      w={"51px"}
                      fontSize={12}
                      mr="6px"
                      color={colorMode === "dark" ? "#8b8b93" : "gray.1000"}
                    >
                      Add TOS
                    </Text>
                    <BasicTooltip
                      label={
                        "f you want more sTOS, you can lock TOS in addition to restaking your LTOS. "
                      }
                    />
                  </Flex>
                </Flex>
                <Flex
                  fontSize={12}
                  color={colorMode === "dark" ? "#8b8b93" : "gray.1000"}
                  h={"17px"}
                  justifyContent={"space-between"}
                  mb={"12px"}
                  w={"335px"}
                  px="6px"
                >
                  <Text>Your Balance</Text>
                  <Text>{ltosAmount} LTOS</Text>
                </Flex>
                {addTos && (
                  <Flex mb={"12px"} flexDir={"column"}>
                    <Flex mb={"9px"}>
                      <BalanceInput
                        w={"100%"}
                        h={45}
                        placeHolder={"Enter an amount of TOS"}
                        pageKey={"Stake_screen"}
                        recoilKey={"relock_modal"}
                        atomKey={"stake_relockModal_tos_balance"}
                        maxValue={Number(userTOSBalance.replaceAll(",", ""))}
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
                  </Flex>
                )}
                <Flex fontSize={12} alignItems="center">
                  <Text
                    mr={"24px"}
                    color={colorMode === "light" ? "gray.800" : "white.200"}
                  >
                    New Lock-Up Period
                  </Text>
                  <TextInput
                    w={"170px"}
                    h={"39px"}
                    pageKey={"Stake_screen"}
                    recoilKey={"relock_modal"}
                    atomKey={"stake_relockModal_period"}
                    placeHolder={"1 Weeks"}
                    style={{ marginLeft: "auto" }}
                    maxValue={constant.LOCKTOS_maxWeeks}
                  ></TextInput>
                </Flex>
              </Flex>
              <Flex px={"49px"} mb={"30px"}>
                <StakeGraph
                  pageKey="Stake_screen"
                  periodKey="stake_relockModal_period"
                  subKey="relock_modal"
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
                {contentList?.map((content, index) => {
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
              {addTos ? (
                isAllowance ? (
                  <SubmitButton
                    w={460}
                    h={42}
                    name="Update"
                    onClick={callUpdate}
                  ></SubmitButton>
                ) : (
                  <SubmitButton
                    w={460}
                    h={42}
                    name="Approve"
                    onClick={callApprove}
                  ></SubmitButton>
                )
              ) : (
                <SubmitButton
                  w={460}
                  h={42}
                  name="Update"
                  onClick={callUpdate}
                ></SubmitButton>
              )}
            </Flex>
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
                If this is First time bonding, Please approve Tonstarter to use
                your DAI for bonding.
              </Text>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default UpdateModalAfterEndTime;
