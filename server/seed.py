#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc, random

# Remote library imports
from faker import Faker
from flask import Flask

# Local imports
from app import app
from models import UserBook, Book, User, db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'

db.init_app(app)

with app.app_context():
    db.create_all()

fake = Faker()

print("Starting seed...")
        
def create_books():
    genres = ['manga', 'fantasy', 'sci-fy', 'fiction', 'non-fiction', 'romance', 'mystery', 'thriller', 'philosophy']
    books = []
    for _ in range(500):
        book = Book(
            title = fake.word(),
            author = fake.name(),
            genre = rc(genres),
            page_count = rc(range(100, 1000)),
            created_at = fake.date_time(),
            updated_at = fake.date_time()
        )
        books.append(book)
    return books

def create_users():
    users = []
    for _ in range(100):
        user = User(
            username = fake.user_name(),
            password_hash = 'password',
            created_at = fake.date_time(),
            updated_at = fake.date_time()
        )
        users.append(user)
    return users

def create_user_books(books, users):
    user_books = []
    for _ in range(50):
        user_book = UserBook(
            book_id = rc([book.id for book in books]),
            user_id = rc([user.id for user in users])
        )
        user_books.append(user_book)
    return user_books

if __name__ == '__main__':

    with app.app_context():
        print("Dumping DB...")
        Book.query.delete()
        User.query.delete()
        UserBook.query.delete()

        print("Shelving Books...")
        books = create_books()
        db.session.add_all(books)
        db.session.commit()

        print("Shelving Users")
        users = create_users()
        db.session.add_all(users)
        db.session.commit()

        print("Shelving UserBooks...")
        userbooks = create_user_books(books, users)
        db.session.add_all(userbooks)
        db.session.commit()
