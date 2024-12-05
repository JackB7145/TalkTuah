import os
import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv

# Load the API key from the .env file
load_dotenv()
SERPER_API_KEY = os.getenv("SERPER_API_KEY")

def fetch_and_scrape_links(query, api_key=SERPER_API_KEY, directory="./links", num_results=10):
    """
    Fetches top search results for a query using the Google SERP API, scrapes the content of the results,
    and saves them as text files in the specified directory.

    Args:
        query (str): The search query.
        api_key (str): The API key for Google SERP API.
        directory (str): The directory to save the scraped content.
        num_results (int): The number of search results to fetch.

    Returns:
        list: A list of dictionaries containing the title and link of the scraped pages.
    """
    if not api_key:
        raise ValueError("API key not provided. Please add it to the .env file or pass it as an argument.")

    url = "https://google.serper.dev/search"
    headers = {"X-API-KEY": api_key}
    payload = {"q": query, "num": num_results}

    try:
        # Fetch search results
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()
        results = response.json()

        # Extract the top search results
        top_results = [
            {"title": result.get("title", "No title"), "link": result.get("link", "No link")}
            for result in results.get("organic", [])
        ]

        # Ensure the output directory exists
        if not os.path.exists(directory):
            os.makedirs(directory)

        # Scrape and save the links
        for i, result in enumerate(top_results, start=1):
            link = result['link']
            title = result['title']
            print(f"Scraping link {i}: {link}")

            try:
                # Scrape the page content
                response = requests.get(link, timeout=10)
                response.raise_for_status()
                soup = BeautifulSoup(response.content, "html.parser")
                text = soup.get_text(separator="\n").strip()

                # Save to a text file
                file_path = os.path.join(directory, f"result_{i}.txt")
                with open(file_path, "w", encoding="utf-8") as file:
                    file.write(f"Title: {title}\nLink: {link}\n\n{text}")

                print(f"Saved: {file_path}")
            except Exception as e:
                print(f"Error scraping link {i}: {e}")

        return top_results
    except requests.exceptions.RequestException as e:
        print(f"Error fetching search results: {e}")
        return []
