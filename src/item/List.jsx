import React from 'react';
import { connect } from 'react-redux';

const  url = "https://yukiabineko.sakura.ne.jp/items/";
const tdcheck ={
  width:"10vh"
}

const  List =(props)=>{
  return(
    <div className="list-main">
      <div className="text-center">
      
        <p　className="text-primary">問い合わせ商品がありましたら、チェック欄にチェックいれ送信ボタン押してください。</p>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className="text-center bg-dark text-light w-25">イメージ</th>
              <th className="text-center bg-dark text-light" colSpan="2">商品詳細</th>
              <th className="text-left bg-dark text-light">問合せ</th>
            </tr>
          </thead> 
          <tbody>
            {props.items.map((value, i)=>(
              <tr>
                <td><img src={url + value.path} width="60" height="60" /></td>
                <td className="text-left align-middle">
                  <p className="font-weight-bold">{"商品名:  " + value.name}</p>
                  <p className="font-weight-bold">価格:<span className="text-danger">{value.price}</span>円</p>
                </td>
                <td className="border-left-0 align-middle">
                  <button className="btn btn-primary btn-block">説明</button>
                </td>
                <td className="align-middle" style={tdcheck}>
                  <input id={"box" +i} type="checkbox" name={"check" + i} /><br/>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default connect((state=>state))(List);