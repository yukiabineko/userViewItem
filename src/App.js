import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import ItemMain from './item/Main';
import QuestionMain from './orders/Main';
import Login from './login';
import { connect } from 'react-redux';
import {cookieParse} from './cookieData';
import { cookieData, resetcookie, addItemArray} from './redux/store';
import axios from 'axios';

class App extends Component{
  constructor(props){
    super(props);
    let datas = cookieParse();
    
    if(datas){
      let action = cookieData(datas['user'],datas['order']);
      props.dispatch(action);
    }
    
  }
  logout =() =>{
   /*ログアウトによりURLサイド読み込みreduxセット*/
   axios("https://yukiabineko.sakura.ne.jp/items/viewJson.php").then((response)=>{
      if(response.data){
        let action = addItemArray(response.data);
        this.props.dispatch(action);
      }
      }).catch((error)=>{
        
      });

   /* document.cookie = "user=;max-age=0"*/
    let action = resetcookie();
    this.props.dispatch(action);
  }
  render(){
    return(
      <div>
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-dark mb-5">
          <a className="navbar-brand text-white font-weight-bold mr-3" href="#">入荷商品管理</a>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item mr-3">
              <Link to='/' className="text-info font-weight-bold">商品チェック</Link>
            </li>
            <li className="nav-item text-light">
              <Link to='/orders' className="text-info font-weight-bold">発注状況</Link>
            </li>
          </ul>
          <ul className="navbar-nav">　
        　{this.props.userId === null? 
          '' : 
          <li className="nav-item text-white mr-3">
            <p className="mt-2">{this.props.shop}</p>
          </li>
          } 
         
          <li className="nav-item">
            {this.props.userId === null?
             <Link to="/login" className="nav-link text-light font-weight-bold">ログイン</Link>
            : 
            <Link to="#" className="nav-link text-light font-weight-bold" onClick={this.logout}>ログアウト</Link>
            }
           
          </li>
          </ul>
        </nav>
        <br/><br/>
        <div className="mt-5">
        <Route exact path='/' component={ItemMain} />
        <Route  path='/orders' component={QuestionMain} />
        <Route  path='/login' component={Login} />
        </div>
       
      </BrowserRouter>
    </div>
    )
  }
}

export default  connect((state)=>state)(App);
