import './App.css';
import ChatWrapper from './components/ChatWrapper';

function App() {
  return (
    <div className="App">
      <div className="title row">
        <h1>Holiday Chat Protoype</h1>
      </div>
      <div className="main-content row">
        <ChatWrapper />
      </div>      
    </div>
  )
}

export default App