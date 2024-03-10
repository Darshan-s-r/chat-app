import express from "express";
import { createServer } from 'node:http';
import { Server } from "socket.io";
import { dirname, join } from 'node:path';
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
   
const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery:{}
});
app.use(express.static(join(__dirname, 'public')));
 
app.get("/", (req, res)=>{
  res.sendFile(join(__dirname,'public', 'index.html'));
})

io.on('connection', (socket)=>{ 
  console.log("a new user");  
  socket.on('chat-message', (msg)=>{
  io.emit('chat message', msg);
  })   
})  



server.listen(5000, ()=>{
  console.log("server listening in port 5000")
});