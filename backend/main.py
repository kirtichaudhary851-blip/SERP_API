from fastapi import FastAPI

app = FastAPI(
    title="Custom SERP API",
    version="0.1.0",
    description="Phase 1 backend foundation for a scalable SERP API project.",
)


@app.get("/")
def read_root():
    return {
        "message": "Custom SERP API backend is running successfully.",
        "status": "ok",
    }
