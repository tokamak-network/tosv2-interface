import { gql } from "@apollo/client";

const GET_BOND_LIST = gql`
  query GetBondList($period: String!, $limit: Int!) {
    getBondList(period: $period, limit: $limit) {
      bonds {
        capacity
        totalSold
        tokenLogo
        bondPrice
        index
      }
      createdAt
    }
  }
`;

export { GET_BOND_LIST };
