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
    
    # relationships
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))
    reader_id = db.Column(db.Integer, db.ForeignKey('readers.id'))
    
    book = db.relationship('Book', back_populates='reader_books')
    reader = db.relationship('Reader', back_populates='reader_books')
    
    # serialization
    # serialize_only = ()
    # serialize_rules = ()
    
    # validation
    # none in this class
    
