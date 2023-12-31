from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from config import bcrypt, db, metadata

class UserBook(db.Model, SerializerMixin):
    __tablename__ = 'user_books'
    
    id = db.Column(db.Integer, primary_key=True)
    
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    book = db.relationship('Book', back_populates='user_books')
    user = db.relationship('User', back_populates='user_books')
    
    serialize_only = ('id', 'book_id', 'user_id')
    serialize_rules = ()
    
    def __repr__(self):
        return f'UserBook {self.id}, {self.book_id}, {self.user_id}'

class Book(db.Model, SerializerMixin):
    __tablename__ = 'books'
    
    id = db.Column(db.Integer, primary_key=True)
    
    title = db.Column(db.String)
    author = db.Column(db.String)
    genre = db.Column(db.String)
    page_count = db.Column(db.Integer)
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    user_books = db.relationship('UserBook', back_populates='book', cascade='all')
    users = association_proxy('user_books', 'user')
    
    serialize_only = ('id', 'title', 'author', 'genre', 'page_count')
    serialize_rules = ()
    
    @validates('title')
    def validates_title(self, key, title):
        if type(title) not in [str] or not (2 <= len(title) <= 20):
            raise ValueError('Title must be a string between 2 and 20 characters')
        return title
    
    @validates('author')
    def validates_author(self, key, author):
        if type(author) not in [str] or not (2 <= len(author) <= 20):
            raise ValueError('Author must be a string between 2 and 20 characters')
        return author
    
    @validates('genre')
    def validates_genre(self, key, genre):
        if type(genre) not in [str] or not (2 <= len(genre) <= 20):
            raise ValueError('Genre must be a string between 2 and 20 characters')
        return genre
    
    @validates('page_count')
    def validates_page_count(self, key, page_count):
        if type(page_count) not in [int] or not 100 <= page_count <= 1000:
            raise ValueError('Page count must be between 100 and 1000 pages')
    
    def __repr__(self):
        return f'Book {self.title}, {self.author}, {self.genre}'
    
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    
    username = db.Column(db.String, unique=True)

    avatar = db.Column(db.String)
    
    _password_hash = db.Column(db.String)
    # admin = db.Column(db.String, default=False)

    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self.password_hash, password.encode('utf-8'))


    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    user_books = db.relationship('UserBook', back_populates='user', cascade='all')
    books = association_proxy('user_books', 'book')
    
    serialize_only = ('id', 'username', 'avatar', 'user_books', 'user_books.book')
    serialize_rules = ('-user_books.id', '-user_books.user_id')

    @validates('username')
    def validate_username(self, key, username):
        if type(username) not in [str] or not range(5, 20):
            raise ValueError('Username must be a string between 5 and 20 characters')
        return username

    @validates('password')
    def validate_password(self, key, password):
        if type(password) not in [str] or not range(5, 20):
            raise ValueError('Password must be a string between 5 and 20 characters')
        return password

    def __repr__(self):
        return f'User {self.username}, {self.password}'