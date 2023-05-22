import { useQuery, useMutation } from "@apollo/client";
import GET_BOOKS from "../api/books/queries/getAllBooks";
import { Space, Table, Modal, message } from "antd";
import UpdateBookForm from "../components/updateBook";
import { useState } from "react";
import DELETE_BOOK from "../api/books/mutations/deleteBooks";

const { Column, ColumnGroup } = Table;

const BooksTable = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [GET_BOOKS],
  });

  const handleUpdateClick = (bookId) => {
    if (expandedRowKeys.includes(bookId)) {
      setExpandedRowKeys((prevKeys) =>
        prevKeys.filter((key) => key !== bookId)
      );
    } else {
      setExpandedRowKeys((prevKeys) => [...prevKeys, bookId]);
    }
  };

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
            message.error("An error occurred while deleting the book");
            console.error(error);
          });
      },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ marginTop: "10px", textAlign: "center" }}>
    <br/>
      <Table
        dataSource={data.books}
        pagination={{hideOnSinglePage: true, pageSize: Infinity}}
        
        rowKey={(item) => item.id}
        expandedRowKeys={expandedRowKeys}
        onExpand={(expanded, book) => handleUpdateClick(book.id)}
        expandedRowRender={(record) => <UpdateBookForm book={record} />}
        
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
                <a onClick={() => handleDeleteClick(book.id)}>Delete</a>
              </Space>
            )}
          />
        </ColumnGroup>
      </Table>
      
    </div>
  );
};

export default BooksTable;