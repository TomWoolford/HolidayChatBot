import { useState } from 'react'
import './App.css'
import Collapseable from './components/collapse/Collapseable'

function App() {
  return (
    <div className="App">
      <div className="title">
        <h1>Holiday Chat Protoype</h1>
      </div>
      <Collapseable />
    </div>
  )
}

export default App
