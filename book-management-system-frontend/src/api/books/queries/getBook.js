import { gql } from "@apollo/client";

const GET_BOOK = gql`
  query GetBook($id: String!) {
    book(id: $id) {
      id
      title
      author
      publicationYear
    }
  }
`;

export default GET_BOOK;
