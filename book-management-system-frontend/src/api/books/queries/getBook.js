import { gql } from "@apollo/client";

const GET_BOOK = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      id
      title
      author
      publicationYear
    }
  }
`;

export default GET_BOOK;
