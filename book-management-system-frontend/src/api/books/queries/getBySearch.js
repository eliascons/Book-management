import {gql} from "@apollo/client";

const FILTER_BOOKS = gql`
  query FilterBooks($searchInput: String, $limit: Int, $offset: Int) {
    books(searchInput: $searchInput, limit: $limit, offset: $offset) {
      books {
        id
        title
        author
        publicationYear
      }
      totalCount
    }
  }
`;



export default FILTER_BOOKS;