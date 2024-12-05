from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "*", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TopicRequest(BaseModel):
    topic: str


@app.post("/topic")
async def read_request_body(request: Request):
    try:
  
        body = await request.json()  
        print(f"Received JSON body: {body}")

        topic = body.get("topic")
        if not topic:
            return {"error": "No 'topic' field in the request body"}

        return {
            "discussion": [
                {"name": "Jerry", "topic": topic},
                {"name": "Barry", "topic": topic},
                {"name": "Tom", "topic": topic},
            ]
        }

    except Exception as e:
        return {"error": f"Failed to decode JSON: {str(e)}"}
