import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import INFO_ICON from "assets/icons/info-icon.svg";
import CLOSE_ICON from "assets/icons/close-modal.svg";

function CustomToast(props: {
  type: "success" | "error" | "confirmed" | "Warning";
  message: string;
}) {
  const { type, message } = props;
  return (
    <Flex w={"620px"} h={"60px"} pl={"15px"}>
      <Flex>
        <Image src={INFO_ICON} alt={"info_icon"}></Image>
        <Text>{message}</Text>
      </Flex>
      <Flex
        pos={"absolute"}
        right={"1.56em"}
        cursor={"pointer"}
        onClick={() => {}}
      >
        <Image src={CLOSE_ICON} alt={"CLOSE_ICON"}></Image>
      </Flex>
    </Flex>
  );
}

export default CustomToast;
