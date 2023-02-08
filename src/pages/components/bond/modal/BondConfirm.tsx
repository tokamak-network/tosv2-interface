import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Box,
  Heading,
  Text,
  Flex,
  useTheme,
  useColorMode,
  Checkbox,
  Link,
} from "@chakra-ui/react";
import Image from "next/image";
import CLOSE_ICON from "assets/icons/close-modal.svg";
import { useState } from "react";
import SubmitButton from "common/button/SubmitButton";

const BondConfirm = (props: {
  isOpenConfirm: boolean;
  setIsOpenConfirm: any;
  callBond: any;
}) => {
  const theme = useTheme();
  const { isOpenConfirm, setIsOpenConfirm, callBond } = props;
  const { colorMode } = useColorMode();

  return (
    <Modal
      isOpen={isOpenConfirm}
      isCentered
      onClose={() => setIsOpenConfirm(false)}
    >
      <ModalOverlay />
      <ModalContent
        fontFamily={theme.fonts.roboto}
        bg={colorMode === "light" ? "white.100" : "black.200"}
        maxW="500px"
        p={0}
        // h={"568px"}
      >
        <ModalBody
          p={0}
          className={"modalOverlay"}
          bg={colorMode === "light" ? "white.100" : "black.200"}
          boxShadow={"none"}
        >
          <Box pt={"1.250em"} pb={"1.250em"}>
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              pos={"relative"}
            >
              <Heading
                fontSize={"1.250em"}
                fontWeight={"bold"}
                fontFamily={theme.fonts.titil}
                color={colorMode === "light" ? "gray.100" : "white.100"}
                textAlign={"center"}
              >
                Warning
              </Heading>
              <Flex position={"absolute"} right={"25px"}>
                <Image
                  src={CLOSE_ICON}
                  style={{
                    cursor: "pointer",
                    right: "15px",
                    position: "absolute",
                  }}
                  alt={"CLOSE_ICON"}
                  onClick={() => setIsOpenConfirm(false)}
                ></Image>
              </Flex>
            </Flex>
          </Box>

          <Flex
            flexDir="column"
            alignItems="center"
            mt={"11px"}
            mb={"24px"}
            pl={"25px"}
            pr={"6px"}
            fontSize={13}
            color={colorMode === "light" ? "gray.100" : "white.100"}
          >
            <Flex w={"100%"} flexDir={"column"}>
              <Flex
                w={"100%"}
                // h={"300px"}
                overflow={"auto"}
                fontSize={13}
                css={{
                  "&::-webkit-scrollbar": {
                    width: "6px",
                  },
                  "::-webkit-scrollbar-track": {
                    background: "transparent",
                    borderRadius: "4px",
                  },
                  "::-webkit-scrollbar-thumb": {
                    background: "#257eee",
                    borderRadius: "3px",
                  },
                }}
              >
                <Flex
                  fontSize={12}
                  textAlign="center"
                  w={"100%"}
                  //   mt={"21px"}
                  mb={"20px"}
                  flexDir={"column"}
                  color={colorMode === "dark" ? "gray.100" : "gray.700"}
                  //   color={"#e23738"}
                >
                  <Text>
                    Currently, it is cheaper to purchase TOS from Uniswap V3 (
                    <Link
                      isExternal={true}
                      href={
                        "https://app.uniswap.org/#/swap?inputCurrency=0xc4A11aaf6ea915Ed7Ac194161d2fC9384F15bff2&outputCurrency=0x409c4D8cd5d2924b9bc5509230d16a61289c8153"
                      }
                      color={colorMode ==='dark'? "white.200": "gray.800"}
                      textDecoration={"underline"}
                    >
                      WTON
                    </Link>
                    ,
                    <Link
                      isExternal={true}
                      href={
                        "https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x409c4D8cd5d2924b9bc5509230d16a61289c8153"
                      }
                      color={colorMode ==='dark'? "white.200": "gray.800"}
                      textDecoration={"underline"}
                    >
                      {" "}
                      ETH
                    </Link>
                    )
                  </Text>
                  <Text>
                    and{" "}
                    <Link
                      isExternal={true}
                      href={"https://tosv2.tokamak.network/stake"}
                      color={colorMode ==='dark'? "white.200": "gray.800"}
                      textDecoration={"underline"}
                    >
                      stake
                    </Link>{" "}
                    them for LTOS. You can continue bonding,
                  </Text>
                  <Text>
                    if you would like to purchase LTOS without impacting the
                    price.
                  </Text>
                </Flex>
                <Flex></Flex>
              </Flex>
            </Flex>
          </Flex>

          {/* <Box mt={"25px"} mb={"25px"} px={"15px"}>
            <Line></Line>
          </Box> */}

          <Box
            as={Flex}
            alignItems="center"
            justifyContent="center"
            mb={"24px"}
          >
            <SubmitButton name="Confirm" onClick={callBond}></SubmitButton>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BondConfirm;
