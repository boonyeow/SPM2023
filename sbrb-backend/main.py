import uvicorn
from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import init_engine
from app.routers import application_route, listing_route, staff_route

api_router = APIRouter()


@api_router.get("/")
def get_root():
    return {"message": "Hello World!"}


init_engine()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
# Include your API routers
app.include_router(api_router)
app.include_router(application_route.router)
app.include_router(listing_route.router)
app.include_router(staff_route.router)

if __name__ == "__main__":
    app_module = "main:app"
    uvicorn.run(app_module, host="0.0.0.0", port=8000, reload=True)
