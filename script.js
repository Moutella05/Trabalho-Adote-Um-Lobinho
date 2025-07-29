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
        // Chama mostrarLobinhos se a função existir (na página da lista)
        if (typeof mostrarLobinhos === 'function') {
            mostrarLobinhos();
        }
    }).catch(error => {
        console.error('Erro durante a inicialização do localStorage:', error);
    });
}
// funcao pra ir pra pagina de adocao
function irParaAdocao(idDoLobo) {
    window.location.href = '../Show_Lobinho/Show_Lobinho.html?id=' + idDoLobo;
}