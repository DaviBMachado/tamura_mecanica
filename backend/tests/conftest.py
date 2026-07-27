import pytest
from unittest.mock import patch
from fastapi.testclient import TestClient
import sys
import os

# Incluir o diretório backend no sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from main import app

@pytest.fixture
def client():
    return TestClient(app)

@pytest.fixture(autouse=True)
def mock_sheets_service():
    mock_data = [
        {
            "titulo": "Troca de Óleo Promocional",
            "descricao": "Óleo sintético + Filtro com 20% off",
            "valor_antigo": "R$ 250",
            "valor_promocional": "R$ 199",
            "validade": "31/12/2026",
            "status": "ativa"
        }
    ]
    with patch("routes.promocoes.fetch_promocoes_from_sheets", return_value=mock_data):
        yield mock_data

@pytest.fixture(autouse=True)
def mock_youtube_service():
    mock_videos = [
        {
            "id": "abc123xyz",
            "titulo": "Como saber a hora de trocar os amortecedores"
        }
    ]
    with patch("routes.dicas.fetch_latest_videos", return_value=mock_videos):
        yield mock_videos
