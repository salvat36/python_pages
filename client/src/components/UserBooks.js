import { useEffect, useState } from "react";
import { Card, Container, Image } from "semantic-ui-react";
import BookCard from "./BookCard";
import UpdateUserForm from "./UpdateUserForm";

const UserBooks = ({ user, updateUser, handleDeleteUser }) => {
  const booksList = user?.user_books.map((userBook) => (
    <BookCard key={userBook.book.id} {...userBook.book} />
  ));

  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm((current) => !current);
  };

  return (
    <Container>
      <Card centered>
          <Image src={user.avatar} wrapped ui={false}/>
        <Card.Content>
          <Card.Header>Welcome to your library, {user.username}!</Card.Header>
          <Card.Description>
            <button onClick={handleDeleteUser}>Delete Account</button>
            <button onClick={toggleForm}>Edit Account</button>
            {showForm ? (
              <UpdateUserForm onUpdate={updateUser} user={user} />
            ) : null}
          </Card.Description>
          <Card.Content>
            <Card.Header>Your Library:</Card.Header>
            <Card.Description>{booksList ? booksList : null}</Card.Description>
          </Card.Content>
        </Card.Content>
      </Card>
    </Container>
  );
};

export default UserBooks;
