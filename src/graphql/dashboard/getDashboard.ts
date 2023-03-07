import { gql } from "@apollo/client";

const GET_DASHBOARD = gql`
  query GetDashboard($period: String!, $limit: Int!) {
    getDashboard(period: $period, limit: $limit) {
      _id
      chainId
      createdAt
      marketCap
      runway
      tosPrice
      tosSupply
      sTosSupply
      lTosSupply
      totalValueStaked
      treasuryBalance
      updatedAt
    }
  }
`;

const GET_DASHBOARD_CARD = gql`
  query GetDashboardCard($period: String!, $limit: Int!) {
    getDashboardCard(period: $period, limit: $limit) {
      tosPrice
      tosPerEthPrice
      backingPerTos
      backingPerTosEth
      ltosPrice
      ltosIndex
      mintingRate
      chainId
      createdAt
    }
  }
`;

export { GET_DASHBOARD, GET_DASHBOARD_CARD };
