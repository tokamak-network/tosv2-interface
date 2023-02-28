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

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  selectedToken0,
  selectedToken1,
  swapTX_state,
  slip,
  focus_state,
  swapToAmount,
  swapFromAmount,
} from "atom/swap";
import CONTRACT_ADDRESS from "services/addresses/contract";
import { ZERO_ADDRESS } from "constants/index";
import useBalance from "hooks/swap/useBalance";
import useCallContract from "hooks/useCallContract";
import useCustomToast from "hooks/useCustomToast";
import { ethers, BigNumber } from "ethers";
import { getParams } from "@/utils/params";
import useExpectedOutput from "hooks/swap/useExpectedOutput";
import useExpectedInput from "hooks/swap/useExpectedInput";

type SwapButtonProps = {
  maxError: boolean;
  approved: string;
  closeThisModal: () => void;
};
const SwapButton: React.FC<SwapButtonProps> = (props) => {
  const { maxError, approved, closeThisModal } = props;
  const { account, library } = useWeb3React();
  const { colorMode } = useColorMode();
  const tx = useRecoilValue(swapTX_state);
  const [token0, setToken0] = useRecoilState(selectedToken0);
  const [token1, setToken1] = useRecoilState(selectedToken1);
  const { token0Balance } = useBalance();
  const [toAmount, setToAmount] = useRecoilState(swapToAmount);
  const [fromAmount, setFromAmount] = useRecoilState(swapFromAmount);
  const focused = useRecoilValue(focus_state);
  const { setTx } = useCustomToast();
  const {
    formattedResult,
    minimumAmountOutResult,
    amountInResult,
    formattedAmountOutResult,
  } = useExpectedOutput();

  const {
    formattedResultI,
    maximumAmountInResultI,
    amountOutResultI,
    err,
    minimumAmountOutResultI,
  } = useExpectedInput();
  const {
    ERC20_CONTRACT: Token0Contract,
    WTON_CONTRACT,
    SwapperV2Proxy_CONTRACT,
    WETH_CONTRACT,
  } = useCallContract(
    token0.address !== ZERO_ADDRESS ? token0.address : undefined
  );
  const { TON_ADDRESS, WTON_ADDRESS, WETH_ADDRESS, SwapperV2Proxy } =
    CONTRACT_ADDRESS;

  const buttonStatus = useMemo(() => {
    const { address: token0Address } = token0;
    const { address: token1Address } = token1;

    if (!account || token1Address === "") {
      return "Select Tokens";
    }

    switch (`${token0Address.toLowerCase()},${token1Address.toLowerCase()}`) {
      case `${WTON_ADDRESS.toLowerCase()},${TON_ADDRESS.toLowerCase()}`:
        return "Unwrap";
      case `${TON_ADDRESS.toLowerCase()},${WTON_ADDRESS.toLowerCase()}`:
        return "Wrap";
      case `${ZERO_ADDRESS.toLowerCase()},${WETH_ADDRESS.toLowerCase()}`:
        return "Wrap";
      case `${WETH_ADDRESS.toLowerCase()},${ZERO_ADDRESS.toLowerCase()}`:
        return "Unwrap";
      default:
        return "Swap";
    }
  }, [TON_ADDRESS, WETH_ADDRESS, WTON_ADDRESS, account, token0, token1]);

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
  }, [
    SwapperV2Proxy_CONTRACT,
    WTON_ADDRESS,
    account,
    closeThisModal,
    library,
    setTx,
    toAmount,
    token1.address,
  ]);

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

  return (
    <Button
      borderRadius={"28px"}
      border={"none"}
      padding={"16px 118px"}
      mb={"10px"}
      ml="15px"
      w={"280px"}
      backgroundColor={account ? "#007aff" : "#e9edf1"}
      color={account ? "#fff" : "#8f96a1"}
      height={"56px"}
      fontSize={"18px"}
      fontWeight="normal"
      _disabled={{
        backgroundColor: colorMode === "dark" ? "#1e1e24" : "#e9edf1",
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
        Number(approved) < Number(fromAmount) ||
        (Number(fromAmount) === 0 && Number(toAmount) === 0) ||
        token0.address === token1.address ||
        Number(fromAmount) > Number(token0Balance)
      }
      onClick={
        focused === "input1" ? () => swapExactInput() : () => swapExactOutput()
      }
    >
      <Text>{buttonStatus}</Text>
    </Button>
  );
};

export default SwapButton;
