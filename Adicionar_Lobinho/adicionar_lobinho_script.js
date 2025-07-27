// script pra acessar o lobinho.json

async function inicializarLocalStorage() {
    try {
        const response = await fetch('Trabalho-Adote-Um-Lobinho/lobinhos.json');
        if (!response.ok) {
            throw new Error(`Erro ao buscar lobinho.json: ${response.statusText}`);
        }
        const lobos = await response.json();
        localStorage.setItem('lobos', JSON.stringify(lobos));
        console.log('Lobos inicializados no localStorage');
    } catch (error) {
        console.error('Erro ao inicializar o localStorage:', error);
    } finally {
        console.log('Tentativa de inicialização do localStorage concluída');
    }
}

if (!localStorage.getItem('lobos')) {
    inicializarLocalStorage().then(() => {
        console.log('Inicialização do localStorage concluída');
    }).catch(error => {
        console.error('Erro durante a inicialização do localStorage:', error);
    });
}

let lobos = JSON.parse(localStorage.getItem('lobos'));

//variaveis globais
let nomeLobinho = document.querySelector("#nomeLobinho")
let anosLobinho = document.querySelector("#anosLobinho")
let linkFoto = document.querySelector("#linkFoto")
let descricaoLobinho = document.querySelector("#descricaoLobinho")

//função que salva as informações colocadas no array de objetos lobinhos.json
function salvar() {
    //variaveis com valores internos
    let nome = nomeLobinho.value 
    let anos = parseInt(anosLobinho.value)
    let link = linkFoto.value
    let descricao = descricaoLobinho.value
    objeto = {id: 1001, nome: nome, idade: anos, descricao: descricao, imagem: link, adotado: false, nomeDono: null, idadeDono: null, emailDono: null}
    lobos.push(objeto)
    // para atualizar a memória:
    // localStorage.setItem('lobos', JSON.stringify(lobos))
    limpar()
}

//função que limpa os espaços de input para colocar novos
function limpar() {
    nomeLobinho.value = ""
    anosLobinho.value = ""
    linkFoto.value = ""
    descricaoLobinho.value = ""
}

//funcionamento do botao
let btnSalvar = document.querySelector("#btnSalvar")
btnSalvar.addEventListener("click", () => (salvar()));