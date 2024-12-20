// a regra de negócio da aplicação foi transferida para o arquivo UserController.js, que agora é responsável por lidar com as requisições e respostas da aplicação. O arquivo index.js agora é responsável apenas por criar o servidor e escutar a porta 3000.

const users = require('../mocks/users');

module.exports = {
  listUsers(request, response) {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(users)); // transforma o array de objetos em uma string, pois o método end só aceita string ou buffer
  }
}