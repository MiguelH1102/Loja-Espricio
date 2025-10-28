const {pedidoModel} = require("../models/pedidoModel");
const {clienteModels} = require("../models/clienteModels");
const {produtoModel} = require("../models/produtoModel")

const pedidoController = {
    /**
     * Controlador que lista todos os pedidos do Banco de Dados
     * 
     * @async
     * @function listarPedidos
     * @param {object} req -Objeto da requisição (recebido do cliente HTTP);
     * @param {object} res -Objeto da resposta (enviado ao cliente HTTP);
     * @returns {Promise<void>} Retorna uma respostas JSON com A lista de pedidos.
     * @throws Mostra no console e retorna o erro 500 se ocorrer falha ao buscar os pedidos.
     */
    listarPedidos: async (req, res) => {
        try {
            

            const pedidos = await pedidoModel.buscarTodos();
            res.status(200).json(pedidos);


        } catch (error) {
            console.error("Erro ao listar o pedido", error);
            res.status(500).json({erro: "Erro interno no sevido ao listar pedidos"});
        }
    },

    criarPedido: async (req, res) => {
        try {
            
            const {idCliente, dataPedido, statusPagamento, itens} = req.body;
            
            if(idCliente == undefined || dataPedido == undefined || statusPagamento == undefined || itens.length < 1){
                return res.status(400).json({erro:"Campos obrigatorios não preenchiidos"});
            }

            if (idCliente.length != 36) {
                return res.status(400).json({erro:"Id do cliente invalido"});
            }

            const cliente = await clienteModels.buscarUm(idCliente);

            if (!cliente || cliente.length != 1) {
                return res.status(404).json({erro:"Cliente não encontrado"});
            }

            for (const item of itens) {
                const {idProduto, qtdItem} = item

                if (idProduto == undefined || qtdItem == undefined) {
                    return res.status(400).json({erro:"Campos obrigatorios não preenchiidos"});
                }
                if (idProduto.length != 36) {
                    return res.status(400).json({erro:"Id do produto invalido"});
                }

                const produto = await produtoModel.buscaUm(idProduto);

                if (!produto || produto.length != 1) {
                    return res.status(404).json({erro:"Produto não encontrado"});
                }
            }

            await pedidoModel.inserirPedido(idCliente, dataPedido, statusPagamento, {itens});

            res.status(201).json({message: "Pedido cadastrado com sucesso!"});

        } catch (error) {
            console.error("Erro ao cadastrar pedido", error)
            res.status(500).json({erro: "Erro interno no servidor ao cadastrar pedido"})
        }
    }

}
module.exports = {pedidoController}