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
} from "@chakra-ui/react";
// import { CloseIcon } from "@chakra-ui/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedModalState } from "atom/global/modal";
import useModal from "hooks/useModal";
import Image from "next/image";
import CLOSE_ICON from "assets/icons/close-modal.svg";
import CustomCheckBox from "common/input/CustomCheckBox";
import SubmitButton from "common/button/SubmitButton";
import { useState } from "react";
import { TextInput, BalanceInput } from "common/input/TextInput";
import { inputBalanceState, inputState } from "atom/global/input";
import useUser from "hooks/useUser";

function StakeGraph() {
  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };
  const oldValues = useRecoilValue(inputBalanceState);
  const [value, setValue] = useRecoilState(inputState);

  console.log(oldValues);

  const [sliderValue, setSliderValue] = useState(36);
  return (
    <Flex w={"100%"} h={"157.5px"} pos="relative">
      {/* diagonal line */}
      <Box
        pos={"absolute"}
        w={"100%"}
        h={"2px"}
        bgColor={"#353d48"}
        transform={`rotate(165.5deg)`}
        top={"69px"}
        borderRadius={6}
      ></Box>
      <Flex
        pos={"absolute"}
        alignItems={"flex-end"}
        w={"100%"}
        h={"150px"}
        pb={`${sliderValue * 2.2}px`}
      >
        <Box
          w={`${(sliderValue - 1) * 2.9}%`}
          h={"2px"}
          bgColor={"#2775ff"}
          transform={`rotate(165.5deg)`}
          borderRadius={6}
        ></Box>
      </Flex>
      <Flex pos={"absolute"} alignSelf={"flex-end"} pb={"7px"}>
        <Box
          opacity={0.5}
          borderTop={`${sliderValue * 4.3}px solid transparent`}
          borderRight={`${sliderValue * 16.5}px solid #2775ff`}
          lineHeight={0}
        ></Box>
      </Flex>
      <Slider
        aria-label="slider-ex-1"
        defaultValue={36}
        min={1}
        max={36}
        step={1}
        onChange={(val: any) => setValue({ stake_stake_modal_period: val })}
        h={"10px"}
        alignSelf={"end"}
      >
        {/* <SliderMark value={25} {...labelStyles}>
          25%
        </SliderMark> */}
        <SliderMark
          value={sliderValue}
          textAlign="center"
          bg="blue.500"
          color="white"
          mt="-10"
          ml="-5"
          w="12"
        >
          {sliderValue} STOS
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Flex>
  );
}

function BottomContent(props: { title: string; content: string }) {
  const { title, content } = props;
  return (
    <Flex>
      <Flex w={"100%"} justifyContent={"space-between"} fontSize={14}>
        <Text color={"#8b8b93"}>{title}</Text>
        <Text color={"white.200"} fontWeight={600}>
          {content}
        </Text>
      </Flex>
    </Flex>
  );
}

function StakeModal() {
  const selectedModal = useRecoilValue(selectedModalState);
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { closeModal } = useModal();
  const balanceValue = useRecoilValue(inputBalanceState);
  const { userBalance } = useUser();

  const contentList = [
    {
      title: "Amount",
      content: "1,000 WTON",
    },
    {
      title: "Amount",
      content: "1,000 WTON",
    },
    {
      title: "Amount",
      content: "1,000 WTON",
    },
    {
      title: "Amount",
      content: "1,000 WTON",
    },
    {
      title: "Amount",
      content: "1,000 WTON",
    },
    {
      title: "Amount",
      content: "1,000 WTON",
    },
  ];

  return (
    <Modal
      isOpen={selectedModal === "stake_stake_modal"}
      isCentered
      onClose={closeModal}
    >
      <ModalOverlay />
      <ModalContent
        // fontFamily={theme.fonts.roboto}
        bg={colorMode === "light" ? "#121318" : "#121318"}
        minW="43.75em"
        // h="704px"
      >
        <ModalBody px={0} pt={"30px"}>
          <Flex w="100%" flexDir={"column"}>
            {/*TOP Area*/}
            <Flex flexDir={"column"} pos={"relative"}>
              {/* Title Area*/}
              <Flex w={"100%"} justifyContent={"center"} mb={"33px"}>
                <Text color={"white.200"} fontSize={20} fontWeight={600}>
                  Stake
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
              {/* Content Area*/}
              <Flex w={"100%"} px={"120px"} flexDir={"column"} mb={"29px"}>
                <Flex mb={"9px"}>
                  <BalanceInput
                    w={"100%"}
                    h={45}
                    atomKey={"stake_stake_modal_balance"}
                  ></BalanceInput>
                </Flex>
                <Flex
                  fontSize={12}
                  color={"#8b8b93"}
                  h={"17px"}
                  justifyContent={"space-between"}
                  mb={"12px"}
                >
                  <Text>Your Balance</Text>
                  <Text>{userBalance.TOSBalance} TOS</Text>
                </Flex>
                <Flex fontSize={12} alignItems="center">
                  <Text mr={"24px"}>Lock-Up Period</Text>
                  <CustomCheckBox></CustomCheckBox>
                  <Text ml={"9px"}>5 days Lock-Up</Text>
                  {/* <Input w={"120px"} h={"39px"} ml={"auto"}></Input> */}
                  <BalanceInput
                    w={"100%"}
                    h={45}
                    atomKey={"stake_stake_modal_period"}
                    value={balanceValue.stake_stake_modal_period}
                  ></BalanceInput>
                </Flex>
              </Flex>
              <Flex px={"49px"} mb={"30px"}>
                <StakeGraph></StakeGraph>
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
                    ></BottomContent>
                  );
                })}
              </Flex>
            </Flex>
            <Flex justifyContent={"center"} mb={"21px"}>
              <SubmitButton w={460} h={42} name="Approve"></SubmitButton>
            </Flex>
            <Flex
              fontSize={11}
              color={"#64646f"}
              textAlign="center"
              w={"100%"}
              mb={"24px"}
            >
              <Text w={"100%"}>
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

export default StakeModal;
