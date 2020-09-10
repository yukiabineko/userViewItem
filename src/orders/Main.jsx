import React from 'react';
import { connect } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import '../item/Item.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { circularLoading }  from '@yami-beta/react-circular-loading';

//プログレスステータス
const CircularLoading = circularLoading({
  num: 6,
  distance: 1,
  dotSize: 0.5,

});


const nameheader={width:'20%'}
const itemName ={width:'40%'}
const total ={width:'20%'}
const confirm ={width:'20%'}

const  Main =()=>{
  
  /*ステートデータセット*/
  const[state, setState] = useState({
    data: [],
    progress: true
  })
  const getOrderJson =()=>{
    let newData = state.data.slice();
    newData.splice(0);
    axios('https://yukiabineko.sakura.ne.jp/items/orderlist.php').then((response)=>{
      if(response !=null){
        
        setState({
          data: response.data,
          progress: false
        })
      }
    }).catch((err)=>{
      console.log(err);
      setState({
        data: state.data,
        progress: false
      })
    });
  }
  useState(getOrderJson);
  /*各店舗合計発注金額*/

  const shopTotal =(value)=>{
    let total = 0;
    let objs = value[Object.keys(value)];
    for(let i=0; i<objs.length; i++){
      total += ( Number(objs[i].item_price) * Number(objs[i].num));
    }
    return total;
    
  }
  const orderUpdate =()=>{
    setState({
      data: state.data,
      progress: true
    })
    getOrderJson();
  }

  return(
    <div>
     <div className="text-center mt-4 mb-5 font-weight-bold"><h1>発注状況確認</h1></div>
     <div className="row">
       <div className="col-md-10 offset-1">
        <button className="btn btn-primary btn-lg  mb-2 font-weight-bold" onClick={orderUpdate}>
          <span className="text-light mr-1"><FontAwesomeIcon icon={faSyncAlt} /></span>
            更新
        </button>
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
        {/*テーブル表示*/}
        {state.data.length ===0? 
          <div className="p-5 bg-light text-center">データがありません。</div>
         : 
         <table className="table table-bordered">
         <tbody>
           {state.data.map((value,i)=>(
            
             <tr>
               <th className="bg-dark text-center text-white align-middle" style={nameheader}>{Object.keys(value)[0]}</th>
               {value[Object.keys(value)[0]].length === 0 ?  /*各店オーダーがあるかどうか？*/
                  <td>
                    <div className="p-5 bg-light text-center font-weight-bold">まだオーダーがありません。</div>
                  </td>
                 : 
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
                       <td>{data.item_name}</td>
                       <td className="text-right text-danger align-middle">{data.item_price}</td>
                       <td className="text-right text-primary align-middle">{data.num}</td>
                       <td className="text-right text-danger align-middle">{Number(data.item_price) * Number(data.num)}</td>
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
               }
               </tr>
           ))}
         </tbody>
        </table>
        }
       
       </div>
     </div>
    </div>
  )
}
export default connect(state=>state)(Main);