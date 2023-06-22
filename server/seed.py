#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, UserBook, Book, User

fake = Faker()

print("Starting seed...")
        
def create_books():
    genres = ['manga', 'fantasy' 'sci-fy', 'fiction', 'non-fiction', 'romance', 'mystery', 'thriller', 'philosophy']
    books = []
    for _ in range(500):
        book = Book(
            title = fake.words(2),
            author = fake.name(),
            genre = rc(genres),
            page_count = rc(range(100, 3000)),
            created_at = fake.date(),
            updated_at = fake.date()
        )
        books.append(book)
    return books

    

def create_users():
    users = []
    for _ in range(100):
        user = User(
            username = fake.email()
            password = randint(200, 1000)
            created_at = fake.date()
            updated_at = fake.date()
        )
        users.append(user)
    return users

def create_user_books():
    user_books = []
    for _ in range(50):
        user_book = UserBook(
            book_id = ([rc(book.id) for book in books]),
            user_id = ([user.id for user in users])
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
        userbooks = create_user_books()
        db.session.add_all(userbooks)
        db.session.commit()
