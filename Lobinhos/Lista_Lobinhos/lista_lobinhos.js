/* =============================================================================
   LISTA LOBINHOS - JAVASCRIPT
   =============================================================================
   Descrição: Script para carregar e renderizar os lobinhos do localStorage
   ============================================================================= */

// -----------------------------------------------------------------------------
// FUNÇÕES PRINCIPAIS
// -----------------------------------------------------------------------------

/**
 * Carrega os lobinhos do localStorage
 * @returns {Array} Array de lobinhos
 */
function carregarLobinhos() {
    const lobos = localStorage.getItem('lobos');
    return lobos ? JSON.parse(lobos) : [];
}

/**
 * Filtra apenas lobinhos disponíveis (não adotados)
 * @param {Array} lobinhos - Array de todos os lobinhos
 * @returns {Array} Array de lobinhos disponíveis
 */
function filtrarDisponiveis(lobinhos) {
    return lobinhos.filter(lobinho => !lobinho.adotado);
}

/**
 * Cria o HTML de um card de lobinho
 * @param {Object} lobinho - Objeto do lobinho
 * @returns {string} HTML do card
 */
function criarCardLobinho(lobinho) {
    // Limitar descrição a aproximadamente 300 caracteres
    const descricaoLimitada = lobinho.descricao.length > 300 
        ? lobinho.descricao.substring(0, 300) + '...' 
        : lobinho.descricao;

    return `
        <div class="lobinho-card" data-id="${lobinho.id}">
            <!-- Seção da Imagem -->
            <div class="lobinho-imagem-container">
                <img src="${lobinho.imagem}" 
                     alt="${lobinho.nome}" 
                     class="lobinho-imagem"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="lobinho-imagem-placeholder" style="display: none;">
                    🐺 Imagem não disponível
                </div>
            </div>
            
            <!-- Dados do Lobo -->
            <div class="lobinho-dados">
                <!-- Nome do Lobo -->
                <h2 class="lobinho-nome">${lobinho.nome}</h2>
                
                <!-- Idade -->
                <p class="lobinho-idade">Idade: ${lobinho.idade} anos</p>
                
                <!-- Descrição -->
                <p class="lobinho-descricao">${descricaoLimitada}</p>
                
                <!-- Botão Adotar -->
                <div class="lobinho-botao-container">
                    <button class="btn-adotar" onclick="adotarLobinho(${lobinho.id})">
                        Adotar
                    </button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Renderiza todos os cards de lobinhos no DOM
 * @param {Array} lobinhos - Array de lobinhos para renderizar
 */
function renderizarLobinhos(lobinhos) {
    const grid = document.getElementById('lobinhos-grid');
    
    if (!grid) {
        console.error('Elemento #lobinhos-grid não encontrado');
        return;
    }
    
    if (lobinhos.length === 0) {
        grid.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: #666;">
                <h3>Nenhum lobinho disponível no momento</h3>
                <p>Todos os nossos lobinhos já encontraram um lar! 🏠</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = lobinhos.map(criarCardLobinho).join('');
}

// -----------------------------------------------------------------------------
// FUNÇÕES DE INTERAÇÃO
// -----------------------------------------------------------------------------

/**
 * Redireciona para página de adoção com ID do lobinho
 * @param {number} id - ID do lobinho
 */
function adotarLobinho(id) {
    window.location.href = `../Adotar_Lobinho/Adotar_Lobinho.html?id=${id}`;
}

/**
 * Redireciona para página de detalhes do lobinho
 * @param {number} id - ID do lobinho
 */
function verDetalhes(id) {
    window.location.href = `../Show_Lobinho/Show_Lobinho.html?id=${id}`;
}

// -----------------------------------------------------------------------------
// INICIALIZAÇÃO
// -----------------------------------------------------------------------------

/**
 * Função principal de inicialização
 */
function inicializar() {
    try {
        console.log('🐺 Carregando lista de lobinhos...');
        
        // Carregar dados do localStorage
        const todosLobinhos = carregarLobinhos();
        console.log(`📊 Total de lobinhos carregados: ${todosLobinhos.length}`);
        
        // Filtrar apenas disponíveis
        const disponíveis = filtrarDisponiveis(todosLobinhos);
        console.log(`✅ Lobinhos disponíveis: ${disponíveis.length}`);
        
        // Renderizar cards
        renderizarLobinhos(disponíveis);
        
        console.log('🎉 Lista de lobinhos carregada com sucesso!');
        
    } catch (error) {
        console.error('❌ Erro ao carregar lobinhos:', error);
        
        // Mostrar mensagem de erro para o usuário
        const grid = document.getElementById('lobinhos-grid');
        if (grid) {
            grid.innerHTML = `
                <div style="text-align: center; padding: 60px 20px; color: #d32f2f;">
                    <h3>Erro ao carregar lobinhos</h3>
                    <p>Tente recarregar a página. Se o problema persistir, entre em contato conosco.</p>
                </div>
            `;
        }
    }
}

// -----------------------------------------------------------------------------
// EVENT LISTENERS
// -----------------------------------------------------------------------------

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', inicializar);

// Recarregar lista quando voltar para a página (ex: voltar da página de adoção)
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        inicializar();
    }
});
