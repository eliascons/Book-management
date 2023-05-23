import { gql } from "@apollo/client";

const GET_ME = gql`
  query GetMe {
    getMe {
      id
      username
    }
  }
`;

export default GET_ME;