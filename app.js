const express = require("express");
const app = express();
const {produtoRoutes} = require("./SRC/routes/produtoRoutes");
const { clienteRoutes } = require("./SRC/routes/clienteRoutes");
const PORT = 8081;

app.use(express.json());

app.use('/', produtoRoutes);
app.use('/', clienteRoutes);

app.listen(PORT, ()=>{
    console.log(`Servidor Rodando em http://localhost:${PORT}`)
});