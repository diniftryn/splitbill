import { gql } from "@apollo/client";

export const GET_GROUPS = gql`
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
