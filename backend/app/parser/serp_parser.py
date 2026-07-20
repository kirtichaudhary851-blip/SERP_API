from __future__ import annotations

from typing import List
from urllib.parse import quote

import requests
from bs4 import BeautifulSoup

from app.schemas.serp_schema import SERPResponse, SERPResult


class SERPParser:
    """Parse organic search results from a search engine HTML response."""

    def __init__(self, base_url: str = "https://www.google.com/search") -> None:
        self.base_url = base_url

    def build_search_url(self, query: str) -> str:
        if not query or not query.strip():
            raise ValueError("Query must not be empty")
        encoded_query = quote(query.strip())
        return f"{self.base_url}?q={encoded_query}&num=10"

    def fetch_html(self, query: str) -> str:
        url = self.build_search_url(query)
        headers = {
            "User-Agent": (
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/124.0.0.0 Safari/537.36"
            )
        }

        try:
            response = requests.get(url, headers=headers, timeout=10)
            response.raise_for_status()
        except requests.RequestException as exc:
            raise RuntimeError(f"Request failed: {exc}") from exc

        return response.text

    def parse_html(self, html: str, query: str) -> SERPResponse:
        if not query or not query.strip():
            raise ValueError("Query must not be empty")

        soup = BeautifulSoup(html, "lxml")
        results: List[SERPResult] = []
        organic_blocks = soup.select("div.g")

        if not organic_blocks:
            return SERPResponse(query=query.strip(), total_results=0, results=[], error="No results found")

        for index, block in enumerate(organic_blocks, start=1):
            title_tag = block.select_one("h3")
            link_tag = block.select_one("a")
            snippet_tag = block.select_one(".VwiC3b, .IsZvec, .st")

            title = title_tag.get_text(" ", strip=True) if title_tag else ""
            url = link_tag.get("href", "") if link_tag else ""
            snippet = snippet_tag.get_text(" ", strip=True) if snippet_tag else ""

            if title and url:
                results.append(
                    SERPResult(
                        position=index,
                        title=title,
                        url=url,
                        snippet=snippet,
                    )
                )

        if not results:
            return SERPResponse(query=query.strip(), total_results=0, results=[], error="No results found")

        return SERPResponse(query=query.strip(), total_results=len(results), results=results)

    def parse(self, query: str) -> SERPResponse:
        if not query or not query.strip():
            raise ValueError("Query must not be empty")

        html = self.fetch_html(query)
        return self.parse_html(html, query)
