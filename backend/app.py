from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:3000",  # React frontend running on port 3000
    "http://127.0.0.1:3000",  # React frontend running on port 3000 (alternative URL)
    "http://localhost:8000",  # If frontend and backend are running on the same port
    "*",  # Allows all origins (use carefully, best for public APIs)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow specified origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.post("/topic")
async def read_request_body(request: Request):
    # Print the raw body to see if it is being received correctly
    body = await request.body()
    print(f"Raw body received: {body}")
    
    try:
        # Attempt to parse the body as JSON
        data = await request.json()
        topic = data["topic"]
        return {"message": f"Received data: {topic}"}
    except Exception as e:
        return {"error": f"Failed to decode JSON: {str(e)}"}
