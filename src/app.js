import express from 'express';
import conectaNaDatabase from "./config/dbconnect.js";
import routes from "./routes/index.js";

const app = express();
routes(app);
const conexao = await conectaNaDatabase();

conexao.on("error", (erro) => {
  console.error("erro de conexão", erro);
});

conexao.once("open", () => {
    console.log("Conexão com o banco feita com sucesso");
})

export default app;
