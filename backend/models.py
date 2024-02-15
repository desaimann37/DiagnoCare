"""
from app import db_instance
from datetime import datetime

class TokenBlocklist(db_instance.Document):
    id = db_instance.IntField(required=True)
    jti = db_instance.StringField(required=True)
    create_at = db_instance.DateTimeField(default=datetime.utcnow)

    def __repr__(self):
        return f'<User {self.jti}>'

    def save(self):
        self.save()
"""