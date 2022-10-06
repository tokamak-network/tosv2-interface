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

function BottomContent(props: {
  title: string;
  content: string | { ltos: string | undefined; stos: string };
  tooltip?: boolean;
  tooltipMessage?: string;
  secondTooltip?: string;
}) {
  const { title, content, tooltip, tooltipMessage, secondTooltip } = props;
  const { colorMode } = useColorMode();

  const ContentComponent = useMemo(() => {
    switch (title) {
      case "You Will Get":
        if (typeof content === "string") {
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
        }
        return (
          <Flex>
            <Text
              color={colorMode === "dark" ? "white.200" : "gray.800"}
              fontWeight={600}
              mr={"6px"}
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
          </Flex>
        );
      default:
        return (
          <Flex>
            <Text
              color={colorMode === "dark" ? "white.200" : "gray.800"}
              fontWeight={600}
            >
              {content as string}
            </Text>
          </Flex>
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

function StakeModal() {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { selectedModalData, selectedModal, closeModal } =
    useModal<StakeCardProps>();
  const { bondModalData } = useBondModal();
  const { inputValue, setResetValue } = useInput("Stake_screen", "stake_modal");
  const { ltos, currentBalance, newBalance } = useStakeModaldata();
  const { StakingV2Proxy_CONTRACT, TOS_CONTRACT } = useCallContract();
  const { StakingV2Proxy } = CONTRACT_ADDRESS;
  const { userTOSBalance } = useUserBalance();
  const { stakeList, tosAllowance } = useUser();

  const [fiveDaysLockup, setFiveDaysLockup] = useState<boolean>(false);
  const [isAllowance, setIsAllowance] = useState<boolean>(false);
  const [isApproving, setIsApproving] = useState<boolean>(false);
  const [maxValue, setMaxValue] = useState<number | undefined>(undefined);

  const [smallerThan1024] = useMediaQuery("(max-width: 1024px)");

  const { stosReward, newEndTime, maxWeeks } = useStosReward(
    inputValue.stake_modal_balance,
    inputValue.stake_modal_period
  );
  const { ltosIndex } = useLtosIndex();
  const rebaseTime = useRebaseTime(":");
  const [bottomLoading, setBottomLoading] = useRecoilState(
    modalBottomLoadingState
  );
  const [stosLoading, setStosLoading] = useRecoilState(stosLoadingState);

  const { setTx } = useCustomToast();
  const { inputOver, inputPeriodOver } = useStakeModalCondition();

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
          content: bottomLoading ? "..." : `${ltos || "-"} LTOS`,
          tooltip: true,
          tooltipMessage:
            "You get LTOS based on what you give and sTOS is also based on the lock-up period.",
          secondTooltip:
            "2,000 TOS. As LTOS index increases, the number of TOS you can get from unstaking LTOS will also increase. ",
        },
        {
          title: "Current Balance",
          content: `${currentBalance || "-"} LTOS`,
          tooltip: true,
          tooltipMessage: "Current LTOS balance without Lock-Up period",
        },
        {
          title: "New Balance",
          content: `${newBalance || "-"} LTOS`,
          tooltip: true,
          tooltipMessage:
            "New LTOS balance without Lock-Up period after staking. ",
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
            stos: stosLoading ? "..." : stosReward,
          },
          tooltip: true,
          tooltipMessage:
            "You get LTOS based on what you give and sTOS is also based on the lock-up period.",
          secondTooltip:
            "2,000 TOS. As LTOS index increases, the number of TOS you can get from unstaking LTOS will also increase. ",
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
      console.log("---stakeGetStos()---");
      console.log(
        convertToWei(inputValue.stake_modal_balance),
        inputValue.stake_modal_period
      );

      const tx = await StakingV2Proxy_CONTRACT.stakeGetStos(
        convertToWei(inputValue.stake_modal_balance),
        inputValue.stake_modal_period
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
      setTimeout(() => {
        setMaxValue(Number(userTOSBalance.replaceAll(",", "")));
      }, 1500);
    }
  }, [userTOSBalance]);

  useEffect(() => {
    setStosLoading(true);
  }, [inputValue]);

  useEffect(() => {
    setBottomLoading(true);
  }, [inputValue.stake_modal_balance, setBottomLoading]);

  return (
    <Modal
      isOpen={selectedModal === "stake_stake_modal"}
      isCentered
      onClose={closeThisModal}
    >
      <ModalOverlay />
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
                px={smallerThan1024 ? "20px" : "120px"}
                flexDir={"column"}
                mb={"29px"}
              >
                <Flex
                  w={"100%"}
                  justifyContent={smallerThan1024 ? "center" : "space-between"}
                  mb={smallerThan1024 ? "15px" : "9px"}
                  flexDir={smallerThan1024 ? "column" : "row"}
                >
                  {smallerThan1024 ? (
                    <Flex mb={"9px"} justifyContent="center" w={"100%"}>
                      <Tile
                        title={"Next Rebase"}
                        content={rebaseTime}
                        tooltip="Time left until LTOS index is increased."
                      />
                    </Flex>
                  ) : (
                    <Tile
                      title={"Next Rebase"}
                      content={rebaseTime}
                      tooltip="Time left until LTOS index is increased."
                    />
                  )}

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
                    maxValue={maxValue}
                    isError={inputOver}
                    errorMsg={"Input has exceeded your balance"}
                  ></BalanceInput>
                </Flex>
                <Flex
                  fontSize={12}
                  color={colorMode === "dark" ? "#8b8b93" : "gray.1000"}
                  h={"17px"}
                  justifyContent={"space-between"}
                  mb={"12px"}
                  px="6px"
                >
                  <Text>Your Balance</Text>
                  <Text>{userTOSBalance || "-"} TOS</Text>
                </Flex>
                {smallerThan1024 ? (
                  <Flex flexDir={"column"} justifyContent="center" w="100%">
                    <Flex
                      justifyContent={"space-between"}
                      fontSize={12}
                      pr="6px"
                      mb="10px"
                      mt="22px"
                    >
                      <Text
                        mr={"24px"}
                        color={colorMode === "light" ? "gray.800" : "white.200"}
                      >
                        Lock-Up Period
                      </Text>
                      <Flex>
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
                    <TextInput
                      w={"100%"}
                      h={"39px"}
                      pageKey={"Stake_screen"}
                      recoilKey={"stake_modal"}
                      atomKey={"stake_modal_period"}
                      placeHolder={"1 Weeks"}
                      style={{ marginLeft: "auto" }}
                      isDisabled={fiveDaysLockup}
                      maxValue={maxWeeks}
                      isError={true}
                      errorMsg={
                        "Lock-up period must be an integer between 1 and 156"
                      }
                    ></TextInput>
                  </Flex>
                ) : (
                  <Flex fontSize={12} alignItems="center">
                    <Text
                      mr={"24px"}
                      color={colorMode === "light" ? "gray.800" : "white.200"}
                    >
                      Lock-Up Period
                    </Text>
                    <CustomCheckBox
                      pageKey="Bond_screen"
                      value={""}
                      valueKey={"Bond_Modal"}
                      state={fiveDaysLockup}
                      setState={setFiveDaysLockup}
                    ></CustomCheckBox>
                    <Text ml={"9px"}>No Lock-Up</Text>
                    <TextInput
                      w={"170px"}
                      h={"39px"}
                      pageKey={"Stake_screen"}
                      recoilKey={"stake_modal"}
                      atomKey={"stake_modal_period"}
                      placeHolder={"1 Weeks"}
                      style={{ marginLeft: "auto" }}
                      isDisabled={fiveDaysLockup}
                      maxValue={maxWeeks}
                      isError={inputPeriodOver}
                      errorMsg={
                        "Lock-up period must be an integer between 1 and 156"
                      }
                    ></TextInput>
                  </Flex>
                )}
              </Flex>
              <Flex px={smallerThan1024 ? "30px" : "43px"} mb={"30px"}>
                <StakeGraph
                  pageKey={"Stake_screen"}
                  subKey={"stake_modal"}
                  periodKey={"stake_modal_period"}
                  isSlideDisabled={fiveDaysLockup}
                ></StakeGraph>
              </Flex>
              {/* Content Bottom */}
              <Flex
                flexDir={"column"}
                columnGap={"9px"}
                mb={"30px"}
                px={smallerThan1024 ? "20px" : "50px"}
              >
                {contentList.map((content, index) => {
                  return (
                    <BottomContent
                      title={content.title}
                      content={content.content}
                      key={content.title + index}
                      tooltip={content.tooltip}
                      tooltipMessage={content.tooltipMessage}
                      secondTooltip={content.secondTooltip}
                    ></BottomContent>
                  );
                })}
              </Flex>
            </Flex>
            <Flex justifyContent={"center"} mb={"21px"}>
              {isAllowance ? (
                <SubmitButton
                  w={smallerThan1024 ? 310 : 460}
                  h={42}
                  name="Stake"
                  onClick={callStake}
                  isDisabled={inputOver}
                ></SubmitButton>
              ) : (
                <SubmitButton
                  w={smallerThan1024 ? 310 : 460}
                  h={42}
                  name="Approve"
                  onClick={callApprove}
                  isDisabled={inputOver}
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
