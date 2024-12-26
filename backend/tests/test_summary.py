#!/usr/bin/python3

from flask_jwt_extended import create_access_token
from datetime import datetime


def test_get_monthly_summary(client):
    user_id = 'test_user'
    token = create_access_token(identity=user_id)

    # Transactions
    client.post('/api/transactions', json={
        'amount': 500,
        'category': 'Salary',
        'description': 'Monthly salary'
    }, headers={'Authorization': f'Bearer {token}'})
    client.post('api/transactions', json={
        'amount': 200,
        'category': 'Groceries',
        'description': 'Grocery shopping'
    }, headers={'Authorization': f'Bearer {token}'})

    current_month = datetime.utcnow().month
    current_year = datetime.utc().year

    response = client.get(f'/api/summary?month={current_month}&year={current_year}',
                          headers={'Authorization': f'Bearer {token}'})
    assert response.status_code == 200
    assert len(response.json) > 0
    assert response.json[0]['total'] > 0
