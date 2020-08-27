import React from 'react';
import { connect } from 'react-redux';
import { useState } from 'react';
import './App.css';
import { orderSend } from './redux/store';
import axios from 'axios';
import {  todayView } from './getDay';
import { withRouter } from 'react-router';


const  Login =(props)=>{
  //ログイン時ページアクセス禁止

  const redirectFunc=()=>{
    if(props.userId >0){
      props.history.push('/');
    }
  }
  /*cookieリセット*/
  const cookieReset =()=>{
    let cookieKey = document.cookie.split('=')[0];
    let today = todayView();
   if(cookieKey != today){
    document.cookie = "" + cookieKey +"=;max-age=0";
   }
  }
  /*ステートセット*/

  useState(redirectFunc);
  useState(cookieReset);
  const[state, setState] = useState({
    email: '',
    password: ''
  });

  /*項目変更*/

  const doChange=(event)=>{
   switch (event.target.name) {

     case 'email':
       setState({
         email: event.target.value,
         password: state.password
       })
       break;
    case 'password':
        setState({
          email: state.email,
          password: event.target.value
        })
    break;

     default:
       break;
   }
  }
  /*ログイン認証、COOKIEセット*/

  const doSubmit =(event)=>{
    
    event.preventDefault();
    let data = new URLSearchParams();

    data.append('email', state.email);
    data.append('password', state.password);
   
  
    axios.post("https://yukiabineko.sakura.ne.jp/items/userOrder.php", data).then((response)=>{
         let today = todayView();
        if(response.data){
            let action = orderSend(response.data, state.password, state.email);
            props.dispatch(action);
            document.cookie = ""+today+"="+JSON.stringify(response.data);
            props.history.push('/');
        }
        else{
          let flash = document.getElementById('flash');
          flash.style.transform ="translateX(0%)";

        }
      }).catch((error)=>{
        alert(error);
        let flash = document.getElementById('flash');
        flash.style.transform = "translateX(0%)";
      });
      /*let data2 = new URLSearchParams();
      data2.append('id', id);
      axios.post("https://yukiabineko.sakura.ne.jp/items/userOrdersJson.php", data2).then((response)=>{
        
        if(response.data){
          let action = orderSend(response.data);
          props.dispatch(action);
         
        }
        }).catch((error)=>{
          alert(error);
        })*/
    
    setState({
      email: '',
      password: ''
    });
   
  }
  return(
    <div>
      <div className="row mt-3" id="flash">
        <div className="col-md-8 offset-2">
          <div className="alert alert-danger">認証失敗しました。</div>
        </div>
      </div>
      
      <div className="text-center font-weight-bold mt-5 mb-3">
        <h1>ログイン</h1>
      </div>
      <div className="row">
        <div className="col-md-6 offset-3 bg-light p-5 shodow">
          <form onSubmit={doSubmit}>
            <div className="form-group">
              <label className="font-weight-bold mb-2">メールアドレス</label>
              <input type="email" name="email" className="form-control"  onChange={doChange} value={state.email} />
            </div>

            <div className="form-group">
              <label className="font-weight-bold mb-2">パスワード</label>
              <input type="password" name="password" className="form-control" onChange={doChange} value={state.password} />
            </div>
            <div className="text-center mt-5">
              <input type="submit" value="ログインする" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default  withRouter(connect((state=>state))(Login))