from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

# Models go here!
class UserBook(db.Model, SerializerMixin):
    __tablename__ = 'user_books'
    
    id = db.Column(db.Integer, primary_key=True)
    
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    book = db.relationship('Book', back_populates='user_books')
    user = db.relationship('User', back_populates='user_books')
    
    # serialization
    serialize_only = ('id', 'book_id', 'user_id')
    serialize_rules = ()
    
    # validation
    # none in this class
    
    #! unsure what repr info we need here
    def __repr__(self):
        return f'UserBook {self.id}'


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
    
    # serialization
    serialize_rules = ('-created_at', '-updated_at')
    serialize_only = ( 'title','id', 'author')
    
    # validation
    # ...

    def __repr__(self):
        return f'Book {self.title}, {self.author}, {self.genre}'

    # serialization
    # serialize_only = ()
    # serialize_rules = ()
    
    # validation
    #! in react - can look at again later if needed here as well

    def __repr__(self):
        return f'Book {self.title}, {self.author}, {self.genre}'
    
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    
    username = db.Column(db.String(30))
    password = db.Column(db.String(30))
    # email
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    user_books = db.relationship('UserBook', back_populates='user', cascade='all')
    books = association_proxy('user_books', 'book')
    
    # serialization
    serialize_only = ('id','password' 'username')
    serialize_rules = ('-created_at', '-updated_at')
    
    # validation
    #! validate username and password (idk if you can do this on the react side or not?)
    
    def __repr__(self):
        return f'User {self.username}, {self.password}'
    

    