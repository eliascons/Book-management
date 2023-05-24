
import {  Modal, message } from "antd";


const handleDeleteClick = (bookId, deleteBook) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this book?",
      onOk: async () => {
        try {
          let response = await deleteBook({ variables: { id: bookId } });
          console.log(response);
          message.success("Book deleted successfully");
        } catch (error) {
          console.log(error);
          message.error(
            `An error occurred while deleting the book , ${error.message}`
          );
        }
      },
    });
  };

  export default handleDeleteClick;