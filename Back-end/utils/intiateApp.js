import { connectionDB } from "../DB/connection.js";
import { globalResponse } from "./errorHandling.js";
import {setupRoutes}from "../modules/route.index.js";
export const initiateApp = async (app, express) => {
  app.use(express.json());
  await connectionDB();
  app.get("/api", (req, res) => {
    res.send("Hello World");
  });
  const PORT = process.env.PORT || 5000;
  setupRoutes(app);
  app.use(globalResponse);
  app.all("*", (req, res, next) =>
    res.status(404).json({ message: "404 Not Found URL" })
  );
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};
