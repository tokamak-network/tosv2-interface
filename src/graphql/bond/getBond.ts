import { gql } from "@apollo/client";

const GET_BOND_LIST = gql`
  query GetBondList($period: String, $limit: Int) {
    getBondList(period: $period, limit: $limit) {
      index
      version
      minimumTosPrice
      capacity
      periodicCapacity
      currentCapacity
      quoteToken
      totalSold
      bondPrice
      ethPrice
      endTime
      updatedTime
      startTime
      maxPayout
      capacityUpdatePeriod
      bonusRatesAddress
      bonusRatesId
      ROIforLockupWeeks
      ltosInterstForLockupWeeks
      bondType
      closed
    }
  }
`;

const GET_BOND_MYHISTORY = gql`
  query GetBondHistory($period: String, $limit: Int, $account: String) {
    getMyHistory(period: $period, limit: $limit, account: $account) {
      contract
      contractName
      eventName
      from
      data
      chainId
      blockNumber
      transactionHash
      blockTimestamp
      createdTime
      updated
    }
  }
`;

export { GET_BOND_LIST, GET_BOND_MYHISTORY };
