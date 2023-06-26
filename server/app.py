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

class UserBooks(Resource):
    def get(self):
        user_books = [ub.to_dict() for ub in UserBook.query.all()]
        return make_response(user_books, 200)

api.add_resource(UserBooks, '/user-books')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
