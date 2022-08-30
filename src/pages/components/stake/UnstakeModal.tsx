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
  const { closeModal, selectedModalData } = useModal();
  const [hasInput, setHasInput] = useState<boolean>(false);
  const { stakeV2 } = useStakeV2();
  const { userLTOSBalance } = useUserBalance();
  const { inputValue } = useInput("Stake_screen", "unstake_modal");
  const { StakingV2Proxy_CONTRACT } = useCallContract();
  const { unstakeData, youWillGet, youWillGetMax } = useUnstake(
    selectedModalData.stakedId
  );

  const contentList = [
    {
      title: "You Give",
      content: hasInput
        ? `${commafy(inputValue.stake_unstakeModal_balance) || "0"} LTOS`
        : `${unstakeData?.maxValue || "0"} LTOS`,
    },
    {
      title: "You Will Get",
      content: hasInput
        ? `${youWillGet || "0"} TOS`
        : `${youWillGetMax || "0"} TOS`,
    },
  ];

  console.log(unstakeData);

  const callUnstake = useCallback(async () => {
    if (StakingV2Proxy_CONTRACT) {
      if (hasInput) {
        const amount = convertToWei(inputValue.stake_unstakeModal_balance);
        const tosAmount = StakingV2Proxy_CONTRACT.getLtosToTos(amount);
        //claimForSimpleType(uint256 _stakeId, uint256 _claimAmount)
        return StakingV2Proxy_CONTRACT.claimForSimpleType(
          selectedModalData.stakedId,
          tosAmount
        );
      }
      return StakingV2Proxy_CONTRACT.unstake(selectedModalData.stakedId);
    }
  }, [
    hasInput,
    StakingV2Proxy_CONTRACT,
    inputValue.stake_unstakeModal_balance,
    selectedModalData,
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
      onClose={closeModal}
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
                  onClick={() => closeModal()}
                >
                  <Image src={CLOSE_ICON} alt={"CLOSE_ICON"}></Image>
                </Flex>
              </Flex>
            </Flex>
            {/* Content Area*/}
            <Flex w={"100%"} flexDir={"column"} mb={"30px"}>
              {hasInput && (
                <Flex w={"100%"} flexDir={"column"} px={"120px"} mb={"30px"}>
                  <Flex w={"100%"} justifyContent={"space-between"} mb={"9px"}>
                    <Tile title={"Next Rebase"} content={stakeV2?.nextRebase} />
                    <Tile
                      title={"LTOS Index"}
                      content={stakeV2?.ltosIndex}
                      symbol={"TOS"}
                    />
                  </Flex>
                  <Flex mb={"9px"}>
                    <BalanceInput
                      w={"100%"}
                      h={45}
                      pageKey={"Stake_screen"}
                      recoilKey={"unstake_modal"}
                      placeHolder={"Enter an amount of LTOS"}
                      atomKey={"stake_unstakeModal_balance"}
                    ></BalanceInput>
                  </Flex>
                  <Flex
                    fontSize={12}
                    color={colorMode === "dark" ? "#8b8b93" : "gray.1000"}
                    h={"17px"}
                    justifyContent={"space-between"}
                    px={"6px"}
                  >
                    <Text>Your Balance</Text>
                    <Text>{unstakeData?.maxValue || "0"} LTOS</Text>
                  </Flex>
                </Flex>
              )}
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

export default UnstakeModal;
