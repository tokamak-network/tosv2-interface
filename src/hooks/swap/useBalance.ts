import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import useCallContract from "hooks/useCallContract";
import { useRecoilValue, useRecoilState } from "recoil";
import { selectedToken0, selectedToken1 } from "atom/swap";
import CONTRACT_ADDRESS from "services/addresses/contract";
import { convertNumber } from "utils/number";
import { useBlockNumber } from "hooks/useBlockNumber";
const useBalance = () => {
  const { account, library } = useWeb3React();
  const token0 = useRecoilValue(selectedToken0)
  const token1 = useRecoilValue(selectedToken1)
  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
  const { blockNumber } = useBlockNumber();
  const { ERC20_CONTRACT: Token0Contract, WTON_CONTRACT } = useCallContract(token0.address !== ZERO_ADDRESS ? token0.address : undefined)
  const { ERC20_CONTRACT: Token1Contract } = useCallContract(token1.address !== ZERO_ADDRESS ? token1.address : undefined)
  const [token0Balance, setToken0Balance] = useState('0')
  const [token1Balance, setToken1Balance] = useState('0')
  const { TON_ADDRESS, WTON_ADDRESS, TOS_ADDRESS } = CONTRACT_ADDRESS;

  useEffect(() => {
    async function fetchBalance() {
      try {

        if (token0.address.toLowerCase() === ZERO_ADDRESS) {
          const eth0 = await library?.getBalance(account);


          const convertedEth = convertNumber({
            amount: eth0.toString(),
            localeString: false,
          });
          setToken0Balance(convertedEth || '0')
        }

        else if (token1.address.toLowerCase() === ZERO_ADDRESS) {
          const eth1 = await library?.getBalance(account);
          const convertedEth = convertNumber({
            amount: eth1.toString(),
            localeString: false,
          });

          setToken1Balance(convertedEth || '0')
        }

        else {
          const contract0 = token0.address.toLowerCase() === WTON_ADDRESS.toLocaleLowerCase() ? WTON_CONTRACT : Token0Contract
          const balance0 = await contract0?.balanceOf(account)
          const converted0 = token0.address.toLowerCase() === WTON_ADDRESS.toLocaleLowerCase() ? convertNumber({
            type: "ray",
            amount: balance0.toString(),
            localeString: false,
          }) : convertNumber({
            amount: balance0.toString(),
            localeString: false,
          });
          setToken0Balance(converted0 || '0')

          const contract1 = token1.address.toLowerCase() === WTON_ADDRESS.toLocaleLowerCase() ? WTON_CONTRACT : Token1Contract
          const balance1 = await contract1?.balanceOf(account)
          const converted1 = token1.address.toLowerCase() === WTON_ADDRESS.toLocaleLowerCase() ? convertNumber({
            type: "ray",
            amount: balance1.toString(),
            localeString: false,
          }) : convertNumber({
            amount: balance1.toString(),
            localeString: false,
          });
          setToken1Balance(converted1 || '0')
        }



      }
      catch (e) {
        // console.log("*****fetch balance err*****");
        // console.log(e);
      }
    }
    fetchBalance()
  }, [token0, token1, Token0Contract, Token1Contract,blockNumber])


  return { token0Balance, token1Balance }
}

export default useBalance