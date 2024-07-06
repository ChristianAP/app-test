import { Router } from "express";
import { readFileController } from "../controller/file.controller";

const routeFile = Router();

routeFile.get("/read-file/", readFileController);

export default routeFile;
