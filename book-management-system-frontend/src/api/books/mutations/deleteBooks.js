
import { gql } from "@apollo/client";

const DELETE_BOOK = gql`
mutation DeleteBook($id: ID!) {
    deleteBook(id: $id) {
      message
    }
  }
`;

export default DELETE_BOOK;