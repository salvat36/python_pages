import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Card, Container, Button } from "semantic-ui-react";

const BookDetails = ({ user, addUserBook, removeUserBook }) => {
  const { id } = useParams();
  const [book, setBook] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetch(`/books/${id}`).then((res) => {
      if (res.ok) {
        res.json().then(setBook);
      } else {
        alert("Book Not Found");
      }
    });
  }, [id]);

  const handleAddBook = () => {
    fetch("/user-books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }).then((res) => {
      if (res.ok) {
        addUserBook(book);
      } else {
        alert("Something went wrong");
      }
    });
  };

  const handleRemoveBook = () => {
    fetch(`/user-books/${id}`, { method: "DELETE" }).then((res) => {
      if (res.ok) {
        removeUserBook(book);
      } else {
        alert("Something went wrong");
      }
    });
  };

  const handleBackToCollection = () => {
    history.push("/books");
  };

  if (!book) return "Loading...";
  const { author, genre, page_count, title } = book;
  const userBooks = user?.user_books.map((userBook) => userBook.book);
  const bookInCollection = userBooks.some(
    (book) => book.title === title && book.author === author
  );

  return (
    <Container>
      <Card centered>
      <Button onClick={handleBackToCollection}>Back to Collection</Button>
        <Card.Content>
          <Card.Header>Title: {title}</Card.Header>
          <Card.Description>
            <h3>Author: {author}</h3>
            <h3>Genre: {genre}</h3>
            <h3>Page Count: {page_count}</h3>
          </Card.Description>
          <Card.Content extra>
            {!bookInCollection ? (
              <button onClick={handleAddBook}>Add to Library</button>
            ) : (
              <button onClick={handleRemoveBook}> Remove From Library</button>
            )}
          </Card.Content>
        </Card.Content>
      </Card>
    </Container>
  );
};

export default BookDetails;
