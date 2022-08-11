import { Flex, Text, useColorMode } from "@chakra-ui/react";
import { useState } from "react";
import Image from "next/image";
import CLOSE_ICON from "assets/icons/close-modal.svg";

function BondTip() {
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
      justifyContent='space-between'
      py={"20px"}
    >
      <Text color={"blue.100"} fontSize={'14px'} w={'83%'}>
        Tip: Bond is a cheaper way to get TOS (in the form of LTOS) compared to
        using Uniswap. If the lock-up period is at least 1 week, you can also
        get sTOS, the governance token for TONStarter.
      </Text>
      <Flex mt={'-5px'} height={'30px'} w={'30px'} _hover={{cursor: 'pointer'}} onClick={()=> setIsOpen(false)}>
      <Image src={CLOSE_ICON} alt={'close'}></Image>
      </Flex>
     
    </Flex>
  );
}

export default BondTip;
