import { Flex, Text, useColorMode } from "@chakra-ui/react";
import Image from "next/image";
import Tooltips_left_arrow from "assets/icons/Tooltips_left_arrow.svg";
import useClient from "hooks/useClient";
import useModal from "hooks/useModal";
import ETH_SYMBOL from "assets/icons/eth_24.svg";
import { useWeb3React } from "@web3-react/core";

function NetworkIcon() {
  const { isConnectedToChain, networkName } = useClient();
  const { openModal } = useModal("network_swtich");
  const { account } = useWeb3React();
  const { colorMode } = useColorMode();

  if (account) {
    return (
      <Flex
        w={"48px"}
        h={"48px"}
        bg={
          isConnectedToChain
            ? "#f29b37"
            : colorMode === "dark"
            ? "#080808"
            : "#ffffff"
        }
        border={
          isConnectedToChain
            ? "1px solid #fdb018"
            : colorMode === "dark"
            ? "1px solid #313442"
            : "1px solid #e8edf2"
        }
        borderRadius={8}
        justifyContent={"center"}
        alignItems={"center"}
        pos={"relative"}
        cursor={"pointer"}
        onClick={() => openModal()}
      >
        <Image src={ETH_SYMBOL} alt={"eth_24"}></Image>
        {isConnectedToChain === false && (
          <Flex
            pos={"absolute"}
            w={"262px"}
            h={"59px"}
            bg={"#1f2128"}
            borderRadius={3}
            fontSize={14}
            color={"#2775ff"}
            mt={"130px"}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Flex
              transform={"rotate(270deg)"}
              position={"absolute"}
              mb={"66px"}
            >
              <Image src={Tooltips_left_arrow} alt={"tooltip_arrow"}></Image>
            </Flex>
            <Text>Please connect to {networkName} </Text>
            <Text>to use this service.</Text>
          </Flex>
        )}
      </Flex>
    );
  }

  return null;
}

export default NetworkIcon;
