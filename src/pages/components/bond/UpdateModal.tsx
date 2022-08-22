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
  Checkbox,
} from "@chakra-ui/react";
// import { CloseIcon } from "@chakra-ui/icons";
import { useRecoilValue } from "recoil";
import { selectedModalState } from "atom//global/modal";
import useModal from "hooks/useModal";
import Image from "next/image";
import CLOSE_ICON from "assets/icons/close-modal.svg";
import CustomCheckBox from "common/input/CustomCheckBox";
import SubmitButton from "common/button/SubmitButton";
import {ArrowForwardIcon} from '@chakra-ui/icons'
import { useState } from "react";
import {
  TextInput,
  BalanceInput,
  InputWithSymbol,
} from "common/input/TextInput";
import TokenSymbol from "common/token/TokenSymol";
import { builtinModules } from "module";
import BasicTooltip from "common/tooltip/index";

function StakeGraph() {
  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };
  const [sliderValue, setSliderValue] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const { colorMode } = useColorMode();
  return (
    <Flex w={"100%"} h="70px" pos="relative">
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
        <SliderTrack bg={colorMode === "light" ? "#e7edf3" : "#353d48"}>
          <SliderFilledTrack bg={"#2775ff"} />
        </SliderTrack>
        <Tooltip
          color={colorMode === "light" ? "#07070c" : "#f1f1f1"}
          placement="top"
          bg={"transparent"}
          w={"50px"}
          display="flex"
          alignItems="center"
          justifyContent={"center"}
          textAlign="center"
          fontSize={"15px"}
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

function BottomContent(props: {
  title: string;
  content: string;
  tooltip?: boolean;
  tooltipMessage?: string;
  secondTooltip?: string;
  secondContent?: string;
}) {
  const {
    title,
    content,
    tooltip,
    tooltipMessage,
    secondTooltip,
    secondContent,
  } = props;
  const { colorMode } = useColorMode();

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

       
        {secondContent ? (
          <Flex>
             <Text
          color={colorMode === "dark" ? "white.200" : "gray.800"}
          fontWeight={600}
          mr={'6px'}
        >
          {content}
        </Text>
        <BasicTooltip label={secondTooltip}/>
            <Text mx={'6px'}>/</Text>
            <Text>
            
              {secondContent}
            </Text>
          </Flex>
        ) : (
          <Text
          color={colorMode === "dark" ? "white.200" : "gray.800"}
          fontWeight={600}
        >
          {content}
        </Text>
        )}
      </Flex>
    </Flex>
  );
}

function Tile(props: {
  title: string;
  content: string;
  symbol?: string;
  tooltip: string;
}) {
  const { title, content, symbol, tooltip } = props;
  const { colorMode } = useColorMode();
  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      w={"152px"}
      alignItems={"center"}
      mb={"15px"}
    >
      <Flex alignItems={"center"}>
        <Text
          color={colorMode === "dark" ? "gray.100" : "gray.1000"}
          h={"17px"}
          mb={"3px"}
          fontWeight={600}
          fontSize={12}
          textAlign="center"
          mr={"6px"}
        >
          {title}
        </Text>

        <BasicTooltip label={tooltip} />
      </Flex>

      <Flex fontWeight={"bold"} h={"33px"}>
        <Text
          color={colorMode === "dark" ? "white.100" : "gray.800"}
          fontSize={24}
          mr={2}
        >
          {content}
        </Text>
        <Text
          color={colorMode === "dark" ? "white.200" : "gray.800"}
          fontSize={14}
          pt={"5px"}
          lineHeight={"33px"}
        >
          {symbol ? symbol : ""}
        </Text>
      </Flex>
    </Box>
  );
}

function UpdateModal() {
  const selectedModal = useRecoilValue(selectedModalState);
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { closeModal } = useModal();
  const [isTosChecked, setIsTosChecked] = useState(false);
  const contentList = [
    {
      title: "You Give",
      content: "10 DAI ",
      tooltip: false,
    },
    {
      title: "Current Balance",
      content: "10 LTOS",
      tooltip: true,
      tooltipMessage: "Amount of LTOS and sTOS before the update.",
      secondTooltip:
        "Currently worth 200 TOS. As LTOS index increases, the number of TOS you can get from unstaking LTOS will also increase.",
      secondContent: "100 sTOS",
    },
    {
      title: "New Balance",
      content: "12 LTOS ",
      tooltip: true,
      tooltipMessage: "Amount of LTOS and sTOS after the update.",
      secondTooltip:
        "Currently worth 200 TOS. As LTOS index increases, the number of TOS you can get from unstaking LTOS will also increase.",
      secondContent: "100 sTOS",
    },
    {
      title: "Current End Time",
      content: "2022. 01.10. 21:12 (UTC+9)",
      tooltip: true,
      tooltipMessage: "Lock-Up period end time before the update.",
    },
    {
      title: "New End Time",
      content: "2022. 01.12. 23:12 (UTC+9)",
      tooltip: true,
      tooltipMessage: "Lock-Up period end time after the update.",
    },
  ];

  return (
    <Modal
      isOpen={selectedModal === "update_modal"}
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
              <Flex w={"100%"} justifyContent={"center"} mb={"33px"} h={"28px"}>
                <Flex alignItems={"center"} h={"28px"}>
                  <Text
                    lineHeight={0.9}
                    color={colorMode === "light" ? "gray.800" : "white.200"}
                    fontSize={20}
                    fontWeight={600}
                    mr={"6px"}
                  >
                    Update
                  </Text>

                  <BasicTooltip
                    label={
                      "Increase sTOS by staking additional TOS or/and extending the Lock-Up period."
                    }
                  />
                </Flex>

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
                <Flex w={"100%"} justifyContent={"space-between"} mb={"9px"}>
                  <Tile
                    title={"Next Rebase"}
                    content={"05:50:20"}
                    tooltip={"Time left until LTOS index is increased."}
                  />

                  <Tile
                    title={"LTOS Index"}
                    content={"100"}
                    symbol={"TOS"}
                    tooltip={"Number of TOS you get when you unstake 1 LTOS. LTOS index increases every 8 hours."}
                  />
                </Flex>
                <Flex mb={"9px"} justifyContent="flex-start">
                  <InputWithSymbol
                    w={"360px"}
                    h={45}
                    atomKey={"stake_stake_modal_balance"}
                  ></InputWithSymbol>
                  <Flex ml={"15px"} alignItems={"center"}>
                    <Checkbox
                      size={"lg"}
                      style={{
                        borderRadius: "4px",
                        borderColor:
                          colorMode === "dark" ? "#535353" : "#c6cbd9",
                      }}
                      isChecked={isTosChecked}
                      onChange={() => setIsTosChecked(!isTosChecked)}
                    />
                    <Text ml={"9px"} fontSize={"12px"}>
                      Add TOS
                    </Text>
                  </Flex>
                </Flex>
                <Flex
                  fontSize={12}
                  color={colorMode === "dark" ? "#8b8b93" : "gray.1000"}
                  h={"17px"}
                  justifyContent={"space-between"}
                  mb={"12px"}
                  w={"360px"}
                >
                  <Text>Your Balance</Text>
                  <Text>1,000 WTON</Text>
                </Flex>
                {isTosChecked ? (
                  <Flex flexDir={"column"}>
                    {" "}
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
                  </Flex>
                ) : (
                  <></>
                )}
                <Flex fontSize={12} alignItems="center">
                  <Text
                    mr={"24px"}
                    color={colorMode === "light" ? "gray.800" : "white.200"}
                  >
                    New Lock-Up Period
                  </Text>
                  <Flex
                    w={"120px"}
                    h={"39px"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    borderRadius={"8px"}
                    borderColor={colorMode === "light" ? "#e8edf2" : "#313442"}
                    borderWidth="1px"
                  >
                    <Text mr={"6px"}>52 Weeks</Text>

                    <BasicTooltip label={"The current lock-up period."} />
                  </Flex>
                  <ArrowForwardIcon mx={'14px'} w={'16px'} h={'16px'} color={'blue.100'}/>
                  <TextInput
                    w={"150px"}
                    h={"39px"}
                    atomKey={"stake_stake_modal_period"}
                  ></TextInput>
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
                      tooltip={content.tooltip}
                      tooltipMessage={content.tooltipMessage}
                      secondContent={content.secondContent}
                      secondTooltip={content.secondTooltip}
                    ></BottomContent>
                  );
                })}
              </Flex>
            </Flex>
            <Flex justifyContent={"center"} mb={"21px"}>
              <SubmitButton w={460} h={42} name="Update"></SubmitButton>
            </Flex>
            {/* <Flex
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
            </Flex> */}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default UpdateModal;
