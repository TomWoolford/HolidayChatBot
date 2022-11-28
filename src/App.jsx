import { useState } from 'react';
import './App.css';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <div className="App">
      <div className="title row">
        <h1>Holiday Chat Protoype</h1>
      </div>
      <div className="main-content row">
        <ChatBot />
      </div>      
    </div>
  )
}

export default App