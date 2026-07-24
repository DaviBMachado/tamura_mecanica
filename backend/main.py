from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from dotenv import load_dotenv

# Importando módulos locais (Arquitetura limpa)
from core.limiter import limiter
from routes import promocoes, dicas

load_dotenv()

app = FastAPI(title="Amortecedores Tamura API")

# Rate Limiter
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluindo Rotas
app.include_router(promocoes.router)
app.include_router(dicas.router)

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "Backend FastAPI is running"}
