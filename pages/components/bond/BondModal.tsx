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
} from "@chakra-ui/react";
// import { CloseIcon } from "@chakra-ui/icons";
import { useRecoilValue } from "recoil";
import { selectedModalState } from "atom/global/modal";
import useModal from "hooks/useModal";
import Image from "next/image";
import CLOSE_ICON from "assets/icons/close-modal.svg";
import CustomCheckBox from "common/input/CustomCheckBox";
import SubmitButton from "common/button/SubmitButton";

function BondModal() {
  const selectedModal = useRecoilValue(selectedModalState);
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { closeModal } = useModal();

  return (
    <Modal
      isOpen={selectedModal === "bond_modal"}
      isCentered
      onClose={closeModal}
    >
      <ModalOverlay />
      <ModalContent
        // fontFamily={theme.fonts.roboto}
        bg={colorMode === "light" ? "#121318" : "#121318"}
        minW="43.75em"
        h="704px"
      >
        <ModalBody px={0} pt={"30px"}>
          <Flex w="100%" flexDir={"column"}>
            {/*TOP Area*/}
            <Flex flexDir={"column"} pos={"relative"}>
              {/* Title Area*/}
              <Flex w={"100%"} justifyContent={"center"} mb={"33px"}>
                <Text color={"white.200"} fontSize={20} fontWeight={600}>
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
                      color={"gray.100"}
                      h={"17px"}
                      mb={"3px"}
                      fontSize={12}
                      textAlign="center"
                    >
                      Bonding Price
                    </Text>
                    <Flex color={"white.200"} fontWeight={"bold"} h={"33px"}>
                      <Text fontSize={24} mr={2}>
                        441.5
                      </Text>
                      <Text fontSize={14} pt={"5px"} lineHeight={"33px"}>
                        WTON
                      </Text>
                    </Flex>
                  </Box>
                  <Box display={"flex"} flexDir={"column"}>
                    <Text
                      color={"gray.100"}
                      h={"17px"}
                      mb={"3px"}
                      fontSize={12}
                      textAlign="center"
                    >
                      Market Price
                    </Text>
                    <Flex color={"white.200"} fontWeight={"bold"} h={"33px"}>
                      <Text fontSize={24} mr={2}>
                        500.5
                      </Text>
                      <Text fontSize={14} pt={"5px"} lineHeight={"33px"}>
                        WTON
                      </Text>
                    </Flex>
                  </Box>
                </Flex>
                <Flex mb={"9px"}>
                  <Input
                    w={"100%"}
                    h={"45px"}
                    borderWidth={1}
                    borderColor={"#313442"}
                  ></Input>
                </Flex>
                <Flex
                  fontSize={12}
                  color={"#8b8b93"}
                  h={"17px"}
                  justifyContent={"space-between"}
                  mb={"12px"}
                >
                  <Text>Your Balance</Text>
                  <Text>1,000 WTON</Text>
                </Flex>
                <Flex fontSize={12} alignItems="center">
                  <Text mr={"24px"}>Lock-Up Period</Text>
                  <CustomCheckBox></CustomCheckBox>
                  <Text ml={"9px"}>5 days Lock-Up</Text>
                  <Input w={"120px"} h={"39px"} ml={"auto"}></Input>
                </Flex>
              </Flex>
              {/* Content Bottom */}
              <Flex px={"50px"}>
                <Flex w={"100%"} justifyContent={"space-between"} fontSize={14}>
                  <Text color={"#8b8b93"}>Amount</Text>
                  <Text color={"white.200"} fontWeight={600}>
                    1,000 WTON
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex justifyContent={"center"}>
              <SubmitButton w={460} h={42} name="Approve"></SubmitButton>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default BondModal;
