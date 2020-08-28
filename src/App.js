import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import ItemMain from './item/Main';
import QuestionMain from './orders/Main';
import Login from './login';
import { connect } from 'react-redux';
import {  resetcookie, addItemArray} from './redux/store';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck, faClipboardCheck, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import {  todayView } from './getDay';

class App extends Component{
  constructor(props){
    super(props);
    
    
  }
  logout =() =>{
    let today = todayView();
   /*ログアウトによりURLサイド読み込みreduxセット*/
   axios("https://yukiabineko.sakura.ne.jp/items/viewJson.php").then((response)=>{
      if(response.data){
        let action = addItemArray(response.data);
        this.props.dispatch(action);
      }
      }).catch((error)=>{
        
      });

   document.cookie = "" + today + "=;max-age=0";
    let action = resetcookie();
    this.props.dispatch(action);
  }
  render(){
    return(
      <div>
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-dark mb-5">
          <a className="navbar-brand text-white font-weight-bold mr-5" href="#">
            <span className="text-light"><FontAwesomeIcon icon={faTruck} /></span>
             入荷商品管理
          </a>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item mr-3">
              <Link to='/' className="font-weight-bold text-light">
               <span className="text-light mr-1"><FontAwesomeIcon icon={faClipboardCheck} /></span>
                商品チェック
              </Link>
            </li>
            <li className="nav-item text-light">
              <Link to='/orders' className="text-light font-weight-bold">
              <span className="text-light mr-1"><FontAwesomeIcon icon={faShoppingCart} /></span>
                発注状況
              </Link>
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
