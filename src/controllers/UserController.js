// a regra de negócio da aplicação foi transferida para o arquivo UserController.js, que agora é responsável por lidar com as requisições e respostas da aplicação. O arquivo index.js agora é responsável apenas por criar o servidor e escutar a porta 3000.

const users = require('../mocks/users');

module.exports = {
  listUsers(request, response) {
    console.log(request.query); // request.query foi injetado no objeto request no arquivo index.js, e agora pode ser acessado em qualquer lugar da aplicação. Aqui, estamos apenas imprimindo no console o objeto query, que contém os parâmetros passados na URL.
    const { order } = request.query; // pega o parâmetro order da query string da URL

    const sortedUsers = users.sort((a, b) => {
      if (order === 'desc') {
        return a.id < b.id ? 1 : -1; // se o parâmetro order for desc, a ordenação será do maior para o menor (descendente). Se a.id for menor que b.id, retorna 1 (a.id troca de posição com b.id). Se não, retorna -1 (a.id não troca de posição com b.id).
      }

      return a.id > b.id ? 1 : -1;
    })

    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(sortedUsers)); // transforma o array de objetos em uma string, pois o método end só aceita string ou buffer
  }
}