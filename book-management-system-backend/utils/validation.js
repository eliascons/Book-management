export default function validateEntry(book){
  const errors = [];

  if (
    !book.title ||
    typeof book.title !== "string" ||
    book.title.trim() === ""
  ) {
    errors.push("Book title is required and must be a non-empty string.");
  }

  if (
    !book.author ||
    typeof book.author !== "string" ||
    book.author.trim() === ""
  ) {
    errors.push("Book author is required and must be a non-empty string.");
  }

  if(!book.publicationYear || typeof book.publicationYear !== "number" || book.publicationYear < 1000){
    errors.push("Book publicationYear is required and must be a number greater than 1000.");
  }

  return errors;
};


