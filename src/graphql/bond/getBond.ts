import { gql } from "@apollo/client";

const GET_BOND_LIST = gql`
  query GetBondList($period: String, $limit: Int) {
    getBondList(period: $period, limit: $limit) {
      index
      version
      capacity
      quoteToken
      totalSold
      bondPrice
      endTime
      updatedTime
      startTime
      maxPayout
      initialMaxPayout
      capacityUpdatePeriod
      bonusRatesAddress
      bonusRatesId
      bondType
      closed
      periodicCapacity
      currentCapacity
      createdAt
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
