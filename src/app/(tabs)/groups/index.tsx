import { View, Text } from "react-native";
import { gql, useQuery } from "@apollo/client";
// import { GET_GROUPS } from "@/src/lib/queries";

const GET_GROUPS = gql`
  query GroupsQuery {
    groupsCollection {
      edges {
        node {
          id
          name
          imageUrl
          userIds
          expenseIds
        }
      }
    }
  }
`;

export default function index() {
  const { loading, error, data } = useQuery(GET_GROUPS);

  if (loading) return <Text>Loading...</Text>;
  // if (error) return <Text className="pt-20">Error: {error.message}</Text>;
  if (error) return console.log("Error: " + error.message);

  return (
    <View>
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
}
