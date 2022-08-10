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
  Tooltip
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
  const { colorMode } = useColorMode();
  const [showTooltip, setShowTooltip] = useState(false)
  return (
    <Flex w={"100%"} h={"70px"} pos="relative">
      {/* diagonal line */}
      
      <Slider
        aria-label="slider-ex-1"
        defaultValue={0}
        min={0}
        max={156}
       
        onChange={(val: any) => setSliderValue(val)}
        h={"10px"}
        alignSelf={"end"}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <SliderMark value={0} {...labelStyles}>
          7d
        </SliderMark>
        <SliderMark value={8} {...labelStyles}>
       1m
        </SliderMark>
        <SliderMark value={24} {...labelStyles}>
         6m
        </SliderMark>
        <SliderMark value={52} {...labelStyles}>
       1y
        </SliderMark>
        <SliderMark value={104} {...labelStyles}>
        2y
        </SliderMark>
        <SliderMark value={156} {...labelStyles}>
        3y
        </SliderMark>
        <SliderTrack bg={colorMode ==='light'? '#e7edf3':'#353d48'}>
          <SliderFilledTrack bg={'#2775ff'}/>
        </SliderTrack >
        <Tooltip
        color={colorMode === 'light'? '#07070c':'#f1f1f1'}
        placement='top'
        bg={'transparent'}
        w={'50px'}
        display='flex'
        alignItems='center'
        justifyContent={'center'}
       textAlign='center'
        fontSize={'15px'}
      fontWeight={600}
        isOpen={showTooltip}
        label={`${sliderValue} sTOS`}

      >
       
         <SliderThumb />
      </Tooltip>
       
      </Slider>
    </Flex>
  );
}

function BottomContent(props: { title: string; content: string }) {
  const { colorMode } = useColorMode();
  const { title, content } = props;
  return (
    <Flex>
      <Flex w={"100%"} justifyContent={"space-between"} fontSize={14}>
        <Text color={colorMode === 'dark'? "gray.100":'gray.1000'}>{title}</Text>
        <Text color={colorMode === 'dark'?"white.200":'gray.800'} fontWeight={600}>
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
                <Text color={colorMode === "light" ? 'gray.800':"white.200"} fontSize={20} fontWeight={600}>
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
