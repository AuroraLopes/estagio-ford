

const idade = 20;
const nome = 'Braga';
console.log('Olá meu nome é '+ nome, 'e eu tenho '+ idade +' anos ');






let num1 = parseInt(prompt('Escolha o primeiro numero:'),10);
let num2 = parseInt(prompt('Escolha o segundo numero:'),10);

const adi = num1 + num2;
const sub = num1 - num2;
const mult = num1 * num2;
const div = (num1 / num2).toFixed(2);

console.log('Sua adição:'+ adi,
            'Sua subtração:'+ sub,
            'Sua multiplicação:'+ mult,
            'Sua divisão:'+ div);



function recebendoDados(){
    let  nome = document.getElementById('nome').value;
    let idade = document.getElementById('idade').value;
    console.log('Seu nome:', nome);
    console.log('Sua idade:', idade);

    if (idade >= 18) {
        alert('Você é maior de idade');
    } else {
        alert('Você é menor de idade!');
    }

    reescrevendoPalavras();
    reescrevendoPalavrasBraga();
}

function contador(){

    let content = document.getElementById('numeroC');

    for (let n = 0; n <= 100; n++){

       let numeros = document.createElement('p')
       numeros.innerHTML = n;
       content.append(numeros);
    }

}

contador();


function soma(n, h){
    return n+h
}

console.log(soma(20,40))

const frutas = [
    'laranja',
    'banana',
    'uva'
]

let cesta_de_frutas = document.getElementById('cesta')

for (let i = 0; i < frutas.length; i++){
    let frutas_na_cesta = document.createElement('p');
    frutas_na_cesta.innerHTML = frutas[i];
    cesta_de_frutas.append(frutas_na_cesta)
}

for(let fruta in frutas) {
    console.info( frutas[fruta])
}


livro = new Object()

livro.titulo='Livro';
livro.autor= 'Eu';
livro.npaginas= '20';

console.log(livro)

function exibirAlert(){
    alert('Você clicou no botão!')
}

function reescrevendoPalavras(){
    let  nome = document.getElementById('nome').value;
    const nomes = nome.split(" ");

    console.log(nomes)

    for (let i = 0; i < nomes.length; i++){
        nomes[i] = nomes[i][0].toUpperCase() + nomes[i].substr(1);
    }
    
    console.log(nomes)
}

function reescrevendoPalavrasBraga(){
    let  names = document.getElementById('nome').value;
    const correctNames = names.split(" ").map(name => name[0].toUpperCase() + name.substr(1)).join(" ");
    console.log(correctNames)

}

let nivers2 = [8,10,30,1,7];
console.log(nivers2.sort((a,b) => a > b ? -1 : 1));

let nivers = [5,4,3,6,7];

nivers = nivers.reduce((a,b) => {
    if (a > b){
        return a 
    } else {
        return b
    }
});
console.log(nivers);


let nomes =[
    'Braga','Mayara', 'Aurora', 'Cadu', 'Tuba'
];

console.log(nomes.sort((a,b) => b.length - a.length));
