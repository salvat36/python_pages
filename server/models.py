from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(naming_convention={"fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",})

db = SQLAlchemy(metadata=metadata)

class UserBook(db.Model, SerializerMixin):
    __tablename__ = 'user_books'
    
    id = db.Column(db.Integer, primary_key=True)
    
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    book = db.relationship('Book', back_populates='user_books')
    user = db.relationship('User', back_populates='user_books')
    
    serialize_only = ('id', 'book_id', 'user_id')
    serialize_rules = ()
    
    # validation
    # MOST RESTRICTIVE VALIDATIONS HERE
    
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
    
    # validation
    # ...

    def __repr__(self):
        return f'Book {self.title}, {self.author}, {self.genre}'
    
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    
    username = db.Column(db.String(30), unique=True)
    password = db.Column(db.String(30))
    # email
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    user_books = db.relationship('UserBook', back_populates='user', cascade='all')
    books = association_proxy('user_books', 'book')
    
    serialize_only = ('id', 'username', 'password', 'user_books')
    serialize_rules = ('-user_books.id', '-user_books.user_id')
    
    # validation
    #! validate username and password (idk if you can do this on the react side or not?)
    @validates('username')
    def validate_username(self, key, username):
        if type(username) not in [str] or not range(3, 20):
            raise ValueError('Username must be a string between 3 and 20 characters')
        return username

    @validates('password')
    def validate_password(self, key, password):
        if type(password) not in [str] or not range(3, 20):
            raise ValueError('Password must be a string between 3 and 20 characters')
        return password

    def __repr__(self):
        return f'User {self.username}, {self.password}'