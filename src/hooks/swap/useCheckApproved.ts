import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import useCallContract from "hooks/useCallContract";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  selectedToken0,
  selectedToken1,
  selectedToken1_state,
  selectedToken0_state,
} from "atom/swap";
import CONTRACT_ADDRESS from "services/addresses/contract";
import { convertNumber } from "utils/number";
import useBalance from "./useBalance";
import { useBlockNumber } from "hooks/useBlockNumber";
import { ZERO_ADDRESS } from "constants/index";

const useCheckApproved = () => {
  const { account, library } = useWeb3React();
  const token0 = useRecoilValue(selectedToken0_state);
  const token1 = useRecoilValue(selectedToken1_state);
  const { token0Balance, token1Balance } = useBalance();
  const { ERC20_CONTRACT: Token0Contract, WTON_CONTRACT } = useCallContract(
    token0.address !== ZERO_ADDRESS ? token0.address : undefined
  );
  const { ERC20_CONTRACT: Token1Contract } = useCallContract(
    token1.address !== ZERO_ADDRESS ? token1.address : undefined
  );
  const [approved, setApproved] = useState("0");
  const { TON_ADDRESS, WTON_ADDRESS, TOS_ADDRESS, SwapperV2Proxy } =
    CONTRACT_ADDRESS;
  const { blockNumber } = useBlockNumber();

  useEffect(() => {
    async function getApproved() {
      // console.log(token0.address.toLowerCase() );

      if (WTON_CONTRACT && Token0Contract) {
        if (token0.address.toLowerCase() === WTON_ADDRESS) {
          const allowAmount = await WTON_CONTRACT.allowance(
            account,
            SwapperV2Proxy
          );
          const converted = convertNumber({
            type: "ray",
            amount: allowAmount.toString(),
            localeString: false,
          });

          setApproved(converted || "0");
        } else {
          const allowAmount = await Token0Contract.allowance(
            account,
            SwapperV2Proxy
          );
          const converted = convertNumber({
            amount: allowAmount.toString(),
            localeString: false,
          });
          setApproved(converted || "0");
        }
      } else {
        if (token0.address.toLowerCase() === ZERO_ADDRESS.toLowerCase()) {
          const allowAmount = token0Balance;
          setApproved(allowAmount);
        }
      }
    }
    getApproved();
  }, [
    token0.address,
    Token0Contract,
    blockNumber,
    WTON_CONTRACT,
    WTON_ADDRESS,
    account,
    SwapperV2Proxy,
  ]);

  return approved;
};

export default useCheckApproved;
