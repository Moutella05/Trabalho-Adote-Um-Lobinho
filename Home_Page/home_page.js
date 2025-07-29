let lobos = JSON.parse(localStorage.getItem('lobos'));

// função que altera o texto interno aleatoriamente
function altera(id_nome, id_idade, id_descricao, id_imagem,  id_link) {
    id_css = [id_nome, id_idade, id_descricao, id_imagem,  id_link]
    //variaveis do ids alterados
    let nome_alterado = document.querySelector(id_css[0])
    let idade_alterado = document.querySelector(id_css[1])
    let descricao_alterado = document.querySelector(id_css[2])
    let img_alterado = document.querySelector(id_css[3])
    let link_alterado= document.querySelector(id_css[4])

    //numero aleatório entre 0 e o tamanho do array de objetos (corrigido o bug do +1)
    let num_aletorio = Math.floor(Math.random() * lobos.length)

    //troca dos ids por estatísticas de um lobo aleatório

    nome_alterado.innerText = lobos[num_aletorio].nome
    idade_alterado.innerText = lobos[num_aletorio].idade
    descricao_alterado.innerText = lobos[num_aletorio].descricao
    img_alterado.src = lobos[num_aletorio].imagem

    link_alterado.href = '../Lobinhos/Show_Lobinho/Show_Lobinho.html?id=' + lobos[num_aletorio].id;

    // Atualiza o botão baseado no status de adoção
    const botaoContainer = nome_alterado.closest('.informacoes').querySelector('.lobinho-botao-container')
    if (botaoContainer) {
        const botao = botaoContainer.querySelector('button')
        if (lobos[num_aletorio].adotado) {
            botao.className = 'btn-adotar-adotado'
            botao.textContent = 'Adotado'
            botao.onclick = null // Remove o clique

            // Adiciona o nome do dono se não existir
            let nomeDono = botaoContainer.querySelector('.nome-dono')
            if (!nomeDono) {
                nomeDono = document.createElement('p')
                nomeDono.className = 'nome-dono'
                botaoContainer.appendChild(nomeDono)
            }
            nomeDono.textContent = `Adotado por: ${lobos[num_aletorio].nomeDono || 'Não informado'}`
        } else {
            botao.className = 'btn-adotar'
            botao.textContent = 'Adotar'
            botao.onclick = () => irParaAdocao(lobos[num_aletorio].id)

            // Remove o nome do dono se existir
            const nomeDono = botaoContainer.querySelector('.nome-dono')
            if (nomeDono) {
                nomeDono.remove()
            }
        }
    }
}

altera("#subtitulo1", "#idade1", "#descricao1", "#imagem1", "#link-imagem1")
altera("#subtitulo2", "#idade2", "#descricao2", "#imagem2", "#link-imagem2")

// funcao pra ir pra pagina de adocao
function irParaAdocao(idDoLobo) {
    window.location.href = '../Lobinhos/Adotar_Lobinho/Adotar_Lobinho.html?id=' + idDoLobo;
}