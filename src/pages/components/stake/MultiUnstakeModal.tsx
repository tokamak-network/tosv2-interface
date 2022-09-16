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
import { convertToWei } from "@/components/number";
import useUnstake from "hooks/stake/useUnstakeModalData";
import commafy from "@/components/commafy";
import useInput from "hooks/useInput";
import useUser from "hooks/useUser";
import useCustomToast from "hooks/useCustomToast";

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
  const { closeModal, selectedModalData } = useModal();
  const { stakeV2 } = useStakeV2();
  const { userLTOSBalance } = useUserBalance();
  const { StakingV2Proxy_CONTRACT } = useCallContract();
  const { simpleStakingId } = useUser();
  const { setTx } = useCustomToast();

  console.log(selectedModalData);

  const contentList = [
    {
      title: "You Give",
      content: `${"" || "0"} LTOS`,
    },
    {
      title: "You Will Get",
      content: `${"" || "0"} TOS`,
    },
  ];

  const closeThisModal = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const callUnstake = useCallback(async () => {
    if (StakingV2Proxy_CONTRACT) {
      console.log("--unstake(uint256 _stakeId)--");
      //   const tx = await StakingV2Proxy_CONTRACT.unstake(
      //     selectedModalData.stakedId
      //   );
      //   setTx(tx);
      //   return closeThisModal();
    }
  }, [StakingV2Proxy_CONTRACT, closeThisModal, setTx]);

  return (
    <Modal
      isOpen={selectedModal === "stake_multiUnstake_modal"}
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
              <Flex w={"100%"} flexDir={"column"} px={"120px"} mb={"30px"}>
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
              </Flex>
              {/* )} */}
              {/* Content Bottom */}
              <Flex flexDir={"column"} rowGap={"9px"} px={"50px"}>
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
                w={460}
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
