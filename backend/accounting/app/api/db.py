import os

from sqlalchemy import (Column, DateTime, Integer, MetaData, String, Table,
                        create_engine, ARRAY)

from databases import Database

DATABASE_URI = 'postgresql://registry:registry@localhost/registry'

engine = create_engine(DATABASE_URI)
metadata = MetaData()

bills = Table(
    'bills',
    metadata,
    Column('id', Integer, primary_key=True),
    Column('amount', Integer),
    Column('type', String(250)),
    Column('paymentType', String(250)),
    Column('firstname', String(250)),
    Column('lastname', String(250)),
    Column('middlename', String(250)),
    Column('patient_id', Integer),
    Column('appointment_id', Integer),
    Column('doctor_id', String(250)),
)

database = Database(DATABASE_URI)