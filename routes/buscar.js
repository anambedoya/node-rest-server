import { Router } from "express";
import { buscar } from "../controllers/buscar.js";

export const buscarRouter = Router();

buscarRouter.get('/:coleccion/:termino', buscar);