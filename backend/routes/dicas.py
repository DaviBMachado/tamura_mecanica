import asyncio
from fastapi import APIRouter, Request
from pydantic import BaseModel, ConfigDict
from services.youtube import fetch_latest_videos
from core.limiter import limiter

router = APIRouter(prefix="/api/dicas", tags=["Dicas"])

class VideoModel(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    titulo: str

@router.get("/videos")
@limiter.limit("10/minute")
async def get_videos(request: Request):
    data = await asyncio.to_thread(fetch_latest_videos)
    return {"status": "success", "data": data}
