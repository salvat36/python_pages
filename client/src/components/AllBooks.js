import React, { useState, useEffect } from 'react';
import { Card, Button, Container } from 'semantic-ui-react';
import SearchBooks from './SearchBooks';
import BookCard from './BookCard';
import UserBooks from './UserBooks';
import { useHistory } from 'react-router-dom';

const AllBooks = ({ booksToDisplay }) => {
  const [books, setBooks] = useState([]);
  const history = useHistory();

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
          <Card
            fluid
            key={book.props.id}
            href={`/books/${book.props.id}`}
            className="hover-card"
            style={{ width: '200px', position: 'relative' }}
            onClick={(e) => {
              e.preventDefault(); // Prevent the default link behavior
              history.push(`/books/${book.props.id}`); // Navigate programmatically using history.push
            }}
          >
            <div className="card-border"></div>
            <Card.Content>
              <Card.Header>{book.props.title} by {book.props.author}</Card.Header>
              <Card.Meta>{book.props.genre}</Card.Meta>
              <Card.Description>Page Count: {book.props.page_count}</Card.Description>
            </Card.Content>
            <Card.Content extra>
          
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
};

export default AllBooks;
