const {clienteModels} = require("../models/clienteModels");

const clienteController = {
    //--------------------
    // LISTAR TODOS OS CLIENTES
    //GET /cliente
    //--------------------

    listarClientes: async (req, res) => {
        try {
            const {idCliente} = req.query;
            
            if(idCliente){
                if(idCliente.length != 36){
                    return res.status(400).json({erro: "id do cliente invalido"})
                }
                
                const cliente = await clienteModels.buscarUm(idCliente);
                
                return res.status(200).json(cliente)
            }
            
            const clientes = await clienteModels.buscarTodos();

            res.status(200).json(clientes);
        } catch (error) {
            console.error(`Erro ao listar todos os usuários`, error);
            res.status(500).json({messag: `Error ao buscar os clientes`});
        }
    },
    //--------------------
    // CRIAR UM NOVO CLIENTE
    //POST /clientes
    /*
        {
            "nomeCliente": "valor",
            "cpfCliente": "123456798442"
        }

     */
    //--------------------
    criarCliente: async (req,res)=>{
        try {
            
            const {nomeCliente, cpfCliente}= req.body;

            if(nomeCliente == undefined || cpfCliente == undefined){
                return res.status(400).json({erro:`Campos obrigatorios não preenchidos`});
            }

           const result = await clienteModels.buscarCpf(cpfCliente);
           if(result.length > 0){
            return res.status(409).json({message:`CPF já existe!`});
           }
            
           

            await clienteModels.inserirCliente(nomeCliente,cpfCliente);

            res.status(201).json({message:'Cliente cadastrado com sucesso!'});

        } catch (error) {
            console.error('Erro ao cadastrar o cliente', error);
            res.status(500).json({erro:'Erro no servidor ao cadastrar o cliente!'});
        }
    }
}



module.exports = {clienteController};