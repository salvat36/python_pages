# Welcome to Python Pages!

This is a Flask-React application that allows users to manage books. The application consists of a Flask backend server and a React frontend allowing users to:

- Sign up and log in to the application.
- View a list of all books.
- View details of a specific book.
- Search for a book
- Add books to collection
  
<img width="988" alt="Screenshot 2023-06-29 at 3 28 40 PM" src="https://github.com/salvat36/python_pages/assets/116766995/a2a2e2a6-30c4-47b9-869c-c4d2d80cf9b7">

## Installation

To run the application, follow these steps:

### Backend Setup

1. Install Python 3.x if you haven't already.

2. Set up the database:
   ```
   flask db init
   flask db migrate
   flask db upgrade
   ```
3.  Start the Flask backend server:

   ```
   flask run
   ```

### Frontend Setup

1. Install Node.js if you haven't already.
2. Navigate to the `client` directory:
   ```
   cd client
   ```
3. Install the required Node.js packages:
   ```
   npm install
   ```
4. Start the React development server:
   ```
   npm start
   ```

## Usage

Once the application is up and running, you can access it in your web browser at `http://localhost:4000`.

1. Sign up for a new account or log in with your existing credentials.
2. After logging in, you will be able to view a list of all books.
3. Click on a book to view its details.
4. Add books to your collection and show it off later!

Remember to log out when you're done using the application.

## Technologies Used

- Flask: A micro web framework for building the backend server.
- SQLAlchemy: An Object-Relational Mapping (ORM) library for working with databases in Python.
- Flask-RESTful: An extension for Flask that simplifies building RESTful APIs.
- React: A JavaScript library for building user interfaces.
- React Router: A routing library for React applications.

