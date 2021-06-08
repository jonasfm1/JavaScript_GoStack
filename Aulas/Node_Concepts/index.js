
const express = require('express');
const cors =require('cors');

const { v4: uuidv4 } = require('uuid');
const { validate: uuidValidate } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

/* 
* METODOS HTTP:
* GET: Buscar informacoes do Back-end
* POST: Criar Nova informacao no Back-end
* PUT/PATCH: A Uma Informacao no Back-end
* DELETE: Deleta Uma Informacao no Back-end
*/

/**
 * TIPOS DE PARAMETROS:
 * QUERY PARAMS: Filtros e paginacao = query
 * ROUTE PARAMS: Identificacao recursos (Atualizacao/Deletar) = params
 * REQUEST BODY: Conteudo na hora de criar ou editar informacao (JSON) = body
 */

/**
 * MIDDLEWARE:
 * Interceptador de requisicoes que interrompe totalmente a requisicao ou altera dados da requisicao
 */

const projects = []

//MIDDLEWARE
/**
 * Exemplo 4 Usar middleware para validacao neste caso validados se o ID Passado e valido
 * se for o programa segue se nao o programe  interrompido.
 * este exemplo janao funciona mais.
 */
function validateProjectId(request, response, next) {
    const { id } = request.params;

    if(!uuidValidate(id)){
        return response.status(400).json({ error: 'Invalid project ID da minha benga.' })
    }

    return next();
}

function logRequest(request, response, next) {
    const {method, url} = request;
    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.log('1');
    console.log(logLabel);

    next();  // caso nao seja declarado o NEXT a aplicacao e interrompida totalmente

    /**
     * Exemplo (Numero 3) podemos usar "return next();" para roda normalmente em todas as rotas
     * Ou caso queiramos que rode outra coisa apos o Next usamos apenas "next();" e o codigo seguinte abaixo
     * assim ele executara o passo (1) seguindo para tora paso (3 que seria a rota) 
     * e retornando para o fim do middleware passo(2)
     */
    console.log('2');
}

/* Exemplo(Numero 1) Neste exemplo o Middleware logRequest sera executado em todas as rotas,
   Para funcionar basta remover ele da rota especifica e deixa a rota da forma padrao
*/
app.use(logRequest);

/**
 * No Exemplo abaixo nao Declaramos o Middleware na rota ao inves disso
 * vamos informar a rotas ou as rotas onde ele deve ser executado.
 */
app.use('/project/:id', validateProjectId);


// ROTA DE LISTAGEM DE PROJETOS
/* Exemplo(Numero 2) Neste exemplo precisa comentar o Exemplo(Numero 1) e declarar ele na rota,
para que ele seja executado apenas na rota que e chamado como no exemplo abaixo rota GET
*/
app.get('/projects', /*logRequest*/ (request, response) => {
    console.log('3');
    const { title, owner} = request.query

    const results = title
    ? projects.filter(project => project.title.includes(title))
    : projects;

    return response.json(projects);
});

//ROTA DE CRIACAO DE PROJETO
app.post('/projects', (request, response) => {
    const { title, owner} = request.body;
    
    const project = { id: uuidv4(), title, owner };
    projects.push(project);

    return response.json(project);
})

// ROTA DE ATUALIZACAO DE RPOJETO
app.put('/projects/:id', validateProjectId,(request, response) => {
    const { id } = request.params;
    const { title, owner } = request.body;

    const projectIndex = projects.findIndex(project => project.id == id)

    if(projectIndex < 0){
        return response.status(400).json({ Error: 'Project Not Found.'})
    }

    const project = {
        id,
        title,
        owner,
    };
    projects[projectIndex] = project;

    return response.json(project);
});

app.delete('/projects/:id', validateProjectId,(request, response) => {
    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id == id)

    if(projectIndex < 0){
        return response.status(400).json({ Error: 'Project Not Found.'})
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send();
});

app.listen(3333, () => {
    console.log('Bask-end Started! 🚀');
});