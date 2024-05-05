const valorMaximoAleatorio = 10; 
let listaDeNumerosSorteados = [];
let tentativas = 0;

reiniciarJogo();

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 0;
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${valorMaximoAleatorio}`);
    document.getElementById('reiniciar').setAttribute('disabled', true)
    document.getElementById('chutar').removeAttribute('disabled');
}

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    tentativas++;
    console.log(chute);
    if (chute == '') {
        exibirTextoNaTela('p', `Informe um valor de 1 a ${valorMaximoAleatorio}`);
        return;
    }
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');                
        exibirTextoNaTela('p', `Você descobriu o número secreto com ${tentativas} ${tentativas > 1 ? 'tentativas' : 'tentativa'}!`);
        document.getElementById('chutar').setAttribute('disabled', true)
        document.getElementById('reiniciar').removeAttribute('disabled');
        limparCampo();
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', `O número secreto é menor que ${chute}`);
        } else {
            exibirTextoNaTela('p', `O número secreto é maior que ${chute}`);
        }
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * valorMaximoAleatorio + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == valorMaximoAleatorio) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    }

    listaDeNumerosSorteados.push(numeroEscolhido);
    //console.log(listaDeNumerosSorteados);
    return numeroEscolhido;
}

function limparCampo() {
    document.querySelector('input').value = '';    
}
