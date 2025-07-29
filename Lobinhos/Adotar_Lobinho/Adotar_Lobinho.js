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

let loboSelecionado = lobos[0];

document.getElementById("Imagem").src = loboSelecionado.imagem
document.getElementById("nome").textContent = loboSelecionado.nome;
document.getElementById("ID").textContent = loboSelecionado.id;

let nome = document.querySelector("#inputNome");
let idade = document.querySelector("#inputIdade");
let email = document.querySelector("#inputEmail");
let btnAdotar = document.querySelector(".Adotar");

function adicionarDados() {

    let nomeDono = nome.value;
    let idadeDono = idade.value;
    let emailDono = email.value;
    let objeto = { id: loboSelecionado.id, nome: loboSelecionado.nome, idade: loboSelecionado.idade, descricao: loboSelecionado.descricao, imagem: loboSelecionado.imagem, adotado: true, nomeDono: nomeDono, idadeDono: idadeDono, emailDono: emailDono }

    // Corrigindo o bug: usar loboSelecionado.id em vez de ID
    let indexLobo = lobos.findIndex(lobo => lobo.id === loboSelecionado.id);
    if (indexLobo !== -1) {
        lobos[indexLobo] = objeto;
    }

    localStorage.setItem('lobos', JSON.stringify(lobos));

    // Redirecionar para Show_Lobinho após a adoção
    window.location.href = '../Show_Lobinho/Show_Lobinho.html?id=' + loboSelecionado.id;
}

btnAdotar.addEventListener("click", adicionarDados);