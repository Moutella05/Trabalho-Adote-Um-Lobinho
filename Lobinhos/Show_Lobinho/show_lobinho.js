// script pra acessar o lobinho.json
async function inicializarLocalStorage() {
    try {
        const response = await fetch('../../lobinhos.json');
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

// função que exclui um lobinho da lista segundo sua posição no array de objetos e atualiza a memória
function excluir(posicao) { // a posição pode ser obtida através da função Busca: ex.: excluir(busca(10))
    lobos.splice(posicao, 1)
    //!!! Para atualizar a memória: (ainda em forma de comentário para não atualizá-la durante os debugs) !!!
    //localStorage.setItem('lobos', JSON.stringify(lobos));
}

// função que busca o lobinho pelo seu ID -- retorna a posição dele no array de objetos
// pode ser alterado para qualquer parametro: é so mudar o que está sendo comparado
function busca(id) {
    meio = Math.floor(lobos.length/2)
    if (id >= (lobos[meio].id)){
        for(let i = (meio); i < lobos.length; i++){
            if (id == lobos[i].id){
                return i
            }
        }
    }
    else {
        for(let i = 0; i <= meio; i++){
            if (id == lobos[i].id){
                return i
            }
        }
    }
}

loboSelecionado = lobos[0];

document.getElementById("nomeLobo").textContent = loboSelecionado.nome
document.getElementById("descricaoLobo").textContent = loboSelecionado.descricao
document.getElementById("imagemLobo").src = loboSelecionado.imagem

let btnExcluir = document.querySelector("#excluirButton")
btnExcluir.addEventListener("click", () => (excluir(busca(loboSelecionado.id))));