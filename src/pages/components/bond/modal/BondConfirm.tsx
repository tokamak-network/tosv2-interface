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
  Checkbox,
  Link,
  Input,
} from "@chakra-ui/react";
import Image from "next/image";
import CLOSE_ICON from "assets/icons/close-modal.svg";
import { useState } from "react";
import SubmitButton from "common/button/SubmitButton";
import useMediaView from "hooks/useMediaView";
import { useRecoilState } from "recoil";
import { subModalState } from "atom/global/modal";
import { useCustomColorMode } from "hooks/style/useCustomColorMode";

const BondConfirm = (props: { callBond: any }) => {
  const theme = useTheme();
  const { callBond } = props;
  const { isDark } = useCustomColorMode();
  const { bp700px } = useMediaView();

  const [isOpenConfirm, setIsOpenConfirm] = useRecoilState(subModalState);
  const [typeConfirm, setTypeConfirm] = useState<string | undefined>(undefined);

  const closeModal = () => {
    setIsOpenConfirm(null);
    setTypeConfirm(undefined);
  };

  return (
    <Modal
      isOpen={isOpenConfirm === "bond_confirm"}
      // isOpen={true}
      isCentered
      onClose={() => closeModal()}
    >
      <ModalOverlay className="modalOverlayDrawer" bg={"none"} />
      <ModalContent
        bg={isDark ? "#121318" : "white.100"}
        minW={bp700px ? "350px" : "612px"}
        maxW={bp700px ? "350px" : "612px"}
        h={"340px"}
      >
        <ModalBody px={0} pt={"30px"}>
          {/* Title Area*/}
          <Flex w={"100%"} justifyContent={"center"} mb={"33px"} h={"28px"}>
            <Text
              color={isDark ? "white.200" : "gray.800"}
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
              w={bp700px ? "310px" : "460px"}
              fontSize={14}
              color={isDark ? "#f1f1f1" : "#7e7e8f"}
              _placeholder={{ color: "#7e7e8f" }}
              borderWidth={1}
              borderColor={isDark ? "#313442" : "#e8edf2"}
              placeholder={"Type “confirm” here"}
              textAlign={"center"}
              boxShadow={"none !important"}
              _hover={{
                borderColor: isDark ? "#535353" : "#c6cbd9",
              }}
              _focus={{
                color: isDark ? "#f1f1f1" : "07070c",
                borderColor: isDark ? " #8a8a98" : "#9a9aaf",
                outline: "none",
                boxShadow: "none !important",
              }}
              onChange={(e) => {
                setTypeConfirm(e.target.value);
              }}
            ></Input>
            <SubmitButton
              w={bp700px ? "310px" : "460px"}
              name="Confirm"
              onClick={() => {
                callBond();
                setIsOpenConfirm(null);
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
