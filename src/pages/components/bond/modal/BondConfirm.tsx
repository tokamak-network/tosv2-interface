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
  Input,
} from "@chakra-ui/react";
import Image from "next/image";
import CLOSE_ICON from "assets/icons/close-modal.svg";
import { useState } from "react";
import SubmitButton from "common/button/SubmitButton";
import useMediaView from "hooks/useMediaView";

const BondConfirm = (props: {
  isOpenConfirm: boolean;
  setIsOpenConfirm: any;
  callBond: any;
}) => {
  const theme = useTheme();
  const { isOpenConfirm, setIsOpenConfirm, callBond } = props;
  const { colorMode } = useColorMode();
  const { bp700px } = useMediaView();

  const [typeConfirm, setTypeConfirm] = useState<string | undefined>(undefined);

  const closeModal = () => {
    setIsOpenConfirm(false);
    setTypeConfirm(undefined);
  };

  return (
    <Modal
      isOpen={isOpenConfirm}
      //   isOpen={selectedModal === "bond_openConfirm_modal"}
      isCentered
      onClose={() => closeModal()}
    >
      <ModalOverlay className="modalOverlayDrawer" bg={"none"} />
      <ModalContent
        bg={colorMode === "light" ? "white.100" : "#121318"}
        minW={bp700px ? "350px" : "612px"}
        h={"340px"}
      >
        <ModalBody px={0} pt={"30px"}>
          {/* Title Area*/}
          <Flex w={"100%"} justifyContent={"center"} mb={"33px"} h={"28px"}>
            <Text
              color={colorMode === "light" ? "gray.800" : "white.200"}
              fontSize={20}
              fontWeight={600}
              ml="9px"
            >
              Are you sure?
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
          <Flex
            w={"100%"}
            flexDir={"column"}
            px={bp700px ? "20px" : "120px"}
            mb={"18px"}
            alignItems={"center"}
            justifyContent={"center"}
            textAlign={"center"}
            rowGap={"12px"}
            fontSize={14}
            color={"#8b8b93"}
          >
            <Text>
              Buying here is more expensive than <br /> Tokamak Network Swap or
              other exchanges
            </Text>
            <Text>Type &quot;confirm&quot; to proceed anyway</Text>
          </Flex>
          {/* Button Area*/}
          <Flex
            flexDir={"column"}
            rowGap={"30px"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Input
              w={"460px"}
              fontSize={14}
              color={"#64646f"}
              placeholder={"Type “confirm” here"}
              textAlign={"center"}
              onChange={(e) => {
                setTypeConfirm(e.target.value);
              }}
            ></Input>
            <SubmitButton
              w={"460px"}
              name="Confirm"
              onClick={() => {
                callBond();
                setIsOpenConfirm(false);
              }}
              isDisabled={typeConfirm !== "confirm"}
            ></SubmitButton>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BondConfirm;
