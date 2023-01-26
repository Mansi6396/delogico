import logo from './logo.svg';
import './App.css';
import Login from './Components/Login'
import Home from './Components/Home'

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Details from './Components/Details';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/Details/:id' element={<Details/>}/>

      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
