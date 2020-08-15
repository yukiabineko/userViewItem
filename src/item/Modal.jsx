import React, { useState } from 'react';
import { connect } from 'react-redux';
import './Item.css';
import axios from 'axios';
import { orderingChange } from '../redux/store';
import { todayView } from '../getDay';

const  Modal =(props)=>{
  let data = props.thisitem;
  const day = todayView();
  const[state, setState] = useState({
    id: data.length ===0? '' : data[0].id,
    name: data.length ===0? '' : data[0].name,
    price: data.length ===0? '' : data[0].price,
    number: data.length ===0? 0 : data[0].number,
    shop: '',
    memo: '',
    day: day
  })
  /*モーダル閉じる*/
  
  const closeModal =()=>{
    let layer = document.getElementById('layer');
    let modal = document.getElementById('Qmodal');
    layer.style.display ="none";
    modal.style.transform = "translateY(-150%)"
  }
  /*送信ボタン押し下サーバー送信*/

  const doSubmit =(e)=>{
    e.preventDefault();
    let info;
    let data = new URLSearchParams();

    data.append('day', state.day);
    data.append('name', state.name);
    data.append('shop', state.shop);
    data.append('num',state.number);
    data.append('memo', state.memo);
    data.append('item_id',state.id);
  
    axios.post('https://yukiabineko.sakura.ne.jp/items/userinsertPost.php',data).then((response)=>{
       info =response.data;
    }).catch((error)=>{
      console.log(error);
    });

    /* redux store変更*/
    let action = orderingChange(props.NO, state.number);
    props.dispatch(action);
    
    setState({
      id: props.thisitem[0].id,
      name: props.thisitem[0].name,
      price: '',
      number: '',
      shop: '',
      memo: '',
      day: state.day
    })
    closeModal();
    document.getElementById('select').options[0].selected = true;   /*セレクト初期*/
    document.getElementById('modal-form').scrollTo(0,0);            /*スクロールバー初期*/
  }


  /*パラメーター変更*/

  const doChange =(e)=>{
   switch (e.target.name) {
     case 'number':
       setState({
         id: state.id,
         name: state.name,
         price: state.price,
         number: e.target.value,
         shop: state.shop,
         memo: state.memo,
         day: state.day
       })
       break;
    case 'shop':
        setState({
          id: state.id,
          name: state.name,
          price: state.price,
          number: state.number,
          shop: e.target.value,
          memo: state.memo,
          day: state.day
        })
        break;
    case 'memo':
        setState({
          id: state.id,
          name: state.name,
          price: state.price,
          number: state.number,
          shop: state.shop,
          memo: e.target.value,
          day: state.day
        })
        break;
    default:
      break;
   }
  }
 
  return(
   <div>
      <div className="text-right mb-3">
        <button onClick={closeModal}>x</button>
      </div> 
        <div className="text-center"><h2 className="mb-4 font-weight-bold border-bottom">注文商品</h2></div>
      <div className="text-center border pl-5 pr-5 bg-light modal-form" id="modal-form">
       
        <form onSubmit={doSubmit}>
          <div className="form-group">
            <label className="font-weight-bold">発注商品名:</label>
            <span className="font-weight-bold">{data[0].name}</span>
            <input type="hidden" name="name" value={data[0].id} />
            <input type="hidden" name="name" value={data[0].name} />
            <input type="hidden" name="name" value={data[0].day} />
          </div>

          <div className="form-group text-left">
            <label className="font-weight-bold">店舗名</label>
            <select id="select" name="shop" className="form-control" onChange={doChange}>
              <option disabled="disabled">--店舗選択--</option>
              <option value="甲府店">甲府店</option>
              <option value="昭和店">昭和店</option>
              <option value="竜王店">竜王店</option>
              <option value="石和店">石和店</option>
              <option value="塩山店">塩山店</option>
            </select>
          </div>

          <div className="form-group text-left">
            <label className="font-weight-bold">発注数</label>
            <input 
              type="number" 
              name="number" 
              className="form-control"
               min ="1" 
               step="1" 
               value={state.number} 
               onChange={doChange} 
               required />
          </div>
          <div className="form-group text-left">
            <label className="font-weight-bold">質問</label>
            <textarea name="memo" className="form-control" rows="4" onChange={doChange} value={state.memo}></textarea>
          </div>
          <div className="text-center pb-3">
            <input type="submit" value="送信" className="btn btn-primary" />
          </div>

        </form>
      </div>
   </div> 
  
  )
}
export default connect((state=>state))(Modal);