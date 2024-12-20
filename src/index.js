// Importa o módulo http
const http = require('http');
const url = require('url');

const routes = require('./routes');

// Cria o server
const server = http.createServer((request, response) => {
  console.log(`Request method: ${request.method} | Endpoint: ${request.url}`);

  const route = routes.find((routeObj) => (
    routeObj.method === request.method && routeObj.endpoint === request.url
  ));
  if (route) { // se ncontrar o endpoint desejado com o método correto, executa o handler definido no UserController.js
    route.handler(request, response);
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end(`Cannot ${request.method} ${request.url}`);
  }
});

// Coloca o servidor pra escutar a porta 3000
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

// ** lembrando que o servidor não irá atualizar automaticamente, então sempre que fizer alguma alteração no código, é necessário parar o servidor e rodar novamente.
