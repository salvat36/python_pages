# Welcome to Python Pages!

This is a Flask-React application that allows users to manage books. The application consists of a Flask backend server and a React frontend allowing users to:

- Sign up and log in to the application.
- View a list of all books.
- View details of a specific book.
- Search for a book
- Add books to collection

## table relations

<img width="988" alt="Screenshot 2023-06-29 at 3 28 40 PM" src="https://github.com/salvat36/python_pages/assets/116766995/a2a2e2a6-30c4-47b9-869c-c4d2d80cf9b7">

## Installation

To run the application, follow these steps:

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

### Backend Setup

1. Install Python 3.x if you haven't already.

2. Set up the database:

   ```
   flask db init
   flask db migrate
   flask db upgrade
   ```

## Install additional dependencies by running the following commands:

   ```
   pipenv install flask-cors
   pipenv install flask-bcrypt
   pipenv install python-dotenv
   ```
   

To securely manage sensitive information, such as secret keys, in your Flask application, you can use the `python-dotenv`:

1. Install the `python-dotenv` package using `pipenv` by running the command:
   ```
   pipenv install python-dotenv
   ```

2. Edit your `.gitignore` file and add a line that says `.env` to exclude it from version control. This ensures that your secret key is not exposed in your code repository.

3. Generate a secret key by running the following command in your terminal:
   ```
   python -c 'import secrets; print(secrets.token_hex())'
   ```
   This command generates a random secret key, which will be used to secure your application.

4. Create a file called `.env` in your Flask server directory.

5. Inside the `.env` file, add the following line:
   ```
   SECRET_KEY=
   ```
   After the equals sign, paste the copied secret key.

6. In the file where `app.secret_key` is being set (e.g., `app.py` or `config.py`), make the following changes:
   - Import `environ` from the `os` module and `load_dotenv` from `dotenv`:
     ```
     from os import environ
     from dotenv import load_dotenv
     ```

   - Before setting the secret key, add the line `load_dotenv('.env')` to load the environment variables from the `.env` file:
     ```
     load_dotenv('.env')
     ```

   - Instead of directly setting the secret key, change the line to:
     ```
     app.secret_key = environ.get('SECRET_KEY')
     ```

By following these steps, your Flask application will load the environment variables from the `.env` file, and the secret key will be retrieved from the `SECRET_KEY` variable using `environ.get()`. This ensures that your secret key remains secure and is not hardcoded in your codebase.

Remember to handle the deployment of environment variables appropriately when deploying your application, as hosting platforms usually provide ways to configure environment variables separately.

3. Start the  backend server:

```
python app.py 
```

## Usage

Once the application is up and running, you can access it in your web browser at `http://localhost:4000`.

1. Sign up for a new account or log in with your existing credentials.
2. After logging in, you will be able to view a list of all books.
3. Click on a book to view its details.
4. Add books to your collection and show it off later!

Remember to log out when you're done using the application.

Happy Reading! 📚📖

## Technologies Used

- Flask: A micro web framework for building the backend server.
- SQLAlchemy: An Object-Relational Mapping (ORM) library for working with databases in Python.
- Flask-RESTful: An extension for Flask that simplifies building RESTful APIs.
- React: A JavaScript library for building user interfaces.
- React Router: A routing library for React applications.

## Connect with us

https://github.com/sturco42
https://github.com/salvat36
https://github.com/Chaospearl64
