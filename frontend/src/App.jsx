import './App.css';
import Home from './pages/home';
import Conversation from './pages/Conversation';
import NotExist from './pages/NotExist';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Home />} />
        <Route path='/conversation' element = {<Conversation />} />
        <Route path="*" element= {<NotExist />} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
