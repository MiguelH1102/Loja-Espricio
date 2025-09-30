const express = require("express");
const app = express();
const {produtoRoutes} = require("./SRC/routes/produtoRoutes");
const PORT = 8081;

app.use(express.json());

app.use('/', produtoRoutes);

app.listen(PORT, ()=>{
    console.log(`Servidor Rodando em http://localhost:${PORT}`)
});