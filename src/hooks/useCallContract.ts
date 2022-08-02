import TON from "services/abis/TON.json";
import WTON from "services/abis/WTON.json";
import ERC20 from "services/abis/ERC20ABI.json";
import useContract from "hooks/useContract";
import CONTRACT_ADDRESS from "services/addresses/contract";

const useCallContract = (ERC20_ADDRESS?: string) => {
  const { TON_ADDRESS, WTON_ADDRESS, TOS_ADDRESS } = CONTRACT_ADDRESS;
  const TON_CONTRACT = useContract(TON_ADDRESS, TON.abi);
  const WTON_CONTRACT = useContract(WTON_ADDRESS, WTON.abi);
  const TOS_CONTRACT = useContract(TOS_ADDRESS, ERC20.abi);
  const ERC20_CONTRACT = useContract(ERC20_ADDRESS, ERC20.abi);

  return {
    TON_CONTRACT,
    WTON_CONTRACT,
    TOS_CONTRACT,
    ERC20_CONTRACT,
  };
};

export default useCallContract;
