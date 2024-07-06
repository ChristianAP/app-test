import dotenv from "dotenv";
dotenv.config();
import Express, { Request, Response } from "express";
import { config } from "./config";
import routeFile from "./routes/file.route";

const app = Express();
const { PORT } = config.server;

app.use(Express.json());
app.get("/", (req: Request, res: Response) => {
  res.json({
    status: 200,
    message: "Servidor ejecutandose correctamente!",
  });
});

app.use("/file", routeFile);

app.listen(PORT, () => {
  console.log("----------------------------------------");
  console.log(`Server running in PORT ${PORT}`);
  console.log("----------------------------------------");
});
