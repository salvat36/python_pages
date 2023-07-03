# Welcome to Python Pages!

This is a Flask-React application that allows users to manage books. The application consists of a Flask backend server and a React frontend, allowing users to:

- Sign up and log in to the application.
- View a list of all books.
- View details of a specific book.
- Search for a book.
- Add books to a collection.

## Table Relations

![Table Relations](https://github.com/salvat36/python_pages/assets/116766995/a2a2e2a6-30c4-47b9-869c-c4d2d80cf9b7)

## Installation

To run the application, follow these steps:

### Backend Setup

1. Install Python 3.x if you haven't already.

2. Set up the database:

   ```shell
   flask db init
   flask db migrate
   flask db upgrade
   ```

3. Install additional dependencies by running the following commands:

   ```shell
   pipenv install flask-cors
   pipenv install flask-bcrypt
   pipenv install python-dotenv
   pipenv install flask-sqlalchemy
   pipenv install flask-migrate
   pipenv install sqlalchemy-serializer
   pipenv install flask-restful
   pipenv install faker
   pipenv install ipdb
   ```

4. To securely manage sensitive information, such as secret keys, in your Flask application, you can use `python-dotenv`. Follow these steps:

   - Install the `python-dotenv` package using `pipenv`:

     ```shell
     pipenv install python-dotenv
     ```

   - Edit your `.gitignore` file and add a line that says `.env` to exclude it from version control. This ensures that your secret key is not exposed in your code repository.

   - Generate a secret key by running the following command in your terminal:

     ```shell
     python -c 'import secrets; print(secrets.token_hex())'
     ```

     This command generates a random secret key, which will be used to secure your application.

   - Create a file called `.env` in your Flask server directory.

   - Inside the `.env` file, add the following line:

     ```
     SECRET_KEY=<your_secret_key>
     ```

     Replace `<your_secret_key>` with the secret key you generated in the previous step.

   - In the file where `app.secret_key` is being set (e.g., `app.py` or `config.py`), make the following changes:

     - Import `environ` from the `os` module and `load_dotenv` from `dotenv`:

       ```python
       from os import environ
       from dotenv import load_dotenv
       ```

     - Before setting the secret key, add the line `load_dotenv('.env')` to load the environment variables from the `.env` file:

       ```python
       load_dotenv('.env')
       ```

     - Instead of directly setting the secret key, change the line to:

       ```python
       app.secret_key = environ.get('SECRET_KEY')
       ```

     By following these steps, your Flask application will load the environment variables from the `.env` file, and the secret key will be retrieved from the `SECRET_KEY` variable using `environ.get()`. This ensures that your secret key remains secure and is not hardcoded in your codebase.

     Remember to handle the deployment of environment variables appropriately when deploying your application, as hosting platforms usually provide ways to configure environment variables separately.

5. Start the backend server:

   ```shell


   flask run
   ```

   The backend server should now be running on `http://localhost:5000`.
   
   For Front End set up please refer to the readme inside of Client
   
   Please note that these instructions assume you are using `pipenv` as your package manager. If you're using a different package manager, you can adjust the commands accordingly.
