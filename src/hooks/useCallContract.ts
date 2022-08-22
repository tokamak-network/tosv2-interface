import TON from "services/abis/TON.json";
import WTON from "services/abis/WTON.json";
import ERC20 from "services/abis/ERC20ABI.json";

//Phase 1
import TOSValueCalculatorAbi from "services/abis/TOSValueCalculator.json";
import LibTreasuryAbi from "services/abis/LibTreasury.json";
import TreasuryAbi from "services/abis/Treasury.json";
import TreasuryProxyAbi from "services/abis/TreasuryProxy.json";
import LibStakingAbi from "services/abis/LibStaking.json";
import StakingV2Abi from "services/abis/StakingV2.json";
import StakingV2ProxyAbi from "services/abis/StakingV2Proxy.json";
import BondDepositoryAbi from "services/abis/BondDepository.json";
import BondDepositoryProxyAbi from "services/abis/BondDepositoryProxy.json";

import useContract from "hooks/useContract";
import CONTRACT_ADDRESS from "services/addresses/contract";

const useCallContract = (ERC20_ADDRESS?: string) => {
  const { TON_ADDRESS, WTON_ADDRESS, TOS_ADDRESS } = CONTRACT_ADDRESS;
  //Phase 1
  const {
    TOSValueCalculator,
    LibTreasury,
    Treasury,
    TreasuryProxy,
    LibStaking,
    StakingV2,
    StakingV2Proxy,
    BondDepository,
    BondDepositoryProxy,
  } = CONTRACT_ADDRESS;

  const TON_CONTRACT = useContract(TON_ADDRESS, TON.abi);
  const WTON_CONTRACT = useContract(WTON_ADDRESS, WTON.abi);
  const TOS_CONTRACT = useContract(TOS_ADDRESS, ERC20.abi);
  const ERC20_CONTRACT = useContract(ERC20_ADDRESS, ERC20.abi);

  //Phase 1
  const TOSValueCalculator_CONTRACT = useContract(
    TOSValueCalculator,
    TOSValueCalculatorAbi.abi
  );
  const LibTreasury_CONTRACT = useContract(LibTreasury, ERC20.abi);
  const Treasury_CONTRACT = useContract(Treasury, TreasuryAbi.abi);
  const TreasuryProxy_CONTRACT = useContract(TreasuryProxy, TreasuryAbi.abi);
  const LibStaking_CONTRACT = useContract(LibStaking, LibStakingAbi.abi);
  const StakingV2_CONTRACT = useContract(StakingV2, StakingV2Abi.abi);
  const StakingV2Proxy_CONTRACT = useContract(StakingV2Proxy, StakingV2Abi.abi);
  const BondDepository_CONTRACT = useContract(
    BondDepository,
    BondDepositoryAbi.abi
  );
  const BondDepositoryProxy_CONTRACT = useContract(
    BondDepositoryProxy,
    BondDepositoryAbi.abi
  );

  return {
    TON_CONTRACT,
    WTON_CONTRACT,
    TOS_CONTRACT,
    ERC20_CONTRACT,
    TOSValueCalculator_CONTRACT,
    LibTreasury_CONTRACT,
    Treasury_CONTRACT,
    TreasuryProxy_CONTRACT,
    LibStaking_CONTRACT,
    StakingV2_CONTRACT,
    StakingV2Proxy_CONTRACT,
    BondDepository_CONTRACT,
    BondDepositoryProxy_CONTRACT,
  };
};

export default useCallContract;
