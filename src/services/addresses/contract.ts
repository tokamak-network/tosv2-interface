//Phase1 contract datas
//https://www.notion.so/onther/Phase1-deploy-contract-interface-b48f4c779c7043df971ddc3dac783ec8

import { REACT_APP_MODE } from "../../constants";

type CONTRACT_ADDRESSES_TYPE = {
  TON_ADDRESS:
    | "0x2be5e8c109e2197D077D13A82dAead6a9b3433C5"
    | "0x68c1F9620aeC7F2913430aD6daC1bb16D8444F00";
  WTON_ADDRESS:
    | "0xc4A11aaf6ea915Ed7Ac194161d2fC9384F15bff2"
    | "0xe86fCf5213C785AcF9a8BFfEeDEfA9a2199f7Da6";
  TOS_ADDRESS:
    | "0x409c4D8cd5d2924b9bc5509230d16a61289c8153"
    | "0x67F3bE272b1913602B191B3A68F7C238A2D81Bb9";
  TOSValueCalculator:
    | "0xD062C01b317933EAabd8F64e3f59141a79C3f95c"
    | "0x2daEBfC5eA67Ed04cE9eE154D626A6e2144333BC";
  LibTreasury:
    | "0x2c77067900f1544345552f0A12d0bDf4EaE6fE04"
    | "0x35f1cc098d14dE8C79806B6A8aDDe56a23fc5f57";
  Treasury:
    | "0x0bA799B755017a5E148A4De63DD65e816B15BC9E"
    | "0xd835046432891d5C2657237eC06f9F84Fea647A7";
  TreasuryProxy:
    | "0xD27A68a457005f822863199Af0F817f672588ad6"
    | "0x138b6757BF88Cbba7b4eE6d166fCB4fFB12c656D";
  LibStaking:
    | "0xC17c09a48793Bff31e7F8CC465DF6451CC9d9fB0"
    | "0xEfCDCa72f05b6492663155e38ECC5C0342a82E0c";
  StakingV2:
    | "0xC42698D87c95dCB9aaE9aaBE8c70a4d52b243847"
    | "0x2cFF495b9570A23271Ed78058Db87D22620f8047";
  StakingV2Proxy:
    | "0x14fb0933Ec45ecE75A431D10AFAa1DDF7BfeE44C"
    | "0x2fF6D99EbEE9A61430FE4909745FFa9C69a3FCD0";
  BondDepository:
    | "0xe3ECA73384Bcfcc16ECd7894C5cA5b6DD64Ce39F"
    | "0x4cB3B39dDCBA436967beC564b5765e0dD2eF88dC";
  BondDepositoryProxy:
    | "0xbf715e63d767D8378102cdD3FFE3Ce2BF1E02c91"
    | "0x56eE8C5e99425c9B38D9001408d2d0Bcb1085E23";
  LockTOS:
    | "0x69b4A202Fa4039B42ab23ADB725aA7b1e9EEBD79"
    | "0x770e0d682277A4a9167971073f1Aa6d6403bb315";
};

const MAINNET: CONTRACT_ADDRESSES_TYPE = {
  TON_ADDRESS: "0x2be5e8c109e2197D077D13A82dAead6a9b3433C5",
  WTON_ADDRESS: "0xc4A11aaf6ea915Ed7Ac194161d2fC9384F15bff2",
  TOS_ADDRESS: "0x409c4D8cd5d2924b9bc5509230d16a61289c8153",
  TOSValueCalculator: "0xD062C01b317933EAabd8F64e3f59141a79C3f95c",
  LibTreasury: "0x2c77067900f1544345552f0A12d0bDf4EaE6fE04",
  Treasury: "0x0bA799B755017a5E148A4De63DD65e816B15BC9E",
  TreasuryProxy: "0xD27A68a457005f822863199Af0F817f672588ad6",
  LibStaking: "0xC17c09a48793Bff31e7F8CC465DF6451CC9d9fB0",
  StakingV2: "0xC42698D87c95dCB9aaE9aaBE8c70a4d52b243847",
  StakingV2Proxy: "0x14fb0933Ec45ecE75A431D10AFAa1DDF7BfeE44C",
  BondDepository: "0xe3ECA73384Bcfcc16ECd7894C5cA5b6DD64Ce39F",
  BondDepositoryProxy: "0xbf715e63d767D8378102cdD3FFE3Ce2BF1E02c91",
  LockTOS: "0x69b4A202Fa4039B42ab23ADB725aA7b1e9EEBD79",
};

const GOERLI: CONTRACT_ADDRESSES_TYPE = {
  TON_ADDRESS: "0x68c1F9620aeC7F2913430aD6daC1bb16D8444F00",
  WTON_ADDRESS: "0xe86fCf5213C785AcF9a8BFfEeDEfA9a2199f7Da6",
  TOS_ADDRESS: "0x67F3bE272b1913602B191B3A68F7C238A2D81Bb9",
  TOSValueCalculator: "0x2daEBfC5eA67Ed04cE9eE154D626A6e2144333BC",
  LibTreasury: "0x35f1cc098d14dE8C79806B6A8aDDe56a23fc5f57",
  Treasury: "0xd835046432891d5C2657237eC06f9F84Fea647A7",
  TreasuryProxy: "0x138b6757BF88Cbba7b4eE6d166fCB4fFB12c656D",
  LibStaking: "0xEfCDCa72f05b6492663155e38ECC5C0342a82E0c",
  StakingV2: "0x2cFF495b9570A23271Ed78058Db87D22620f8047",
  StakingV2Proxy: "0x2fF6D99EbEE9A61430FE4909745FFa9C69a3FCD0",
  BondDepository: "0x4cB3B39dDCBA436967beC564b5765e0dD2eF88dC",
  BondDepositoryProxy: "0x56eE8C5e99425c9B38D9001408d2d0Bcb1085E23",
  LockTOS: "0x770e0d682277A4a9167971073f1Aa6d6403bb315",
};

const CONTRACT_ADDRESS: CONTRACT_ADDRESSES_TYPE =
  REACT_APP_MODE === "PRODUCTION" ? MAINNET : GOERLI;

export default CONTRACT_ADDRESS;
