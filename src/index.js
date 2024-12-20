// Importa o módulo http e url
const http = require('http');
// const url = require('url'); deprecated
const { URL } = require('url'); // forma mais atual de importar o módulo url

const bodyParser = require('./helpers/bodyParser');
// importa o arquivo de rotas
const routes = require('./routes');

// Cria o server
const server = http.createServer((request, response) => {
  const parsedUrl = new URL(`https://localhost:3000${request.url}`); // pega a url da requisição e transforma em um objeto dividido em partes. O objeto retornado possui várias propriedades, como pathname, query, path, entre outras. o true no parâmetro faz com que a query string seja transformada em um objeto, facilitando a leitura dos parâmetros passados na URL.
  console.log(parsedUrl);

  let { pathname } = parsedUrl; // pega o pathname da URL (sem os query params)
  let id = null; // inicializa a variável id com null
  
  // divide o pathname em um array, separando cada parte da URL pelas / e removendo os espaços vazios (o Boolean é utilizado para remover os itens vazios do array (truthy e falsy values))
  const splitEndpoint = pathname.split('/').filter(Boolean);
  console.log(splitEndpoint);

  if (splitEndpoint.length > 1) {
    pathname = `/${splitEndpoint[0]}/:id`; // se o array splitEndpoint tiver mais de um item, a rota é do tipo /users/:id
    id = splitEndpoint[1]; // o id é o segundo item do array splitEndpoint
  }

  const searchParams = Object.fromEntries(parsedUrl.searchParams); // transforma o objeto searchParams em um objeto comum, para facilitar a manipulação dos parâmetros passados na URL. (antes era um objeto do tipo URLSearchParams)

  console.log(`Request method: ${request.method} | Endpoint: ${request.url}`);
  
  const route = routes.find((routeObj) => ( // vai varrer o array de objetos em busca da rota desejada
    routeObj.method === request.method && routeObj.endpoint === pathname
  ));
  if (route) { // se encontrar o endpoint desejado com o método correto, executa o handler definido no UserController.js
    request.query = searchParams; // injeta o objeto query na requisição, para que o controller possa acessar os parâmetros passados na URL
    request.params = { id }; // injeta o objeto params na requisição, para que o controller possa acessar o id passado na URL (params é para organização, pois o id poderia ser passado diretamente na requisição)

    // injeta o método send no objeto response, para que o controller possa chamar o método send e enviar a resposta da requisição, tirando a responsabilidade do controller
    response.send = (statusCode, body) => {
      response.writeHead(statusCode, { 'Content-Type': 'application/json' }); // define o status code e o tipo de conteúdo da resposta
      response.end(JSON.stringify(body)); // transforma o objeto em uma string, pois o método end só aceita string ou buffer
    };

    if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
      bodyParser(request, () => route.handler(request, response)); // passa o handler como callback de bodyParser, para que o handler só seja executado após o body ser parseado
    } else {
      route.handler(request, response); // executa o handler
    }
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
