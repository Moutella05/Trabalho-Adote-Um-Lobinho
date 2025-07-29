// funcao pra mostrar os lobinhos na tela
function mostrarLobinhos(pagina = 1) {


    // PEGA OS DADOS DO LOCAL STORAGE E CHECA SE EXISTE


    // pega os dados salvos no navegador
    var dadosLocalStorage = localStorage.getItem('lobos');
    var listaLobos = JSON.parse(dadosLocalStorage || '[]');

    // pega o lugar onde vai colocar os cards
    var containerCards = document.getElementById('lobinhos-grid');

    // se nao achou o lugar, para tudo
    if (!containerCards) {
        console.log('nao achou o lugar pra colocar os lobinhos');
        return;
    }

    // se nao tem lobos, mostra esse p no html
    if (listaLobos.length === 0) {
        console.log('nenhum lobo encontrado');
        containerCards.innerHTML = '<p>Nenhum lobinho encontrado!</p>';
        return;
    }




    // CONFIGURACOES DA PAGINACAO



    var lobosPorPagina = 4;
    var totalLobos = listaLobos.length;
    var totalPaginas = Math.ceil(totalLobos / lobosPorPagina);

    // garante que a pagina esta dentro do limite
    if (pagina < 1) pagina = 1;
    if (pagina > totalPaginas) pagina = totalPaginas;

    // calcula quais lobos mostrar nesta pagina
    var inicio = (pagina - 1) * lobosPorPagina;
    var fim = inicio + lobosPorPagina;
    var lobosParaMostrar = listaLobos.slice(inicio, fim);




    // verificacao no console
    console.log('mostrando', lobosParaMostrar.length, 'lobinhos da pagina', pagina, 'de', totalPaginas);



    // FUNCTIONS PARA CRIAR OS CARDS



    // funcao pra fazer um card de lobo disponivel (layout 1)
    function fazerCardLoboDisponivel1(lobo) {
        var descricao = lobo.descricao;

        // se a descricao e muito grande, corta
        if (descricao.length > 300) {
            descricao = descricao.substring(0, 300) + '...';
        }

        return `
            <div class="conteudo">
                <div class="base-img1">
                    <div class="fundo1"></div>
                    <img src="${lobo.imagem}" alt="${lobo.nome}" id="imagem1">
                </div>

                <div class="informacoes">
                    <p class="subtitulo1">${lobo.nome}</p>
                    <p class="idade1">Idade: <span>${lobo.idade}</span> anos</p>
                    <p class="descricao1">${descricao}</p>
                    
                    <div class="lobinho-botao-container">
                        <button class="btn-adotar" onclick="irParaAdocao(${lobo.id})">Adotar</button>
                    </div>
                </div>
            </div>
        `;
    }

    // funcao pra fazer um card de lobo disponivel (layout 2)
    function fazerCardLoboDisponivel2(lobo) {
        var descricao = lobo.descricao;

        // se a descricao e muito grande, corta
        if (descricao.length > 300) {
            descricao = descricao.substring(0, 300) + '...';
        }

        return `
            <div class="conteudo2">
                <div class="informacoes2">
                    <p class="subtitulo2">${lobo.nome}</p>
                    <p class="idade2">Idade: <span>${lobo.idade}</span> anos</p>
                    <p class="descricao2">${descricao}</p>
                    
                    <div class="lobinho-botao-container2">
                        <button class="btn-adotar2" onclick="irParaAdocao(${lobo.id})">Adotar</button>
                    </div>
                </div>
                <div class="base-img2">
                    <div class="fundo2"></div>
                    <img src="${lobo.imagem}" alt="${lobo.nome}" id="imagem2">
                </div>
            </div>
        `;
    }

    // funcao pra fazer um card de lobo ja adotado (layout 1)
    function fazerCardLoboAdotado1(lobo) {
        var descricao = lobo.descricao;

        // se a descricao e muito grande, corta
        if (descricao.length > 300) {
            descricao = descricao.substring(0, 300) + '...';
        }

        return `
            <div class="conteudo">
                <div class="base-img1">
                    <div class="fundo1"></div>
                    <img src="${lobo.imagem}" alt="${lobo.nome}" id="imagem1">
                </div>

                <div class="informacoes">
                    <p class="subtitulo1">${lobo.nome}</p>
                    <p class="idade1">Idade: <span>${lobo.idade}</span> anos</p>
                    <p class="descricao1">${descricao}</p>
                    <p class="nome-dono">Adotado por: ${lobo.nomeDono || 'Não informado'}</p>
                    
                    <div class="lobinho-botao-container">
                        <button class="btn-adotar-adotado">Adotado</button>
                    </div>
                </div>
            </div>
        `;
    }

    // funcao pra fazer um card de lobo ja adotado (img pra esquerda)
    function fazerCardLoboAdotado2(lobo) {
        var descricao = lobo.descricao;

        // se a descricao e muito grande, corta
        if (descricao.length > 300) {
            descricao = descricao.substring(0, 300) + '...';
        }

        return `
            <div class="conteudo2">
                <div class="informacoes2">
                    <p class="subtitulo2">${lobo.nome}</p>
                    <p class="idade2">Idade: <span>${lobo.idade}</span> anos</p>
                    <p class="descricao2">${descricao}</p>
                    <p class="nome-dono2">Adotado por: ${lobo.nomeDono || 'Não informado'}</p>
                    
                    <div class="lobinho-botao-container2">
                        <button class="btn-adotar-adotado2">Adotado</button>
                    </div>
                </div>
                <div class="base-img2">
                    <div class="fundo2"></div>
                    <img src="${lobo.imagem}" alt="${lobo.nome}" id="imagem2">
                </div>
            </div>
        `;
    }


    // LOOP PARA CRIAR OS CARDS



    // variavel pra guardar o html dos cards
    var html = '';

    // passa por todos os lobos da pagina e faz os cards
    for (var i = 0; i < lobosParaMostrar.length; i++) {

        var loboAtual = lobosParaMostrar[i];

        var ehLayout2 = (i % 2 === 1); // alterna layouts

        // se o lobo nao foi adotado, faz card normal
        if (!loboAtual.adotado) {
            if (ehLayout2) {
                html += fazerCardLoboDisponivel2(loboAtual);
            } else {
                html += fazerCardLoboDisponivel1(loboAtual);
            }
        } else {
            // se ja foi adotado, faz card diferente
            if (ehLayout2) {
                html += fazerCardLoboAdotado2(loboAtual);
            } else {
                html += fazerCardLoboAdotado1(loboAtual);
            }
        }
    }



    // coloca todos os cards na tela
    containerCards.innerHTML = html;

    // CONFIGURA PAGINACAO
    var btnAnterior = document.getElementById('btn-anterior');
    var btnProximo = document.getElementById('btn-proximo');
    var infoPagina = document.getElementById('info-pagina');

    if (btnAnterior && btnProximo && infoPagina) {
        infoPagina.textContent = `${pagina} / ${totalPaginas}`;
        btnAnterior.disabled = pagina <= 1;
        btnProximo.disabled = pagina >= totalPaginas;

        // configura os botoes para usar as variaveis locais
        btnAnterior.onclick = () => {
            if (pagina > 1) mostrarLobinhos(pagina - 1);
        };
        btnProximo.onclick = () => {
            if (pagina < totalPaginas) mostrarLobinhos(pagina + 1);
        };
    }
}


// FUNCOES AUXILIARES

// quando a pagina carregar
document.addEventListener('DOMContentLoaded', function () {
    console.log('pagina carregou');

    // verifica se estamos na pagina da lista de lobinhos
    var elementoDaLista = document.getElementById('lobinhos-grid');
    if (elementoDaLista) {

        // Se já tem dados no localStorage, mostra diretamente
        if (localStorage.getItem('lobos')) {
            mostrarLobinhos();
        } else {
            // Se não tem dados, inicializa (isso já vai chamar mostrarLobinhos)

            // Aguarda um pouco e tenta novamente
            setTimeout(() => {
                if (localStorage.getItem('lobos')) {
                    mostrarLobinhos();
                } else {
                    // Se ainda não tem dados, tenta inicializar
                    if (typeof inicializarLocalStorage === 'function') {
                        inicializarLocalStorage().then(() => {
                            mostrarLobinhos();
                        });
                    }
                }
            }, 1000);
        }
    }
});
