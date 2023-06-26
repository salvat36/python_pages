#!/usr/bin/env python3

# Standard library imports
from flask import Flask, request, jsonify, make_response, Request
from flask_migrate import Migrate
from flask_restful import Resource, Api
from config import app, db, api
from models import User, UserBook, Book
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'instance/app.db')}")

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

api = Api(app)

db.init_app(app)

# Views go here!


@app.route('/')
def home():
    return ''


class UserBooks(Resource):
    def get(self):
        user_books = [ub.to_dict() for ub in UserBook.query.all()]
        return make_response(user_books, 200)


# need post for adding new user_books
api.add_resource(UserBooks, '/user-books')


class UserBooksById(Resource):  # ! delete goes here
    def get(self, id):
        user = UserBooks.query.filter(UserBooks.id == id).first()
        if user:
            return user
        make_response({'error': 'Library not found'})

    def delete(self, id):
        try:
            user_book = db.session.get(UserBook, id)
            db.session.delete(user_book)
            db.session.commit()
            return make_response('', 200)
        except:
            return make_response({'error(s):' 'delete not successful'})


api.add_resource(UserBooks, '/user-books')


class Book(Resource):
    def get(self):
        books = [b.to_dict() for b in Book.query.all()]
        return make_response(books, 200)


api.add_resource(Book, '/books')


class User(Resource): ##gets a post 
    pass


if __name__ == '__main__':
    app.run(port=5555, debug=True)
