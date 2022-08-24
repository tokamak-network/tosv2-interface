import { gql } from "@apollo/client";

const GET_TOKEN_PRICE = gql`
  query GetTokenPrice($tokenId: String!) {
    getTokenPrice(tokenId: $tokenId) {
      price
    }
  }
`;

export { GET_TOKEN_PRICE };
