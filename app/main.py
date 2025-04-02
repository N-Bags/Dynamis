from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv
from typing import Dict, Any

from app.core.config import settings

# Load environment variables
load_dotenv()

"""
To run this application locally:

1. Ensure Docker and Docker Compose are installed
2. Run 'docker-compose up --build' in the project root
3. Visit http://localhost:8000/health to check service status
4. For API documentation, visit http://localhost:8000/docs
"""

app = FastAPI(
    title=settings.APP_NAME,
    openapi_url=f"{settings.API_V1_PREFIX}/openapi.json",
    docs_url=f"{settings.API_V1_PREFIX}/docs",
    redoc_url=f"{settings.API_V1_PREFIX}/redoc",
)

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database engine using settings
engine = create_engine(str(settings.DATABASE_URL))

# Exception handlers
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    return JSONResponse(
        status_code=422,
        content={"detail": exc.errors()},
    )

@app.get("/health")
async def health_check() -> Dict[str, Any]:
    """
    Health check endpoint that verifies connection to PostgreSQL.
    
    Returns:
        Dict containing:
        - status: Overall health status ("healthy" or "unhealthy")
        - services: Status of individual services
            - postgresql: Database connection status
    """
    health_status = {
        "status": "healthy",
        "services": {
            "postgresql": "unhealthy"
        }
    }
    
    # Check PostgreSQL connection
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
            health_status["services"]["postgresql"] = "healthy"
    except Exception as e:
        health_status["status"] = "unhealthy"
        health_status["services"]["postgresql"] = f"error: {str(e)}"
    
    return health_status

# Import and include routers
# from app.api.v1.api import api_router
# app.include_router(api_router, prefix=settings.API_V1_PREFIX) 