const chatForm = document.getElementById('chat-form');
const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');

// Função para adicionar mensagem no chat
function addMessage(content, role) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', role);
  messageElement.innerText = content;
  chatWindow.appendChild(messageElement);

  // Scroll automático para a última mensagem
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Função para lidar com o envio da mensagem
chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const userMessage = userInput.value;
  addMessage(userMessage, 'user');  // Adiciona a mensagem do usuário ao chat
  userInput.value = '';  // Limpa o campo de texto

  try {
    // Faz a requisição para o backend
    const response = await fetch('http://localhost:3000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();

    if (response.ok) {
      addMessage(data.reply, 'assistant');  // Adiciona a resposta da IA ao chat
    } else {
      addMessage(`Erro no servidor: ${data.error}`, 'assistant');
    }
  } catch (error) {
    addMessage('Erro de conexão com o servidor.', 'assistant');
  }
});
