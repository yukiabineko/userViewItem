import React from 'react';
import { connect } from 'react-redux';
import { useState } from 'react';

const  url = "https://yukiabineko.sakura.ne.jp/items/";


const  List =(props)=>{

  const[state, setState] = useState({
    position: props.userId=== null? 'center' : 'left'
  });
  const tdcheck ={
    width:"10vh",
    textAlign: state.position
  }
 
  const parentSendNo =(num)=>{
    props.parentSendNo(num);
  }
  const modalOpen =(num)=>{
    let layer = document.getElementById('layer');
    let modal = document.getElementById('Qmodal');
    layer.style.display ="block";
    modal.style.transform = "translateY(0%)"
    props.parentOrder(num);
  }
  return(
    <div className="list-main">
      <div className="text-center">
        {props.items.length ===0 ? 
         <div className="bg-secondary p-5 text-white font-weight-bold">データがありません。</div>

         : 

        <div>
        {props.userId ===null ?
          '' 
          : 
          <p　className="text-primary">問い合わせ商品がありましたら、チェック欄にチェックいれ送信ボタン押してください。</p>
          }
       
        <table className="table border">
          <thead>
            <tr>
              <th className="text-center bg-dark text-light border-right" style={tdcheck}>画像</th>
              <th className="text-center bg-dark text-light border-right" colSpan="2">商品詳細</th>

              {props.userId === null? 
                '' 
                : 
                <th className="text-left bg-dark text-light">発注数</th>
               }
               
            </tr>
          </thead> 
          <tbody>
            {props.items.map((value, i)=>(
              <tr key={i+"item"}>
                <td className="align-middle"><img src={url + value.path} width="60" height="60" /></td>
                
                <td className="align-middle">
                  <p className="font-weight-bold">{"商品名:  " + value.name}</p>
                  <p className="font-weight-bold">価格:<span className="text-danger">{value.price}</span>円</p>
                </td>
               
                  {props.userId === null? 
                    <td className="border-none"></td>
                    : 
                    <td className="border-left-0 align-middle">
                      <button className="btn btn-primary btn-block" onClick={()=>parentSendNo(i)}>説明</button><br/>
                      <button className="btn btn-primary btn-block" onClick={()=>modalOpen(i)}>発注</button>
                    </td>
                  }
                  {props.userId === null? 
                     ''
                    : 
                      <td className="text-center align-middle text-danger font-weight-bold" style={tdcheck}>
                      {value.ordering}
                      </td>
                    }
               
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        }
       
      </div>
    </div>
  )
}
export default connect((state=>state))(List);