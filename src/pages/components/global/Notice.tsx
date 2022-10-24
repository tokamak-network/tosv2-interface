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
      <ModalOverlay />
      <ModalContent
        fontFamily={theme.fonts.roboto}
        bg={colorMode === "light" ? "white.100" : "black.200"}
        maxW="700px"
        h={"568px"}
        pt="25px"
        pb="25px"
      >
        <ModalBody p={0}>
          <Box
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
            pl={"25px"}
            pr={"6px"}
            fontSize={13}
            color={colorMode === "light" ? "gray.250" : "white.100"}
          >
            <Flex w={"100%"} flexDir={"column"}>
              <Flex
                w={"100%"}
                h={"300px"}
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
                <Flex flexDir={"column"} w={"100%"} pr={"20px"}>
                  <Text fontSize={15} fontWeight="bold">
                    Notice
                  </Text>
                  <Text>
                    <b>1.1</b> By accessing, browsing or using our platform,
                    system or website operated by us (collectively, the{" "}
                    <b>`&auot`Platform`&auot`</b>) or linked to our Platform, or
                    any page thereof, through any direct or indirect means
                    (individually or collectively), or by using or accessing the
                    facilities or services (each a <b>`&auot`Service`&auot`</b>,
                    as the case may be) offered in or through the Platform or
                    through alternative methods (including, for example,
                    telephone, mail, email or facsimile), you accept and agree
                    to be bound by these terms and any other document, terms or
                    conditions that form part of the same, as may be amended,
                    supplemented, modified or added from time to time (these{" "}
                    <b>`&auot`Terms of Use`&auot`</b>).
                  </Text>
                  <br />
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
