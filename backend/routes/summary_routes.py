#!/usr/bin/python3

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.transaction import Transaction

summary_routes = Blueprint('summary_routes', __name__)


@summary_routes.route('/summary', methods=['GET'])
@jwt_required()
def get_monthly_summary():
    user_id = get_jwt_identity()
    month = int(request.args.get('month'))
    year = int(request.args.get('year'))
    summary = Transaction.get_monthly_summary(user_id, month, year)
    return jsonify(summary), 200
