import { Router } from "express";
import { cargarArchivo } from "../controllers/uploads.js";

export const uploadsRouter = Router();

uploadsRouter.post('/', cargarArchivo);