import { gql } from "@apollo/client";


const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $publicationYear: Int!) {
    createBook(title: $title, author: $author, publicationYear: $publicationYear) {
      id
      title
      author
      publicationYear
    }
  }
`;

export default ADD_BOOK;
