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
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
  useMediaQuery,
} from "@chakra-ui/react";
// import { CloseIcon } from "@chakra-ui/icons";
import { useRecoilValue } from "recoil";
import { selectedModalState } from "atom//global/modal";
import useModal from "hooks/useModal";
import Image from "next/image";
import CLOSE_ICON from "assets/icons/close-modal.svg";
import CustomCheckBox from "common/input/CustomCheckBox";
import SubmitButton from "common/button/SubmitButton";
import { useCallback, useEffect, useState } from "react";
import Tile from "../common/modal/Tile";
import useStakeV2 from "hooks/contract/useStakeV2";
import { BalanceInput } from "common/input/TextInput";
import useUserBalance from "hooks/useUserBalance";
import useInputValue from "hooks/useInputValue";
import useCallContract from "hooks/useCallContract";
import { convertNumber, convertToWei } from "@/utils/number";
import commafy from "@/utils/commafy";
import useInput from "hooks/useInput";
import useUser from "hooks/useUser";
import useCustomToast from "hooks/useCustomToast";
import { StakeCardProps } from "types/stake";
import { BigNumber } from "ethers";

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

function MultiUnstakeModal() {
  const selectedModal = useRecoilValue(selectedModalState);
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { closeModal, selectedModalData } = useModal<StakeCardProps[]>();
  const { stakeV2 } = useStakeV2();
  const { userLTOSBalance } = useUserBalance();
  const { StakingV2Proxy_CONTRACT } = useCallContract();
  const { simpleStakingId } = useUser();
  const { setTx } = useCustomToast();
  const [youGiveAmount, setYouGiveAmount] = useState<string>("-");
  const [youWillGetAmount, setYouWillGetAmount] = useState<string>("-");
  const [smallerThan1024] = useMediaQuery("(max-width: 1024px)");

  const contentList = [
    {
      title: "You Give",
      content: `${youGiveAmount} LTOS`,
    },
    {
      title: "You Will Get",
      content: `${youWillGetAmount} TOS`,
    },
  ];

  const closeThisModal = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const callUnstake = useCallback(async () => {
    if (selectedModalData) {
      const stakeIds = selectedModalData?.map((cardData: StakeCardProps) => {
        if (cardData) return cardData.stakedId;
      });
      if (StakingV2Proxy_CONTRACT) {
        console.log("--unstake(uint256 _stakeId)--");
        console.log(stakeIds);
        if (stakeIds) {
          const tx = await StakingV2Proxy_CONTRACT.multiUnstake(stakeIds);
          setTx(tx);
          return closeThisModal();
        }
      }
    }
  }, [StakingV2Proxy_CONTRACT, closeThisModal, setTx, selectedModalData]);

  useEffect(() => {
    async function fetchMultiUnstakeModal() {
      const stakeIds = selectedModalData?.map((cardData: StakeCardProps) => {
        if (cardData) return cardData.stakedId;
      });
      if (StakingV2Proxy_CONTRACT && stakeIds) {
        const result = await Promise.all(
          stakeIds?.map(async (stakeId) => {
            if (stakeId) {
              const ltosAmount = await StakingV2Proxy_CONTRACT.remainedLtos(
                stakeId
              );
              const tosAmount =
                await StakingV2Proxy_CONTRACT.getLtosToTosPossibleIndex(
                  ltosAmount
                );

              return { ltosAmount, tosAmount };
            }
          })
        );
        const sumResult = result.reduce((prev, cur) => {
          const ltosAmount = BigNumber.from(prev?.ltosAmount || "0").add(
            cur?.ltosAmount
          );
          const tosAmount = BigNumber.from(prev?.tosAmount || "0").add(
            cur?.tosAmount
          );

          return { ltosAmount, tosAmount };
        }, undefined);
        setYouGiveAmount(
          convertNumber({
            amount: sumResult?.ltosAmount,
            localeString: true,
          }) || "-"
        );
        setYouWillGetAmount(
          convertNumber({
            amount: sumResult?.tosAmount,
            localeString: true,
          }) || "-"
        );
      }
    }
    fetchMultiUnstakeModal().catch((e) => {
      // console.log("**fetchMultiUnstakeModal err**");
      // console.log(e);
    });
  }, [StakingV2Proxy_CONTRACT, selectedModalData]);

  return (
    <Modal
      isOpen={selectedModal === "stake_multiUnstake_modal"}
      isCentered
      onClose={closeThisModal}
    >
      <ModalOverlay className="modalOverlayDrawer" bg={"none"} />
      <ModalContent
        // fontFamily={theme.fonts.roboto}
        bg={colorMode === "light" ? "white.100" : "#121318"}
        minW={smallerThan1024 ? "350px" : "43.75em"}
        // h="704px"
      >
        <ModalBody px={0} pt={"30px"} pb={"40px"}>
          <Flex w="100%" flexDir={"column"}>
            {/*TOP Area*/}
            <Flex flexDir={"column"} pos={"relative"}>
              {/* Title Area*/}
              <Flex w={"100%"} justifyContent={"center"} mb={"33px"}>
                <Text
                  color={colorMode === "light" ? "gray.800" : "white.200"}
                  fontSize={20}
                  fontWeight={600}
                >
                  Unstake
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
            </Flex>
            {/* Content Area*/}
            <Flex w={"100%"} flexDir={"column"} mb={"30px"}>
              {/* {hasInput && ( */}
              <Flex
                w={"100%"}
                flexDir={"column"}
                px={smallerThan1024 ? "20px" : "120px"}
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
                        content={stakeV2?.nextRebase}
                        tooltip="Time left until LTOS index is increased."
                      />
                    </Flex>
                  ) : (
                    <Tile
                      title={"Next Rebase"}
                      content={stakeV2?.nextRebase}
                      tooltip="Time left until LTOS index is increased."
                    />
                  )}
                  <Tile
                    title={"LTOS Index"}
                    content={stakeV2?.ltosIndex}
                    symbol={"TOS"}
                    tooltip="Number of TOS you get when you unstake 1 LTOS. LTOS index increases every 8 hours."
                  />
                </Flex>
              </Flex>
              {/* )} */}
              {/* Content Bottom */}
              <Flex
                flexDir={"column"}
                rowGap={"9px"}
                px={smallerThan1024 ? "20px" : "50px"}
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
                w={smallerThan1024 ? 310 : 460}
                h={42}
                name="Unstake"
                onClick={callUnstake}
              ></SubmitButton>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default MultiUnstakeModal;
