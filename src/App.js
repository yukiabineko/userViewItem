import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

const App = ()=>{
  return(
    <div>
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <a className="navbar-brand text-white font-weight-bold" href="#">商品確認</a>
        </nav>
      </BrowserRouter>
    </div>
  )
}
export default App;
