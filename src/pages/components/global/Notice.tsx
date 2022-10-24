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
      <ModalOverlay />
      <ModalContent
        fontFamily={theme.fonts.roboto}
        bg={colorMode === "light" ? "white.100" : "black.200"}
        maxW="700px"
        // h={"568px"}
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
                TOSv2 phase 1 public test announcement
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
                <Flex flexDir={"column"} w={"100%"} pr={"20px"}>
                  {/* <Text fontSize={15} fontWeight="bold">
                    Notice
                  </Text> */}
                  <Text>
                    <b>테스트 범위 : </b> 데스크탑 다크모드 크롬, Metamask &
                    Trezor <b>(모바일 + 라이트 버전은 제외)</b>
                    <br />
                    <b>테스트 피드백 제출 기간 : </b> 2022년 10월 31일 (KST,
                    UTC+9) 까지
                    <br />더 자세한 내용은 미디움{" "}
                    <Link
                      color={"#2a72e5"}
                      isExternal={true}
                      href="https://medium.com/onther-tech/grantos-tosv2-1-%EB%8B%A8%EA%B3%84-%EA%B3%B5%EA%B0%9C-%ED%85%8C%EC%8A%A4%ED%8A%B8-b3b8b32f59c4"
                    >
                      포스팅
                    </Link>
                    에서 확인.
                  </Text>
                  <br />
                  <Text>
                    <b>Testing platform : </b> Dark mode desktop chrome,
                    Metamask & Trezor, <b>excluding mobile + bright mode</b>
                    <br />
                    <b>Feedback submission deadline : </b> October 31st, 2022
                    (KST, UTC+9) <br />
                    For more details, check the medium{" "}
                    <Link
                      color={"#2a72e5"}
                      isExternal={true}
                      href="https://medium.com/onther-tech/grantos-tosv2-phase-1-public-test-473b34eb3198"
                    >
                      post
                    </Link>
                    .
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
