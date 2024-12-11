
// Função para carregar o conteúdo da página
async function loadPage(page) {
    const response = await fetch(`./pages/${page}.html`);
    if (!response.ok) {
        console.error(`Erro ao carregar a página ${page}`);
        return;
    }
    const text = await response.text();
    document.getElementById('content').innerHTML = text;
}

// Função para navegar entre as páginas
function navigateTo(page) {
    loadPage(page);
}

// Função para carregar o conteúdo ao inicializar a página
window.addEventListener('load', async () => {
    const defaultPage = window.location.hash ? window.location.hash.substring(1) : 'home';
    await loadPage(defaultPage);

    // Atualiza o conteúdo ao mudar a hash na URL
    window.addEventListener('hashchange', () => {
        const page = window.location.hash.substring(1);
        loadPage(page);
    });
});
