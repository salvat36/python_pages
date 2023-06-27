#!/usr/bin/env python3

# Standard library imports
from flask import Flask, request, jsonify, make_response
from flask_migrate import Migrate
from flask_restful import Resource, Api
from config import app, db, api
from models import User, UserBook, Book
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'instance/app.db')}")

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


class UserBooksById(Resource):
    def get(self, id):
        user = UserBook.query.filter(UserBook.id == id).first()
        if user:
            return user, 200
        return make_response({'error': 'User not found'}, 404)

    def delete(self, id):
        try:
            user_book = UserBook.query.get(id)
            db.session.delete(user_book)
            db.session.commit()
            return make_response('', 200)
        except Exception as e:
            return make_response({'error': str(e)}, 500)


class Book(Resource):
    def get(self):
        books = [b.to_dict() for b in Book.query.all()]
        return make_response(books, 200)


class User(Resource):
    def get(self):
        users = [u.to_dict() for u in User.query.all()]
        return make_response(users, 200)

    def post(self):
        try:
            new_user = User(username=request.json['username'], password=request.json['password'])
            db.session.add(new_user)
            db.session.commit()
            return new_user.to_dict(only=('username', 'password')), 201

        except Exception:
            return make_response({'error': '400: Validation error'}, 400)


class UserById(Resource):
    def get(self, id):
        user = User.query.filter(User.id == id).first()
        if user:
            return user, 200
        return make_response({'error': 'User not found'}, 404)


api.add_resource(UserBooks, '/user-books')
api.add_resource(UserBooksById, '/user-books/<int:id>')
api.add_resource(Book, '/books')
api.add_resource(User, '/users')
api.add_resource(UserById, '/users/<int:id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
