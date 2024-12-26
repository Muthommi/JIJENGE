#!/usr/bin/python3

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.transaction import Transaction

transaction_routes = Blueprint('transaction_routes', __name__)


@transaction_routes.route('/transactions', methods=['POST'])
@jwt_required()
def add_transaction():
    data = request.json
    user_id = get_jwt_identity()
    transaction = Transaction.add_transaction(
        user_id, data['amount'], data['category'], data.get('description', "")
    )
    return jsonify(transaction), 201


@transaction_routes.route('/transactions', methods=['GET'])
@jwt_required()
def get_transactions():
    user_id = get_jwt_identity()
    transactions = Transaction.get_transactions_by_user(user_id)
    return jsonify(transactions), 200
