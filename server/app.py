#!/usr/bin/env python3

# Standard library imports
from flask import Flask, request, jsonify, make_response, session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import User, UserBook, Book, db
from config import app, api
from flask_restful import Resource

#HOME
@app.route('/')
def home():
    return '<h1>home page</h1>'

#LOGIN
@app.route('/login', methods=['POST'])
def login():
    try:
        user = User.query.filter_by(username=request.get_json().get('username')).first()
        if user.authenticate(request.get_json().get('password')):
            session['user_id'] = user.id
            return make_response(user.to_dict(), 200)
    except Exception as e:
        return make_response({'error': str(e)}, 401)
    
@app.route('/authenticate', methods=['GET'])
def get():
    # user = User.query.filter_by(id=session.get('user_id')).first()
    if session.get('user_id') and db.session.get(User, session['user_id']):
        return make_response(db.session.get(User, session['user_id']).to_dict(), 200)
    return make_response({'error': 'Unauthorized' }, 401)

#SIGNUP
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    user = User(
        username=username,
        password_hash =data.get('password')
    )
    try:
        db.session.add(user)
        db.session.commit()
        session['user_id'] = user.id
        return make_response(user.to_dict(), 201)
    except Exception as e:
        return make_response({'error': str(e)}, 422)
    
#LOGOUT
@app.route('/logout', methods=['DELETE'])
def logout():
    if session.get('user_id'):
        session['user_id'] = None
        return make_response({'message': 'Successfully Logged Out'}, 204)
    return make_response({'error'})

class UserBooks(Resource):
    
    def get(self):
        # user_books = [ub.to_dict() for ub in UserBook.query.filter(session.get('user_id')).all()]
        user_books = [ub.to_dict() for ub in UserBook.query.all()]
        return make_response(user_books, 200)
    
    def post(self):
        if 'user_id' in session:
            try:
                # import ipdb; ipdb.set_trace()
                new_user_book = UserBook(
                    user_id = session['user_id'],
                    book_id = request.get_json()['id']
                )
                db.session.add(new_user_book)
                db.session.commit()
                return make_response('', 200)
            except Exception as e:
                return make_response({'error': str(e)}, 400)
        return make_response({'error': 'Unauthorized' }, 401)

api.add_resource(UserBooks, '/user-books')

class UserBookById(Resource):
    
    def get(self, id):
        user_book = db.session.get(UserBook, id)
        print(id)
        if user_book:
            return make_response(user_book.to_dict(), 200)
        return make_response({'error': 'user_book must have a valid user and valid book '}, 404)
    
    def delete(self, id):
        if 'user_id' not in session:
            return make_response({'error': 'Unauthorized' }, 401)
        try:
            user_book = UserBook.query.filter_by(user_id = session.get('user_id'), book_id = id).first()
            if not user_book:
                return make_response({'error': 'Cannot find that book in your library'}, 404)
            # import ipdb; ipdb.set_trace()
            db.session.delete(user_book)
            db.session.commit()
            return make_response('', 204)
        except Exception as e:
            return make_response({'error': str(e)}, 422)
api.add_resource(UserBookById, '/user-books/<int:id>')

class Books(Resource):
    
    def get(self):
        books = [b.to_dict() for b in Book.query.all()]
        return make_response(books, 200)

api.add_resource(Books, '/books')

class BookById(Resource):
    
    def get(self, id):
        book = db.session.get(Book, id)
        if book:
            return make_response(book.to_dict(), 200)
        return make_response({'error': 'book not found'}, 404)

api.add_resource(BookById, '/books/<int:id>')

class Users(Resource):
    
    def get(self):
        users = [u.to_dict() for u in User.query.all()]
        return make_response(users, 200)

    def post(self):
        data = request.get_json()
        try:
            new_user = User(**data)
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id
            return make_response(new_user.to_dict(), 201)

        except Exception:
            # add specifics later
            return make_response({'errors': ['validation errors']}, 400)

api.add_resource(Users, '/users')

class UserById(Resource):
    def delete(self, id):
        if 'user_id' not in session:
            return make_response({'error': 'Unauthorized' }, 401)
        try:
            user = User.query.filter_by(user_id = session.get('user_id'), user_id = id).first()
            if not user:
                return make_response({'error': 'Cannot find that book in your library'}, 404)
            # import ipdb; ipdb.set_trace()
            db.session.delete(user)
            db.session.commit()
            return make_response('', 204)
        except Exception as e:
            return make_response({'error': str(e)}, 422)
api.add_resource(UserById, '/users/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)