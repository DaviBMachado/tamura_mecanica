import asyncio
from fastapi import APIRouter, Request
from pydantic import BaseModel, ConfigDict
from services.sheets import fetch_promocoes_from_sheets
from core.limiter import limiter

router = APIRouter(prefix="/api/promocoes", tags=["Promocoes"])

class PromocaoModel(BaseModel):
    model_config = ConfigDict(extra="ignore")
    titulo: str
    descricao: str
    valor_antigo: str
    valor_promocional: str
    validade: str
    status: str

@router.get("")
@limiter.limit("10/minute")
async def get_promocoes(request: Request):
    data = await asyncio.to_thread(fetch_promocoes_from_sheets)
    return {"status": "success", "data": data}
