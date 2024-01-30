//lista para armazenar todos os números que foram usados nas tentativas.
let listaDeNumerosSorteados = [];
//Definir um numero limite para o Math.random calcular.
let numeroLimite = 1000;
//Armazenamento do número secreto calculado pelo Math.random.
let numeroSecreto = gerarNumeroAleatorio();
//Armazenamento de chutes feitos pelo jogador.
let tentativas = 1;
//Armazenamento do numero maximo de tentativas.
let tentativasMaximas = 15;

//Função que padroniza a alteração do H1 e o Paragrafo no HTML. 
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});
};

//Função que dá um valor a mensagem inicial do H1 e o Paragrafo no HTML. 
function exibirMensagemInicial(){
exibirTextoNaTela("h1", "Bem vindo(a) ao jogo do Mentalista.");
exibirTextoNaTela("p", `Escolha um número entre 1 e ${numeroLimite}.`);
}

//Chama a função da Mensagem inicial.
exibirMensagemInicial();

//Função para verificar se o chute está certo ou errado.
function verificarChute() {
    let chute = document.querySelector("input").value;
//Variável para designar se usa tentativa no plural ou no singular.
    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
//Variável para designar se usa tentativaMaxima no plural ou no singular.
    let palavraChancesMaxima = tentativasMaximas > 2 || tentativasMaximas == 1 ? "chances" : "chance";

    let mensagemTentativas =`Você descobriu o numero secreto com ${tentativas} ${palavraTentativa}! <br>Restaram apenas ${tentativasMaximas-1} ${palavraChancesMaxima} para o final do jogo.`;
    let mensagemUltimaTentativa =`Você descobriu o numero secreto com ${tentativas} ${palavraTentativa}! <br>Você acertou na ultima tentativa.`; 
    let mensagemTentativasMaxima =`Restam apenas ${tentativasMaximas-1} ${palavraChancesMaxima} para o final do jogo.`;
//Se o chute for vazio, menor que 1 ou maior que 1001, aparece uma mensagem de erro.
    if(chute == "" || chute <= 0 || chute >= 1001){
        exibirTextoNaTela("h1", "Erro!");
        exibirTextoNaTela("p", `Por favor digite um número entre 1 e ${numeroLimite}.`);
        limparCampo();
    }else{
        exibirMensagemInicial();
// se o chute for igual ao número secreto
            if (chute == numeroSecreto){
                document.getElementById("reiniciar").removeAttribute("disabled");
                document.getElementById("chute").setAttribute("disabled", true);
                if(tentativasMaximas == 1){

                    exibirTextoNaTela("h1", "Acertou!");
                    exibirTextoNaTela("p", mensagemUltimaTentativa);
                }else{
                    exibirTextoNaTela("h1", "Acertou!");
                    exibirTextoNaTela("p", mensagemTentativas);
                }
                
            }else{
//Se o chute for diferente do número correto, aparece uma mensagem falando que errou e se o número é maior ou menor.
                exibirTextoNaTela("h1","Você errou, tente novamente.")
                if (chute > numeroSecreto){
                    exibirTextoNaTela("p", `O número secreto é menor do que ${chute}. <br> ${mensagemTentativasMaxima} `);
                }else{
                    exibirTextoNaTela("p", `O número secreto é maior do que ${chute}. <br> ${mensagemTentativasMaxima} `);
                }
////Aumenta o número de ${tentativas} a cada erro.                
                tentativas++;
//Reduz o número de ${tentativasMaximas} a cada erro.
                tentativasMaximas--;               
                limparCampo();
//Se tentativa maxima foi igual a zero, fim de jogo.
                if (tentativasMaximas == 0) {
                    exibirTextoNaTela("h1","Fim de jogo.");
                    exibirTextoNaTela("p","Suas tentativas acabaram.")                
                    document.getElementById("reiniciar").removeAttribute("disabled");
                    document.getElementById("chute").setAttribute("disabled", true);
                  }
                
            }
    }
};

//função para gerar um número aleatório com o Math.random.
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
//Se a lista chegar no número máximo fornecido pelo ${numeroLimite}, ela reseta a lista.
    if (quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }
//Se o número aleatório gerado já estiver na lista, ele retorna para o ${gerarNumeroAleatorio}, e gera um número novo.
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
};
//Função responsável por limpar o campo de chute.
function limparCampo(){
    chute = document.querySelector("input");
    chute.value = "";
}
//Função para o botão de reiniciar o jogo, fazendo com que se inicie novamente a partida.
function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    tentativasMaximas = 15;
    exibirMensagemInicial();
    document.getElementById("chute").removeAttribute("disabled");
    document.getElementById("reiniciar").setAttribute("disabled", true);
}