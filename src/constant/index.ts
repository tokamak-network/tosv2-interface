const constant = {
  rebase: {
    epochLength: 28800,
    beginEpochEnd: 1668682800,
    //basePerEpoch is BigNumber(wei)
    basePerEpoch: 87045050000000,
  },
  LOCKTOS_maxWeeks: 156,
  LOCKTOS_epochUnit: 604800,
  stakeModalMaxWeeks: 155,
  bondModalMaxWeeks: 52,
  rebasePerEpoch: 0.00008704505,
  rebasePeriod: 60 * 60 * 8, //8Hours
  mainnetGasPrice: "6849315",
  //https://www.notion.so/onther/11-3-TOSv2-phase-1-open-check-ef653dca90584edf8d7c25e767cfff3f
  //285,753 → 279,458
  minBondGasPrice: "279458",
  errMsg: {
    bond: {
      balanceIsOver: "Insufficient ETH amount",
      inputIsZero: "ETH has to be greater than 0",
      bondableAmountIsOver: "Exceeded current bondable",
      periodIsOver: "Must be between 1 and 52",
    },
    stake: {
      tosBalanceIsOver: "Insufficient TOS amount",
      inputIsZero: `Can't be 0`,
      newLockupPeriodIsSmaller: `Can't be less than current lock-up period (70 weeks)`,
      amountAndPeriodErr: "Increase TOS or lock-up period",
      periodIsOver: `Can't be more than 155 weeks`,
      ltosBalanceIsOver: "Insufficient LTOS amount",
      periodIsEmpty: "Must be between 0 and 155",
    },
  },
};

export default constant;
