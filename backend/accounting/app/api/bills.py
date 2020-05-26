from typing import List
from fastapi import APIRouter, HTTPException

from app.api.models import BillOut, BillIn, BillUpdate
from app.api import db_manager

bills = APIRouter()

@bills.post('/', response_model=BillOut, status_code=201)
async def create_bill(payload: BillIn):
    bill_id = await db_manager.add_bill(payload)
    response = {
        'id': bill_id,
        **payload.dict()
    }

    return response

@bills.get('/', response_model=List[BillOut])
async def get_bills():
    return await db_manager.get_all_bills()

@bills.get('/{id}/', response_model=BillOut)
async def get_bill(id: int):
    bill = await db_manager.get_bill(id)
    if not bill:
        raise HTTPException(status_code=404, detail="Bill not found")
    return bill

@bills.put('/{id}/', response_model=BillOut)
async def update_bill(id: int, payload: BillUpdate):
    bill = await db_manager.get_bill(id)
    if not bill:
        raise HTTPException(status_code=404, detail="Bill not found")

    update_data = payload.dict(exclude_unset=True)

    if 'casts_id' in update_data:
        for cast_id in payload.casts_id:
            if not is_cast_present(cast_id):
                raise HTTPException(status_code=404, detail=f"Cast with given id:{cast_id} not found")

    bill_in_db = BillIn(**bill)

    updated_bill = bill_in_db.copy(update=update_data)
    bill = await db_manager.update_bill(id, updated_bill)

    return {
        'id': id,
        **payload.dict()
    }

@bills.delete('/{id}/', response_model=None)
async def delete_bill(id: int):
    bill = await db_manager.get_bill(id)
    if not bill:
        raise HTTPException(status_code=404, detail="Bill not found")
    await db_manager.delete_bill(id)
    return 'success'
