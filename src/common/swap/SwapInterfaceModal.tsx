import {
  Flex,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  useTheme,
  useColorMode,
  Tooltip,
  useMediaQuery,
  Grid,
  NumberInput,
  NumberInputField,
  Box,
  CircularProgress,
} from "@chakra-ui/react";
import { ethers, BigNumber } from "ethers";
import useModal from "hooks/useModal";
import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import CLOSE_ICON from "assets/icons/close-modal.svg";
import useTokenList from "hooks/swap/useTokenList";
import { useRecoilValue, useRecoilState } from "recoil";
import SelectToken from "./SelectToken";
import { selectedToken0, selectedToken1, swapTX, slip, focus } from "atom/swap";
import useBalance from "hooks/swap/useBalance";
import swap from "assets/swap.png";
import { useWeb3React } from "@web3-react/core";
import ConversionComponent from "./ConversionComponent";
import SettingsComponent from "./SettingsComponent";
import CONTRACT_ADDRESS from "services/addresses/contract";
import useCallContract from "hooks/useCallContract";
import useCheckApproved from "hooks/swap/useCheckApproved";
import { useBlockNumber } from "hooks/useBlockNumber";

function SwapInterfaceModal() {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const [token0, setToken0] = useRecoilState(selectedToken0);
  const [token1, setToken1] = useRecoilState(selectedToken1);
  // const { tx, data } = useRecoilValue(swapTX);
  const [tx, setTX] = useRecoilState(swapTX);
  const slippage = useRecoilValue(slip);
  const { account, library } = useWeb3React();
  const { token0Balance, token1Balance } = useBalance();
  const { TON_ADDRESS, WTON_ADDRESS, WETH_ADDRESS, SwapperV2Proxy } =
    CONTRACT_ADDRESS;
  const [smallerThan1024] = useMediaQuery("(max-width: 1024px)");
  const { selectedModalData, selectedModal, closeModal, isModalLoading } =
    useModal();
  const tokenList = useTokenList();
  const { blockNumber } = useBlockNumber();

  const [focused, setFocused] = useRecoilState(focus);
  const [swapFromAmt, setSwapFromAmt] = useState<string>("0");
  const [swapFromAmt2, setSwapFromAmt2] = useState<string>("0");
  const [invalidInput, setInvalidInput] = useState<boolean>(false);
  const [expected, setExpected] = useState<string>("0");
  const [maxError, setMaxError] = useState<boolean>(false);
  const [allowed, setAllowed] = useState<number>(0);
  // const [slippage, setSlippage] = useState<string>("");
  const [minAmount, setMinAmount] = useState<string>("");
  const approved = useCheckApproved();
  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
  const { ERC20_CONTRACT: Token0Contract, WTON_CONTRACT } = useCallContract(
    token0.address !== ZERO_ADDRESS ? token0.address : undefined
  );

  const formatNumberWithCommas = (num: string) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const switchTokens = () => {
    const newToken0 = token1;
    const newToken1 = token0;
    const input1 = swapFromAmt;
    const input2 = swapFromAmt2;
    setSwapFromAmt(input2);
    setSwapFromAmt2(input1);
    setToken0(newToken0);
    Token0Contract;
    setToken1(newToken1);
  };
  const closeThisModal = useCallback(() => {
    setToken0({
      name: "",
      address: "",
      img: "",
    });
    setToken1({
      name: "",
      address: "",
      img: "",
    });
    closeModal();
  }, [closeModal]);

  const approve = useCallback(async () => {
    if (library && account && WTON_CONTRACT && Token0Contract) {
      let contract;
      if (
        ethers.utils.getAddress(token0.address) ===
        ethers.utils.getAddress(WTON_ADDRESS)
      ) {
        contract = WTON_CONTRACT;
      } else {
        contract = Token0Contract;
      }
      try {
        const totalSupply = await contract?.totalSupply();
        const receipt = await contract?.approve(SwapperV2Proxy, totalSupply);
        setTX({ tx: true, data: { name: "approve" } });
        if (receipt) {
          console.log("ggg");

          await receipt.wait();
          setTX({ tx: false, data: { name: "approve" } });
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, [library, account, WTON_CONTRACT, Token0Contract, tx]);

  useEffect(() => {
    setAllowed(Number(approved));
  }, [token0.address, approved]);

  useEffect(() => {
    if (tx.tx && !tx.data) {
      setSwapFromAmt("0");
      setSwapFromAmt2("0");
    }
  }, [tx, blockNumber]);
  
  return (
    <Modal
      isOpen={selectedModal === "swap_interface_modal"}
      isCentered
      onClose={closeThisModal}
    >
      <ModalOverlay className="modalOverlay" />
      <ModalContent
        bg={colorMode === "light" ? "white.100" : "#121318"}
        minW={"350px"}
        maxW={"350px"}
        // h={"651px"}
      >
        <ModalBody px={0} pt={"30px"}>
          <Flex w="100%" flexDir={"column"}>
            <Flex flexDir={"column"} pos={"relative"}>
              {/* Title Area*/}
              <Flex w={"100%"} justifyContent={"center"} mb={"33px"} h={"28px"}>
                <Text
                  color={colorMode === "light" ? "gray.800" : "white.200"}
                  fontSize={20}
                  fontWeight={600}
                >
                  Stake
                </Text>
                <Flex
                  pos={"absolute"}
                  right={"1.56em"}
                  cursor={"pointer"}
                  onClick={() => closeThisModal()}
                >
                  <Image src={CLOSE_ICON} alt={"CLOSE_ICON"}></Image>
                </Flex>
              </Flex>
              {/* Content Area*/}
              <Flex
                width={"100%"}
                justifyContent="center"
                flexDir={"column"}
                px="20px"
              >
                <SelectToken tokenType={0} />
                <Flex
                  justifyContent={"space-between"}
                  alignItems="center"
                  color={"#3d495d"}
                  fontSize="14px"
                >
                  <Text mt="18px" mb="8px" textAlign={"left"}>
                    Balance: {formatNumberWithCommas(token0Balance)}
                  </Text>
                  <Text
                    fontSize={"14px"}
                    color={"#3d495d"}
                    fontWeight="bold"
                    onClick={() => {
                      setFocused("input1");
                      setSwapFromAmt(token0Balance);
                    }}
                    _hover={{ cursor: "pointer" }}
                  >
                    MAX
                  </Text>
                </Flex>
                <Flex
                  position={"relative"}
                  border={
                    invalidInput ? "solid 1px #e53e3e" : "solid 1px #dfe4ee"
                  }
                  height={"56px"}
                  w={"310px"}
                  flexDir={"row"}
                  borderRadius={"4px"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  pr={"18px"}
                >
                  <NumberInput
                    height={"56px"}
                    w={"230px"}
                    color={"#86929d"}
                    pl={"24px"}
                    border={"none"}
                    fontSize={"18px"}
                    borderRadius={"4px"}
                    borderColor={"transparent"}
                    _focus={{
                      borderColor: "transparent",
                    }}
                    _active={{
                      borderColor: "transparent",
                    }}
                    focusBorderColor="transparent"
                    _hover={{
                      borderColor: "transparent",
                    }}
                    onClick={() => setFocused("input1")}
                    // defaultValue={0}
                    value={focused === "input1" ? swapFromAmt : expected}
                    onChange={(e) => {
                      const valueNum = e;
                      setSwapFromAmt(valueNum);
                    }}
                  >
                    <NumberInputField
                      border={"none"}
                      height={"56px"}
                      outline={"none"}
                      borderColor={"transparent"}
                      pl={"0px"}
                    />
                  </NumberInput>
                </Flex>
                <Flex
                  h={"40px"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  flexDir={"row"}
                  my="18px"
                >
                  <Box h={"1px"} bg={"#e9edf1"} w="310px"></Box>
                  <Button
                    position={"absolute"}
                    w={"40px"}
                    h={"40px"}
                    backgroundColor={"#e9edf1"}
                    borderRadius={"50%"}
                    //   onClick={switchTokens}
                    _hover={{}}
                    _focus={{}}
                    _active={{}}
                  >
                    <Flex
                      height={"17px"}
                      width={17}
                      position={"absolute"}
                      onClick={() => switchTokens()}
                      borderRadius="50%"
                      bg="#e9edf1"
                    >
                      <Image src={swap} />
                    </Flex>
                  </Button>
                </Flex>
                <SelectToken tokenType={1} />
                <Text
                  mt="18px"
                  mb="8px"
                  textAlign={"left"}
                  color={"#3d495d"}
                  fontSize="14px"
                >
                  Balance: {token1Balance}
                </Text>
                <Flex
                  position={"relative"}
                  border={
                    invalidInput || maxError
                      ? "solid 1px #e53e3e"
                      : "solid 1px #dfe4ee"
                  }
                  height={"56px"}
                  w={"310px"}
                  flexDir={"row"}
                  borderRadius={"4px"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  pr={"18px"}
                >
                  <NumberInput
                    height={"56px"}
                    w={"310px"}
                    color={"#86929d"}
                    pl={"24px"}
                    border={"none"}
                    fontSize={"18px"}
                    borderRadius={"4px"}
                    borderColor={"transparent"}
                    _focus={{
                      borderColor: "transparent",
                    }}
                    _active={{
                      borderColor: "transparent",
                    }}
                    focusBorderColor="transparent"
                    _hover={{
                      borderColor: "transparent",
                    }}
                    defaultValue={0}
                    value={focused === "input2" ? swapFromAmt2 : expected}
                    onClick={() => setFocused("input2")}
                    onChange={(e) => {
                      const valueNum = e;
                      setSwapFromAmt2(valueNum);
                    }}
                  >
                    <NumberInputField
                      border={"none"}
                      height={"56px"}
                      outline={"none"}
                      borderColor={"transparent"}
                      pl={"0px"}
                    />
                  </NumberInput>
                </Flex>
                {maxError && (
                  <Text
                    color={"#e53e3e"}
                    textAlign="left"
                    fontSize={"10px"}
                    mt="5px"
                  >
                    Not enough liquidity in the pool
                  </Text>
                )}
                <Flex
                  alignItems={"center"}
                  justifyContent="space-between"
                  h={"24px"}
                  my={"12px"}
                >
                  <Text fontSize={"10px"}>
                    Tokamak Swap Protocol wants to use your{" "}
                    {token0.name ? token0.name : "tokens"}
                  </Text>
                  <Button
                    backgroundColor={"#007aff"}
                    color={"#fff"}
                    h={"24px"}
                    w={"55px"}
                    fontSize={"10px"}
                    fontWeight="normal"
                    borderRadius={"12px"}
                    _disabled={{
                      backgroundColor: "#e9edf1",
                      color: "#8f96a1",
                    }}
                    _hover={{}}
                    _active={{}}
                    disabled={
                      token0.address === "" ||
                      tx.tx === true ||
                      !account ||
                      allowed > Number(swapFromAmt) ||
                      token0.address === ZERO_ADDRESS
                    }
                    onClick={() => approve()}
                  >
                    {tx.tx === true && tx.data ? (
                      <CircularProgress
                        isIndeterminate
                        size={4}
                        zIndex={100}
                        color="blue.500"
                        pos="absolute"
                      />
                    ) : (
                      "Approve"
                    )}
                  </Button>
                </Flex>
                <ConversionComponent
                  expectedAmnt={expected}
                  slippage={slippage}
                  minAmount={minAmount}
                  focused={focused}
                  swapFromAmt2={swapFromAmt2}
                />
                <SettingsComponent />
                <Button
                  borderRadius={"28px"}
                  border={"none"}
                  padding={"16px 118px"}
                  mb={"10px"}
                  ml="15px"
                  // cursor={
                  //   !Number(swapFromAmt) || !account || invalidInput ? "not-allowed" : "pointer"
                  // }
                  w={"280px"}
                  backgroundColor={account ? "#007aff" : "#e9edf1"}
                  color={account ? "#fff" : "#8f96a1"}
                  height={"56px"}
                  fontSize={"18px"}
                  fontWeight="normal"
                  _disabled={{
                    backgroundColor: "#e9edf1",
                    color: "#8f96a1",
                  }}
                  _hover={{}}
                  _active={{}}
                  disabled={
                    tx.tx === true ||
                    token0.address === "" ||
                    Number(token0Balance) === 0 ||
                    maxError ||
                    token1.address === "" ||
                    allowed < Number(swapFromAmt) ||
                    (Number(swapFromAmt) === 0 && Number(swapFromAmt2) === 0) ||
                    token0.address === token1.address ||
                    Number(swapFromAmt) > Number(token0Balance)
                  }
                  // onClick={
                  //   focused === "input1"
                  //     ? () =>
                  //         swapExactInput(
                  //           library,
                  //           account,
                  //           selectedToken0.address,
                  //           selectedToken1.address,
                  //           swapFromAmt,
                  //           slippage
                  //         )
                  //     : () =>
                  //         swapExactOutput(
                  //           library,
                  //           account,
                  //           selectedToken1.address,
                  //           selectedToken0.address,
                  //           swapFromAmt2,
                  //           slippage
                  //         )
                  // }
                >
                  {tx.tx === true && !tx.data ? (
                    <CircularProgress
                      isIndeterminate
                      size={"32px"}
                      zIndex={100}
                      color="blue.500"
                      pos="absolute"
                    ></CircularProgress>
                  ) : (
                    <Text>
                      {account
                        ? token0.address === "" || token1.address === ""
                          ? "Select Tokens"
                          : token0.address.toLowerCase() ===
                              WTON_ADDRESS.toLowerCase() &&
                            token1.address.toLowerCase() ===
                              TON_ADDRESS.toLowerCase()
                          ? "Unwrap"
                          : token0.address.toLowerCase() ===
                              TON_ADDRESS.toLowerCase() &&
                            token1.address.toLowerCase() ===
                              WTON_ADDRESS.toLowerCase()
                          ? "Wrap"
                          : token0.address.toLowerCase() ===
                              ZERO_ADDRESS.toLowerCase() &&
                            token1.address.toLowerCase() ===
                              WETH_ADDRESS.toLowerCase()
                          ? "Wrap"
                          : token0.address.toLowerCase() ===
                              WETH_ADDRESS.toLowerCase() &&
                            token1.address.toLowerCase() ===
                              ZERO_ADDRESS.toLowerCase()
                          ? "Unwrap"
                          : "Swap"
                        : "Connect Wallet"}{" "}
                    </Text>
                  )}
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SwapInterfaceModal;
