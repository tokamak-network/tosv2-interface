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

const Notice = () => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <Modal isOpen={isOpen} isCentered onClose={() => setIsOpen(false)}>
      <ModalOverlay className="modalOverlayDrawer"  bg={'none'}  />
      <ModalContent
        fontFamily={theme.fonts.roboto}
        bg={colorMode === "light" ? "white.100" : "black.200"}
        maxW="550px"
        // h={"568px"}
        pt="25px"
        pb="25px"
      >
        <ModalBody
          p={0}
          className={"modalOverlay"}
          bg={colorMode === "light" ? "white.100" : "black.200"}
        >
          <Box
            pt={"1.250em"}
            pb={"1.250em"}
            borderBottom={
              colorMode === "light" ? "1px solid #f4f6f8" : "1px solid #373737"
            }
          >
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              pos={"relative"}
            >
              <Heading
                fontSize={"1.250em"}
                fontWeight={"bold"}
                fontFamily={theme.fonts.titil}
                color={colorMode === "light" ? "gray.250" : "white.100"}
                textAlign={"center"}
              >
                Notice
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
                  onClick={() => setIsOpen(false)}
                ></Image>
              </Flex>
            </Flex>
          </Box>

          <Flex
            flexDir="column"
            alignItems="center"
            mt={"30px"}
            mb={"30px"}
            pl={"25px"}
            pr={"6px"}
            fontSize={13}
            color={colorMode === "light" ? "gray.250" : "white.100"}
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
                  flexDir={"column"}
                  w={"100%"}
                  pr={"20px"}
                  textAlign={"center"}
                >
                  {/* <Text fontSize={15} fontWeight="bold">
                    Notice
                  </Text> */}
                  <Text>
                    sTOS calculation for manage modal is unstable at the moment.
                    <br />
                    We will fix it as soon as possible. Sorry for the delay
                  </Text>
                </Flex>
                <Flex></Flex>
              </Flex>
            </Flex>
          </Flex>

          {/* <Box mt={"25px"} mb={"25px"} px={"15px"}>
            <Line></Line>
          </Box> */}

          <Box as={Flex} alignItems="center" justifyContent="center"></Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Notice;
