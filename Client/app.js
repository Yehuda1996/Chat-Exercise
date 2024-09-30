const socket = io("http://localhost:3001", {
    withCredentials: false,
    transports: ['websocket']
});

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('connect_error', (error) => {
    console.log("Connection error", error);
});

socket.on('submit', (data) => {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'received');
    messageElement.textContent = data;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
});

document.querySelector('button').addEventListener('click', () => {
    const messageInput = document.getElementById('message');
    const messageText = messageInput.value.trim();
    if(messageText){
        socket.emit('submit', messageText);
        const chatBox = document.getElementById('chat-box');
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'sent');
        messageElement.textContent = messageText;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
        messageInput.value = '';
    }
});