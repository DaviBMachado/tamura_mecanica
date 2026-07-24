import os
import json
import urllib.request
from urllib.parse import urlencode
from cachetools import cached, TTLCache
from dotenv import load_dotenv

load_dotenv()

# Cache de 6 horas (21600 segundos) para economizar a cota gratuita do YouTube
cache = TTLCache(maxsize=10, ttl=21600)

YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")
CHANNEL_ID = "UCtLRUKc2GLewDhBIfMG9K_g"

@cached(cache)
def fetch_latest_videos():
    if not YOUTUBE_API_KEY:
        print("YOUTUBE_API_KEY não configurada no .env")
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
        with urllib.request.urlopen(request_url) as response:
            data = json.loads(response.read().decode())
            videos = []
            for item in data.get("items", []):
                videos.append({
                    "id": item["id"]["videoId"],
                    "titulo": item["snippet"]["title"]
                })
            return videos
    except Exception as e:
        print(f"Erro ao acessar YouTube API: {e}")
        return []
