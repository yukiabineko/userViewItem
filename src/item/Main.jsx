import React from 'react';
import List from './List';
import View from './View';
import { connect } from 'react-redux';
import axios from 'axios';
import { addItemArray } from '../redux/store';

const  Main =(props)=>{
    
    if(props.items.length ===0  ){
      axios("https://yukiabineko.sakura.ne.jp/items/viewJson.php").then((response)=>{
      if(response.data){
        let action = addItemArray(response.data);
        props.dispatch(action);
        }
      }).catch((error)=>{
        alert(error);
      });
    }

  return(
    <div>
      <div className="text-center font-weight-bold mb-4 mt-3"><h1>入荷商品確認</h1></div>
      <div className="row">
        <div className="col-md-7 border-top">
        <div className="text-center"><h2 className="font-weight-bold mt-3">商品詳細</h2></div>
         <View />
        </div>
        <div className="col-md-5 border-top border-left">
        <div className="text-center"><h2 className="mb-4 mt-3 font-weight-bold">入荷商品一覧</h2></div>
         <List />
        </div>
      </div>
    </div>
  )
}
export default connect((state=>state))(Main);