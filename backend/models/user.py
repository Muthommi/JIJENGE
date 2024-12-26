#!/usr/bin/python3

import bcrypt
from utils.database import users_collection


class User:
    @staticmethod
    def register(email, password):
        hashed_password = bcrypt.hashpw(
                password.encode('utf-8'),
                bcrypt.gensalt()
        )
        user = {"email": email, "password": hashed_password}
        users_collection.insert_one(user)
        return user

    @staticmethod
    def find_by_email(email):
        return users_collection.find_one({"email": email})

    @staticmethod
    def verify_password(password, hashed_password):
        return bcrypt.checkpw(password.encode('utf-8'), hashed_password)
