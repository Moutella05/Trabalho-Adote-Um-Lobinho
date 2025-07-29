let lobos = JSON.parse(localStorage.getItem('lobos'));

// função que exclui um lobinho da lista segundo sua posição no array de objetos e atualiza a memória
function excluir(posicao) { // a posição pode ser obtida através da função Busca: ex.: excluir(busca(10))
    lobos.splice(posicao, 1)
    //!!! Para atualizar a memória: (ainda em forma de comentário para não atualizá-la durante os debugs) !!!
    //localStorage.setItem('lobos', JSON.stringify(lobos));
}

const Params = new URLSearchParams(window.location.search);
const idDoLobo = Params.get('id');
let loboSelecionado = lobos[lobos.findIndex(lobo => lobo.id === parseInt(idDoLobo))];

function irParaAdocao(idDoLobo) {
    window.location.href = '../Adotar_Lobinho/Adotar_Lobinho.html?id=' + idDoLobo;
}

function excluirLobo(idDoLobo) {
    const lobosAtualizados = lobos.filter(lobo => lobo.id !== idDoLobo);
    localStorage.setItem('lobos', JSON.stringify(lobosAtualizados));
    alert("Lobinho excluído com sucesso!");
    window.location.href = '../Lista_Lobinhos/Lista_Lobinhos.html?id=' + idDoLobo;
}

document.getElementById("nomeLobo").textContent = loboSelecionado.nome
document.getElementById("descricaoLobo").textContent = loboSelecionado.descricao
document.getElementById("imagemLobo").src = loboSelecionado.imagem

let btnExcluir = document.querySelector("#excluirButton")
btnExcluir.addEventListener("click", () => (excluirLobo(loboSelecionado.id)));

let btnAdotar = document.querySelector("#adotarButton")
btnAdotar.addEventListener("click", () => (irParaAdocao(loboSelecionado.id)));