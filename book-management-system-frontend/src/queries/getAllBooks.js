import { gql } from "@apollo/client";

const GET_BOOKS = gql`
  query {
    books {
      id
      title
      author
      publicationYear
    }
  }
`;

export default GET_BOOKS;