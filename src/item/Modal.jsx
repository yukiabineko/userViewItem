import React, { useState } from 'react';
import { connect } from 'react-redux';
import './Item.css';
import axios from 'axios';
import { orderSend } from '../redux/store';
import { todayView } from '../getDay';
import { withRouter } from 'react-router';
import { storageData } from '../redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';


const  Modal =(props)=>{
  let data = props.thisitem;
  
  const[state, setState] = useState({
   /* id: data.length ===0? '' : data[0].id,
    name: data.length ===0? '' : data[0].name,
    price: data.length ===0? '' : data[0].price,
    number: data.length ===0? 0 : data[0].number,
    shop: '',
    memo: data.length ===0? '' : data[0].memo,
    day: day,*/
    data: props.items
  })
  /*モーダル閉じる*/
  
  const closeModal =()=>{
    let layer = document.getElementById('layer');
    let modal = document.getElementById('Qmodal');
    layer.style.display ="none";
    modal.style.transform = "translateY(-150%)"
    document.getElementById('modal-form').scrollTo(0,0);
   /* modal.addEventListener('transitionend',()=>{
      window.location.reload();
    })*/
    
    
  }
  /*送信ボタン押し下サーバー送信*/

  const doSubmit =(e)=>{
    e.preventDefault();
    let data = new URLSearchParams();

    data.append('user_id', props.userId);
    data.append('day', state.data[props.NO].day);
    data.append('item_name', state.data[props.NO].name);
    data.append('num',state.data[props.NO].ordering);
    data.append('memo', state.data[props.NO].memo);
    data.append('item_id',state.data[props.NO].id);
    data.append('item_price',state.data[props.NO].price);



  
    axios.post('https://yukiabineko.sakura.ne.jp/items/userUpdatepost.php',data).then((response)=>{
       /* redux store変更*/
      let today = todayView();
      let datas = JSON.parse(localStorage.getItem('shopData'))[today];
      let orders = datas[1];

      //ストレージデータ差し替え
      orders.splice(0);
      orders.push(response.data);

      closeModal();
      let action = orderSend(response.data);
      props.dispatch(action);
    
      if(datas){
        let day = {};
        day[todayView()] = response.data;     /*ローカルストレージ修正*/
        localStorage.setItem('shopData', JSON.stringify(day));

        let action = storageData(datas['user'],datas['order']);
        props.dispatch(action);
      }
     
    }).catch((error)=>{
      console.log(error);
    });
  

    /* redux store変更
    let action = orderingChange(props.NO, state.number);
    props.dispatch(action);*/
    

    /*document.getElementById('select').options[0].selected = true;   /*セレクト初期*/
   /* document.getElementById('modal-form').scrollTo(0,0);            /*スクロールバー初期*/
  }
  

  /*パラメーター変更*/

  const doChange =(e)=>{
   let newData = state.data.slice();
   
   switch (e.target.name) {
     case 'number':
       newData[props.NO]['ordering'] = e.target.value;
       setState({
         data: newData
       })
       break;
    case 'shop':
      newData[props.NO]['shop'] = e.target.value;
      setState({
        data: newData
      })
        break;
    case 'memo':
      newData[props.NO]['memo'] = e.target.value;
      setState({
        data: newData
      })
        break;
    default:
      break;
   }
  }
 
  return(
   <div>
      <div className="text-right mb-3">
        <button class="modal-close-circle bg-white" onClick={closeModal}>
          <FontAwesomeIcon icon={faTimesCircle}/>
        </button>
      </div> 
      {data[0].number >0? 
         <div className="text-center text-primary"><h2 className="mb-4 font-weight-bold border-bottom">注文編集</h2></div>
        : 
        <div className="text-center"><h2 className="mb-4 font-weight-bold border-bottom">注文商品</h2></div>
      }
     
      <div className="text-center border pl-5 pr-5 bg-light modal-form" id="modal-form">
       
        <form onSubmit={doSubmit}>
          <div className="form-group mt-3 mb-3">
            <label className="font-weight-bold">発注商品名:</label>
            <span className="font-weight-bold">{state.data[props.NO].name}</span>
            <input type="hidden" name="name" value={state.data[props.NO].id} />
            <input type="hidden" name="name" value={state.data[props.NO].name} />
            <input type="hidden" name="name" value={state.data[props.NO].day} />
          </div>

          <div className="form-group">
            <label className="font-weight-bold">店舗名:</label>
            <label className="font-weight-bold">{props.shop}</label>
            <input type="hidden" name="shop" value={props.shop} />
           {/* <select id="select" name="shop" className="form-control" onChange={doChange}>
              <option disabled="disabled">--店舗選択--</option>
              <option value="甲府店">甲府店</option>
              <option value="昭和店">昭和店</option>
              <option value="竜王店">竜王店</option>
              <option value="石和店">石和店</option>
              <option value="塩山店">塩山店</option>
            </select>
          */}
          </div>

          <div className="form-group text-left">
            <label className="font-weight-bold">発注数</label>
            <input 
              type="number" 
              name="number" 
              className="form-control"
               min ="1" 
               step="1" 
               value={state.data[props.NO].ordering} 
               onChange={doChange} 
               required />
          </div>
          <div className="form-group text-left">
            <label className="font-weight-bold">質問</label>
            <textarea name="memo" className="form-control" rows="4" onChange={doChange} value={state.data[props.NO].memo}></textarea>
          </div>
          <div className="text-center pb-3">
            <input type="submit" value="送信" className="btn btn-primary" />
          </div>

        </form>
      </div>
   </div> 
  
  )
}
export default withRouter(connect((state=>state))(Modal))