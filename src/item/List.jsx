import React from 'react';
import { connect } from 'react-redux';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faShoppingCart, faPenAlt } from '@fortawesome/free-solid-svg-icons';

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
          {/*--パソコン用--*/}
          <tbody className="pc-item-list">
            {props.items.map((value, i)=>(
              <tr key={i+"item"}>
                <td className="align-middle"><img src={url + value.path} width="60" height="60" /></td>
                
                <td className="align-middle">
                  <p className="font-weight-bold">{"商品名:  " + value.name}</p>
                  <p className="font-weight-bold">価格:<span className="text-danger">{value.price}</span>円</p>
                </td>
                <td className="border-left-0 align-middle">
                      <button className="btn btn-primary btn-block font-weight-bold" onClick={()=>parentSendNo(i)}>
                        <span className="mr-1"><FontAwesomeIcon icon={faInfoCircle} /></span>
                        説明
                      </button><br/>
                      {props.userId === null?
                         '' 
                         : 
                         /*編集か新規オーダーか*/
                         value.ordering >0? 
                         value.confirm === "1"?     /*承認された商品か？*/
                          　<label className="text-primary font-weight-bold">承認済み</label>
                           : 
                           <button className="btn btn-success btn-block font-weght-bold" onClick={()=>modalOpen(i)}>
                            <span className="text-light mr-1"><FontAwesomeIcon icon={faPenAlt} /></span>
                           修正
                         </button>  
                        
                          : 
                          <button className="btn btn-primary btn-block font-weight-bold" onClick={()=>modalOpen(i)}>
                             <span className="text-light mr-1"><FontAwesomeIcon icon={faShoppingCart} /></span>
                            発注
                          </button>  
                      }
                </td>
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
          {/*/パソコン用終了*/}

          {/* スマホ用*/}
          <tbody className="phone-item-list">
          {props.items.map((value, i)=>(
              <tr key={i+"item"}>
                <td className="align-middle">
                  <img src={url + value.path} width="60" height="60" />
                </td>
                  
                
                <td className="align-middle">
                  <p className="font-weight-bold">商品名</p>
                  <label className="text-primary font-weight-bold h5">{value.name}</label><p></p>
                      <button className="btn btn-primary btn-sm font-weight-bold" onClick={()=>parentSendNo(i)}>
                        <span className="mr-1"><FontAwesomeIcon icon={faInfoCircle} /></span>
                        説明
                      </button>
                </td>
                <td>
                  <p className="font-weight-bold">価格</p>
                  <label className="text-danger font-weight-bold h5">{value.price}</label><p></p>
                  {props.userId === null?
                         '' 
                         : 
                         /*編集か新規オーダーか*/
                         value.ordering >0? 
                         value.confirm === "1"?     /*承認された商品か？*/
                          　<label className="text-primary font-weight-bold">承認済み</label>
                           : 
                           <button className="btn btn-success btn-sm font-weght-bold" onClick={()=>modalOpen(i)}>
                            <span className="text-light mr-1"><FontAwesomeIcon icon={faPenAlt} /></span>
                             修正
                           </button>  
                        
                          : 
                          <button className="btn btn-primary btn-block font-weight-bold" onClick={()=>modalOpen(i)}>
                             <span className="text-light mr-1"><FontAwesomeIcon icon={faShoppingCart} /></span>
                            発注
                          </button>  
                      }
                </td>
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
           {/* /スマホ用*/}

        </table>
        </div>
        }
       
      </div>
    </div>
  )
}
export default connect((state=>state))(List);