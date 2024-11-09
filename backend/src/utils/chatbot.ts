async function getMessageFromChatbot(chat_id) {
    const response = await fetch(`http://localhost:8000/chat/${chat_id}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({chatId: chat_id}),
        });
    const data = await response.json();

}

export default {
    getMessageFromChatbot
}