import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import ItemMain from './item/Main';
import QuestionMain from './orders/Main';
import Login from './login';
import { connect } from 'react-redux';
import {  resetcookie, addItemArray} from './redux/store';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck, faClipboardCheck, faShoppingCart, faStore, faDoorOpen, faKey } from "@fortawesome/free-solid-svg-icons";
import {  todayView } from './getDay';

class App extends Component{
  constructor(props){
    super(props);
    
    
  }
  logout =() =>{
    let today = todayView();
   /*ログアウトによりURL再度読み込みreduxセット*/
   axios("https://yukiabineko.sakura.ne.jp/items/viewJson.php").then((response)=>{
      if(response.data){
        let action = addItemArray(response.data);
        this.props.dispatch(action);
      }
      }).catch((error)=>{
        
      });
   //ストレージ削除
    localStorage.removeItem('shopData');
    let action = resetcookie();
    this.props.dispatch(action);
  }
  render(){
    return(
      <div>
      <BrowserRouter>
        <nav className="navbar navbar-expand-md navbar-light fixed-top bg-secondary mb-5">
          <a className="navbar-brand text-white font-weight-bold mr-5" href="#">
            <span className="text-light"><FontAwesomeIcon icon={faTruck} /></span>
             入荷商品管理
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
         </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item mr-3">
              <Link to='/' className="nav-link font-weight-bold text-light">
               <span className="text-light mr-1"><FontAwesomeIcon icon={faClipboardCheck} /></span>
                商品チェック
              </Link>
            </li>
            <li className="nav-item text-light">
              <Link to='/orders' className="nav-link text-light font-weight-bold">
              <span className="text-light mr-1"><FontAwesomeIcon icon={faShoppingCart} /></span>
                発注状況
              </Link>
            </li>
          </ul>
          
          <ul className="navbar-nav">　
        　{this.props.userId === null? 
          '' : 
          <li className="nav-item text-white mr-3">
            <p className="mt-2 font-weight-bold">
              <FontAwesomeIcon icon={faStore}/>
              {this.props.shop}
            </p>
          </li>
          } 
         
          <li className="nav-item">
            {this.props.userId === null?
             <Link to="/login" className="nav-link text-light font-weight-bold">
               <FontAwesomeIcon icon={faKey} />
               ログイン
             </Link>
            : 
            <Link to="#" className="nav-link text-light font-weight-bold mr-1" onClick={this.logout}>
              <FontAwesomeIcon icon={faDoorOpen} />
              ログアウト
            </Link>
            }
           
          </li>
          </ul>
          </div>
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
