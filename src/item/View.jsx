import React, { useState } from 'react';
import { connect } from 'react-redux';
import './Item.css';

const  url = "https://yukiabineko.sakura.ne.jp/items/";


const  View =(props)=>{
 
 
  const itemData = props.items.length >0 ? props.items[props.listNO] : [];
  return(
    <div className="bg-light main-view pb-5">
      {props.items.length === 0? 
       <div className="bg-secondary p-5 text-white font-weight mt-3">データがありません。</div>
       : 
      <div>
         <div className="text-center">
          <p className="text-center font-weight-bold">
            {itemData.name}&emsp;
            <span className="text-danger">
              {itemData.price}
            </span>
            円
          </p>
          <img src={url + itemData.path} className="w-50"  />
          </div>
            <p className="font-weight-bold">商品説明</p>
          <div className="border pb-5 ml-2 bg-white">
            {itemData.memo}
          </div>
      </div>
      }
     </div>
  )
}
export default connect((state=>state))(View);