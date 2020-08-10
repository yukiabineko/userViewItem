import React from 'react';
import List from './List';
import { connect } from 'react-redux';

const  Main =()=>{
  return(
    <div>
      <div className="text-center font-weight-bold mb-4 mt-3"><h1>入荷商品確認</h1></div>
      <div className="row">
        <div className="col-md-6 border-top">
         
        </div>
        <div className="col-md-6 border-top border-left">
         <List />
        </div>
      </div>
    </div>
  )
}
export default connect()(Main);