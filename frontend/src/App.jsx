import './App.css';
import Home from './pages/Home/Home';
import Conversation from './pages/Conversation/Conversation';
import NotExist from './pages/NotExist/NotExist';
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
