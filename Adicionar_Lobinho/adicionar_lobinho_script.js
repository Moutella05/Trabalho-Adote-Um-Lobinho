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
    //confere se todos foram inserido (exceto os anos pois este é conferido depois)
    if(nome == '' || link == '' || descricao == ''){
        alert("Por favor, preencha todos os campos!")
        return
    }
    //confere se os anos foram inseridos corretamente
    if (!Number.isInteger(anos)){
        alert("Valor dos Anos inválido ou vazio. Por favor, digíte um número inteiro.")
        limpar(2)
        return
    }
    // confere se o link da foto é realmente um link
    try {
        new URL(link);
    } catch {
        alert("O link da sua foto não é um link ou apresenta algum erro de digitação. Confira e envie novamente.")
        limpar(3)
        return
    }
    objeto = {id: lobos[lobos.length -1].id + 1, nome: nome, idade: anos, descricao: descricao, imagem: link, adotado: false, nomeDono: null, idadeDono: null, emailDono: null}
    lobos.push(objeto)
    //!!! Para atualizar a memória: (ainda em forma de comentário para não atualizá-la durante os debugs) !!!
    //localStorage.setItem('lobos', JSON.stringify(lobos))
    salvo_sucesso()
    limpar(5)
}

//função que mostra um quadrado dizendo que o lobinho foi salvo e manda o usuário para a lista de lobinhos caso clique -- sem pop up -> a ideia é ser algo opcional
let salvou = true
function salvo_sucesso(){
    if (salvou) {
        let pai = document.querySelector("#forms")
        let novaDiv = document.createElement("div");
        novaDiv.innerHTML = "<a class='salvo' href='../Lista_Lobinhos/Lista_Lobinhos.html'>Seu lobinho foi salvo com sucesso! Clique aqui para ir para lista de lobinhos!</a>";
        pai.appendChild(novaDiv)
    }
    salvou = false
}


//função que limpa os espaços de input para colocar novos
function limpar(n) {
    switch (n){
        case 1:
            nomeLobinho.value = ""
            return
        case 2:
            anosLobinho.value = ""
            return
        case 3:
            linkFoto.value = ""
            return
        case 4:
            descricaoLobinho.value = ""
            return
        case 5:
            nomeLobinho.value = ""
            anosLobinho.value = ""
            linkFoto.value = ""
            descricaoLobinho.value = ""
            return
    }
}

//funcionamento do botao
let btnSalvar = document.querySelector("#btnSalvar")
btnSalvar.addEventListener("click", () => (salvar()));