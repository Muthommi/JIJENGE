#!/usr/bin/python3

import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))

def test_register_user(client):
    response = client.post('/api/auth/register', json={
        'email': 'test@example.com',
        'password': 'securepassword'
    })
    print(response.json)
    assert response.status_code == 201
    assert response.json['message'] == 'User registered successfully'

def test_register_existing_user(client):
    client.post('/api/auth/register', json={
        'email': 'test@example.com',
        'password': 'securepassword'
    })
    response = client.post('/api/auth/register', json={
        'email': 'test@example.com',
        'password': 'securepassword'
    })
    assert response.status_code == 400
    assert response.json['message'] == 'User already exists'

def test_login_success(client):
    client.post('/api/auth/register', json={
        'email': 'test@example.com',
        'password': 'securepassword'
    })
    response = client.post('/api/auth/login', json={
        'email': 'test@example.com',
        'password': 'securepassword'
    })
    assert response.status_code == 200
    assert 'token' in response.json

def test_login_failure(client):
    response = client.post('/api/auth/login', json={
        'email': 'wrongexample.com',
        'password': 'wrongpassword'
    })
    assert response.status_code == 401
    assert response.json['message'] == 'Invalid credentials'
