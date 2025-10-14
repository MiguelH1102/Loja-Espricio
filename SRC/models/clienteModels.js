const {sql, getConnection} = require("../config/db");

const clienteModels = {
    buscarTodos: async ()=>{
       try {

        const pool = await getConnection(); // Cria conexão com o BD

        let sql = 'SELECT* FROM Clientes';

        const result = await pool.request().query(sql);

        return result.recordset;
        
       } catch (error) {
        console.error(`Erro ao buscar os Clientes`, error);
        throw error;
       } 
    },

    buscarCpf: async (cpfCliente) => {
        try {
            const pool = await getConnection();

            const querySQL = 'SELECT * FROM Clientes WHERE cpfCliente = @cpfCliente;';

            const result = await pool.request()
            .input ('cpfCliente', sql.VarChar(12), cpfCliente)
            .query(querySQL);

            return result.recordset;

        } catch (error) {
            console.error('Erro ao verificar o CPF', error);
            res.status(500).json({erro:'Erro no servidor ao verificar o CPF!'});
        }
    },

    inserirCliente: async (nomeCliente, cpfCliente)=>{
        try {

            const pool = await getConnection();

            let querySQL = 'INSERT INTO Clientes(nomeCliente, cpfCliente) VALUES(@nomeCliente, @cpfCliente)'

            await pool.request()
            .input('nomeCliente', sql.VarChar(100), nomeCliente)
            .input('cpfCliente', sql.VarChar(12),cpfCliente)
            .query(querySQL);

            
        } catch (error) {
            console.error('Erro ao inserir o cliente', error);
            throw error; // Passa o erro para o controler tratar
        }
    }
}

module.exports = {clienteModels};
