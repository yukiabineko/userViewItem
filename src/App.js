import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import ItemMain from './item/Main';
import QuestionMain from './question/Main';
import Login from './login';
import { connect } from 'react-redux';
import {cookieParse} from './cookieData';
import { cookieData, resetcookie} from './redux/store';

const App = (props)=>{
  let datas = cookieParse();
  if(datas){
    let action = cookieData(datas.id, datas.shop);
    props.dispatch(action);
  }

  const logout =() =>{
    document.cookie = "user=;max-age=0"
    let action = resetcookie();
    props.dispatch(action);
  }
  
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
          <ul className="navbar-nav">　
          {props.userId === null? 
          '' : 
          <li className="nav-item text-white mr-3">
            <p className="mt-2">{props.shop +"店"}</p>
          </li>
          }
         
          <li className="nav-item">
            {props.userId === null?
             <Link to="/login" className="nav-link text-light font-weight-bold">ログイン</Link>
            : 
            <Link to="#" className="nav-link text-light font-weight-bold" onClick={logout}>ログアウト</Link>
            }
           
          </li>
          </ul>
        </nav>
        
        <div>
        <Route exact path='/' component={ItemMain} />
        <Route  path='/question' component={QuestionMain} />
        <Route  path='/login' component={Login} />
        </div>
       
      </BrowserRouter>
    </div>
  )
}
export default  connect((state)=>state)(App);
