## API Reference 

### Produtos

#### GET /proutos
- **Descrição**: Obtem uma lista de produtos
- **Responde**: Arry de produtos

#### POST /produtos
- **Descrição**: Criar um novo prodto
- **Body**:
´´´
{
    "nomeProduto": "produtoExemplo",
    "precoProduto": 0.00
}
´´´

- **Responder**:
```
{
    "message": "Produto cadastrado com sucesso!"
}
```

## API Reference 

### Clientes

#### GET /clientes
- **Descrição**: Obtem uma lista de clientes
- **Responde**: Arry de clientes


#### POST /cliente
- **Descrição**: Cadastra um novo cliente
- **Body**:
´´´
{
    "nomeCliente": "clienteExemplo",
    "cpfCliente": 111111111111
}
´´´

- **Responder**:
```
{
    "message": "Cliente cadastrado com sucesso!"
}
```