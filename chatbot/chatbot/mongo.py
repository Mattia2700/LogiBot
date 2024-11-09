from pymongo import MongoClient


class MongoHelper:

    @classmethod
    def init(cls):
        cls.client = MongoClient("mongodb://admin:logibot2024@localhost:27017/?authSource=admin")
        cls.db = cls.client["logibot"]
        cls.orders = cls.db["orders"]
        cls.chats = cls.db["chats"]
        cls.candidatedeals = cls.db["candidatedeals"]

    @classmethod
    def get_history(cls, chat_id):
        return cls.chats.find({"id": chat_id})[0]