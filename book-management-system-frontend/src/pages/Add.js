import { Button, Form, Input, Card } from "antd";
import {
  UserOutlined,
  BookOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import "../styles/add.css";
import ADD_BOOK from "../api/books/mutations/addBook";
import { useMutation, useQuery } from "@apollo/client";
import GET_BOOKS from "../api/books/queries/getAllBooks";


const Add = () => {
  useQuery(GET_BOOKS);
  const [addBook, { loading, error }] = useMutation(ADD_BOOK, {refetchQueries: [GET_BOOKS]});
  // const [title, setTitle] = useState("");
  // const [author, setAuthor] = useState("");
  // const [publicationYear, setPublicationYear] = useState(Number);

  const handleAdd = (values) => {
    const { title, author, publicationYear } = values;
    const parsedPublicationYear = parseInt(publicationYear, 10);
    addBook({ variables: { title, author, publicationYear: parsedPublicationYear } })
      .then((response) => {
        console.log("Book Added:", response.data.createBook.title);
      })
      .catch((error) => {
        console.log("Error adding book:", error);
      });
    // addBook
  };
  return (
    <div className="form">
      <Card
        title="Add Book"
        bordered
        style={{
          width: "300px",
          margin: "0 auto",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        }}
      >
        <Form onFinish={handleAdd}>
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
              Add Book
            </Button>
          </Form.Item>
        </Form>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
      </Card>
    </div>
  );
};

export default Add;
