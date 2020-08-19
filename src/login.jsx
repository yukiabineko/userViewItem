import React from 'react';
import { connect } from 'react-redux';
import { useState } from 'react';
import './App.css';
import { loginSetId, orderSend } from './redux/store';
import axios from 'axios';
import { withRouter } from 'react-router';


const  Login =(props)=>{
  const[state, setState] = useState({
    email: '',
    password: ''
  });
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
  const doSubmit =(event)=>{
  
    event.preventDefault();
    let data = new URLSearchParams();

    data.append('email', state.email);
    data.append('password', state.password);
   
  
    axios.post("https://yukiabineko.sakura.ne.jp/items/userOrder.php", data).then((response)=>{
  
      if(response.data){
        let action = orderSend(response.data);
        props.dispatch(action);
        document.cookie ="user="+JSON.stringify(response.data);
       
      }
      }).catch((error)=>{
        alert(error);
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
export default connect((state=>state))(Login)