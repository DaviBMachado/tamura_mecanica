def test_health_check(client):
    response = client.get("/health")
    assert response.status_code == 200
    json_data = response.json()
    assert json_data["status"] == "ok"
    assert "FastAPI" in json_data["message"]

def test_get_promocoes_endpoint(client):
    response = client.get("/api/promocoes")
    assert response.status_code == 200
    json_data = response.json()
    assert json_data["status"] == "success"
    assert isinstance(json_data["data"], list)
    assert len(json_data["data"]) == 1
    assert json_data["data"][0]["titulo"] == "Troca de Óleo Promocional"

def test_get_dicas_videos_endpoint(client):
    response = client.get("/api/dicas/videos")
    assert response.status_code == 200
    json_data = response.json()
    assert json_data["status"] == "success"
    assert isinstance(json_data["data"], list)
    assert len(json_data["data"]) == 1
    assert json_data["data"][0]["id"] == "abc123xyz"

def test_rate_limit_exceeded(client):
    # Enviar requisições repetidas para disparar o Rate Limiter (limite de 10/minuto)
    rate_limited = False
    for _ in range(15):
        res = client.get("/api/promocoes")
        if res.status_code == 429:
            rate_limited = True
            break
    assert rate_limited, "Rate limit de 10 requisições por minuto deveria retornar HTTP 429"
