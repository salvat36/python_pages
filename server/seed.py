#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import UserBook, Book, User

fake = Faker()

print("Starting seed...")
        
def create_books():
    genres = ['manga', 'fantasy' 'sci-fy', 'fiction', 'non-fiction', 'romance', 'mystery', 'thriller', 'philosophy']
    books = []
    for _ in range():
        book = Book(
            title = fake.words(2),
            author = fake.name(),
            genre = rc(genres) ,
            page_count = rc(range(100, 3000)),
            created_at = fake.date(),
            updated_at = fake.date(),
        )
        books.append(book)
    return books

    

def create_users():
    users = []
    for _ in range():
        user = User(
            username = fake.email()
            password = 
            created_at = 
            updated_at = 
        )
        users.append(user)
    return users

def create_user_books():
    user_books = []
    for _ in range():
        user_book = UserBook(
            book_id =
            user_id =
        )
        user_books.append(user_book)
    return user_books