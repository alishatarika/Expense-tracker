import peewee
import datetime
from connection.database import db


class Expense(peewee.Model):
    id = peewee.AutoField()
    title = peewee.CharField(max_length=255)
    amount = peewee.FloatField()
    category = peewee.CharField(max_length=100)
    date = peewee.DateField(default=datetime.date.today)
    note = peewee.TextField(default="")
    created_at = peewee.DateTimeField(default=datetime.datetime.now)

    class Meta:
        database = db
        table_name = "expenses"