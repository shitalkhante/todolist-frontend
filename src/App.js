import './App.css';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Home } from './components/Home/home';
import {Routes , Route, BrowserRouter} from "react-router-dom";
// import { useState } from 'react';

function App() {
  // const [state,setState] = useState([]);
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/home' element={<Home />}></Route>
      </Routes>
      </BrowserRouter>
      
      {/* <Login />
      <Register />
      <Home /> */}
    </div>
  );
}

export default App;
