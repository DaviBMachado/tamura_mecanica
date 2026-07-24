import os
import gspread
from cachetools import TTLCache
from dotenv import load_dotenv
import logging

logging.basicConfig(level=logging.DEBUG,format="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",datefmt="%Y-%m-%d %H:%M:%S")

load_dotenv()

cache = TTLCache(maxsize=100, ttl=86400)

SPREADSHEET_ID = os.getenv("GOOGLE_SHEETS_SPREADSHEET_ID")
CREDENTIALS_FILE = os.getenv("GOOGLE_SHEETS_CREDENTIALS_FILE", "service_account.json")

def fetch_promocoes_from_sheets():
    if "promocoes" in cache:
        logging.info(f"Cache encontrado! Retornando {cache}.")
        return cache["promocoes"]
    try:
        if not os.path.exists(CREDENTIALS_FILE):
            logging.info("Credential file missing.")
            return []
            
        gc = gspread.service_account(filename=CREDENTIALS_FILE)
        sh = gc.open_by_key(SPREADSHEET_ID)
        worksheet = sh.sheet1
        records = worksheet.get_all_records()
        
        # Filtrar apenas as ativas
        ativas = [r for r in records if str(r.get('status', '')).strip().lower() == 'ativa']
        cache["promocoes"] = ativas
        return ativas
    except Exception as e:
        logging.info(f"Erro ao acessar planilha: {e}")
        return cache.get("promocoes", [])
