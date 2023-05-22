import { useQuery } from "@apollo/client";
import GET_BOOKS from "../api/books/queries/getAllBooks";
import { Space, Table } from "antd";
import UpdateBookForm from "../components/updateBook";
import { useState } from "react";

const { Column, ColumnGroup } = Table;

const BooksTable = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const handleUpdateClick = (bookId) => {
    if (expandedRowKeys.includes(bookId)) {
      setExpandedRowKeys((prevKeys) =>
        prevKeys.filter((key) => key !== bookId)
      );
    } else {
      setExpandedRowKeys((prevKeys) => [...prevKeys, bookId]);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ marginTop: "150px", textAlign: "center" }}>
      <Table
        dataSource={data.books}
        pagination={{ pageSize: 8 }}
        rowKey={(item) => item.id}
        expandedRowKeys={expandedRowKeys}
        onExpand={(expanded, book) => handleUpdateClick(book.id)}
        expandedRowRender={(record) => <UpdateBookForm book={record} />}
        style={{ width: "80%", margin: "0 auto" }}
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
                <a onClick={() => handleUpdateClick(book.id)}>Update</a>
                <a>Delete</a>
              </Space>
            )}
          />
        </ColumnGroup>
      </Table>
    </div>
  );
};

export default BooksTable;
