import React, { useState } from 'react';
import List from './List';
import View from './View';
import { connect } from 'react-redux';
import axios from 'axios';
import { storageData, addItemArray } from '../redux/store';
import Modal from './Modal';
import {  todayView } from '../getDay';
import { orderSend, updateSend } from '../redux/store';
import './Item.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { circularLoading }  from '@yami-beta/react-circular-loading';

//プログレスステータス
const CircularLoading = circularLoading({
  num: 6,
  distance: 1,
  dotSize: 0.5,

});

const  Main =(props)=>{

  
    /*初期ステートのセット */
    const[state, setState] = useState({
      listNo: 0,
      orderData: [],
      orderNO: 0,
      progress: true
    })
    /*当日外データがある場合削除*/
    const setUpCheckTodayData =()=>{
      const today = todayView();
      const json = localStorage.getItem('shopData');
      if(json){
        const storage = JSON.parse(json);
        const dataKey = Object.keys(storage)[0];
        if( today !=dataKey){
          localStorage.removeItem('shopData');
        }
      }
    }
   /*ページ初期データ設定*/
    const setupItem =()=>{
      
      let json = localStorage.getItem('shopData');
      let storage = JSON.parse(json);
      if(props.storageUse ===false || !json){
        
        axios("https://yukiabineko.sakura.ne.jp/items/viewJson.php").then((response)=>{
        if(response.data){
         
          let action = addItemArray(response.data);
          props.dispatch(action);
          if(response !=null){
            setState({
              listNo: state.listNo,
              orderData: state.orderData,
              orderNO: state.orderNO,
              progress: false
            })
          }
          }
        }).catch((error)=>{
          
        });
      }
      /*ログインされている場合でネット途切れてるかで分岐*/
      else if(props.storageUse){
      
        if(storage){
          let today = todayView();
          let datas = storage[today];
          let id =  datas[0].id;
          let data = new URLSearchParams();
          data.append('id', id);
          axios.post("https://yukiabineko.sakura.ne.jp/items/userOrdersJson.php", data).then((response)=>{
          /*ネット途切れてない*/  
          if(response.data){
              let day = {};
              day[todayView()] = response.data;
              localStorage.setItem('shopData', JSON.stringify(day));
              
              let action = updateSend(response.data);
              props.dispatch(action);

          }
          /*ネット途切れた*/
         else{
            let action = storageData(datas[0],datas[1]);
            props.dispatch(action);
        }
      }).catch((error)=>{
      });
      setState({
        listNo: state.listNo,
        orderData: state.orderData,
        orderNO: state.orderNO,
        progress: false
      })
     }
    }
  }
    /*初期関数ステートセット */
    useState(setUpCheckTodayData);
    useState(setupItem);
    
    /*説明エリア切替関数*/

    const listNoChange =(param)=>{
      setState({
        listNo: param,
        orderData: state.orderData,
        orderNO: state.orderNO,
        progress: state.progress
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
         orderNO: i,
         progress: state.progress
       })
    }
    /*更新ボタン押し下*/
    const updateItem = ()=>{
      /*alert(props.userId);*/
      //プログレススタート
        setState({
          listNo: state.listNo,
          orderData: state.orderData,
          orderNO: state.orderNO,
          progress: true
        })
    
      if(props.userId === null){  /*未ログイン時処理 */
        
        axios("https://yukiabineko.sakura.ne.jp/items/viewJson.php").then((response)=>{
        if(response.data){
          let action = addItemArray(response.data);
          props.dispatch(action);
          if(response !=null){
            setState({
              listNo: state.listNo,
              orderData: state.orderData,
              orderNO: state.orderNO,
              progress: false
            })
          }
            
        }
        }).catch((error)=>{
          setState({
            listNo: state.listNo,
            orderData: state.orderData,
            orderNO: state.orderNO,
            progress: false
          })
        });
       
      }
      //******************************************************** */
      else{    
        /*ログイン時処理*/

        let today = todayView();
        let data = new URLSearchParams();
        let id = props.userId;

        data.append('id', id);
          axios.post("https://yukiabineko.sakura.ne.jp/items/userOrdersJson.php", data).then((response)=>{
          /*ネット途切れてない*/  
          if(response.data){
              let day = {};
              day[todayView()] = response.data;
              localStorage.setItem('shopData', JSON.stringify(day));
              
              let action = updateSend(response.data);
              props.dispatch(action);
              setState({
                listNo: state.listNo,
                orderData: state.orderData,
                orderNO: state.orderNO,
                progress: false
              })

          }
          /*ネット途切れた*/
         else{
          setState({
            listNo: state.listNo,
            orderData: state.orderData,
            orderNO: state.orderNO,
            progress: false
          })
        }
      }).catch((error)=>{
      });

        /*data.append('email', props.email);
        data.append('password', props.pass);
        data.append('day',today);

         axios.post("https://yukiabineko.sakura.ne.jp/items/userOrder.php", data).then((response)=>{
        
        if(response.data){
            let action = orderSend(response.data,props.pass, props.email);
            props.dispatch(action);
            let day = {};
            day[todayView()] = response.data;
            localStorage.setItem('shopData', JSON.stringify(day));
            if(response !=null){
              setState({
                listNo: state.listNo,
                orderData: state.orderData,
                orderNO: state.orderNO,
                progress: false
              })
            }
        }
       
      }).catch((error)=>{
        setState({
          listNo: state.listNo,
          orderData: state.orderData,
          orderNO: state.orderNO,
          progress: false
        })
      });*/
     
      }
      
    }

  return(
    <div>
      {props.userId === null? 
          <div className="row">
            <div className="col-md-10 offset-1">
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
        <div className="col-md-6 border-top">
        <div className="text-center"><h2 className="font-weight-bold mt-3">商品詳細</h2></div>
         <View listNO={state.listNo} />
        </div>
        <div className="col-md-6 border-top border-left">
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
      {/* プログレス */}
     
        {state.progress ===true? 
          <div id="progress">
            <p　className="mt-3 font-weight-bold">しばらくお待ちください。</p>
            <div className="text-center">
            <CircularLoading />
            </div>
           
          </div>
        : 
        ''
        }
      <div id="layer"></div>
    </div>
  )
}
export default connect((state=>state))(Main);