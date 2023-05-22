import { useQuery, useMutation } from "@apollo/client";
import GET_BOOKS from "../api/books/queries/getAllBooks";
import { Space, Table, Modal, message } from "antd";
import DELETE_BOOK from "../api/books/mutations/deleteBooks";
import {Link} from "react-router-dom";
import "../styles/home.css";

const { Column, ColumnGroup } = Table;

const BooksTable = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);

  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [GET_BOOKS],
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
            message.error("An error occurred while deleting the book");
            console.error(error);
          });
      },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ marginTop: "50px", textAlign: "center", overflow: "auto" }}>
    <br/>
      <Table
        dataSource={data.books}
        pagination={{hideOnSinglePage: true, pageSize: Infinity}}
        
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
                <button className="btn" onClick={() => handleDeleteClick(book.id)}>Delete</button>
                
              </Space>
            )}
          />
        </ColumnGroup>
      </Table>
      
    </div>
  );
};

export default BooksTable;