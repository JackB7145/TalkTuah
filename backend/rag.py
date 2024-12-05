from scraper import fetch_and_scrape_links
import os
from sentence_transformers import SentenceTransformer
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

def concatenate_text_from_files(directory):
    """
    Reads all files in the specified directory, concatenates their contents into a single string, 
    and returns the result.

    Args:
        directory (str): The path to the directory containing text files.

    Returns:
        list: A list of strings, where each string is the content of a file.
    """
    texts = []
    
    if not os.path.exists(directory):
        raise FileNotFoundError(f"The directory '{directory}' does not exist.")
    
    for filename in os.listdir(directory):
        file_path = os.path.join(directory, filename)
        if os.path.isfile(file_path):
            try:
                with open(file_path, "r", encoding="utf-8") as file:
                    texts.append(file.read().strip())
            except Exception as e:
                print(f"Error reading file {file_path}: {e}")
    
    return texts

def find_relevant_chunks(query, texts, k=3):
    """
    Finds the most relevant chunks of text to the query using KNN with cosine similarity.

    Args:
        query (str): The query to match against the text chunks.
        texts (list): A list of text chunks.
        k (int): The number of most relevant chunks to return.

    Returns:
        list: The top-k most relevant chunks.
    """
    # Load the embedding model
    model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
    
    # Compute embeddings for the query and text chunks
    query_embedding = model.encode(query)
    text_embeddings = model.encode(texts)
    
    # Compute cosine similarity
    similarities = cosine_similarity([query_embedding], text_embeddings)[0]
    
    # Get the indices of the top-k most relevant chunks
    top_k_indices = np.argsort(similarities)[-k:][::-1]
    
    # Return the top-k chunks
    return [texts[i] for i in top_k_indices]

def get_relevant_info(query):
    fetch_and_scrape_links(query)
    
    texts = concatenate_text_from_files('./links')
    
    relevant_chunks = find_relevant_chunks(query, texts, 3)
    
    return relevant_chunks

