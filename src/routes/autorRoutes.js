import express from "express";
import AutorController from "../controllers/autorController.js";

const routes = express.Router();

routes.get("/autores", AutorController.listarAutores);
routes.get("/autores/:id", AutorController.listarAutoresPorId);
routes.post("/autores", AutorController.cadastrarAutores);
routes.put("/autores/:id", AutorController.alterarAutores);
routes.delete("/autores/:id", AutorController.deletarAutores);

export default routes;