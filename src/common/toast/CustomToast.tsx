import { BackgroundProps, Flex, Text, useToast } from "@chakra-ui/react";
import Image from "next/image";
import INFO_ICON from "assets/icons/info-icon.svg";
import CLOSE_ICON from "assets/icons/close-small-toast.svg";
import { useCallback, useRef, useState } from "react";
import idGenerator from "@/components/idGenerator";
import { ToastType } from "types/toast";
import { useRecoilState, useRecoilValue } from "recoil";
import { txInfoState, txInfo as txInfos } from "atom/global/tx";

function CustomToastComponent(props: {
  type: ToastType;
  message: string;
  id: string;
  onClose(): void;
}) {
  const { type, message, id, onClose } = props;
  const toast = useToast();
  const toastIdRef = useRef(null);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  function close() {
    setIsOpen(false);
  }

  return (
    <Flex
      w={"620px"}
      h={"60px"}
      pl={"15px"}
      pr={"20px"}
      bgColor={
        type === "success"
          ? "#257eee"
          : type === "confirmed"
          ? "#50d1b2"
          : type === "Warning"
          ? "#ec8c56"
          : "#e23738"
      }
      alignItems={"center"}
      justifyContent={"space-between"}
      borderRadius={14}
      display={isOpen ? "flex" : "none"}
    >
      <Flex>
        <Image src={INFO_ICON} alt={"info_icon"}></Image>
        <Text ml={"12px"} color={"#ffffff"}>
          {message}
        </Text>
      </Flex>
      <Flex cursor={"pointer"} onClick={close} w={"30px"} h={"30px"}>
        <Image src={CLOSE_ICON} alt={"CLOSE_ICON"}></Image>
      </Flex>
    </Flex>
  );
}

function CustomToast() {
  const toast = useToast();
  const txInfo = useRecoilValue(txInfoState);
  const [txInfosData, setTxInfosData] = useRecoilState(txInfos);

  const callToast = () => {
    try {
      if (txInfo && !toast.isActive(txInfo.id)) {
        toast({
          position: "top",
          duration: 5000,
          isClosable: true,
          id: txInfo.id,
          render: () => (
            <CustomToastComponent
              id={txInfo.id}
              message={txInfo.message}
              onClose={() => {}}
              type={txInfo.type}
            ></CustomToastComponent>
          ),
        });
      }
    } finally {
      setTxInfosData(null);
    }
  };
  return <>{callToast()}</>;
}

export default CustomToast;
