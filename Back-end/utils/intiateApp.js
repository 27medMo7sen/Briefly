import http from "http";
import { Server } from "socket.io";
import { connectionDB } from "../DB/connection.js";
import { globalResponse } from "./errorHandling.js";
import { setupRoutes } from "../modules/route.index.js";

export const initiateApp = async (app, express) => {
  app.use(express.json());
  await connectionDB();

  app.get("/api", (req, res) => {
    res.send("Hello World");
  });

  setupRoutes(app);
  app.use(globalResponse);
  app.all("*", (req, res, next) =>
    res.status(404).json({ message: "404 Not Found URL" })
  );

  const PORT = process.env.PORT || 5000;

  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      allowedHeaders: ["Content-Type", "Authorization"],
    },
  });

  app.set("io", io);

  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);
    socket.on("join", (data) => {
      console.log("User joined room", data.room);
      socket.join(data.room);
    });
    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    });
  });

  server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};
