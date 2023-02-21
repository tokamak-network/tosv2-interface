import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import useCallContract from "hooks/useCallContract";
import { useRecoilValue, useRecoilState } from "recoil";
import { selectedToken0, selectedToken1, swapTX, slip, focus, swapToAmount, swapFromAmount } from "atom/swap";
import CONTRACT_ADDRESS from "services/addresses/contract";
import { convertNumber } from "utils/number";
import useBalance from "./useBalance";
import { useBlockNumber } from "hooks/useBlockNumber";
import { ethers, BigNumber } from "ethers";
import { getParams } from "@/utils/params";
import {ZERO_ADDRESS} from 'constants/index'

const useExpectedOutput = () => {
    const { account, library } = useWeb3React();
    const token0 = useRecoilValue(selectedToken0)
    const token1 = useRecoilValue(selectedToken1)
    const slippage = useRecoilValue(slip)
    const fromAmountIn = useRecoilValue(swapFromAmount)
    const { ERC20_CONTRACT: Token0Contract, WTON_CONTRACT, QUOTER_CONTRACT } = useCallContract(token0.address !== ZERO_ADDRESS ? token0.address : undefined)
    const { ERC20_CONTRACT: Token1Contract } = useCallContract(token1.address !== ZERO_ADDRESS ? token1.address : undefined)
    const [approved, setApproved] = useState('0')
    const { TON_ADDRESS, WTON_ADDRESS, TOS_ADDRESS, SwapperV2Proxy, Quoter_ADDRESS } = CONTRACT_ADDRESS;
    const { blockNumber } = useBlockNumber();
    const [formattedResult, setFormattedResult] = useState<any>()
    const [minimumAmountOutResult, setMinimumAmountOutResult] = useState<any>()
    const [amountInResult, setAmountInResult] = useState<any>()
    const [formattedAmountOutResult, setFormattedAmountOutResult] = useState<any>()

    useEffect(() => {
        async function getExOutput() {
            let denominator;
            let numerator;
            const int = Number.isInteger(Number(slippage));
            if (library && account && fromAmountIn !== undefined && fromAmountIn !== '') {
                if (slippage !== '' && Number(slippage) > 0 && Number(slippage) < 100) {
                    if (int) {
                        denominator = BigNumber.from("100")
                        const slippageCalc = 100 - Number(slippage)
                        numerator = BigNumber.from(slippageCalc.toString());
                    }
                    else {
                        const countDecimals = slippage.split('.')[1].length;
                        const denom = 100 * (10 ** countDecimals);
                        const slippageCalc = denom - (Number(slippage) * (10 ** countDecimals))
                        denominator = BigNumber.from(denom.toString());
                        numerator = BigNumber.from(slippageCalc.toString())
                    }
                }
                else {
                    denominator = BigNumber.from("100")
                    numerator = BigNumber.from("99")
                }
                let amountIn

                if (token0.address.toLowerCase() === WTON_ADDRESS.toLowerCase() || token0.address.toLowerCase() === TON_ADDRESS.toLowerCase()) {
                    const tempAmountIn = ethers.utils.parseUnits(fromAmountIn, '27');
                    const xx = BigNumber.from(1e9.toString())
                    amountIn = (tempAmountIn.div(xx)).mul(xx)
                }
                else {
                    amountIn = ethers.utils.parseEther(fromAmountIn)
                }


                const params = getParams(token0.address, token1.address);
                if (library && account && params && Number(fromAmountIn) !== 0 && QUOTER_CONTRACT && fromAmountIn !== undefined) {
                    const amountOut = await QUOTER_CONTRACT.callStatic.quoteExactInput(params.path, amountIn)
                    const minimumAmountOut = amountOut.mul(numerator).div(denominator);
                    if (token1.address.toLowerCase() === WTON_ADDRESS.toLowerCase() || params.outputUnwrapTON) {
                        const converted = convertNumber({
                            type: "ray",
                            amount: minimumAmountOut.toString(),
                            localeString: false,
                        })

                        const formatted = converted && converted.indexOf(".") > -1 ? converted?.slice(
                            0,
                            converted?.indexOf(".") + 3
                        ) : converted

                        const convertedAmountOut = convertNumber({
                            amount: amountOut,
                            type: "ray",
                        });
                        const formattedAmountOut = convertedAmountOut && convertedAmountOut.indexOf(".") > -1 ? convertedAmountOut?.slice(
                            0,
                            convertedAmountOut?.indexOf(".") + 3
                        ) : convertedAmountOut

                        setFormattedResult(formatted)
                        setMinimumAmountOutResult(minimumAmountOut)
                        setAmountInResult(amountIn)
                        setFormattedAmountOutResult(formattedAmountOut)
                    }

                    else {
                        const converted = ethers.utils.formatEther(minimumAmountOut)
                        const formatted = converted && converted.indexOf(".") > -1 ? converted?.slice(
                            0,
                            converted?.indexOf(".") + 3
                        ) : converted
                        const convertedAmountOut = ethers.utils.formatEther(amountOut)
                        const formattedAmountOut = convertedAmountOut && convertedAmountOut.indexOf(".") > -1 ? convertedAmountOut?.slice(
                            0,
                            convertedAmountOut?.indexOf(".") + 3
                        ) : convertedAmountOut
                        setFormattedResult(formatted)
                        setMinimumAmountOutResult(minimumAmountOut)
                        setAmountInResult(amountIn)
                        setFormattedAmountOutResult(formattedAmountOut)
                    }
                }

                else if (token0.address.toLowerCase() === WTON_ADDRESS.toLowerCase() && token1.address.toLowerCase() === TON_ADDRESS.toLowerCase() || token1.address.toLowerCase() === WTON_ADDRESS.toLowerCase() && token0.address.toLowerCase() === TON_ADDRESS.toLowerCase()) {
                    setFormattedResult(fromAmountIn)
                    setMinimumAmountOutResult(fromAmountIn)
                    setAmountInResult(fromAmountIn)
                    setFormattedAmountOutResult(fromAmountIn)
                }
                else {
                    setFormattedResult(fromAmountIn)
                    setMinimumAmountOutResult(fromAmountIn)
                    setAmountInResult(fromAmountIn)
                    setFormattedAmountOutResult(fromAmountIn)
                }
            }
        }
        getExOutput()
    }, [library, account, token0.address, token1.address, fromAmountIn, blockNumber, slippage, WTON_ADDRESS, TON_ADDRESS, QUOTER_CONTRACT])

    return { formattedResult, minimumAmountOutResult, amountInResult, formattedAmountOutResult }
}


export default useExpectedOutput;