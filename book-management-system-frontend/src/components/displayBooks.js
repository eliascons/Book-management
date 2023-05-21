import { useQuery } from "@apollo/client";
import GET_BOOKS from "../queries/getAllBooks";
import React, { useState } from "react";

const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      border: '1px solid black',
      padding: '10px',
      marginBottom: '10px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    bookDetails: {
      display: 'none',
      marginTop: '10px',
    },
    expanded: {
      display: 'block',
    },
    allBooks: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '20px',
    },
    allBooksTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '10px',
      textAlign: 'center',
    },
  };
  
  const DisplayBooks = () => {
    const { loading, error, data } = useQuery(GET_BOOKS);
    const [expandedBookId, setExpandedBookId] = useState(null);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    const handleBookClick = (bookId) => {
      if (expandedBookId === bookId) {
        setExpandedBookId(null);
      } else {
        setExpandedBookId(bookId);
      }
    };
  
    return (
      <div>
        <div style={styles.allBooks}>
          <h2 style={styles.allBooksTitle}>All Books</h2>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {data.books.map(({ id, title, author, publicationYear }) => (
            <div
              key={id}
              style={{
                ...styles.container,
                backgroundColor: expandedBookId === id ? '#E2E2E2' : 'white',
              }}
              onClick={() => handleBookClick(id)}
            >
              <h3>{title}</h3>
              {expandedBookId === id && (
                <div style={{ ...styles.bookDetails, ...styles.expanded }}>
                  <h4>Book: {title}</h4>
                  <h4>Author: {author}</h4>
                  <p>Year of publication: {publicationYear}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default DisplayBooks;