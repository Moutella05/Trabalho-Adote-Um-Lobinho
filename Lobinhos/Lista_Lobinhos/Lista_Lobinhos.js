//variável para controlar o filtro
let verApenasAdotados = false;

//variável para controlar a busca
let termoBusca = '';

//função pra mostrar os lobinhos na tela
function mostrarLobinhos(pagina = 1) {

    //pega os dados salvos no navegador
    var dadosLocalStorage = localStorage.getItem('lobos');
    var listaCompletaLobos = JSON.parse(dadosLocalStorage || '[]');

    let lobosParaExibir = listaCompletaLobos;

    //filtro adotados
    if (verApenasAdotados) {
        lobosParaExibir = lobosParaExibir.filter(lobo => lobo.adotado);
    }

    //busca nome
    if (termoBusca) {
        lobosParaExibir = lobosParaExibir.filter(lobo =>
            lobo.nome.toLowerCase().includes(termoBusca)
        );
    }

    //pega o lugar onde vai colocar os cards
    var containerCards = document.getElementById('lobinhos-grid');
    var containerPaginacao = document.querySelector('.paginacao');

    //se nao achou o lugar, para tudo
    if (!containerCards) {
        console.error('Container #lobinhos-grid não foi encontrado!');
        return;
    }

    //se nao tem lobos, mostra esse p no html
    if (lobosParaExibir.length === 0) {
        let mensagem = '<p style="text-align: center; width: 100%; font-size: 45px">';
        
        if (termoBusca) {
            mensagem += `Nenhum lobinho com o nome "${termoBusca}" foi encontrado!`;
        } 
        else if (verApenasAdotados) {
            mensagem += 'Nenhum lobinho adotado encontrado!';
        } else {
            mensagem += 'Nenhum lobinho para exibir!';
        }
        
        mensagem += '</p>';
        containerCards.innerHTML = mensagem;

        if(containerPaginacao) containerPaginacao.style.display = 'none';
        return;
    } else {
        if(containerPaginacao) containerPaginacao.style.display = 'flex';
    }



    // CONFIGURACOES DA PAGINACAO




    var lobosPorPagina = 4;
    var totalLobos = lobosParaExibir.length;
    var totalPaginas = Math.ceil(totalLobos / lobosPorPagina);

    // garante que a pagina esta dentro do limite
    if (pagina < 1) pagina = 1;
    if (pagina > totalPaginas) pagina = totalPaginas;





    //FUNCTIONS PARA CRIAR OS CARDS




    // funcao pra fazer um card de lobo disponivel (layout 1)
    function fazerCardLoboDisponivel1(lobo) {

        var descricao = lobo.descricao;

        //se a descricao e muito grande, corta
        if (descricao.length > 300) {
            descricao = descricao.substring(0, 300) + '...';
        }

        return `
            <div class="conteudo">
                <div class="base-img1"><img src="${lobo.imagem}" alt="${lobo.nome}" id="imagem1"></div>
                <div class="informacoes">
                    <p class="subtitulo1">${lobo.nome}</p>
                    <p class="idade1">Idade: <span>${lobo.idade}</span> anos</p>
                    <p class="descricao1">${descricao}</p>
                    <div class="lobinho-botao-container"><button class="btn-adotar" onclick="window.location.href = '../Show_Lobinho/Show_Lobinho.html?id=${lobo.id}'">Adotar</button></div>
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
                    <div class="lobinho-botao-container2"><button class="btn-adotar2" onclick="window.location.href = '../Show_Lobinho/Show_Lobinho.html?id=${lobo.id}'">Adotar</button></div>
                </div>
                <div class="base-img2"><img src="${lobo.imagem}" alt="${lobo.nome}" id="imagem2"></div>
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
                <div class="base-img1"><img src="${lobo.imagem}" alt="${lobo.nome}" id="imagem1"></div>
                <div class="informacoes">
                    <p class="subtitulo1">${lobo.nome}</p>
                    <p class="idade1">Idade: <span>${lobo.idade}</span> anos</p>
                    <p class="descricao1">${descricao}</p>                    
                    <p class="nome-dono">Adotado por: ${lobo.nomeDono || 'Não informado'}</p>
                    <div class="lobinho-botao-container"><button class="btn-adotar-adotado">Adotado</button></div>
                </div>
            </div>
        `; // dps, tem que tirar o onclick do botao de adotado, para tirar a possibilidade de desadotar
    }

     // funcao pra fazer um card de lobo ja adotado (img pra esquerda)
    function fazerCardLoboAdotado2(lobo) {

        var descricao = lobo.descricao;
        
        //se a descricao e muito grande, corta
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
                    <div class="lobinho-botao-container2"><button class="btn-adotar-adotado2">Adotado</button></div>
                </div>
                <div class="base-img2"><img src="${lobo.imagem}" alt="${lobo.nome}" id="imagem2"></div>
            </div>
        `;
    }



    // LOOP PARA CRIAR OS CARDS


    // variavel pra guardar o html dos cards
    var html = '';

    // calcula quais lobos mostrar nesta pagina
    var inicio = (pagina - 1) * lobosPorPagina;
    var fim = inicio + lobosPorPagina;
    var lobosParaMostrar = lobosParaExibir.slice(inicio, fim);

    // passa por todos os lobos da pagina e faz os cards concatenados
    for (var i = 0; i < lobosParaMostrar.length; i++) {

        var loboAtual = lobosParaMostrar[i];

        var ehLayout2 = (i % 2 === 1); // alterna layouts

        // se o lobo nao foi adotado, faz card normal
        if (!loboAtual.adotado) {
            if (ehLayout2) { html += fazerCardLoboDisponivel2(loboAtual); } 
            else { html += fazerCardLoboDisponivel1(loboAtual); }
        } else {
            // se ja foi adotado, faz card diferente
            if (ehLayout2) { html += fazerCardLoboAdotado2(loboAtual); } 
            else { html += fazerCardLoboAdotado1(loboAtual); }
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

        // ao clicar nos btns, chama a funcao de mostrar lobos com a pagina correta
        btnAnterior.onclick = () => { if (pagina > 1) mostrarLobinhos(pagina - 1); };
        btnProximo.onclick = () => { if (pagina < totalPaginas) mostrarLobinhos(pagina + 1); };
    }
}

//quando a pagina carregar
document.addEventListener('DOMContentLoaded', function () {
    console.log('pagina carregou');

    //adiciona o evento de clique ao botão de filtro
    const botao_filtro = document.getElementById('filtro');
    if (botao_filtro) {
        botao_filtro.addEventListener('click', () => {
            //inverte o estado do filtro
            verApenasAdotados = !verApenasAdotados;

            // atualiza a aparência do botão
            if (verApenasAdotados) {
                botao_filtro.classList.add('ativo');
                botao_filtro.textContent = '✔';
                botao_filtro.style.backgroundColor = '#2C5680';
                botao_filtro.style.color = 'white';
            } else {
                botao_filtro.classList.remove('ativo');
                botao_filtro.textContent = '';
                botao_filtro.style.backgroundColor = 'white';
            }

            // Re-renderiza a lista de lobos a partir da primeira página
            mostrarLobinhos(1);
        });
    }

    //buscar elementos
    const input_busca = document.getElementById('search-input');
    const lupa_busca = document.querySelector('.lupa');


    //fazer a busca acontecer
    function executarBusca() {
        termoBusca = input_busca.value.trim().toLowerCase();
        mostrarLobinhos(1);
    }

    if (input_busca && lupa_busca) {
        lupa_busca.addEventListener('click', executarBusca);
        input_busca.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                executarBusca();
            }
        });
    }

    // verifica se estamos na pagina da lista de lobinhos
    var elementoDaLista = document.getElementById('lobinhos-grid');
    if (elementoDaLista) {
        mostrarLobinhos(); 
    }
});