import { gql } from "@apollo/client";

const GET_DASHBOARD = gql`
  query GetDashboard($period: String!, $limit: Int!) {
    getDashboard(period: $period, limit: $limit) {
      tosPrice
    }
  }
`;

export { GET_DASHBOARD };
