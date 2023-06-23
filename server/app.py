#!/usr/bin/env python3

# Standard library imports
from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
# from config import app, db, api
from models import User, UserBook, Book, db
import os
from flask_restful import Resource, Api


BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, '/instance/app.db')}")

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)


api = Api(app)

db.init_app(app)

# @app.before_request
# def create_database():
#      db.create_all()

# Views go here!


@app.route('/')
def index():
    return '<h1> home page</h1>'


class UserBooks(Resource):
    def get(self):
        user_books = [ub.to_dict() for ub in UserBook.query.all()]
        return make_response(user_books, 200)


api.add_resource(UserBooks, '/user-books')


class UserBookById(Resource):  # need to add for specific user
    def get(self, id):
        user_book = db.session.get(UserBook, id)
        if user_book:
            return make_response(user_book, 200)
        return make_response({'error': 'user_book must have a valid user and valid book '}, 404)

    def delete(self, id):
        try:
            user_book = UserBook.query.get(id)
            db.session.delete(user_book)
            db.session.commit()
            return make_response('', 200)
        except Exception as e:
            return make_response({'error': str(e)}, 500)


api.add_resource(UserBookById, '/user-books/<int:id>')


class Books(Resource):
    def get(self):
        books = [b.to_dict() for b in Book.query.all()]
        return make_response(books, 200)


api.add_resource(Books, '/books')


class Users(Resource):
    def get(self):
        users = [u.to_dict() for u in User.query.all()]
        return make_response(users, 200)


    def post(self):
        data = request.get_json()
        try:
            users = User(**data)
            db.session.add(users)
            db.session.commit()
            return users.to_dict(), 201

        except Exception:
            # add specifics later
            return make_response({'errors': ['validation errors']}, 400)


api.add_resource(Users, '/users')


class UserById(Resource):
    def get(self, id):
        user = db.session.get(User, id)
        if user:
            return make_response(user.to_dict(), 200)
        return make_response({'error': 'User not found'}, 404)


api.add_resource(UserById, '/users/<int:id>')


class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
    
        user = User.query.filter(User.username == username).first()

        if user:
            return (user.to_dict(), 200)
            ##!Need password here too
        
        return {"Error": "404 Unauthorized"}, 401
api.add_resource(Login, '/login>')
        

if __name__ == '__main__':
    app.run(port=5555, debug=True)