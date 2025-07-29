// funcao pra carregar os dados do json
function carregarLobinhos() {

    fetch('../../lobinhos.json')
        .then(function (response) {
            console.log('response.status');
            return response.json();
        })
        .then(function (dados) {
            console.log('dados carregados:', dados.length, 'lobinhos');
            localStorage.setItem('lobos', JSON.stringify(dados));
            mostrarLobinhos();
        })
        .catch(function (erro) {
            console.log('erro ao carregar:', erro);
            // se der erro, mostra mensagem
            var container = document.getElementById('lobinhos-grid');
            if (container) {
                container.innerHTML = '<p>Erro ao carregar os lobinhos. Tente novamente.</p>';
            }
        });
}

// funcao pra mostrar os lobinhos na tela
function mostrarLobinhos() {
    console.log('mostrando lobinhos na tela...');

    // pega os dados salvos no navegador
    var dadosDoNavegador = localStorage.getItem('lobos');
    var listaDeLobos = JSON.parse(dadosDoNavegador || '[]');

    // pega o lugar onde vai colocar os cards
    var containerDosCards = document.getElementById('lobinhos-grid');

    // se nao achou o lugar, para tudo
    if (!containerDosCards) {
        console.log('nao achou o lugar pra colocar os lobinhos');
        return;
    }

    // se nao tem lobos, mostra mensagem
    if (listaDeLobos.length === 0) {
        console.log('nenhum lobo encontrado');
        containerDosCards.innerHTML = '<p>Nenhum lobinho encontrado!</p>';
        return;
    }

    console.log('encontrou', listaDeLobos.length, 'lobinhos');

    // variavel pra guardar o html dos cards
    var htmlDosCards = '';

    // funcao pra fazer um card de lobo disponivel
    function fazerCardLoboDisponivel(lobo) {
        var descricao = lobo.descricao;

        // se a descricao e muito grande, corta
        if (descricao.length > 300) {
            descricao = descricao.substring(0, 300) + '...';
        }

        return `
            <div class="lobinho-card">
                <div class="lobinho-imagem-container">
                    <img src="${lobo.imagem}" alt="${lobo.nome}" class="lobinho-imagem">
                </div>
                <div class="lobinho-dados">
                    <h2 class="lobinho-nome">${lobo.nome}</h2>
                    <p class="lobinho-idade">Idade: ${lobo.idade} anos</p>
                    <p class="lobinho-descricao">${descricao}</p>
                    <div class="lobinho-botao-container">
                        <button class="btn-adotar" onclick="irParaAdocao(${lobo.id})">Adotar</button>
                    </div>
                </div>
            </div>
        `;
    }

    // funcao pra fazer um card de lobo ja adotado
    function fazerCardLoboAdotado(lobo) {
        var descricao = lobo.descricao;

        // se a descricao e muito grande, corta
        if (descricao.length > 300) {
            descricao = descricao.substring(0, 300) + '...';
        }

        return `
            <div class="lobinho-card">
                <div class="lobinho-imagem-container">
                    <img src="${lobo.imagem}" alt="${lobo.nome}" class="lobinho-imagem">
                </div>
                <div class="lobinho-dados">
                    <h2 class="lobinho-nome">${lobo.nome}</h2>
                    <p class="lobinho-idade">Idade: ${lobo.idade} anos</p>
                    <p class="lobinho-descricao">${descricao}</p>
                    <div class="lobinho-botao-container">
                        <button class="btn-adotar-adotado">Adotado</button>
                    </div>
                </div>
            </div>
        `;
    }

    // passa por todos os lobos e faz os cards
    for (var i = 0; i < listaDeLobos.length; i++) {
        var loboAtual = listaDeLobos[i];

        // se o lobo nao foi adotado, faz card normal
        if (!loboAtual.adotado) {
            htmlDosCards = htmlDosCards + fazerCardLoboDisponivel(loboAtual);
        } else {
            // se ja foi adotado, faz card diferente
            htmlDosCards = htmlDosCards + fazerCardLoboAdotado(loboAtual);
        }
    }

    // coloca todos os cards na tela
    containerDosCards.innerHTML = htmlDosCards;
    console.log('cards colocados na tela!');
}

// funcao pra ir pra pagina de adocao
function irParaAdocao(idDoLobo) {
    window.location.href = '../Adotar_Lobinho/Adotar_Lobinho.html?id=' + idDoLobo;
}

// quando a pagina carregar
document.addEventListener('DOMContentLoaded', function () {
    console.log('pagina carregou');

    // verifica se estamos na pagina da lista de lobinhos
    var elementoDaLista = document.getElementById('lobinhos-grid');
    if (elementoDaLista) {
        console.log('estamos na pagina da lista, carregando dados...');
        carregarLobinhos();
    } else {
        console.log('nao estamos na pagina da lista');
    }
});