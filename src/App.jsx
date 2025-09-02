import "./App.css"
import React, { useState } from "react"
import Aside from "./components/aside.jsx"
import Chat from "./components/Chat.jsx";
import "./components/Chat.css";

const App = () => {
  const [selectedBot, setSelectedBot] = useState(null);

  return (
    <div className="app d-flex  ">
      <Aside onSelectBot={setSelectedBot} />
      
      <div
  className="main container-fluid overflow-auto d-flex flex-column justify-content-center align-items-center p-3"
  style={
    selectedBot
      ? {
          backgroundImage: `url(${selectedBot.repo_url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      : {}
  }
>
        {!selectedBot ? (
          <>
            <h1 className="text-center text-white mt-5">Bienvenido a ChatClick</h1>
            <p className="text-center text-white text-shadow ">Selecciona un chatbot de la lista para comenzar a interactuar.</p>
          </>
        ) : (
          <div className="chat-window w-100 h-100 d-flex flex-column align-items-center justify-content-center">
            <div className="info">
              <h2 className="text-warning">{selectedBot.name}</h2>
              <p>{selectedBot.description}</p>
            </div>
            <div className="flex-grow-1 w-100 d-flex justify-content-center align-items-center">
              <Chat bot={selectedBot} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
