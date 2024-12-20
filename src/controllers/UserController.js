// a regra de negócio da aplicação foi transferida para o arquivo UserController.js, que agora é responsável por lidar com as requisições e respostas da aplicação. O arquivo index.js agora é responsável apenas por criar o servidor e escutar a porta 3000.

const users = require("../mocks/users");

module.exports = {
  listUsers(request, response) {
    console.log(request.query); // request.query foi injetado no objeto request no arquivo index.js, e agora pode ser acessado em qualquer lugar da aplicação. Aqui, estamos apenas imprimindo no console o objeto query, que contém os parâmetros passados na URL.
    const { order } = request.query; // pega o parâmetro order da query string da URL

    const sortedUsers = users.sort((a, b) => {
      if (order === "desc") {
        return a.id < b.id ? 1 : -1; // se o parâmetro order for desc, a ordenação será do maior para o menor (descendente). Se a.id for menor que b.id, retorna 1 (a.id troca de posição com b.id). Se não, retorna -1 (a.id não troca de posição com b.id).
      }

      return a.id > b.id ? 1 : -1;
    });

    response.send(200, sortedUsers); // envia a resposta da requisição com o status 200 e o array de usuários ordenado
  },

  getUserById(request, response) {
    const { id } = request.params; // pega o id passado na URL

    const user = users.find((user) => user.id === Number(id)); // procura o usuário com o id passado na URL

    if (!user) {
      return response.send(400, { error: "User not found" }); // envia a resposta da requisição com o status 400 e uma mensagem de erro caso user não seja encontrado
    }

    response.send(200, user); // envia a resposta da requisição com o status 200 e o usuário encontrado
  },

  createUser(request, response) {
    let body = '';

    // criaremos um event listener para o evento data, que é disparado toda vez que um novo chunk de dados é recebido (forma como os dados são enviados no método POST)
    request.on('data', (chunk) => {
      body += chunk; // concatena os chunks de dados recebidos
    });

    // criaremos um event listener para o evento end, que é disparado quando todos os dados foram recebidos da stream
    request.on('end', () => {
      body = JSON.parse(body); // manda a string de dados para o JSON.parse para transformá-la em um objeto JavaScript

      const lastUserId = users[users.length - 1].id; // pega o último id da lista de usuários
      const newUser = {
        id: lastUserId + 1, // incrementa o id do último usuário
        name: body.name,
      }
      users.push(newUser);

      response.send(200, newUser); // resposta da requisição com o status 200 e uma mensagem de sucesso
    })
  }
};
