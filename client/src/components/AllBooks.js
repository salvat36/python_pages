import React, { useState, useEffect } from 'react';
import { Card, Button, Container } from 'semantic-ui-react';
import SearchBooks from './SearchBooks';
import BookCard from './BookCard';
import UserBooks from './UserBooks';

const AllBooks = ({ booksToDisplay }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('/books')
      .then((res) => res.json())
      .then(setBooks)
      .catch((err) => console.log(err));
  }, []);

  const mappedBooks = booksToDisplay.map((book) => (
    <BookCard key={book.id} {...book} />
  ));

  return (
    <Container className="all-books-container" id="all-books-container">
      <Card.Group className="card-group">
        {mappedBooks.map((book) => (
          <Card fluid key={book.props.id} href={`/books/${book.props.id}`} className="hover-card">
            <Card.Content>
              <Card.Header>{book.props.title} by {book.props.author}</Card.Header>
              <Card.Meta>{book.props.genre}</Card.Meta>
              <Card.Description>Page Count: {book.props.page_count}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              {/* <Button color="teal">View Details</Button> */}
             
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
};

export default AllBooks;
