from __future__ import annotations

from app.parser.serp_parser import SERPParser
from app.schemas.serp_schema import SERPResponse


class SERPService:
    """Service layer that wraps parsing logic for reuse by future API endpoints."""

    def __init__(self, parser: SERPParser | None = None) -> None:
        self.parser = parser or SERPParser()

    def search(self, query: str) -> SERPResponse:
        if not query or not query.strip():
            raise ValueError("Query must not be empty")

        try:
            return self.parser.parse(query)
        except ValueError as exc:
            raise ValueError(str(exc)) from exc
        except RuntimeError as exc:
            raise RuntimeError(str(exc)) from exc
