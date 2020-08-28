import React, { useState } from 'react';
import List from './List';
import View from './View';
import { connect } from 'react-redux';
import axios from 'axios';
import { cookieData, addItemArray } from '../redux/store';
import Modal from './Modal';
import {  todayView } from '../getDay';
import {cookieParse} from '../cookieData';
import { orderSend } from '../redux/store';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

const  Main =(props)=>{
    

    const setupItem =()=>{
      if(props.cookieUse ===false || !document.cookie){
        axios("https://yukiabineko.sakura.ne.jp/items/viewJson.php").then((response)=>{
        if(response.data){
          let action = addItemArray(response.data);
          props.dispatch(action);
          }
        }).catch((error)=>{
          
        });
      }
      else if(props.cookieUse){
        let datas = cookieParse();
    
        if(datas){
          let action = cookieData(datas['user'],datas['order']);
          props.dispatch(action);
        }
     }

    }
  
    /*初期ステートのセット */

    const[state, setState] = useState({
      listNo: 0,
      orderData: [],
      orderNO: 0
    })
    useState(setupItem);
    
    /*説明エリア切替関数*/

    const listNoChange =(param)=>{
      setState({
        listNo: param,
        orderData: state.orderData,
        orderNO: state.orderNO
      })
    
    }
    /*アイテム切り替え*/

    const orderNumber = (i)=>{
       let item = props.items[i];
       let stateData = state.orderData.slice();
       stateData.splice(0);
       stateData.push({id: item.id, name: item.name, price: item.price, memo: item.memo, number: item.ordering});
       setState({
         listNo: state.listNo,
         orderData: stateData,
         orderNO: i
       })
    }
    /*更新ボタン押し下*/
    const updateItem = ()=>{
       /*alert(JSON.stringify(props.items));*/
      if(props.userId === null){  /*未ログイン時処理 */
        
        axios("https://yukiabineko.sakura.ne.jp/items/viewJson.php").then((response)=>{
        if(response.data){
          let action = addItemArray(response.data);
          props.dispatch(action);
          }
        }).catch((error)=>{
          
        });
      }
      //******************************************************** */
      else{                       /*ログイン時処理*/
        let today = todayView();
        let data = new URLSearchParams();

        data.append('email', props.email);
        data.append('password', props.pass);
        data.append('day',today);

         axios.post("https://yukiabineko.sakura.ne.jp/items/userOrder.php", data).then((response)=>{
        
        if(response.data){
            let action = orderSend(response.data,props.pass, props.email);
            props.dispatch(action);
            document.cookie = ""+today+"="+JSON.stringify(response.data);
            
        }
       
      }).catch((error)=>{
        
      });
     
      }
    }

  return(
    <div>
      {props.userId === null? 
          <div className="row">
            <div className="col-md-8 offset-2">
             <div className="alert alert-danger mt-3 font-weight-bold">入力するにはログインしてください。</div>
            </div>
          </div>
          : 
          ''
        }
      <div className="text-center font-weight-bold mb-4 mt-3"><h1>入荷商品確認</h1></div>
      <button className="btn btn-primary btn-lg m-3 font-weight-bold" onClick={updateItem}>
      <span className="text-light mr-1"><FontAwesomeIcon icon={faSyncAlt} /></span>
        更新
      </button>
      <div className="row">
        <div className="col-md-7 border-top">
        <div className="text-center"><h2 className="font-weight-bold mt-3">商品詳細</h2></div>
         <View listNO={state.listNo} />
        </div>
        <div className="col-md-5 border-top border-left">
        <div className="text-center"><h2 className="mb-4 mt-3 font-weight-bold">入荷商品一覧</h2></div>
         <List parentSendNo={listNoChange} parentOrder={(i)=>orderNumber(i)} />
        </div>
      </div>
      {/* 問合せモーダル */}
      <div id="Qmodal">
        {state.orderData.length >0? 
         <Modal thisitem={state.orderData} NO={state.orderNO} />
        : 
        ''}
       
      </div>
      <div id="layer"></div>
    </div>
  )
}
export default connect((state=>state))(Main);