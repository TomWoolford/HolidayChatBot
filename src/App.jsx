import { useState } from 'react'
import './App.css'
import ChatBot from './components/ChatBot'

function App() {
  return (
    <div className="App row">
      <div className="title row">
        <h1>Holiday Chat Protoype</h1>
      </div>
      <div className="content">
        <ChatBot />
      </div>      
    </div>
  )
}

export default App
