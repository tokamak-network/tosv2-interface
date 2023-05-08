import {
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  useTheme,
  useColorMode,
} from "@chakra-ui/react";
// import { CloseIcon } from "@chakra-ui/icons";
import { useRecoilValue } from "recoil";
import { selectedModalState } from "atom//global/modal";
import useModal from "hooks/useModal";
import Image from "next/image";
import CLOSE_ICON from "assets/icons/close-modal.svg";
import SubmitButton from "common/button/SubmitButton";
import { useCallback, useEffect, useState } from "react";
import Tile from "../common/modal/Tile";
import useUserBalance from "hooks/useUserBalance";
import useCallContract from "hooks/useCallContract";
import { convertToWei } from "@/utils/number";
import useUnstake from "hooks/stake/useUnstakeModalData";
import commafy from "@/utils/commafy";
import useInput from "hooks/useInput";
import useUser from "hooks/useUser";
import useCustomToast from "hooks/useCustomToast";
import useLtosIndex from "hooks/gql/useLtosIndex";
import useRebaseTime from "hooks/useRebaseTime";
import useMediaView from "hooks/useMediaView";
import constant from "constant";
import StakeModal_Input from "./modal/components/StakeModal_Input";
import useUnstakeModalCondition from "hooks/stake/modal/useUnstakeModalCondition";
import UserGuide from "../common/guide/UserGuide";

function BottomContent(props: { title: string; content: string }) {
  const { colorMode } = useColorMode();
  const { title, content } = props;
  return (
    <Flex>
      <Flex w={"100%"} justifyContent={"space-between"} fontSize={14}>
        <Text color={colorMode === "dark" ? "gray.100" : "gray.1000"}>
          {title}
        </Text>
        <Text
          color={colorMode === "dark" ? "white.200" : "gray.800"}
          fontWeight={600}
        >
          {content}
        </Text>
      </Flex>
    </Flex>
  );
}

function UnstakeModal() {
  const selectedModal = useRecoilValue(selectedModalState);
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { closeModal, selectedModalData, isModalLoading, modalSectionMtValue } =
    useModal<{
      hasInput: boolean;
      stakedId: string;
      ltosAmount: string;
      ltosWei: string;
    }>();
  const [hasInput, setHasInput] = useState<boolean>(false);
  const { userLTOSBalance } = useUserBalance();
  const { inputValue, setResetValue } = useInput(
    "Stake_screen",
    "unstake_modal"
  );
  const { StakingV2Proxy_CONTRACT } = useCallContract();
  const { youWillGet, youWillGetMax } = useUnstake(selectedModalData?.stakedId);

  const { simpleStakingId } = useUser();
  const { setTx } = useCustomToast();

  const { bp700px } = useMediaView();

  const { ltosIndex } = useLtosIndex();
  const rebaseTime = useRebaseTime(":");
  const { errMsg } = constant;

  const maxValue = selectedModalData?.ltosWei;
  const ltosBalance = selectedModalData?.ltosAmount;

  const { inputBalanceIsEmpty, inputOver, zeroInputBalance, btnDisabled } =
    useUnstakeModalCondition();

  const contentList = [
    {
      title: "You Give",
      content: hasInput
        ? `${commafy(inputValue.stake_unstakeModal_balance) || "0"} LTOS`
        : `${ltosBalance} LTOS`,
    },
    {
      title: "You Will Get",
      content: hasInput
        ? `${youWillGet || "0"} TOS`
        : `${youWillGetMax || "0"} TOS`,
    },
  ];

  const closeThisModal = useCallback(() => {
    setResetValue();
    closeModal();
  }, [setResetValue, closeModal]);

  const callUnstake = useCallback(async () => {
    if (StakingV2Proxy_CONTRACT) {
      if (hasInput && simpleStakingId) {
        const ltosAmount = convertToWei(inputValue.stake_unstakeModal_balance);
        //claimForSimpleType(uint256 _stakeId, uint256 _claimAmount)
        console.log(
          "--claimForSimpleType(uint256 _stakeId, uint256 _claimAmount)--"
        );
        console.log(simpleStakingId, ltosAmount);
        const tx = await StakingV2Proxy_CONTRACT.claimForSimpleType(
          simpleStakingId,
          ltosAmount
        );
        setTx(tx);
        return closeThisModal();
      }
      console.log("--unstake(uint256 _stakeId)--");
      console.log(selectedModalData?.stakedId);
      const tx = await StakingV2Proxy_CONTRACT.unstake(
        selectedModalData?.stakedId
      );
      setTx(tx);
      return closeThisModal();
    }
  }, [
    hasInput,
    StakingV2Proxy_CONTRACT,
    inputValue.stake_unstakeModal_balance,
    selectedModalData,
    simpleStakingId,
    closeThisModal,
    setTx,
  ]);

  useEffect(() => {
    if (selectedModalData && selectedModalData.hasInput) {
      return setHasInput(true);
    }
    return setHasInput(false);
  }, [selectedModalData]);

  return (
    <Modal
      isOpen={selectedModal === "stake_unstake_modal"}
      isCentered
      onClose={closeThisModal}
    >
      <ModalOverlay className="modalOverlayDrawer" bg={"none"} />
      <ModalContent
        // fontFamily={theme.fonts.roboto}
        bg={colorMode === "light" ? "white.100" : "#121318"}
        minW={bp700px ? "350px" : "700px"}
        maxW={bp700px ? "350px" : "700px"}
        mt={modalSectionMtValue}
      >
        <ModalBody px={0} pt={"30px"} pb={"40px"}>
          <Flex w="100%" flexDir={"column"}>
            {/*TOP Area*/}
            <Flex flexDir={"column"} pos={"relative"}>
              {/* Title Area*/}
              <Flex
                w={"100%"}
                flexDir={"column"}
                alignItems={"center"}
                mb={"33px"}
              >
                <Text
                  color={colorMode === "light" ? "gray.800" : "white.200"}
                  fontSize={20}
                  fontWeight={600}
                >
                  Unstake
                </Text>
                <UserGuide />
                <Flex
                  pos={"absolute"}
                  right={"1.56em"}
                  cursor={"pointer"}
                  top={"-3px"}
                  onClick={() => closeThisModal()}
                >
                  <Image src={CLOSE_ICON} alt={"CLOSE_ICON"}></Image>
                </Flex>
              </Flex>
            </Flex>
            {/* Content Area*/}
            <Flex w={"100%"} flexDir={"column"} mb={"30px"}>
              {/* {hasInput && ( */}
              <Flex
                w={"100%"}
                flexDir={"column"}
                px={bp700px ? "20px" : "120px"}
                mb={bp700px ? "9px" : "30px"}
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

                {hasInput && (
                  <Flex flexDir={"column"}>
                    <Flex mb={"9px"}>
                      <StakeModal_Input
                        pageKey={"Stake_screen"}
                        atomKey={"stake_unstakeModal_balance"}
                        recoilKey={"unstake_modal"}
                        defaultValue={undefined}
                        inputTokenType={"LTOS"}
                        tokenBalance={ltosBalance}
                        maxValue={maxValue}
                        err={{
                          inputBalanceIsEmpty,
                          inputOver,
                          zeroInputBalance,
                        }}
                      />
                      {/* <BalanceInput
                        w={"100%"}
                        h={45}
                        pageKey={"Stake_screen"}
                        recoilKey={"unstake_modal"}
                        placeHolder={"Enter an amount of LTOS"}
                        atomKey={"stake_unstakeModal_balance"}
                        maxValue={Number(unstakeData?.maxValue) || 0}
                        isError={isOverBlanace || balanceIsZero}
                        errorMsg={
                          inputValue.stake_unstakeModal_balance === ""
                            ? undefined
                            : isOverBlanace
                            ? errMsg.stake.ltosBalanceIsOver
                            : errMsg.stake.inputIsZero
                        }
                      ></BalanceInput> */}
                    </Flex>
                  </Flex>
                )}
              </Flex>
              {/* )} */}
              {/* Content Bottom */}
              <Flex
                flexDir={"column"}
                rowGap={"9px"}
                px={bp700px ? "20px" : "50px"}
              >
                {contentList.map((content, index) => {
                  return (
                    <BottomContent
                      title={content.title}
                      content={content.content}
                      key={content.title + index}
                    ></BottomContent>
                  );
                })}
              </Flex>
            </Flex>
            <Flex flexDir={"column"} alignItems={"center"} rowGap={"15px"}>
              <SubmitButton
                w={bp700px ? 310 : 460}
                h={42}
                name="Unstake"
                onClick={callUnstake}
                isDisabled={hasInput ? btnDisabled : false}
              ></SubmitButton>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default UnstakeModal;
