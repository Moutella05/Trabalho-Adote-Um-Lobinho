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

// função que altera o texto interno aleatoriamente
function altera(id_nome, id_idade, id_descricao, id_imagem) {
    id_css = [id_nome, id_idade, id_descricao, id_imagem]
    //variaveis do ids alterados
    let nome_alterado = document.querySelector(id_css[0])
    let idade_alterado = document.querySelector(id_css[1])
    let descricao_alterado = document.querySelector(id_css[2])
    let img_alterado = document.querySelector(id_css[3])
    //numero aleatório entre 0 e o tamanho do array de objetos
    let num_aletorio = Math.floor(Math.random() * lobos.length) + 1
    //troca dos ids por estatísticas de um lobo aleatório
    nome_alterado.innerText = lobos[num_aletorio].nome
    idade_alterado.innerText = lobos[num_aletorio].idade
    descricao_alterado.innerText = lobos[num_aletorio].descricao
    img_alterado.src = lobos[num_aletorio].imagem
}

altera("#subtitulo1", "#idade1", "#descricao1", "#imagem1")
altera("#subtitulo2", "#idade2", "#descricao2", "#imagem2")