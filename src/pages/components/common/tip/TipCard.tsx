import { Flex, Text, useColorMode } from "@chakra-ui/react";
import { useState } from "react";
import Image from "next/image";
import CLOSE_ICON from "assets/icons/close-modal.svg";

function TipCard(props: { msg: string[] }) {
  const { msg } = props;
  const { colorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Flex
      display={isOpen ? "Flex" : "none"}
      w={"100%"}
      border={"1px solid #257eee"}
      mb={"24px"}
      borderRadius={"14px"}
      px={"30px"}
      justifyContent="space-between"
      py={"20px"}
    >
      <Flex flexDir={"column"}>
        {msg?.map((text: string, index: number) => (
          <Text key={text.length + index} color={"blue.100"} fontSize={"14px"}>
            {text}
          </Text>
        ))}
      </Flex>
      <Flex
        mt={"-5px"}
        minH={"30px"}
        maxH={"30px"}
        minW={"30px"}
        maxW={"30px"}
        _hover={{ cursor: "pointer" }}
        onClick={() => setIsOpen(false)}
      >
        <Image src={CLOSE_ICON} alt={"close"}></Image>
      </Flex>
    </Flex>
  );
}

export default TipCard;
