from config import db

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
class ReaderBook(db.Model, SerializerMixin):
    __tablename__ = 'reader_books'
    
    id = db.Column(db.Integer, primary_key=True)
    
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))
    reader_id = db.Column(db.Integer, db.ForeignKey('readers.id'))
    
    book = db.relationship('Book', back_populates='reader_books')
    reader = db.relationship('Reader', back_populates='reader_books')
    
    # serialization
    # serialize_only = ()
    # serialize_rules = ()
    
    # validation
    # none in this class
    
    #! unsure what repr info we need here
    def __repr__(self):
        return f'ReaderBook {self.id}'
    
class Book(db.Model, SerializerMixin):
    __tablename__ = 'books'
    
    id = db.Column(db.Integer, primary_key=True)
    
    title = db.Column(db.String)
    author = db.Column(db.String)
    genre = db.Column(db.String)
    page_count = db.Column(db.Integer)
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, on_update=db.func.now())
    
    reader_books = db.relationship('ReaderBook', back_populates='book', cascade='all')
    readers = association_proxy('reader_books', 'reader')
    
    # serialization
    # serialize_only = ()
    # serialize_rules = ()
    
    # validation
    #! in react - can look at again later if needed here as well

    def __repr__(self):
        return f'Book {self.title}, {self.author}, {self.genre}'
    
class Reader(db.Model, SerializerMixin):
    __tablename__ = 'readers'
    
    id = db.Column(db.Integer, primary_key=True)
    
    username = db.Column(db.VarChar)
    password = db.Column(db.VarChar)
    # email
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, on_update=db.func.now())
    
    reader_books = db.relationship('ReaderBook', back_populates='reader', cascade='all')
    books = association_proxy('reader_books', 'book')
    
    # serialization
    # serialize_only = ()
    # serialize_rules = ()
    
    # validation
    #! validate username and password (idk if you can do this on the react side or not?)
    
    def __repr__(self):
        return f'Reader {self.username}, {self.password}'