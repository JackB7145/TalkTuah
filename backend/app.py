from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from typing import List

app = FastAPI() #Instantiates similar to express

#Manages the websock connection
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = [] #This is imperitive to manage the connections under the active_connections field within the connection manager class

    async def connect(self, websocket: WebSocket): #Function used to connect a person to our webserver
        await websocket.accept()
        self.active_connections.append(websocket)
        print(f"New client connected: {websocket.client.host}:{websocket.client.port}")

    def disconnect(self, websocket: WebSocket): #Function used to disconnect a person from our webserver
        self.active_connections.remove(websocket)
        print(f"Client disconnected: {websocket.client.host}:{websocket.client.port}")

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager() #Instantiating the manager variable with the connection manager class

@app.websocket("/askAI")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await manager.connect(websocket) #Connecting the person to the webserver
    try:
        await manager.broadcast(f"Client {client_id} joined the chat.")
        while True: #This is an infinite loop that will now check for the user sending data to the endpoint
            data = await websocket.receive_text() #Receiving the text
            await manager.broadcast(f"Client {client_id} says: {data}") #Displaying the contents that the user wishes to share
            
    except WebSocketDisconnect: #We keep broadcasting to the client to make sure they are there. IF there is an error meaning they disconnected it means we disconnect them from our webserver
        manager.disconnect(websocket) #Given that they leave, we remove them from our webserver
        await manager.broadcast(f"Client {client_id} left the chat.") #We communicate to everyone that this person has left the chat
