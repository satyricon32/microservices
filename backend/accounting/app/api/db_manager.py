from app.api.models import BillIn, BillOut, BillUpdate
from app.api.db import bills, database


async def add_bill(payload: BillIn):
    query = bills.insert().values(**payload.dict())

    return await database.execute(query=query)

async def get_all_bills():
    query = bills.select()
    return await database.fetch_all(query=query)

async def get_bill(id):
    query = bills.select(bills.c.id==id)
    return await database.fetch_one(query=query)

async def delete_bill(id: int):
    query = bills.delete().where(bills.c.id==id)
    return await database.execute(query=query)

async def update_bill(id: int, payload: BillIn):
    query = (
        bills
        .update()
        .where(bills.c.id == id)
        .values(**payload.dict())
    )
    return await database.execute(query=query)