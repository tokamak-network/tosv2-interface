import { Flex, Text, useColorMode } from "@chakra-ui/react";
import Image from "next/image";
import Tooltips_left_arrow from "assets/icons/Tooltips_left_arrow.svg";
import Tooltips_left_arrow_light from "assets/icons/Tooltips_left_arrow_light.svg";
import useClient from "hooks/useClient";
import useModal from "hooks/useModal";
import ETH_SYMBOL from "assets/icons/eth_24.svg";
import { useWeb3React } from "@web3-react/core";

function NetworkIcon() {
  const { isConnectedToChain, networkName } = useClient();
  const { openModal } = useModal("network_swtich");
  const { account, chainId } = useWeb3React();
  const { colorMode } = useColorMode();
  if (account) {
    return (
      <Flex
        w={"48px"}
        h={"48px"}
        bg={
          chainId === 5
            ? "#f29b37"
            : colorMode === "light"
            ? "#ffffff"
            : "#080808"
        }
        border={
          chainId === 5
            ? "#fdb018"
            : colorMode === "light"
            ? "1px solid #e8edf2"
            : "1px solid #313442"
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
            bg={colorMode === "dark" ? "#1f2128" : "#ffffff"}
            borderRadius={3}
            fontSize={14}
            color={colorMode === "dark" ? "#9a9aaf" : "#2e2e3a"}
            mt={"130px"}
            flexDir={"column"}
            border="1px solid"
            borderColor={colorMode === "dark" ? "#313442" : "#e8edf2"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Flex
              transform={colorMode === "dark" ? "rotate(270deg)" : ""}
              position={"absolute"}
              mb={"66px"}
            >
              <Image
                src={
                  colorMode === "dark"
                    ? Tooltips_left_arrow
                    : Tooltips_left_arrow_light
                }
                alt={"tooltip_arrow"}
              ></Image>
            </Flex>
            <Text>
              Please connect to{" "}
              <span style={{ color: "#f29b37" }}>{networkName}</span>{" "}
            </Text>
            <Text>to use this service.</Text>
          </Flex>
        )}
      </Flex>
    );
  }

  return null;
}

export default NetworkIcon;
