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
import {
  selectedToken0,
  selectedToken1,
  swapTX,
  slip,
  focus,
  swapToAmount,
  swapFromAmount,
} from "atom/swap";
import useBalance from "hooks/swap/useBalance";
import swap from "assets/swap.png";
import { useWeb3React } from "@web3-react/core";
import ConversionComponent from "./ConversionComponent";
import SettingsComponent from "./SettingsComponent";
import CONTRACT_ADDRESS from "services/addresses/contract";
import useCallContract from "hooks/useCallContract";
import useCheckApproved from "hooks/swap/useCheckApproved";
import { useBlockNumber } from "hooks/useBlockNumber";
import useExpectedOutput from "hooks/swap/useExpectedOutput";
import useExpectedInput from "hooks/swap/useExpectedInput";
import { getParams } from "@/utils/params";
import useCustomToast from "hooks/useCustomToast";
import {ZERO_ADDRESS} from 'constants/index'

function SwapInterfaceModal() {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const [token0, setToken0] = useRecoilState(selectedToken0);
  const [token1, setToken1] = useRecoilState(selectedToken1);
  const [toAmount, setToAmount] = useRecoilState(swapToAmount);
  const [fromAmount, setFromAmount] = useRecoilState(swapFromAmount);
  // const { tx, data } = useRecoilValue(swapTX);
  const [tx, setTX] = useRecoilState(swapTX);
  const { setTx } = useCustomToast();
  const [slippage, setSlippage] = useRecoilState(slip);
  const { account, library } = useWeb3React();
  const { token0Balance, token1Balance } = useBalance();
  const { TON_ADDRESS, WTON_ADDRESS, WETH_ADDRESS, SwapperV2Proxy } =
    CONTRACT_ADDRESS;
  const [smallerThan1024] = useMediaQuery("(max-width: 1024px)");
  const { selectedModalData, selectedModal, closeModal, isModalLoading } =
    useModal();
  const tokenList = useTokenList();
  const { blockNumber } = useBlockNumber();
  const {
    formattedResult,
    minimumAmountOutResult,
    amountInResult,
    formattedAmountOutResult,
  } = useExpectedOutput();

  const {
    formattedResultI,
    maximumAmountInResultI,
    amountInResultI,
    formattedAmountOutResultI,
    amountOutResultI,
    err,
    minimumAmountOutResultI,
  } = useExpectedInput();
  const [focused, setFocused] = useRecoilState(focus);
  // const [swapFromAmt, setSwapFromAmt] = useState<string>("0");
  // const [swapFromAmt2, setSwapFromAmt2] = useState<string>("0");
  const [invalidInput, setInvalidInput] = useState<boolean>(false);
  const [expected, setExpected] = useState<string>("0");
  const [maxError, setMaxError] = useState<boolean>(false);
  const [allowed, setAllowed] = useState<number>(0);
  // const [slippage, setSlippage] = useState<string>("");
  const [minAmount, setMinAmount] = useState<string>("");
  const approved = useCheckApproved();
  const {
    ERC20_CONTRACT: Token0Contract,
    WTON_CONTRACT,
    SwapperV2Proxy_CONTRACT,
    WETH_CONTRACT,
  } = useCallContract(
    token0.address !== ZERO_ADDRESS ? token0.address : undefined
  );

  const formatNumberWithCommas = (num: string) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
    setToAmount("0");
    setFromAmount("0");
    setSlippage("0");
    closeModal();
    setFocused("input1");
    setExpected("0");
  }, [
    closeModal,
    setToAmount,
    setFromAmount,
    setSlippage,
    setFocused,
    setExpected,
    setToken0,
    setToken1,
  ]);


  const switchTokens = () => {
    const newToken0 = token1;
    const newToken1 = token0;
    const input1 = fromAmount;
    const input2 = toAmount;
    // setSwapFromAmt(input2);
    // setSwapFromAmt2(input1);
    setFromAmount(input2);
    setToAmount(input1);
    setToken0(newToken0);
    Token0Contract;
    setToken1(newToken1);
  };

  const exactInput = async (
    swapperV2: any,
    exactInputParams: any,
    wrapEth: boolean,
    outputUnwrapEth: boolean,
    inputWrapWTON: boolean,
    outputUnwrapTON: boolean
  ) => {
    const receipt = await swapperV2.exactInput(
      exactInputParams,
      wrapEth,
      outputUnwrapEth,
      inputWrapWTON,
      outputUnwrapTON
    );
    return receipt;
  };

  const exactInputEth = async (
    swapperV2: any,
    exactInputParams: any,
    wrapEth: boolean,
    outputUnwrapEth: boolean,
    inputWrapWTON: boolean,
    outputUnwrapTON: boolean,
    value: any
  ) => {
    const receipt = await swapperV2.exactInput(
      exactInputParams,
      wrapEth,
      outputUnwrapEth,
      inputWrapWTON,
      outputUnwrapTON,
      value
    );
    return receipt;
  };

  const exactOutput = async (
    swapperV2: any,
    exactOutputParams: any,
    wrapEth: boolean,
    outputUnwrapEth: boolean,
    inputWrapWTON: boolean,
    outputUnwrapTON: boolean
  ) => {
    const receipt = await swapperV2.exactOutput(
      exactOutputParams,
      wrapEth,
      outputUnwrapEth,
      inputWrapWTON,
      outputUnwrapTON
    );
    return receipt;
  };

  const exactOutputEth = async (
    swapperV2: any,
    exactOutputParams: any,
    wrapEth: boolean,
    outputUnwrapEth: boolean,
    inputWrapWTON: boolean,
    outputUnwrapTON: boolean,
    value: any
  ) => {
    const receipt = await swapperV2.exactOutput(
      exactOutputParams,
      wrapEth,
      outputUnwrapEth,
      inputWrapWTON,
      outputUnwrapTON,
      value
    );
    return receipt;
  };

  const exactInputWtonTon = useCallback(
    async (
      library: any,
      userAddress: string | null | undefined,
      amount: any
    ) => {
      if (library && userAddress && SwapperV2Proxy_CONTRACT) {
        //wton to ton
        if (token0.address === WTON_ADDRESS) {
          try {
            const receipt = await SwapperV2Proxy_CONTRACT.wtonToTon(amount);
            setTx(receipt);
            closeThisModal();
          } catch (err) {}
        } else {
          try {
            const receipt = await SwapperV2Proxy_CONTRACT.tonToWton(amount);
            setTx(receipt);
            closeThisModal();
          } catch (err) {}
        }
      }
    },
    [
      SwapperV2Proxy_CONTRACT,
      WTON_ADDRESS,
      closeThisModal,
      setTx,
      token0.address,
    ]
  );

  const exactOutputWtonTon = useCallback(async () => {
    if (library && account && SwapperV2Proxy_CONTRACT) {
      if (token1.address === WTON_ADDRESS) {
        const amnt = ethers.utils.parseEther(toAmount);
        try {
          const receipt = await SwapperV2Proxy_CONTRACT.tonToWton(amnt);
          setTx(receipt);
          closeThisModal();
        } catch (err) {}
      } else {
        const amnt = ethers.utils.parseUnits(toAmount, "27");
        try {
          const receipt = await SwapperV2Proxy_CONTRACT.wtonToTon(amnt);
          setTx(receipt);
          closeThisModal();
        } catch (err) {}
      }
    }
  },[SwapperV2Proxy_CONTRACT, WTON_ADDRESS, account, closeThisModal, library, setTx, toAmount, token1.address]);
  const exactInputWethEth = useCallback(async () => {
    if (library && account && WETH_CONTRACT) {
      // const WETH = new Contract(WETH_ADDRESS, WETHABI, library);
      const amountIn = ethers.utils.parseEther(fromAmount);

      if (token0.address.toLowerCase() === ZERO_ADDRESS.toLowerCase()) {
        try {
          const receipt = await WETH_CONTRACT.deposit({ value: amountIn });
          setTx(receipt);
          closeThisModal();
        } catch (err) {}
      } else {
        try {
          const receipt = await WETH_CONTRACT.withdraw(amountIn);
          setTx(receipt);
          closeThisModal();
        } catch (err) {}
      }
    }
  }, [
    WETH_CONTRACT,
    account,
    closeThisModal,
    fromAmount,
    library,
    setTx,
    token0.address,
  ]);

  const swapExactInput = useCallback(async () => {
    const params = getParams(token0.address, token1.address);
    if (library && account && params && SwapperV2Proxy_CONTRACT) {
      const getExactInputParams = {
        recipient: account,
        path: params?.path,
        amountIn: amountInResult,
        amountOutMinimum: minimumAmountOutResult,
        deadline: 0,
      };

      try {
        const receipt =
          token0.address !== ZERO_ADDRESS
            ? await exactInput(
                SwapperV2Proxy_CONTRACT,
                getExactInputParams,
                params.wrapEth,
                params.outputUnwrapEth,
                params.inputWrapWTON,
                params.outputUnwrapTON
              )
            : await exactInputEth(
                SwapperV2Proxy_CONTRACT,
                getExactInputParams,
                params.wrapEth,
                params.outputUnwrapEth,
                params.inputWrapWTON,
                params.outputUnwrapTON,
                {
                  value: amountInResult,
                }
              );
        setTx(receipt);
        closeThisModal();
      } catch (e) {
        console.log(e);
      }
    } else if (
      token0.address === WTON_ADDRESS ||
      token0.address === TON_ADDRESS
    ) {
      let amountIn;
      if (token0.address.toLowerCase() === WTON_ADDRESS.toLowerCase()) {
        amountIn = ethers.utils.parseUnits(fromAmount, "27");
      } else {
        amountIn = ethers.utils.parseEther(fromAmount);
      }
      exactInputWtonTon(library, account, amountIn);
    } else {
      exactInputWethEth();
    }
  }, [
    token0.address,
    token1.address,
    library,
    account,
    SwapperV2Proxy_CONTRACT,
    WTON_ADDRESS,
    TON_ADDRESS,
    amountInResult,
    minimumAmountOutResult,
    setTx,
    closeThisModal,
    exactInputWtonTon,
    fromAmount,
    exactInputWethEth,
  ]);

  const swapExactOutput = useCallback(async () => {
    const params = getParams(token1.address, token0.address);
    if (library && account && params && SwapperV2Proxy_CONTRACT) {
      const getExactOutputParams = {
        recipient: account,
        path: params?.path,
        amountOut: amountOutResultI,
        amountInMaximum: maximumAmountInResultI,
        deadline: 0,
      };

      const inputWrapWTON =
        token0.address.toLowerCase() === TON_ADDRESS.toLowerCase()
          ? true
          : false;
      const outputUnwrapTON =
        token1.address.toLowerCase() === TON_ADDRESS.toLowerCase()
          ? true
          : false;
      const wrapEth =
        token0.address.toLowerCase() === ZERO_ADDRESS.toLowerCase()
          ? true
          : false;
      const outputUnwrapEth =
        token1.address.toLowerCase() === ZERO_ADDRESS.toLowerCase()
          ? true
          : false;
      try {
        const receipt =
          token0.address !== ZERO_ADDRESS
            ? await exactOutput(
                SwapperV2Proxy_CONTRACT,
                getExactOutputParams,
                wrapEth,
                outputUnwrapEth,
                inputWrapWTON,
                outputUnwrapTON
              )
            : await exactOutputEth(
                SwapperV2Proxy_CONTRACT,
                getExactOutputParams,
                wrapEth,
                outputUnwrapEth,
                inputWrapWTON,
                outputUnwrapTON,
                {
                  value: maximumAmountInResultI,
                }
              );
        setTx(receipt);
        closeThisModal();
      } catch (e) {}
    } else if (
      token1.address === WTON_ADDRESS ||
      token1.address === TON_ADDRESS
    ) {
      exactOutputWtonTon();
    } else {
      exactInputWethEth();
    }
  }, [
    token1.address,
    token0.address,
    library,
    account,
    SwapperV2Proxy_CONTRACT,
    WTON_ADDRESS,
    TON_ADDRESS,
    amountOutResultI,
    maximumAmountInResultI,
    setTx,
    closeThisModal,
    exactOutputWtonTon,
    exactInputWethEth,
  ]);

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
        setTx(receipt);
        if (receipt) {
          await receipt.wait();
          setTX({ tx: false, data: { name: "approve" } });
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, [
    library,
    account,
    WTON_CONTRACT,
    Token0Contract,
    token0.address,
    WTON_ADDRESS,
    SwapperV2Proxy,
    setTX,
    setTx,
  ]);

  useEffect(() => {
    setAllowed(Number(approved));
  }, [token0.address, approved]);

  useEffect(() => {
    if (tx.tx && !tx.data) {
      // setSwapFromAmt("0");
      // setSwapFromAmt2("0");
      setFromAmount("0");
      setToAmount("0");
    }
  }, [tx, blockNumber, setFromAmount, setToAmount]);

  useEffect(() => {
    const getExpectedOut = async () => {
      if (
        token0.address &&
        fromAmount !== "" &&
        fromAmount !== "0" &&
        formattedResult &&
        minimumAmountOutResult &&
        amountInResult &&
        formattedAmountOutResult
      ) {
        setExpected(formattedResult);
        focused === "input1"
          ? setToAmount(formattedResult)
          : setFromAmount(formattedResult);

        setMinAmount(formattedAmountOutResult);
      }
    };

    const getExpectedIn = async () => {
      if (token0.address && toAmount !== "" && toAmount !== "0") {
        // console.log('formattedResultI',formattedResultI);

        if (err) {
          setMaxError(true);
        } else {
          setMaxError(false);
          setExpected(formattedResultI);
          focused === "input2"
            ? setFromAmount(formattedResultI)
            : setToAmount(formattedResultI);
        }
      }
    };
    focused && focused === "input1" ? getExpectedOut() : getExpectedIn();
  }, [
    toAmount,
    fromAmount,
    token0.address,
    token1.address,
    slippage,
    focused,
    formattedResult,
    minimumAmountOutResult,
    amountInResult,
    formattedAmountOutResult,
    formattedResultI,
    maximumAmountInResultI,
    amountInResultI,
    formattedAmountOutResultI,
    amountOutResultI,
    err,
    setToAmount,
    setFromAmount,
  ]);

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
                  Swap
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
                  color={colorMode === "dark" ? "#f1f1f1" : "#3d495d"}
                  fontSize="14px"
                >
                  <Text mt="18px" mb="8px" textAlign={"left"}>
                    Balance: {formatNumberWithCommas(token0Balance)}
                  </Text>
                  <Text
                    fontSize={"14px"}
                    // color={"#3d495d"}
                    fontWeight="bold"
                    onClick={() => {
                      setFocused("input1");
                      // setSwapFromAmt(token0Balance);
                      setFromAmount(token0Balance);
                    }}
                    _hover={{ cursor: "pointer" }}
                  >
                    MAX
                  </Text>
                </Flex>
                <Flex
                  position={"relative"}
                  border="1px solid"
                  borderColor={
                    invalidInput
                      ? "#e53e3e"
                      : colorMode === "dark"
                      ? "#313442"
                      : "#dfe4ee"
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
                    color={colorMode === "dark" ? "#f1f1f1" : "#86929d"}
                    pl={"24px"}
                    border={"none"}
                    fontSize={"18px"}
                    borderRadius={"4px"}
                    min={0}
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
                    value={focused === "input1" ? fromAmount : expected}
                    onChange={(e) => {
                      const valueNum = e;
                      // setSwapFromAmt(valueNum);
                      setFromAmount(valueNum);
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
                  <Box
                    h={"1px"}
                    bg={colorMode === "dark" ? "#353d48" : "#e9edf1"}
                    w="310px"
                  ></Box>
                  <Button
                    position={"absolute"}
                    w={"40px"}
                    h={"40px"}
                    backgroundColor={
                      colorMode === "light" ? "#e9edf1" : "#1e1e24"
                    }
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
                      backgroundColor={
                        colorMode === "light" ? "#e9edf1" : "#1e1e24"
                      }
                    >
                      <Image src={swap} alt={'swap button'}/>
                    </Flex>
                  </Button>
                </Flex>
                <SelectToken tokenType={1} />
                <Text
                  mt="18px"
                  mb="8px"
                  textAlign={"left"}
                  color={colorMode === "dark" ? "#f1f1f1" : "#3d495d"}
                  fontSize="14px"
                >
                  Balance: {formatNumberWithCommas(token1Balance)}
                </Text>
                <Flex
                  position={"relative"}
                  border="1px solid"
                  borderColor={
                    invalidInput || maxError
                      ? "#e53e3e"
                      : colorMode === "dark"
                      ? "#313442"
                      : "#dfe4ee"
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
                    color={colorMode === "dark" ? "#f1f1f1" : "#86929d"}
                    pl={"24px"}
                    border={"none"}
                    fontSize={"18px"}
                    min={0}
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
                    value={focused === "input2" ? toAmount : expected}
                    onClick={() => setFocused("input2")}
                    onChange={(e) => {
                      const valueNum = e;
                      // setSwapFromAmt2(valueNum);
                      setToAmount(valueNum);
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
                  <Text
                    fontSize={"10px"}
                    color={colorMode === "dark" ? "#8b8b93" : "#3d495d"}
                  >
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
                      backgroundColor:
                        colorMode === "dark" ? "#1e1e24" : "#e9edf1",
                      color: colorMode === "dark" ? "#2e2e3a" : "#8f96a1",
                    }}
                    _hover={{}}
                    _active={{}}
                    disabled={
                      token0.address === "" ||
                      tx.tx === true ||
                      !account ||
                      allowed > Number(fromAmount) ||
                      token0.address === ZERO_ADDRESS
                    }
                    onClick={() => approve()}
                  >
                    {tx.tx === true && tx.data.name === "approve" ? (
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
                  swapFromAmt2={toAmount}
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
                    backgroundColor:
                      colorMode === "dark" ? "#1e1e24" : "#e9edf1",
                    color: colorMode === "dark" ? "#2e2e3a" : "#8f96a1",
                  }}
                  _hover={{}}
                  _active={{}}
                  disabled={
                    tx.tx === true ||
                    token0.address === "" ||
                    Number(token0Balance) === 0 ||
                    maxError ||
                    token1.address === "" ||
                    allowed < Number(fromAmount) ||
                    (Number(fromAmount) === 0 && Number(toAmount) === 0) ||
                    token0.address === token1.address ||
                    Number(fromAmount) > Number(token0Balance)
                  }
                  onClick={
                    focused === "input1"
                      ? () => swapExactInput()
                      : () => swapExactOutput()
                  }
                >
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
