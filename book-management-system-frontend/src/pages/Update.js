import { useParams } from "react-router-dom";
import GET_BOOK from "../api/books/queries/getBook";
import UPDATE_BOOK from "../api/books/mutations/updateBook";
import { useQuery, useMutation } from "@apollo/client";
import { Button, Form, Input, Card } from "antd";
import {
  UserOutlined,
  BookOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import "../styles/update.css";

const UpdateBooks = () => {
  const { bookId } = useParams();
  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: { id: bookId },
  });
  const [updateBook, { loadingUpdate, error: updateError }] = useMutation(
    UPDATE_BOOK,
    {
      refetchQueries: [GET_BOOK],
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const book = data.book;

  const handleUpdate = async (values) => {
    const { title, author, publicationYear } = values;
    const { id } = book;

    try {
      let response = await updateBook({
        variables: {
          id,
          title,
          author,
          publicationYear: parseInt(publicationYear, 10),
        },
      });
      console.log("Book updated:", response.data.updateBook);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <>
      <div className="update-books-container">
        <Card title="Book To Update" bordered={false} className="book-card">
          <p>{book.title}</p>
          <p>{book.author}</p>
          <p>{book.publicationYear}</p>
        </Card>
        <Card title="Update Book" bordered className="update-card">
          <Form onFinish={handleUpdate}>
            <Form.Item
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please enter the title",
                },
              ]}
            >
              <Input prefix={<BookOutlined />} placeholder="Title" />
            </Form.Item>
            <Form.Item
              name="author"
              rules={[
                {
                  required: true,
                  message: "Please enter the author",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Author" />
            </Form.Item>
            <Form.Item
              name="publicationYear"
              rules={[
                {
                  required: true,
                  message: "Please enter the publication year",
                },
              ]}
            >
              <Input
                prefix={<CalendarOutlined />}
                placeholder="Publication Year"
                type="number"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update Book
              </Button>
            </Form.Item>
          </Form>
        </Card>
        {(error || loading || loadingUpdate || updateError) && (
          <Card
            title="System Message"
            bordered={false}
            className="book-card"
            loading={loading}
          >
            {error && <p>Error: {error.message}</p>}
            {loadingUpdate && <p>Loading Update...</p>}
            {updateError && <p>Error on update: {updateError.message}</p>}
          </Card>
        )}
      </div>
    </>
  );
};

export default UpdateBooks;
