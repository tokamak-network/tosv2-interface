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
import { TextInput, BalanceInput } from "common/input/TextInput";

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
  const { colorMode } = useColorMode();

  return (
    <Flex>
      <Flex w={"100%"} justifyContent={"space-between"} fontSize={14} mt={'9px'}>
      <Text color={colorMode === 'dark'? "gray.100":'gray.1000'}>{title}</Text>
        <Text color={colorMode === 'dark'?"white.200":'gray.800'} fontWeight={600}>
          {content}
        </Text>
      </Flex>
    </Flex>
  );
}

function BondModal() {
  const selectedModal = useRecoilValue(selectedModalState);
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { closeModal } = useModal();

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
      isOpen={selectedModal === "bond_modal"}
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
        <ModalBody px={0} pt={"30px"}>
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
                  WTON BOND
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
                <Flex w={"100%"} justifyContent={"space-between"} mb={"24px"}>
                  <Box display={"flex"} flexDir={"column"}>
                    <Text
                      color={colorMode === "dark" ? "gray.100" : "gray.1000"}
                      h={"17px"}
                      mb={"3px"}
                      fontWeight={600}
                      fontSize={12}
                      textAlign="center"
                    >
                      Bonding Price
                    </Text>
                    <Flex fontWeight={"bold"} h={"33px"}>
                      <Text
                        color={colorMode === "dark" ? "white.100" : "gray.800"}
                        fontSize={24}
                        mr={2}
                      >
                        441.5
                      </Text>
                      <Text
                        color={colorMode === "dark" ? "white.200" : "gray.800"}
                        fontSize={14}
                        pt={"5px"}
                        lineHeight={"33px"}
                      >
                        WTON
                      </Text>
                    </Flex>
                  </Box>
                  <Box display={"flex"} flexDir={"column"}>
                    <Text
                      color={colorMode === "dark" ? "gray.100" : "gray.1000"}
                      h={"17px"}
                      fontWeight={600}
                      mb={"3px"}
                      fontSize={12}
                      textAlign="center"
                    >
                      Market Price
                    </Text>
                    <Flex color={"white.200"} fontWeight={"bold"} h={"33px"}>
                      <Text
                        color={colorMode === "dark" ? "white.100" : "gray.800"}
                        fontSize={24}
                        mr={2}
                      >
                        500.5
                      </Text>
                      <Text
                        color={colorMode === "dark" ? "white.200" : "gray.800"}
                        fontSize={14}
                        pt={"5px"}
                        lineHeight={"33px"}
                      >
                        WTON
                      </Text>
                    </Flex>
                  </Box>
                </Flex>
                <Flex mb={"9px"}>
                <BalanceInput
                    w={"100%"}
                    h={45}
                    atomKey={"stake_stake_modal_balance"}
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
                  <Text>1,000 WTON</Text>
                </Flex>
                <Flex fontSize={12} alignItems="center">
                  <Text mr={"24px"}  color={colorMode === "light" ? "gray.800" : "white.200"}>Lock-Up Period</Text>
                  <CustomCheckBox
                    pageKey="Bond_screen"
                    value={""}
                    valueKey={""}
                  ></CustomCheckBox>
                  <Text ml={"9px"}>5 days Lock-Up</Text>
                  <TextInput w={"120px"} h={"39px"}   atomKey={"stake_stake_modal_period"}></TextInput>
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
              <Text w={"100%"}  color={colorMode ==='dark'? 'gray.200':'gray.700'}>
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

export default BondModal;
