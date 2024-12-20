// bodyParser criado para remover a lógica de event listeners do UserController. O bodyParser é responsável por pegar os dados enviados no corpo da requisição e transformá-los em um objeto JavaScript ao final dos chunks de dados recebidos. O bodyParser possui um callback no parâmetro, que é chamado após os chunks serem enviados, garantindo que o body já foi parseado antes de executar

function bodyParser(request, callback) {
  let body = '';

  // criaremos um event listener para o evento data, que é disparado toda vez que um novo chunk de dados é recebido (forma como os dados são enviados no método POST)
  request.on('data', (chunk) => {
    body += chunk; // concatena os chunks de dados recebidos
  });

  // criaremos um event listener para o evento end, que é disparado quando todos os dados foram recebidos da stream
  request.on('end', () => {
    body = JSON.parse(body); // manda a string de dados para o JSON.parse para transformá-la em um objeto JavaScript
    request.body = body;
    callback(); // só depois de receber todos os dados é que chamamos o callback, para garantir que o body já foi preenchido
  });
}

module.exports = bodyParser;
