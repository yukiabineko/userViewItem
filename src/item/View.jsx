import React, { useState } from 'react';
import { connect } from 'react-redux';
import './Item.css';

const  url = "http://yukiabineko.sakura.ne.jp/items";


const  View =(props)=>{
  const[state,setState] = useState({
    itemNo: 0
  })
  const itemData = props.items[state.itemNo];
 
  return(
    <div className="bg-light main-view">
      <div className="text-center">
        <p className="text-center font-weight-bold">
          {itemData.name}&emsp;
          <span className="text-danger">
            {itemData.price}
          </span>
          円
        </p>
        <img src={url + itemData.path}  />
      </div>
      <p className="font-weight-bold">商品説明</p>
      <div className="border pb-5 ml-2 bg-white">

      </div>
     </div>
  )
}
export default connect((state=>state))(View);