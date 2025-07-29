let lobos = JSON.parse(localStorage.getItem('lobos'));

const Params = new URLSearchParams(window.location.search);
const idDoLobo = Params.get('id');
let loboSelecionado = lobos[lobos.findIndex(lobo => lobo.id === parseInt(idDoLobo))];

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
    alert("Lobinho adotado com sucesso!");
}

btnAdotar.addEventListener("click", adicionarDados);