// Função para carregar o conteúdo de components.html
async function loadComponentsHtml() {
    const response = await fetch('./components/components.html');
    const componentsHtml = await response.text();

    // Criar um elemento temporário para armazenar o HTML carregado
    const templateContainer = document.createElement('div');
    templateContainer.innerHTML = componentsHtml;

    // Adicionar os templates ao body do documento
    document.body.appendChild(templateContainer);
}

// Função para carregar o conteúdo do CSS dos componentes
async function loadComponentsCss() {
    const response = await fetch('./components/components.css');
    return await response.text();
}

// Registrar os Web Components após carregar o HTML e CSS
async function registerComponents() {
    await loadComponentsHtml(); // Aguarda o carregamento do HTML
    const css = await loadComponentsCss(); // Carrega o CSS

    const templateButton = document.getElementById('custom-button-template').content;
    const templateCard = document.getElementById('custom-card-template').content;

    // Definir o Web Component - Custom Button
    class CustomButton extends HTMLElement {
        constructor() {
            super();
            const shadow = this.attachShadow({ mode: 'open' });
            const clone = document.importNode(templateButton, true);

            // Aplicar o CSS diretamente no Shadow DOM
            const style = document.createElement('style');
            style.textContent = css;

            shadow.appendChild(style);
            shadow.appendChild(clone);
        }
    }
    customElements.define('custom-button', CustomButton);

    // Definir o Web Component - Custom Card
    class CustomCard extends HTMLElement {
        constructor() {
            super();
            const shadow = this.attachShadow({ mode: 'open' });
            const clone = document.importNode(templateCard, true);

            // Aplicar o CSS diretamente no Shadow DOM
            const style = document.createElement('style');
            style.textContent = css;

            shadow.appendChild(style);
            shadow.appendChild(clone);
        }
    }
    customElements.define('custom-card', CustomCard);
}

// Executa o registro dos componentes após carregar o HTML
registerComponents();
