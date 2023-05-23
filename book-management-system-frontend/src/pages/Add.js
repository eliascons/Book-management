import { Button, Form, Input, Card } from "antd";
import {
  UserOutlined,
  BookOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import "../styles/add.css";
import ADD_BOOK from "../api/books/mutations/addBook";
import { useMutation } from "@apollo/client";
import { useState } from "react";

const Add = () => {
  const [addBook, { loading, error }] = useMutation(ADD_BOOK);
  const [message, setMessage] = useState("");

  const handleAdd = async (values) => {
    const { title, author, publicationYear } = values;
    const parsedPublicationYear = parseInt(publicationYear, 10);

    try {
      let response = await addBook({
        variables: { title, author, publicationYear: parsedPublicationYear },
      });
      setMessage(
        `Book Added: ${response.data.createBook.title} by ${response.data.createBook.author}`
      );
    } catch (error) {
      console.log("Error adding book:", error);
      setMessage(``);
    }
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
        {message}
      </Card>
    </div>
  );
};

export default Add;
