// apollo.js
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../providers/AuthProvider";

const httpLink = createHttpLink({
  // uri: "postgres://postgres.dmrlrlwwjyenutjzwnin:mvBwWK0Q18tG5rcX@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"
  uri: "https://dmrlrlwwjyenutjzwnin.supabase.co/graphql/v1"
});

const authLink = setContext(async (_, { headers }) => {
  // Retrieve authentication token from AsyncStorage or your authentication mechanism
  // const token = await AsyncStorage.getItem("authToken");

  const { session } = useAuth();
  const token = session?.access_token;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;
