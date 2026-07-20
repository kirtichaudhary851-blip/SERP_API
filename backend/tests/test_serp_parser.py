import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app.parser.serp_parser import SERPParser


def test_build_search_url_uses_query():
    parser = SERPParser()
    url = parser.build_search_url("python tutorial")
    assert "q=python%20tutorial" in url
    assert "https://www.google.com/search" in url


def test_empty_query_raises_error():
    parser = SERPParser()
    try:
        parser.build_search_url("   ")
    except ValueError as exc:
        assert "empty" in str(exc).lower()
    else:
        raise AssertionError("Expected ValueError for empty query")


def test_parse_html_extracts_organic_results():
    parser = SERPParser()
    html = """
    <html><body>
      <div class='g'>
        <h3>Python Official Site</h3>
        <a href='https://www.python.org'>https://www.python.org</a>
        <div class='st'>The official Python programming language.</div>
      </div>
      <div class='g'>
        <h3>Python Tutorial</h3>
        <a href='https://realpython.com'>https://realpython.com</a>
        <div class='st'>Learn Python step by step.</div>
      </div>
    </body></html>
    """

    response = parser.parse_html(html, "python")

    assert response.total_results == 2
    assert response.results[0].title == "Python Official Site"
    assert response.results[0].url == "https://www.python.org"
    assert "official Python" in response.results[0].snippet
