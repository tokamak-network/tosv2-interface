const constant = {
  rebase: {
    epochLength: 28800,
    beginEpochEnd: 1663772748,
  },
  LOCKTOS_maxWeeks: 156,
  LOCKTOS_epochUnit: 604800,
  modalMaxWeeks: 155,
  rebasePeriod: 60 * 60 * 8, //8Hours
  mainnetGasPrice: "6849315",
  errMsg: {
    balanceExceed: "Input has exceeded your balance",
    periodExceed: "Lock-up period must be an integer between 1 and 155",
    stakePeriodExceed: "Lock-up period must be an integer between 0 and 155",
    zeroInput: "Input has to be greater than 0",
  },
};

export default constant;
