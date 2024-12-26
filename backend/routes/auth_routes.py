#!/usr/bin/python3

from flask import Blueprint, request, jsonify
from bson import ObjectId
from models.user import User
from utils.jwt_helper import generate_token


auth_routes = Blueprint('auth_routes', __name__)


def json_serializable(user):
    if '_id' in user:
        user['_id'] = str(user['_id'])
    return user


@auth_routes.route('/register', methods=['POST'])
def register():
    data = request.json
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({"message": "Invalid data"}), 400
    if User.find_by_email(data['email']):
        return jsonify({"message": "User already exists"}), 400
    user = User.register(data['email'], data['password'])
    user = json_serializable(user)
    return jsonify({
        "message": "User registered successfully",
        "user": user
    }), 201


@auth_routes.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.find_by_email(data['email'])
    if not user or not User.verify_password(
        data['password'],
        user['password']
    ):
        return jsonify({"message": "Invalid credentials"}), 401
    token = generate_token(user['_id'])
    return jsonify({"token": token}), 200
