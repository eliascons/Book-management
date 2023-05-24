import { useQuery, useMutation } from "@apollo/client";
import { Space, Table, Modal, message, Input, Button } from "antd";
import DELETE_BOOK from "../api/books/mutations/deleteBooks";
import { Link } from "react-router-dom";
import "../styles/home.css";
import GET_BOOKS from "../api/books/queries/getBooks";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import GET_ME from "../api/users/queries/getUser";

const { Column, ColumnGroup } = Table;
const { Search } = Input;

const BooksTable = () => {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState(false);
  const [limit, setLimit] = useState(10);
  
  const { data: userData } = useQuery(GET_ME, {
    fetchPolicy: "cache-and-network",
  });

  const { loading, error, data, fetchMore } = useQuery(GET_BOOKS, {
    variables: { searchInput: input, offset: 0, limit: limit },
    fetchPolicy: "cache-and-network",
  });

  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS, variables: { searchInput: input } }],
  });

  const handleDeleteClick = (bookId) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this book?",
      onOk: () => {
        deleteBook({ variables: { id: bookId } })
          .then(() => {
            message.success("Book deleted successfully");
          })
          .catch((error) => {
            message.error(
              `An error occurred while deleting the book , ${error.message}`
            );

            console.error(error);
          });
      },
    });
  };

  const handleSearch = (value) => {
    setInput(value);
    setStatus(false); // Reset status to enable "Click me" button
    setLimit(10); // Reset limit to initial value
  };

  const handleChange = () => {
    const fetchedBooksCount = data?.books.books?.length || 0;
    if (fetchedBooksCount < limit) {
      setStatus(true); // No more results to fetch
    } else {
      const newOffset = fetchedBooksCount; // Calculate the new offset
      fetchMore({
        variables: {
          offset: newOffset,
          // limit: 10, // Fetch additional 10 records
        },
      });
      setLimit(newOffset + 10);
    }
  };

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ marginTop: "50px", textAlign: "center", overflow: "auto" }}>
      <button onClick={handleChange} disabled={status}>
        Click me
      </button>
      <Search
        placeholder="Search by title or author..."
        allowClear
        onSearch={handleSearch}
        style={{
          width: "300px",
          marginBottom: "50px",
        }}
      />
      {userData?.getMe ? (
        <div style={{ textAlign: "left", marginBottom: "13px" }}>
          <Link to="/add">
            <Button
              size={"large"}
              style={{ marginBottom: "13px" }}
              icon={<PlusOutlined />}
            >
              Add Book
            </Button>
          </Link>
        </div>
      ) : null}
      <Table
        dataSource={data?.books.books ?? []}
        pagination={{ hideOnSinglePage: true, pageSize: Infinity }}
        rowKey={(item) => item.id}
        loading={loading}
      >
        <ColumnGroup title="All Books">
          <Column
            title="Index"
            key="index"
            render={(text, record, index) => <span>{index + 1}</span>}
          />
          <Column title="Title" dataIndex="title" key="title" />
          <Column title="Author" dataIndex="author" key="author" />
          <Column
            title="Year of Publication"
            dataIndex="publicationYear"
            key="publicationYear"
          />
          {userData?.getMe ? (
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
          ) : null}
        </ColumnGroup>
      </Table>
    </div>
  );
};

export default BooksTable;
