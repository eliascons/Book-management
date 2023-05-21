import { gql } from "@apollo/client";

const UPDATE_BOOK = gql`
  mutation UpdateBook($id: ID!, $title: String!, $author: String!, $publicationYear: Int!) {
    updateBook(id: $id, title: $title, author: $author, publicationYear: $publicationYear) {
      id
      title
      author
      publicationYear
    }
  }
`;



export default UPDATE_BOOK;