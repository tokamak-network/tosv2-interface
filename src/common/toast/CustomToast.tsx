import { BackgroundProps, Flex, Text, useToast } from "@chakra-ui/react";
import Image from "next/image";
import INFO_ICON from "assets/icons/info-icon.svg";
import CLOSE_ICON from "assets/icons/close-small-toast.svg";
import { useCallback, useRef, useState } from "react";
import idGenerator from "@/utils/idGenerator";
import { ToastType } from "types/toast";
import { useRecoilState, useRecoilValue } from "recoil";
import { txInfoState, txInfo as txInfos } from "atom/global/tx";
import { PageKey } from "types";
import { useRouter } from "next/router";

function CustomToastComponent(props: {
  type: ToastType;
  message: string;
  id: string;
  onClose(): void;
  link?: PageKey;
}) {
  const { type, message, id, onClose, link } = props;
  const toast = useToast();
  const toastIdRef = useRef(null);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const router = useRouter();

  function close() {
    setIsOpen(false);
  }

  return (
    <Flex
      w={"340px"}
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
      <Flex color={"#ffffff"}>
        <Image
          src={INFO_ICON}
          alt={"info_icon"}
          // style={{ marginRight: "12px" }}
        ></Image>
        {message !== "Bond purchase success! Go to" ? (
          <Text w={"320px"} ml={"12px"}>
            {message}
          </Text>
        ) : (
          <Flex flexDir={"column"} w={"320px"} ml={"12px"}>
            <Text>Bond purchase success!</Text>
            <Flex>
              <Text>Go to </Text>
              <Text
                ml={"5px"}
                onClick={() =>
                  router.push(link === "Stake_screen" ? "/stake" : "/bond")
                }
                color={"blue.200"}
                cursor={"pointer"}
              >
                {link === "Stake_screen" ? "Stake" : "Bond"}
              </Text>
              <Text>.</Text>
            </Flex>
          </Flex>
        )}
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
              link={txInfo.link}
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
