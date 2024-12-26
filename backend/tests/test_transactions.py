#!/usr/bin/python3

from flask_jwt_extended import create_access_token


def test_add_transaction(client):
    user_id = 'test_user'
    token = create_access_token(identity=user_id)
    response = client.post('/api/transactions', json={
        'amount': 500,
        'category': 'Salary',
        'description': 'Monthly salary'
    }, headers={'Authorization': f'Bearer {token}'})
    assert response.status_code == 201
    assert response.json['amount'] == 500
    assert response.json['category'] == 'Salary'


def test_get_transactions(client):
    user_id = 'test_user'
    token = create_access_token(identity=user_id)

    # Transaction
    client.post('/api/transactions', json={
        'amount': 500,
        'category': 'Salary',
        'description': 'Monthly salary'
    }, headers={'Authorization': f'Bearer {token}'})

    response = client.get('/api/transactions', headers={'Authorization': f'Bearer {token}'})
    assert response.status_code == 200
    assert len(response.json) > 0
    assert response.json[0]['category'] == 'Salary'
