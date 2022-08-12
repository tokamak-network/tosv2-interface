import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { MIDDLEWARE_API } from "constants/index";

const client = new ApolloClient({
  uri: `http://3.36.64.198:4000/graphql`,
  cache: new InMemoryCache(),
  credentials: "include",
});

export default client;
