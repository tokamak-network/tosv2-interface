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
import { useRecoilValue } from "recoil";
import { selectedModalState } from "atom//global/modal";
import useModal from "hooks/useModal";
import Image from "next/image";
import CLOSE_ICON from "assets/icons/close-modal.svg";
import CustomCheckBox from "common/input/CustomCheckBox";
import SubmitButton from "common/button/SubmitButton";
import { useState } from "react";

function StakeGraph() {
  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };
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
        onChange={(val: any) => setSliderValue(val)}
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

function UnstakeModal() {
  const selectedModal = useRecoilValue(selectedModalState);
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { closeModal } = useModal();

  const contentList = [
    {
      title: "Unstakable Rewards",
      content: "100 TOS",
    },
    {
      title: "TOS APY",
      content: "30%",
    },
  ];

  return (
    <Modal
      isOpen={selectedModal === "stake_unstake_modal"}
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
        <ModalBody px={0} pt={"30px"} pb={"40px"}>
          <Flex w="100%" flexDir={"column"}>
            {/*TOP Area*/}
            <Flex flexDir={"column"} pos={"relative"}>
              {/* Title Area*/}
              <Flex w={"100%"} justifyContent={"center"} mb={"33px"}>
                <Text color={"white.200"} fontSize={20} fontWeight={600}>
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
              <SubmitButton w={460} h={42} name="Unstake"></SubmitButton>
              <SubmitButton
                w={460}
                h={42}
                name="Stake to get sTOS"
              ></SubmitButton>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default UnstakeModal;
