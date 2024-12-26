#!/usr/bin/python3

import pytest
from models.user import User
from utils.database import users_collection
import bcrypt

@pytest.fixture
def user_data():
    return {
        "email": "test@example.com",
        "password": "secure password"
    }

@pytest.fixture(autouse=True)
def clear_users_collection():
    users_collection.delete_many({})

def test_register(user_data):
    user = User.register(user_data["email"], user_data["password"])
    assert user["email"] == user_data["email"]
    assert bcrypt.checkpw(user_data["password"].encode('utf-8'), user["password"])

def test_find_by_email(user_data):
    User.register(user_data["email"], user_data["password"])
    user = User.find_by_email(user_data["email"])
    assert user is not None
    assert user["email"] == user_data["email"]

def test_verify_password(user_data):
    hashed_password = bcrypt.hashpw(user_data["password"].encode('utf-8'), bcrypt.gensalt())
    assert User.verify_password(user_data["password"], hashed_password)
