// Gerenciador central do localStorage para os lobinhos
// Este arquivo deve ser carregado ANTES de qualquer outro script

(function () {
    'use strict';

    // Namespace global para evitar conflitos
    window.LobosManager = {
        isInitialized: false,
        isInitializing: false,
        data: null,
        callbacks: [],

        // Funcao principal de inicializacao
        async init() {
            // Se ja esta inicializando, aguarda
            if (this.isInitializing) {
                return new Promise((resolve) => {
                    this.callbacks.push(resolve);
                });
            }

            // Se ja foi inicializado, retorna os dados
            if (this.isInitialized && this.data) {
                return this.data;
            }

            this.isInitializing = true;

            try {
                // Tenta primeiro pegar do localStorage
                const savedData = localStorage.getItem('lobos');
                if (savedData) {
                    this.data = JSON.parse(savedData);
                    console.log('Dados carregados do localStorage:', this.data.length, 'lobinhos');
                } else {
                    // Se nao tem no localStorage, carrega do JSON
                    console.log('Carregando dados do arquivo JSON...');
                    const response = await fetch('./lobinhos.json');
                    if (!response.ok) {
                        throw new Error(`Erro ao buscar lobinhos.json: ${response.statusText}`);
                    }
                    this.data = await response.json();
                    // Salva no localStorage
                    localStorage.setItem('lobos', JSON.stringify(this.data));
                    console.log('Dados carregados do JSON e salvos no localStorage:', this.data.length, 'lobinhos');
                }

                this.isInitialized = true;
                this.isInitializing = false;

                // Executa callbacks pendentes
                this.callbacks.forEach(callback => callback(this.data));
                this.callbacks = [];

                return this.data;

            } catch (error) {
                console.error('Erro ao inicializar dados dos lobinhos:', error);
                this.isInitializing = false;
                this.data = [];
                return this.data;
            }
        },

        // Obter todos os lobinhos
        async getLobinhos() {
            if (!this.isInitialized) {
                await this.init();
            }
            return this.data || [];
        },

        // Obter um lobinho por ID
        async getLobinhoPorId(id) {
            const lobinhos = await this.getLobinhos();
            return lobinhos.find(lobo => lobo.id === parseInt(id));
        },

        // Adicionar um novo lobinho
        async adicionarLobinho(novoLobo) {
            const lobinhos = await this.getLobinhos();

            // Gera um novo ID
            const novoId = Math.max(...lobinhos.map(l => l.id)) + 1;
            novoLobo.id = novoId;

            // Adiciona ao array
            lobinhos.push(novoLobo);

            // Atualiza localStorage
            localStorage.setItem('lobos', JSON.stringify(lobinhos));
            this.data = lobinhos;

            console.log('Novo lobinho adicionado:', novoLobo.nome);
            return novoLobo;
        },

        // Atualizar um lobinho existente
        async atualizarLobinho(id, dadosAtualizados) {
            const lobinhos = await this.getLobinhos();
            const index = lobinhos.findIndex(lobo => lobo.id === parseInt(id));

            if (index !== -1) {
                // Mantem o ID original
                dadosAtualizados.id = parseInt(id);
                lobinhos[index] = { ...lobinhos[index], ...dadosAtualizados };

                // Atualiza localStorage
                localStorage.setItem('lobos', JSON.stringify(lobinhos));
                this.data = lobinhos;

                console.log('Lobinho atualizado:', dadosAtualizados.nome || id);
                return lobinhos[index];
            }

            throw new Error(`Lobinho com ID ${id} nao encontrado`);
        },

        // Remover um lobinho
        async removerLobinho(id) {
            const lobinhos = await this.getLobinhos();
            const index = lobinhos.findIndex(lobo => lobo.id === parseInt(id));

            if (index !== -1) {
                const removido = lobinhos.splice(index, 1)[0];

                // Atualiza localStorage
                localStorage.setItem('lobos', JSON.stringify(lobinhos));
                this.data = lobinhos;

                console.log('Lobinho removido:', removido.nome);
                return removido;
            }

            throw new Error(`Lobinho com ID ${id} nao encontrado`);
        },

        // Forcar recarregamento dos dados do JSON
        async recarregarDados() {
            console.log('Forçando recarregamento dos dados...');
            this.isInitialized = false;
            this.data = null;
            localStorage.removeItem('lobos');
            return await this.init();
        }
    };

    // Auto-inicializa quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            LobosManager.init();
        });
    } else {
        LobosManager.init();
    }

})();
