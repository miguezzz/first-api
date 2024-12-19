# First API with Node.js

Este projeto é uma API simples criada utilizando Node.js puro, sem o uso de frameworks como Express.

## Requisitos

- Node.js v14 ou superior

## Instalação

1. Clone o repositório:
  ```bash
  git clone https://github.com/miguezzz/first-api.git
  ```
2. Navegue até o diretório do projeto:
  ```bash
  cd first-api
  ```
3. Instale as dependências (se houver):
  ```bash
  npm install
  ```

## Uso

Para iniciar o servidor, execute o seguinte comando:
```bash
node src/index.js
```

A API estará disponível em `http://localhost:3000`.

## Endpoints

### GET /

Retorna uma mensagem de boas-vindas.

**Resposta:**
```json
{
  "message": "Bem-vindo à API!"
}
```

### GET /users

Retorna uma lista de usuários.

**Resposta:**
```json
[
  {
  "id": 1,
  "name": "Usuário 1"
  },
  {
  "id": 2,
  "name": "Usuário 2"
  }
]
```

### POST /users

Adiciona um novo usuário.

**Requisição:**
```json
{
  "name": "Novo Usuário"
}
```

**Resposta:**
```json
{
  "id": 3,
  "name": "Novo Usuário"
}
```

## Estrutura do Projeto

```
first-api/
├── src/
│   └── index.js
├── 
└── README.md
```

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.# first-api
