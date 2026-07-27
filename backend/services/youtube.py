import os
import json
import urllib.request
from urllib.parse import urlencode
from cachetools import TTLCache
from dotenv import load_dotenv
from core.logger import logger

load_dotenv()

# Cache de 6 horas (21600 segundos) para economizar a cota gratuita do YouTube
cache = TTLCache(maxsize=10, ttl=21600)

YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")
CHANNEL_ID = os.getenv("YOUTUBE_CHANNEL_ID", "UCtLRUKc2GLewDhBIfMG9K_g")

def fetch_latest_videos():
    if "videos" in cache:
        logger.info("Retornando vídeos do cache local.")
        return cache["videos"]

    if not YOUTUBE_API_KEY:
        logger.warning("YOUTUBE_API_KEY não configurada no ambiente.")
        return []

    url = "https://www.googleapis.com/youtube/v3/search"
    params = {
        "key": YOUTUBE_API_KEY,
        "channelId": CHANNEL_ID,
        "part": "snippet",
        "order": "date",
        "maxResults": 6,
        "type": "video"
    }
    
    query_string = urlencode(params)
    request_url = f"{url}?{query_string}"
    
    try:
        with urllib.request.urlopen(request_url, timeout=10) as response:
            data = json.loads(response.read().decode())
            videos = []
            for item in data.get("items", []):
                videos.append({
                    "id": item["id"]["videoId"],
                    "titulo": item["snippet"]["title"]
                })
            cache["videos"] = videos
            logger.info(f"Busca no YouTube API concluída: {len(videos)} vídeos obtidos.")
            return videos
    except Exception as e:
        logger.error(f"Erro ao acessar YouTube API: {e}")
        return cache.get("videos", [])
