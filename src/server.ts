import express from "express";
import { router } from "./routes/router";
import { AuthenticationDatabase } from "./database/mongoDB";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(router);
const serverWeb = http.createServer(app);
export const io = new Server(serverWeb);

async function BootStrap() {
  await AuthenticationDatabase();

  io.on("connection", (Socket) => {
    console.log("id", Socket.id);
  });

  // configuration door
  const door = 8080;
  serverWeb.listen(door, function () {
    console.log(door);
  });
}

BootStrap();
