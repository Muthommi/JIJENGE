#!/usr/bin/python3

from utils.database import transactions_collection
from datetime import datetime


class Transaction:
    @staticmethod
    def add_transaction(user_id, amount, category, description):
        transaction = {
                "user_id": user_id,
                "amount": amount,
                "category": category,
                "description": description,
                "date": datetime.utcnow()
        }
        transactions_collection.insert_one(transaction)
        return transaction

    @staticmethod
    def get_transactions_by_user(user_id):
        return list(transactions_collection.find({"user_id": user_id}))

    @staticmethod
    def get_monthly_summary(user_id, month, year):
        if month == 12:
            next_month = 1
            next_year = year + 1
        else:
            next_month = month + 1
            next_year = year
        pipeline = [
            {
                "$match": {
                    "user_id": user_id,
                    "date": {
                        "$gte": datetime(year, month, 1),
                        "$lt": datetime(next_year, next_month, 1)
                    }
                }
            },
            {
                "$group": {
                    "_id": "$category",
                    "total": {"$sum": "$amount"}
                }
            }
        ]
        return list(transactions_collection.aggregate(pipeline))
