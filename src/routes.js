// agora, o arquivo routes.js é responsável por mapear as rotas da aplicação e associá-las aos métodos dos controllers que devem ser executados quando uma requisição é feita. O arquivo routes.js é importado no arquivo index.js e é utilizado para encontrar a rota correta e executar o método associado a ela. Isto evita que o index.js fique enorme com ifs e elses para cada rota da aplicação.

const UserController = require('../src/controllers/UserController');

module.exports = [
  {
    endpoint: '/users',
    method: 'GET',
    handler: UserController.listUsers, // apenas a referência para a função, sem os parênteses.
  },
  // { // teste!
  //   endpoint: '/products',
  //   method: 'GET',
  //   handler: UserController.listUsers, // apenas a referência para a função, sem os parênteses.
  // },
]