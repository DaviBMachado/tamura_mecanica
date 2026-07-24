from fastapi import APIRouter, Request
from services.youtube import fetch_latest_videos
from core.limiter import limiter

router = APIRouter(prefix="/api/dicas", tags=["Dicas"])

@router.get("/videos")
@limiter.limit("10/minute")
def get_videos(request: Request):
    data = fetch_latest_videos()
    return {"status": "success", "data": data}
