import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import ItemMain from './item/Main';
import QuestionMain from './question/Main';
import { connect } from 'react-redux';

const App = ()=>{
  return(
    <div>
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <a className="navbar-brand text-white font-weight-bold mr-3" href="#">入荷商品管理</a>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item mr-3">
              <Link to='/' className="text-info font-weight-bold">商品チェック</Link>
            </li>
            <li className="nav-item text-light">
              <Link to='/question' className="text-info font-weight-bold">問い合わせ</Link>
            </li>
          </ul>
        </nav>
        <div>
        <Route exact path='/' component={ItemMain} />
        <Route  path='/question' component={QuestionMain} />
        </div>
       
      </BrowserRouter>
    </div>
  )
}
export default  connect()(App);
