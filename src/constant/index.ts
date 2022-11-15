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
    bondZeroInput: "Input has to be greater than 0",
    periodExceed: "Must be between 1 and 155",
    stakePeriodExceed: "Must be between 0 and 155",
    managePeriodExceed:
      "New lock-up period must be equal or greater than the existing lock-up period",
    zeroInput: "Input has to be equal to or greater than 0",
    periodExceedThanMaximum: "Must be less than 156 weeks",
  },
};

export default constant;
