import {
  Box,
  Flex,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import useModal from "hooks/useModal";
import CLOSE_ICON from "assets/icons/close-modal(white).svg";
import CLOSE_ICON_LIGHT from "assets/icons/close-modal(dark).svg";

import TokenSymbol from "common/token/TokenSymol";
import Image from "next/image";
import { useWeb3React } from "@web3-react/core";
import { cp } from "fs";

const networkList = [
  {
    name: "Ethereum",
    chainId: 1,
    chainIdHex: "0x1",
    tokenType: "ETH",
  },
  {
    name: "Goerli",
    chainId: 5,
    chainIdHex: "0x5",
    tokenType: "ETH",
  },
];

function NetworkModal() {
  const { selectedModal, closeModal } = useModal();
  const { chainId, library } = useWeb3React();
  const { colorMode } = useColorMode();

  const changeNetwork = async (chainIdHex: string) => {
    //@ts-ignore
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainIdHex }], // chainId must be in hexadecimal numbers
    });
  };

  return (
    <Modal
      isOpen={selectedModal === "network_swtich"}
      isCentered
      onClose={() => closeModal()}
    >
      <ModalOverlay />
      <ModalContent w={"360px"} h={"223px"} borderRadius={16} p={0}>
        <ModalBody
          minW={"360px"}
          minH={"223px"}
          bg={colorMode === "dark" ? "black.200" : "white.0"}
          p={"24px"}
          borderRadius="16px"
          border={colorMode === "light" ? "solid 1px #e8edf2" : ""}
          color={colorMode === "dark" ? "white.100" : "gray.800"}
        >
          <Flex flexDir={"column"}>
            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
              mb={"15px"}
            >
              <Text fontSize={20} fontWeight={"bold"}>
                Switch Networks
              </Text>
              <Image
                src={colorMode === "dark" ? CLOSE_ICON : CLOSE_ICON_LIGHT}
                style={{ cursor: "pointer", right: "15px" }}
                alt={colorMode === "dark" ? 'CLOSE_ICON' : 'CLOSE_ICON_LIGHT'}
                onClick={() => closeModal()}
              ></Image>
            </Flex>
            <Grid
              color={colorMode === "dark" ? "white.100" : "gray.1100"}
              rowGap={"3px"}
            >
              {networkList.map((item) => {
                const isConnected = chainId === item.chainId;
                return (
                  <GridItem
                    w={"100%"}
                    h={"42px"}
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    borderRadius={8}
                    key={item.chainId}
                    cursor={isConnected ? "" : "pointer"}
                    bg={
                      isConnected
                        ? colorMode === "dark"
                          ? "#70707c"
                          : "#e2e2ea"
                        : colorMode === "dark"
                        ? "#1f2128"
                        : "#f5f5fa"
                    }
                    onClick={() => changeNetwork(item.chainIdHex)}
                  >
                    <Flex alignItems={"center"} pl={"12px"}>
                      <TokenSymbol
                        tokenType="ETH"
                        w={"28px"}
                        h={"28px"}
                        imageW="20px"
                        imageH="20px"
                      />
                      <Text fontSize={16} fontWeight={600} ml={"15px"}    color={colorMode === "dark" ? "white.100" : "#07070c"}>
                        {item.name}
                      </Text>
                    </Flex>
                    <Flex alignItems={"center"} pr={"12px"}>
                      <Text fontSize={11} mr={"12px"}>
                        {isConnected ? "Connected" : "Confirm in Wallet"}
                      </Text>
                      <Box
                        w={"8px"}
                        h={"8px"}
                        borderRadius={25}
                        bg={isConnected ? "#8cd31a" : "#fadf33"}
                      />
                    </Flex>
                  </GridItem>
                );
              })}
            </Grid>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default NetworkModal;
