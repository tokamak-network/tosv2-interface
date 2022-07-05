import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import CLOSE_ICON from "assets/icons/close-small.svg";
import { useState } from "react";

function TipMessage() {
  const [isClosed, setIsClosed] = useState(false);

  if (isClosed) {
    return null;
  }

  return (
    <Flex
      w={"1136px"}
      h={"60px"}
      borderWidth={1}
      borderColor={"blue.100"}
      alignItems="center"
      justifyContent={"space-between"}
      mb={"24px"}
      borderRadius={14}
      pl={"30px"}
      pr={"20px"}
    >
      <Text color={"blue.100"}>
        Tip : New bonds are auto-staked (accrue rebase rewards) and no longer
        vest linearly.
      </Text>
      <Image
        src={CLOSE_ICON}
        alt={"CLOSE_ICON"}
        style={{ cursor: "pointer" }}
        onClick={() => setIsClosed(true)}
      ></Image>
    </Flex>
  );
}

export default TipMessage;
