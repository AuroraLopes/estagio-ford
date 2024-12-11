
const nftsAvailable = document.querySelector('.nfts_available');
const nftsAvailableFloating = document.querySelector('.card-floating');
const nftImg = document.querySelector('.card-nft-img-div');
const cartToggle = document.getElementById('cart-toggle');
const cartList = document.querySelector('.side-cart');
const cartListItens = document.querySelector('.side-cart-itens');
const cartListButton = document.getElementById('side-cart_button');
const header = document.querySelector('.header');

let CardSelecionado = null;
let ElementoSelecionado = null;
let FloatingCardControl = false;
let CartItensControl = false;

getAvailable()
initCartEvents()

async function getAvailable () {
    const response = await fetch('http://localhost:3000/nft')
    const data = await response.json()

    const nfts = data;
    nftsAvailable.replaceChildren(); //serve para limpar todos os filhos em uma lista vazia para que não se repita o que ja foi passado antes.

    for (let n = 0; n < nfts.length; n++) {
        const nft = document.createElement('div');
        nft.classList.add('card-nft');
        nft.setAttribute('data-id', nfts[n].id);
         

        let titulo = document.createElement('h3');
        titulo.classList.add('card-nft-title'); 
        titulo.textContent = nfts[n].titulo.toUpperCase();


        let divi = document.createElement('div');
        divi.classList.add('card-nft-img-div'); 
        divi.style.background = 'url(' + nfts[n].img +`)`;
        divi.style.backgroundSize= "cover";
        divi.style.backgroundPosition= "center";

        let button = document.createElement('button');
        button.setAttribute('data-id', nfts[n].id);

        if (nfts[n].isAvailable) {
            button.classList.add('card-nft-button');
            button.innerHTML = `
            <div class="lines">
                <div data-id="${nfts[n].id}">Comprar</div>
            </div>`;
        } else {
            button.classList.add('card-nft-button-disabled')
            button.innerHTML = `
            <div class="lines">
                <div data-id="${nfts[n].id}">Indisponivel</div>
            </div>`; 
        }


        button.addEventListener('click', addCardCart);

        nft.appendChild(titulo);
        nft.appendChild(divi);
        nft.appendChild(button)

        divi.addEventListener('click', selectNft);
        nftsAvailable.append(nft);

    }

    updateCartCount()
}

async function selectNft(nft) {

    let itemsId;
    let element = nft.srcElement;

    if (element.classList.contains('card-nft')) {
        itemsId = element.getAttribute('data-id');
    }else {
        element = element.parentElement;
        itemsId = element.getAttribute('data-id');
    }

    if(element.classList.contains('selecionado')) {
        element.classList.remove('selecionado')
    } else {
        element.classList.add('selecionado')
    }

    if(ElementoSelecionado != null && ElementoSelecionado.classList.contains('selecionado')) {
        ElementoSelecionado.classList.remove('selecionado')
    }

    CardSelecionado = itemsId;
    ElementoSelecionado = element;

    console.log(element)

    showFloatingCard()
    
}

async function showFloatingCard() {

    const response = await fetch('http://localhost:3000/nft/' + CardSelecionado)
    const data = await response.json();

    let elemento = CardSelecionado;
    nftsAvailableFloating.replaceChildren();

    if (elemento){
        nftsAvailableFloating.style.display = "flex"

        let nft = document.createElement('div');
        nft.classList.add('card-nft-floating');

        let divi = document.createElement('div');
        divi.classList.add('card-nft-floating-img-div'); 
        divi.style.background = 'url(' + data.img +`)`;
        divi.style.backgroundSize= "cover";
        divi.style.backgroundPosition= "center";

        let closeButton = document.createElement('button');
        closeButton.classList.add('card-nft-floating-button');
        closeButton.textContent = 'X';

        nft.appendChild(divi);
        nft.appendChild(closeButton);

        nftsAvailableFloating.append(nft);
        closeButton.addEventListener('click',closeFloatingCard);

    } 


}

async function closeFloatingCard() {
    console.info(CardSelecionado);
    if (FloatingCardControl){
        FloatingCardControl = true;
        nftsAvailableFloating.style.display = "none"
    } else {
        FloatingCardControl= true;
        nftsAvailableFloating.style.display = "none";
    }
}

async function addCardCart(CardSelecionado) {
    let cardId = CardSelecionado.srcElement.getAttribute('data-id');

    var storageCart = JSON.parse(localStorage.getItem("storageCart"));

    console.info(storageCart)
    if (storageCart == null) {
        storageCart = [cardId]
    } else {
        storageCart.push(cardId)
    }

    localStorage.setItem("storageCart", JSON.stringify(storageCart));
    document.getElementById('cart-count').textContent = storageCart.length;
    // Desabilitar botao de compra para nao ficar clicando infinitamente e populando o array com o mesmo id;
    
    console.info(CardSelecionado, "Botao apertado", cardId, storageCart)
    updateNftButton(cardId, true)
}

async function removeCardCart() {

    let cardId = this.parentNode.getAttribute('data-id');

    var storageCart = JSON.parse(localStorage.getItem("storageCart"));

    console.info(storageCart)
    storageCart = storageCart.filter((value)=> value != cardId)

    localStorage.setItem("storageCart", JSON.stringify(storageCart));
    document.getElementById('cart-count').textContent = storageCart.length;
    // Desabilitar botao de compra para nao ficar clicando infinitamente e populando o array com o mesmo id;
    
    console.info(CardSelecionado, "Botao apertado", cardId, storageCart)
    updateNftButton(cardId, false)
    getCartList()
}

async function updateCartCount() {
    var storageCart = JSON.parse(localStorage.getItem("storageCart"));
    document.getElementById('cart-count').textContent = storageCart.length;

    storageCart.forEach((value) => {
        updateNftButton(value, true)
    })
}

async function initCartEvents() {
    cartToggle.addEventListener('click', openCartList);
    cartListButton.addEventListener('click', buyNfts);
}

async function openCartList() {
    if (CartItensControl){
        CartItensControl = false;
        cartList.style.display = "none"
        nftsAvailable.classList.remove('overlay')
    } else {
        CartItensControl = true;
        header.style.borderRadius = " 0px 0px 0px 20px";
        cartList.style.display = "flex";
        nftsAvailable.classList.add('overlay')
        getCartList()
    }
}

async function getCartList() {
    const response = await fetch('http://localhost:3000/nft')
    const data = await response.json()

    const nfts = data;
    cartListItens.replaceChildren();
    var storageCart = JSON.parse(localStorage.getItem("storageCart"));

    for (let n = 0; n < nfts.length; n++) {
        if (storageCart.includes(nfts[n].id)) {
            let nft = document.createElement('div');
            nft.classList.add('product-nft');
            nft.setAttribute('data-id', nfts[n].id);

            let divi = document.createElement('div');
            divi.classList.add('product-nft-img-div'); 
            divi.style.background = 'url(' + nfts[n].img +`)`;
            divi.style.backgroundSize= "cover";

            let titulo = document.createElement('h3');
            titulo.classList.add('product-nft-title'); 
            titulo.textContent = nfts[n].titulo.toUpperCase(); 

            let button = document.createElement('button');
            button.setAttribute('data-id', nfts[n].id);
            button.classList.add('product-nft-button');
            button.innerHTML = `
            <div data-id="${nfts[n].id}" class="lines">
                <div data-id="${nfts[n].id}">
                <svg class= "icon" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> 
                <path d="M2.75 6.16667C2.75 5.70644 3.09538 5.33335 3.52143 5.33335L6.18567 5.3329C6.71502 5.31841 7.18202 4.95482 7.36214 4.41691C7.36688 4.40277 7.37232 4.38532 7.39185 4.32203L7.50665 3.94993C7.5769 3.72179 7.6381 3.52303 7.72375 3.34536C8.06209 2.64349 8.68808 2.1561 9.41147 2.03132C9.59457 1.99973 9.78848 1.99987 10.0111 2.00002H13.4891C13.7117 1.99987 13.9056 1.99973 14.0887 2.03132C14.8121 2.1561 15.4381 2.64349 15.7764 3.34536C15.8621 3.52303 15.9233 3.72179 15.9935 3.94993L16.1083 4.32203C16.1279 4.38532 16.1333 4.40277 16.138 4.41691C16.3182 4.95482 16.8778 5.31886 17.4071 5.33335H19.9786C20.4046 5.33335 20.75 5.70644 20.75 6.16667C20.75 6.62691 20.4046 7 19.9786 7H3.52143C3.09538 7 2.75 6.62691 2.75 6.16667Z" fill="#fff700"></path> 
                <path d="M11.6068 21.9998H12.3937C15.1012 21.9998 16.4549 21.9998 17.3351 21.1366C18.2153 20.2734 18.3054 18.8575 18.4855 16.0256L18.745 11.945C18.8427 10.4085 18.8916 9.6402 18.45 9.15335C18.0084 8.6665 17.2628 8.6665 15.7714 8.6665H8.22905C6.73771 8.6665 5.99204 8.6665 5.55047 9.15335C5.10891 9.6402 5.15777 10.4085 5.25549 11.945L5.515 16.0256C5.6951 18.8575 5.78515 20.2734 6.66534 21.1366C7.54553 21.9998 8.89927 21.9998 11.6068 21.9998Z" fill="#fff700"></path> 
                </g></svg></div>
            </div>`
    
            button.addEventListener('click', removeCardCart);

            nft.appendChild(divi);
            nft.appendChild(titulo);
            nft.appendChild(button);

            cartListItens.append(nft);
        }
    }
}

async function buyNfts() {
    var storageCart = JSON.parse(localStorage.getItem("storageCart"));

    // poderia ser uma unica chamada mas como nao tem como mockar esse update pelo menos sem alterar todo o codigo
    // optei por atualizar para cada id do meu nft alterando para comprado.
    storageCart.forEach((value) => {
        fetch('http://localhost:3000/nft/' + value, {
            method: 'PATCH',
            body: JSON.stringify({
               isAvailable: false,
            })
        })
    })

    localStorage.setItem("storageCart", JSON.stringify([]));
    window.location.reload()
}

async function updateNftButton(nftId, isDisabled) {
    let cardNft = null 
    nftsAvailable.childNodes.forEach((node)=> {
        if (node.getAttribute('data-id') === nftId) {
            cardNft = node;
        }
    })

    let button = cardNft.querySelector('.card-nft-button') || cardNft.querySelector('.card-nft-button-disabled');
    if (isDisabled) {
        button.innerHTML = `
            <div class="lines">
                <div data-id="${nftId}">Indisponivel</div>
            </div>`; 
        button.classList.add('card-nft-button-disabled')
        button.classList.remove('card-nft-button')
    } else {
        button.innerHTML = `
            <div class="lines">
                <div data-id="${nftId}">Comprar</div>
            </div>`; 
        button.classList.add('card-nft-button')
        button.classList.remove('card-nft-button-disabled')
    }
}

