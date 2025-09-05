import React, { useState, useEffect, useRef } from "react";

const Chat = ({ bot }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sessionId] = useState(() => `user_${Date.now()}`);
  const chatEndRef = useRef(null);

  useEffect(() => {
    setMessages([
      { role: "bot", content: `¡Hola! Soy ${bot.name}. ¿En qué puedo ayudarte?` }
    ]);
  }, [bot]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    const textToSend = input;
    setInput("");

    try {
      const response = await fetch("https://api.artegraficacuau.com.mx/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    session_id: sessionId,
    message: textToSend,
    personaje: bot.name,
    description: bot.description  // nueva
  })
});
      const data = await response.json();
      setMessages(prev => [...prev, { role: "bot", content: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "bot", content: "Error al conectar con el servidor." }]);
    }
  };

  return (
    <div className="whatsapp-chat">
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-bubble ${msg.role === "user" ? "user" : "bot"}`}>
            {msg.content}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <form className="chat-input-bar d-flex mt-2" onSubmit={handleSend}>
        <input
          className="form-control"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <button className="btn btn-outline-info ms-2" type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Chat;
