import { useQuery, useMutation } from "@apollo/client";
import { Space, Table, Input, Button } from "antd";
import DELETE_BOOK from "../api/books/mutations/deleteBooks";
import { Link } from "react-router-dom";
import "../styles/home.css";
import GET_BOOKS from "../api/books/queries/getBooks";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import GET_ME from "../api/users/queries/getUser";
import handleDeleteClick from "../utils/handleDelete";

const { Column, ColumnGroup } = Table;
const { Search } = Input;

const PAGE_LIMIT = 10; // change this to modify the page limit
const BOOK_INCREMENT = 25; // change this to receive more/less books when pressing the load more button

const BooksTable = () => {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState(false);
  const [limit, setLimit] = useState(PAGE_LIMIT);

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

  const handleSearch = (value) => {
    setInput(value);
    setStatus(false); // Reset status to enable "Click me" button
    setLimit(PAGE_LIMIT); // Reset limit to initial value
  };

  const handleChange = async () => {
    try {
      const fetchedBooksCount = data?.books.books?.length || 0;
      
      if (fetchedBooksCount < limit) {
        setStatus(true); // No more results to fetch
      } else {
        
        await fetchMore({
          variables: {
            offset: fetchedBooksCount,
            limit: PAGE_LIMIT, 
          },
        });
        setLimit(fetchedBooksCount + BOOK_INCREMENT);
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div
      style={{
        marginTop: "50px",
        textAlign: "center",
        overflow: "auto",
        marginBottom: "50px",
      }}
    >
      <Search
        placeholder="Search by title or author..."
        allowClear
        onSearch={handleSearch}
        style={{
          width: "300px",
          marginBottom: "50px",
        }}
      />
      <Button disabled={status} onClick={handleChange} loading={loading}>
        Load more books...
      </Button>
      {userData?.getMe ? (
        <div style={{ textAlign: "center", marginBottom: "13px" }}>
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
                    onClick={() => handleDeleteClick(book.id, deleteBook)}
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
