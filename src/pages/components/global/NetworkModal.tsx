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
} from "@chakra-ui/react";
import useModal from "hooks/useModal";
import CLOSE_ICON from "assets/icons/close-modal.svg";
import TokenSymbol from "common/token/TokenSymol";
import Image from "next/image";
import { useWeb3React } from "@web3-react/core";

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
          bg={"black.200"}
          p={"24px"}
          color={"white.100"}
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
                src={CLOSE_ICON}
                style={{ cursor: "pointer", right: "15px" }}
                alt={"CLOSE_ICON"}
                onClick={() => closeModal()}
              ></Image>
            </Flex>
            <Grid color={"white.100"} rowGap={"3px"}>
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
                    bg={isConnected ? "#70707c" : "#1f2128"}
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
                      <Text fontSize={16} fontWeight={600} ml={"15px"}>
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
