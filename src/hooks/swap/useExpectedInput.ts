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

const useExpectedInput = () => {
    const { account, library } = useWeb3React();
    const token0 = useRecoilValue(selectedToken0)
    const token1 = useRecoilValue(selectedToken1)
    const slippage = useRecoilValue(slip)
    const toAmountOut = useRecoilValue(swapToAmount)
    const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
    const { ERC20_CONTRACT: Token0Contract, WTON_CONTRACT, QUOTER_CONTRACT } = useCallContract(token0.address !== ZERO_ADDRESS ? token0.address : undefined)
    const { ERC20_CONTRACT: Token1Contract } = useCallContract(token1.address !== ZERO_ADDRESS ? token1.address : undefined)
    const [approved, setApproved] = useState('0')
    const { TON_ADDRESS, WTON_ADDRESS, TOS_ADDRESS, SwapperV2Proxy, Quoter_ADDRESS } = CONTRACT_ADDRESS;
    const { blockNumber } = useBlockNumber();
    const [formattedResultI, setFormattedResultI] = useState<any>()
    const [maximumAmountInResultI, setMaximumAmountInResultI] = useState<any>()
    const [amountInResultI, setAmountInResultI] = useState<any>()
    const [formattedAmountOutResultI, setFormattedAmountOutResultI] = useState<any>()
    const [amountOutResultI, setAmountOutResultI] = useState<any>()
    const [minimumAmountOutResultI, setMinimumAmountOutResultI] = useState<any>()

    const [err, setErr] = useState<any>()

    useEffect(() => {
        async function getExpectedInput() {
            const params = getParams(token1.address, token0.address);

            let amountOut
            let denominator;
            let numerator;

            const int = Number.isInteger(Number(slippage));
            if (library && account && toAmountOut !== undefined && toAmountOut !== '') {

                if (slippage !== '' && Number(slippage) > 0 && Number(slippage) < 100) {


                    if (int) {
                        denominator = BigNumber.from("100")
                        const slippageCalc = 100 + Number(slippage)
                        numerator = BigNumber.from(slippageCalc.toString());
                    }

                    else {
                        const countDecimals = slippage.split('.')[1].length;
                        const denom = 100 * (10 ** countDecimals);
                        const slippageCalc = denom + (Number(slippage) * (10 ** countDecimals))
                        denominator = BigNumber.from(denom.toString());
                        numerator = BigNumber.from(slippageCalc.toString())
                    }
                }
                else {

                    denominator = BigNumber.from("100")
                    numerator = BigNumber.from("103")
                }

                if (token1.address.toLowerCase() === WTON_ADDRESS.toLowerCase() || token1.address.toLowerCase() === TON_ADDRESS.toLowerCase()) {
                    amountOut = ethers.utils.parseUnits(toAmountOut, '27');
                }
                else {
                    amountOut = ethers.utils.parseEther(toAmountOut)
                }

                if (library && account && params && Number(toAmountOut) !== 0 && QUOTER_CONTRACT && toAmountOut !== undefined) {
                    let amountIn;
                    try {
                        amountIn = await QUOTER_CONTRACT.callStatic.quoteExactOutput(params.path, amountOut)
                        const xx = BigNumber.from(1e9.toString())
                        const tempAmountIn = amountIn.mul(numerator).div(denominator);
                        const maximumAmountIn = token0.address.toLowerCase() === TON_ADDRESS.toLowerCase() ? (tempAmountIn.div(xx)).mul(xx) : tempAmountIn
                        if (token0.address.toLowerCase() === WTON_ADDRESS.toLowerCase() || token0.address.toLowerCase() === TON_ADDRESS.toLowerCase()) {
                            const converted = convertNumber({
                                type: "ray",
                                amount: maximumAmountIn,
                                localeString: false,
                            });
                            const formatted = converted && converted.indexOf(".") > -1 ? converted?.slice(
                                0,
                                converted?.indexOf(".") + 3
                            ) : converted

                            const convertedAmountOut = convertNumber({
                                amount: amountIn,
                                type: "ray",
                                localeString: false,
                            });

                            const formattedAmountOut = convertedAmountOut && convertedAmountOut.indexOf(".") > -1 ? convertedAmountOut?.slice(
                                0,
                                convertedAmountOut?.indexOf(".") + 3
                            ) : convertedAmountOut
                            setFormattedResultI(formatted)
                            setMaximumAmountInResultI(maximumAmountIn)
                            setAmountInResultI(amountIn)
                            setFormattedAmountOutResultI(formattedAmountOut)
                            setAmountOutResultI(amountOut)
                            setErr(undefined)
                        }

                        else {
                            const converted = ethers.utils.formatEther(maximumAmountIn)
                            const formatted = converted && converted.indexOf(".") > -1 ? converted?.slice(
                                0,
                                converted?.indexOf(".") + 3
                            ) : converted
                            const convertedAmountOut = ethers.utils.formatEther(amountIn)
                            const formattedAmountOut = convertedAmountOut && convertedAmountOut.indexOf(".") > -1 ? convertedAmountOut?.slice(
                                0,
                                convertedAmountOut?.indexOf(".") + 3
                            ) : convertedAmountOut

                            setFormattedResultI(formatted)
                            setMaximumAmountInResultI(maximumAmountIn)
                            setAmountInResultI(amountIn)
                            setFormattedAmountOutResultI(formattedAmountOut)
                            setAmountOutResultI(amountOut)
                            setErr(undefined)
                        }

                    }
                    catch (e) {


                        setErr(e)
                    }
                }

                else if (token0.address.toLowerCase() === WTON_ADDRESS.toLowerCase() && token1.address.toLowerCase() === TON_ADDRESS.toLowerCase() || token1.address.toLowerCase() === WTON_ADDRESS.toLowerCase() && token0.address.toLowerCase() === TON_ADDRESS.toLowerCase()) {
                    setFormattedResultI(toAmountOut)
                    setMinimumAmountOutResultI(toAmountOut)
                    setAmountOutResultI(toAmountOut)
                    setErr(undefined)
                }
                else {
                    setFormattedResultI(toAmountOut)
                    setMinimumAmountOutResultI(toAmountOut)
                    setAmountOutResultI(toAmountOut)
                    setErr(undefined)
                }
            }

        }
        getExpectedInput()

    }, [library, account, token0.address, token1.address, toAmountOut, blockNumber, slippage])
    return { formattedResultI, maximumAmountInResultI, amountInResultI, formattedAmountOutResultI, amountOutResultI, err, minimumAmountOutResultI }
}

export default useExpectedInput