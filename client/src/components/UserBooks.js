import { useState } from "react"
import { Card, Container, Button, Image } from "semantic-ui-react"
import { Link } from "react-router-dom"
import UpdateUserForm from "./UpdateUserForm"

const UserBooks = ({ user, updateUser, handleDeleteUser }) => {
  const userBooksList = user?.user_books.map((userBook) => (
    <Card key={userBook.book.id} className="hover-card">
      <Link to={`/books/${userBook.book.id}`}>
        <Card.Content className='my-cards'>
          <Card.Header>{userBook.book.title}</Card.Header>
          <Card.Meta>{userBook.book.author}</Card.Meta>
          <Card.Description>{userBook.book.description}</Card.Description>
        </Card.Content>
      </Link>
    </Card>
  ));

  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm((current) => !current);
  };

  return (
    <Container style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Card id="library-card" centered className="animated-border" style={{ width: "800px", padding: "20px", height: "600px", backgroundColor: "teal" }}>
        <Card.Content>
          <Card.Header>Welcome to your library, {user.username}!</Card.Header>
          {/* <Image  className='avatar' src={user.avatar} wrapped ui={false}/> */}
          <Card.Description>
            <Button className="ui button red" onClick={handleDeleteUser}>Delete Account</Button>
            <Button className="ui button teal" onClick={toggleForm}>Edit Account</Button>
            {showForm ? (
              <UpdateUserForm onUpdate={updateUser} user={user} />
            ) : null}
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <Card.Header>Your Library:</Card.Header>
          <Card.Group>{userBooksList}</Card.Group>
        </Card.Content>
        <Card.Content>
          <Button as={Link} to="/books" fluid>
            Want more books?
          </Button>
        </Card.Content>
      </Card>
    </Container>
  );
};

export default UserBooks;