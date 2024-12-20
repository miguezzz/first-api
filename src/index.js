// Importa o módulo http e url
const http = require('http');
// const url = require('url'); deprecated
const { URL } = require('url');

// importa o arquivo de rotas
const routes = require('./routes');

// Cria o server
const server = http.createServer((request, response) => {
  const parsedUrl = new URL(`https://localhost:3000${request.url}`); // pega a url da requisição e transforma em um objeto dividido em partes. O objeto retornado possui várias propriedades, como pathname, query, path, entre outras. o true no parâmetro faz com que a query string seja transformada em um objeto, facilitando a leitura dos parâmetros passados na URL.
  console.log(parsedUrl);

  const searchParams = Object.fromEntries(parsedUrl.searchParams); // transforma o objeto searchParams em um objeto comum, para facilitar a manipulação dos parâmetros passados na URL. (antes era um objeto do tipo URLSearchParams)

  console.log(`Request method: ${request.method} | Endpoint: ${request.url}`);
  
  const route = routes.find((routeObj) => ( // vai varrer o array de objetos em busca da rota desejada
    routeObj.method === request.method && routeObj.endpoint === parsedUrl.pathname
  ));
  if (route) { // se encontrar o endpoint desejado com o método correto, executa o handler definido no UserController.js
    request.query = searchParams; // injeta o objeto query na requisição, para que o controller possa acessar os parâmetros passados na URL
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
