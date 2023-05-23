import { useQuery, useMutation } from "@apollo/client";
import { Space, Table, Modal, message, Input, Button } from "antd";
import DELETE_BOOK from "../api/books/mutations/deleteBooks";
import { Link } from "react-router-dom";
import "../styles/home.css";
import GET_BOOKS from "../api/books/queries/getBySearch";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import GET_ME from "../api/users/queries/getUser";

const { Column, ColumnGroup } = Table;
const { Search } = Input;

const BooksTable = () => {
  const [input, setInput] = useState("");
  const { data: userData } = useQuery(GET_ME, {
    fetchPolicy: "network-only",
  });

  const { loading, error, data } = useQuery(GET_BOOKS, {
    variables: { searchInput: input, limit: 10, offset: 0 },
    fetchPolicy: "cache-and-network",
  });

  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS, variables: { searchInput: input, limit: 10, offset: 0 } }],
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
  };
  
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ marginTop: "50px", textAlign: "center", overflow: "auto" }}>
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
