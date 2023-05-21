import { useState } from "react";
import { useMutation } from "@apollo/client";
import GET_BOOKS from "../api/books/queries/getAllBooks";
import UPDATE_BOOK from "../api/books/mutations/updateBook";

const UpdateBookForm = ({ book }) => {
  const [updateBook, { loading, error }] = useMutation(UPDATE_BOOK, {
    refetchQueries: [GET_BOOKS],
  });

  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [publicationYear, setPublicationYear] = useState(book.publicationYear);

  
  const handleUpdateBook = (e) => {
    e.preventDefault();
    const { id } = book;
    const parsedPublicationYear = parseInt(publicationYear, 10);
    
    updateBook({ variables: { id, title, author, publicationYear: parsedPublicationYear } })
      .then((response) => {
        // Handle successful update
        console.log("Book updated:", response.data.updateBook);
      })
      .catch((error) => {
        // Handle error
        console.error("Error updating book:", error);
      });
  };

  return (
    <div>
      <form onSubmit={handleUpdateBook}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Author:
          <input
            type="text"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
        <label>
          Publication Year:
          <input
            type="number"
            name="publicationYear"
            value={publicationYear}
            onChange={(e) => setPublicationYear(e.target.value)}
          />
        </label>
        <button type="submit">Update</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default UpdateBookForm;
