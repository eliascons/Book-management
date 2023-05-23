import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import GET_BOOKS from "../api/books/queries/getAllBooks";
import { Space, Table, Modal, message } from "antd";
import DELETE_BOOK from "../api/books/mutations/deleteBooks";
import { Link } from "react-router-dom";
import "../styles/home.css";
import FILTER_BOOKS from "../api/books/queries/getBySearch";

import { useState } from "react";

const { Column, ColumnGroup } = Table;

const BooksTable = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState(null);

  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const [filter] = useLazyQuery(FILTER_BOOKS, {
    onCompleted: (data) => {
      setFilteredData(data.filter);
    },
  });

  const handleDeleteClick = (bookId) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this book?",
      onOk: () => {
        deleteBook({ variables: { id: bookId } })
          .then(() => {
            message.success("Book deleted successfully");
            if (filteredData) {
              const updatedFilteredData = filteredData.filter(
                (book) => book.id !== bookId
              );
              setFilteredData(updatedFilteredData);
            }
          })
          .catch((error) => {
            message.error("An error occurred while deleting the book");
            console.error(error);
          });
      },
    });
  };

  const getFiltered = () => {
    filter({ variables: { searchInput: searchInput } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const dataSource = filteredData ? filteredData : data.books;

  return (
    <div style={{ marginTop: "50px", textAlign: "center", overflow: "auto" }}>
      <br />
      <input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      ></input>
      <button onClick={getFiltered}>Search</button>

      <Table
        dataSource={dataSource}
        pagination={{ hideOnSinglePage: true, pageSize: Infinity }}
        rowKey={(item) => item.id}
      >
        <ColumnGroup title="All Books">
          <Column title="Title" dataIndex="title" key="title" />
          <Column title="Author" dataIndex="author" key="author" />
          <Column
            title="Year of Publication"
            dataIndex="publicationYear"
            key="publicationYear"
          />

          <Column
            title="Action"
            key="action"
            render={(book) => (
              <Space size="middle">
                <Link to={`/update/${book.id}`}>Update</Link>
                <button
                  className="btn"
                  onClick={() => handleDeleteClick(book.id)}
                >
                  Delete
                </button>
              </Space>
            )}
          />
        </ColumnGroup>
      </Table>

      {dataSource.length === 0 && <p>No results found.</p>}
    </div>
  );
};

export default BooksTable;
