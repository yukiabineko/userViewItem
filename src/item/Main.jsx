import React from 'react';
import List from './List';
import View from './View';
import { connect } from 'react-redux';

const  Main =()=>{
  return(
    <div>
      <div className="text-center font-weight-bold mb-4 mt-3"><h1>入荷商品確認</h1></div>
      <div className="row">
        <div className="col-md-7 border-top">
        <div className="text-center"><h2 className="font-weight-bold mt-2">商品詳細</h2></div>
         <View />
        </div>
        <div className="col-md-5 border-top border-left">
         <List />
        </div>
      </div>
    </div>
  )
}
export default connect()(Main);