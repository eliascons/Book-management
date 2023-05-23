import {gql} from "@apollo/client";

const FILTER_BOOKS = gql`
  query FilterBooks($searchInput: String) {
    books(searchInput: $searchInput) {
      id
      title
      author
      publicationYear
    }
  }
`;

export default FILTER_BOOKS;