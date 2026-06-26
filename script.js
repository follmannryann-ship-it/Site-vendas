// =========================
// LOGIN / CADASTRO
// =========================

function abrirLogin() {
    document.getElementById("modalLogin").style.display = "block";
}

function fecharLogin() {
    document.getElementById("modalLogin").style.display = "none";
}

function salvarUsuario() {

    let nome = document.getElementById("nome").value;
    let idade = document.getElementById("idade").value;
    let contato = document.getElementById("contato").value;

    if(nome === "" || idade === "" || contato === ""){
        alert("Preencha todos os campos.");
        return;
    }

    let usuario = {
        nome: nome,
        idade: idade,
        contato: contato
    };

    localStorage.setItem(
        "usuario",
        JSON.stringify(usuario)
    );

    alert("Cadastro realizado com sucesso!");

    fecharLogin();
}

// =========================
// CARRINHO
// =========================

let carrinho = [];

function adicionarCarrinho(nome, preco){

    carrinho.push({
        nome: nome,
        preco: preco
    });

    atualizarCarrinho();

    alert(nome + " adicionado ao carrinho!");
}

function removerItem(index){

    carrinho.splice(index, 1);

    atualizarCarrinho();
}

function atualizarCarrinho(){

    const lista =
    document.getElementById("listaCarrinho");

    lista.innerHTML = "";

    let total = 0;

    carrinho.forEach((item,index)=>{

        total += item.preco;

        lista.innerHTML += `
            <li>
                ${item.nome}
                - R$ ${item.preco.toFixed(2)}

                <button onclick="removerItem(${index})">
                    ❌
                </button>
            </li>
        `;
    });

    document.getElementById("total")
    .innerText =
    `Total: R$ ${total.toFixed(2)}`;
}

// =========================
// FINALIZAR PEDIDO
// =========================

function finalizarPedido(){

    if(carrinho.length === 0){
        alert("Seu carrinho está vazio.");
        return;
    }

    let usuario =
    JSON.parse(
        localStorage.getItem("usuario")
    );

    if(!usuario){
        alert(
            "Faça login antes de finalizar seu pedido."
        );

        abrirLogin();
        return;
    }

    let mensagem =
    "Olá! Gostaria de fazer um pedido:%0A%0A";

    mensagem +=
    "Nome: " + usuario.nome + "%0A";

    mensagem +=
    "Idade: " + usuario.idade + "%0A";

    mensagem +=
    "Contato: " + usuario.contato + "%0A%0A";

    mensagem +=
    "Produtos:%0A";

    let total = 0;

    carrinho.forEach(item => {

        mensagem +=
        "- " + item.nome +
        " (R$ " +
        item.preco.toFixed(2) +
        ")%0A";

        total += item.preco;
    });

    mensagem +=
    "%0ATotal: R$ " +
    total.toFixed(2);

    window.open(
        "https://wa.me/5545991168952?text=" +
        mensagem,
        "_blank"
    );
}

// =========================
// FECHAR MODAL AO CLICAR FORA
// =========================

window.onclick = function(event){

    let modal =
    document.getElementById("modalLogin");

    if(event.target === modal){
        fecharLogin();
    }
}