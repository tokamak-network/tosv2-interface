/*
Author : Lakmi
Work Ticket :
Description : This is SwapModal to exchange tokens 
Flow : 
  > When the user selects the token0 from the dropdown list, the balance0 will be computed, same for token1 as well. 
  > when the user enters the value in input1 or input2, the useExpectedInput, and useExpectedOutput will compute the resulting amounts. 
  Child components : 
> SelectToken
  > Token list drop down menu
> InputComponent
  > NumberInput component for swap
> ConversionComponent, SettingsComponent
  > the 2 components to show the expected output/input and set the slippage percentage
> SwapButton 
  > Big button at the bottom with all the button logic and functions that will be executed
hooks : 
> useBalance  
  > returns the balances of token0 and token1 when the token changes
> useCheckApproved
  > returns the approved amount of tokens for token0
> useExpectedInput
  > returns the expected input amount for swapExactOutput function
> useExpectedOutput
  > returns the expected output amount for swapExactInput function
> useTokenList
  > returns the token list from the token api
*/

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
  Box,
  CircularProgress,
} from "@chakra-ui/react";
import { ethers, BigNumber } from "ethers";
import useModal from "hooks/useModal";
import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import CLOSE_ICON from "assets/icons/close-modal.svg";
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
import useExpectedOutput from "hooks/swap/useExpectedOutput";
import useExpectedInput from "hooks/swap/useExpectedInput";
import useCustomToast from "hooks/useCustomToast";
import { ZERO_ADDRESS } from "constants/index";
import InputComponent from "./InputComponent";
import SwapButton from "./SwapButton";
import { getParams } from "@/utils/params";
import { convertNumber } from "@/utils/number";

function SwapInterfaceModal() {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const [token0, setToken0] = useRecoilState(selectedToken0);
  const [token1, setToken1] = useRecoilState(selectedToken1);
  const [toAmount, setToAmount] = useRecoilState(swapToAmount);
  const [fromAmount, setFromAmount] = useRecoilState(swapFromAmount);
  const [tx, setTX] = useRecoilState(swapTX);
  const { setTx } = useCustomToast();
  const [slippage, setSlippage] = useRecoilState(slip);
  const { account, library } = useWeb3React();
  const { token0Balance, token1Balance } = useBalance();
  const {
    TON_ADDRESS,
    WTON_ADDRESS,
    TOS_ADDRESS,
    WETH_ADDRESS,
    SwapperV2Proxy,
  } = CONTRACT_ADDRESS;
  const { selectedModalData, selectedModal, closeModal, isModalLoading } =
    useModal();
  const {
    formattedResult,
    minimumAmountOutResult,
    amountInResult,
    formattedAmountOutResult,
    maxOut,
  } = useExpectedOutput();

  const { formattedResultI, err, minimumAmountOutResultI } = useExpectedInput();
  const [focused, setFocused] = useRecoilState(focus);
  const [expected, setExpected] = useState<string>("0");
  const [maxError, setMaxError] = useState<boolean>(false);
  const [max, setMax] = useState("0");
  const approved = useCheckApproved();
  const {
    ERC20_CONTRACT: Token0Contract,
    WTON_CONTRACT,
    SwapperV2Proxy_CONTRACT,
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
      name: "TOS",
      address: TOS_ADDRESS,
      img: "https://tonstarter-symbols.s3.ap-northeast-2.amazonaws.com/tos-symbol%403x.png",
    });
    setToAmount("0");
    setFromAmount("0");
    setSlippage("0");
    setFocused("input1");
    setExpected("0");
    closeModal();
    setMax("0");
  }, [
    setToken0,
    setToken1,
    TOS_ADDRESS,
    setToAmount,
    setFromAmount,
    setSlippage,
    setFocused,
    closeModal,
  ]);

  const switchTokens = () => {
    const newToken0 = token1;
    const newToken1 = token0;
    const input1 = fromAmount;
    const input2 = toAmount;
    setFromAmount(input2);
    setToAmount(input1);
    setToken0(newToken0);
    setToken1(newToken1);
  };

  const approveDisable = useMemo(() => {
    const condition =
      token0.address === "" ||
      tx.tx === true ||
      !account ||
      Number(approved) >= Number(fromAmount) ||
      token0.address === ZERO_ADDRESS;
      console.log(Number(approved),Number(fromAmount));
      
    return condition;
  }, [account, approved, fromAmount, token0.address, tx.tx]);

  const submitDisable = useMemo(() => {
    const condition =
      tx.tx === true ||
      token0.address === "" ||
      Number(token0Balance) === 0 ||
      // tx.data.name === "approve" ||
      maxError ||
      token1.address === "" ||
      Number(approved) < Number(fromAmount) ||
      (Number(fromAmount) === 0 && Number(toAmount) === 0) ||
      token0.address === token1.address ||
      Number(fromAmount) > Number(token0Balance);      
      
    return condition;
  }, [
    approved,
    fromAmount,
    maxError,
    toAmount,
    token0.address,
    token0Balance,
    token1.address,
    tx.data.name,
    tx.tx,
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
        const receipt = await contract?.increaseAllowance(SwapperV2Proxy, totalSupply);
        setTX({ tx: true, data: { name: "approve" } });

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
  ]);

  const getExpectedOut = useCallback(() => {
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
    }
  }, [
    token0.address,
    fromAmount,
    formattedResult,
    minimumAmountOutResult,
    amountInResult,
    formattedAmountOutResult,
    focused,
    setToAmount,
    setFromAmount,
  ]);

  useEffect(() => {
    async function fetchActualMaxValue() {
      const params = getParams(token0.address, token1.address);
      if (
        library &&
        account &&
        params &&
        SwapperV2Proxy_CONTRACT &&
        token0Balance &&
        token0Balance !== "0"
      ) {
        const formatted = ethers.utils.parseUnits(token0Balance, 18);
        const formatted2 = convertNumber({ amount: formatted.toString() });

        const parseInputAmount = ethers.utils.parseUnits(
          formatted2 ? formatted2 : "0",
          18
        );

        const getExactInputParams = {
          recipient: account,
          path: params?.path,
          amountIn: parseInputAmount,
          amountOutMinimum: maxOut,
          deadline: 0,
        };

        if (
          token0.address === ZERO_ADDRESS &&
          token0Balance &&
          maxOut &&
          Number(token0Balance) > Number(fromAmount)
        ) {
          const estimate = await SwapperV2Proxy_CONTRACT.estimateGas.exactInput(
            getExactInputParams,
            params.wrapEth,
            params.outputUnwrapEth,
            params.inputWrapWTON,
            params.outputUnwrapTON,
            {
              value: parseInputAmount,
            }
          );

          const feeData = await SwapperV2Proxy_CONTRACT.provider.getFeeData();
          const { maxFeePerGas } = feeData;
          if (maxFeePerGas) {
            const txFee = BigNumber.from(42000)
            const remove = estimate.add(txFee).mul(maxFeePerGas);

            const subtracted = parseInputAmount.sub(remove);
            // setFromAmount(
            //   max !== "0" ? ethers.utils.formatEther(subtracted) : "0"
            // ); //if the input token is ETH then automatically set the input amount to max amount when output token changes
            setMax(ethers.utils.formatEther(subtracted));
          }
        } else {
        }
      }
    }
    fetchActualMaxValue();
  }, [
    SwapperV2Proxy_CONTRACT,
    account,
    amountInResult,
    expected,
    library,
    minimumAmountOutResult,
    token0,
    token1,
    token0Balance,
    maxOut,
  ]);

  useEffect(() => {
    if (token0.address === ZERO_ADDRESS) {
      setFromAmount(max);
    }
  }, [max, token1.address]);

  const getExpectedIn = useCallback(() => {
    if (token0.address && toAmount !== "" && toAmount !== "0") {
      if (err) {
        setMaxError(true);
      } else {
        setMaxError(false);
        setExpected(formattedResultI || "");
        focused === "input2"
          ? setFromAmount(formattedResultI || "")
          : setToAmount(formattedResultI || "");
      }
    }
  }, [
    token0.address,
    toAmount,
    err,
    formattedResultI,
    focused,
    setToAmount,
    setFromAmount,
  ]);

  useEffect(() => {
    if (focused && focused === "input1") {
      getExpectedOut();
    } else if (focused && focused === "input2") {
      getExpectedIn();
    }
  }, [focused, getExpectedOut, getExpectedIn]);

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
      >
        <ModalBody px={0} pt={"30px"} zIndex={10000}>
          <Flex w="100%" flexDir={"column"}>
            <Flex flexDir={"column"} pos={"relative"}>
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
              <Flex
                width={"100%"}
                justifyContent="center"
                flexDir={"column"}
                px="20px"
              >
                <SelectToken
                  tokenType={0}
                  approveDisable={approveDisable}
                  submitDisable={submitDisable}
                />
                <Flex
                  justifyContent={"space-between"}
                  alignItems="center"
                  color={colorMode === "dark" ? "#f1f1f1" : "#3d495d"}
                  fontSize="14px"
                >
                  <Text mt="18px" mb="8px" textAlign={"left"}>
                    Balance:{" "}
                    {Number(token0Balance).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Text>
                  <Text
                    fontSize={"14px"}
                    fontWeight="bold"
                    onClick={() => {
                      setFocused("input1");
                      setFromAmount(
                        token0.address === ZERO_ADDRESS ? max : token0Balance
                      );
                    }}
                    _hover={{ cursor: "pointer" }}
                  >
                    MAX
                  </Text>
                </Flex>
                <InputComponent
                  expected={expected}
                  inputNum={"1"}
                  maxError={maxError}
                />
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
                      <Image src={swap} alt={"swap button"} />
                    </Flex>
                  </Button>
                </Flex>
                <SelectToken
                  tokenType={1}
                  approveDisable={approveDisable}
                  submitDisable={submitDisable}
                />
                <Text
                  mt="18px"
                  mb="8px"
                  textAlign={"left"}
                  color={colorMode === "dark" ? "#f1f1f1" : "#3d495d"}
                  fontSize="14px"
                >
                  Balance:{" "}
                  {Number(token1Balance).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Text>
                <InputComponent
                  maxError={maxError}
                  expected={expected}
                  inputNum={"2"}
                />
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
                    Tokamak Network Swap wants to use your{" "}
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
                    isDisabled={approveDisable}
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
                  minAmount={formattedAmountOutResult || ""}
                  focused={focused}
                  swapFromAmt2={toAmount}
                />
                <SettingsComponent />
                <SwapButton
                  maxError={maxError}
                  approved={approved}
                  submitDisable={submitDisable}
                  closeThisModal={closeThisModal}
                />
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SwapInterfaceModal;
