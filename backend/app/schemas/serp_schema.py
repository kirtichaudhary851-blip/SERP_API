from typing import List, Optional
from pydantic import BaseModel, Field


class SERPResult(BaseModel):
    position: int = Field(..., description="Rank position of the search result")
    title: str = Field(..., description="Title of the search result")
    url: str = Field(..., description="URL of the search result")
    snippet: str = Field(..., description="Short description or snippet")


class SERPResponse(BaseModel):
    query: str = Field(..., description="Original search query")
    total_results: int = Field(..., description="Number of extracted organic results")
    results: List[SERPResult] = Field(default_factory=list, description="List of parsed organic results")
    error: Optional[str] = Field(default=None, description="Error message if parsing failed")
