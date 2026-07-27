import os
import json
import base64
import gspread
from cachetools import TTLCache
from dotenv import load_dotenv
from core.logger import logger

load_dotenv()

cache = TTLCache(maxsize=100, ttl=86400)

SPREADSHEET_ID = os.getenv("GOOGLE_SHEETS_SPREADSHEET_ID")
CREDENTIALS_FILE = os.getenv("GOOGLE_SHEETS_CREDENTIALS_FILE", "service_account.json")
CREDENTIALS_JSON = os.getenv("GOOGLE_CREDENTIALS_JSON")

def get_gspread_client() -> gspread.Client:
    if CREDENTIALS_JSON:
        raw = CREDENTIALS_JSON.strip()
        if raw.startswith("{"):
            info = json.loads(raw)
        else:
            decoded = base64.b64decode(raw).decode("utf-8")
            info = json.loads(decoded)
        return gspread.service_account_from_dict(info)

    if os.path.exists(CREDENTIALS_FILE):
        return gspread.service_account(filename=CREDENTIALS_FILE)

    raise ValueError("Nenhuma credencial do Google Sheets encontrada (env ou arquivo).")

def fetch_promocoes_from_sheets():
    if "promocoes" in cache:
        logger.info("Retornando promoções do cache local.")
        return cache["promocoes"]
    try:
        gc = get_gspread_client()
        sh = gc.open_by_key(SPREADSHEET_ID)
        worksheet = sh.sheet1
        records = worksheet.get_all_records()
        
        # Filtrar apenas as ativas
        ativas = [r for r in records if str(r.get("status", "")).strip().lower() == "ativa"]
        cache["promocoes"] = ativas
        logger.info(f"Busca no Google Sheets concluída com sucesso: {len(ativas)} promoções ativas.")
        return ativas
    except Exception as e:
        logger.error(f"Erro ao acessar Google Sheets API: {e}")
        return cache.get("promocoes", [])
