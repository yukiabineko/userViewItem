import React from 'react';
import { connect } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';



const nameheader={width:'20%'}
const td ={width: '100%'}
const itemName ={width:'40%'}
const price ={width:'15%'}
const total ={width:'20%'}
const confirm ={width:'20%'}

const  Main =()=>{
  
  /*ステートデータセット*/
  const[state, setState] = useState({
    data: []
  })
  const getOrderJson =()=>{
    let newData = state.data.slice();
    newData.splice(0);
    axios('https://yukiabineko.sakura.ne.jp/items/orderlist.php').then((response)=>{
      setState({
        data: response.data
      })
    }).catch((err)=>{
      console.log(err)
    });
  }
  useState(getOrderJson);
  /*各店舗合計発注金額*/

  const shopTotal =(value)=>{
    let total = 0;
    let objs = value[Object.keys(value)];
    for(let i=0; i<objs.length; i++){
      total += ( Number(objs[i].price) * Number(objs[i].num));
    }
    return total;
    
  }

  return(
    <div>
     <div className="text-center mt-4 mb-5 font-weight-bold"><h1>発注状況確認</h1></div>
     <div className="row">
       <div className="col-md-10 offset-1">
        {/*テーブル表示*/}
        <table className="table table-bordered">
         <tbody>
           {state.data.map((value,i)=>(
            
             <tr>
               <th className="bg-dark text-center text-white align-middle" style={nameheader}>{Object.keys(value)[0]}</th>
               <td>
                  <table className="table W-100 font-weight-bold">
                    <tr>
                      <th className="bg-light font-weight-bold align-middle" style={itemName}>商品名</th>
                      <th className="bg-light font-weight-bold align-middle" >価格</th>
                      <th className="bg-light font-weight-bold align-middle" >発注数</th>
                      <th className="bg-light font-weight-bold align-middle text-center" style={total}>合計金額</th>
                      <th className="bg-light font-weight-bold align-middle" style={confirm} >認証</th>
                    </tr>
                      {value[Object.keys(value)[0]].map((data)=>(
                      <tr> 
                        <td>{data.name}</td>
                        <td className="text-right text-danger align-middle">{data.price}</td>
                        <td className="text-right text-primary align-middle">{data.num}</td>
                        <td className="text-right text-danger align-middle">{Number(data.price) * Number(data.num)}</td>
                        <td className="text-center align-middle">
                          {data.num >0?
                            data.confirm === '0'? 
                              <label className="bg-primary text-white p-2">申請中</label>
                               : 
                              <label className="bg-danger text-white p-2">承認済み</label>
                             : 
                            ''
                          }
                        </td>
                      </tr>
                      ))}
                  </table>
                  <div className="font-weight-bold">合計発注金額:
                    <span className="text-danger">{shopTotal(value)}</span>円
                  </div>
               </td>
             
               </tr>
           ))}
         </tbody>
        </table>
          {/*/テーブル表示*/}
       </div>
     </div>
    </div>
  )
}
export default connect(state=>state)(Main);