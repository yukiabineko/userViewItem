import { createStore } from "redux";


/********************************************************* */

const init_data ={
  items:[],            //表示データ
  mode: "default",    
  searchItem: [],  
  userId: null,        //ログインユーザーid
  pass: null,
  email: null,
  shop: null,          //ログイン店舗名
  storageUse:true
 
}
const itemsReducer =(state = init_data, action)=>{
  switch (action.type) {
    case "ADD":
      return addReducer(state, action);
    case "ORDERINGCHANGE":
      return orderingChangeReducer(state, action);  
    
    case "COOKIE":
      return storageReducer(state, action); 
    case "COOKIEDEL":
      return resetcookieReducer(state, action); 
    case "ORDERDATA":
      return orderData(state, action); 
    case "ORDERUPDATE":  
      return updateData(state, action); 
    default:
      return state;
  }
}
/***************************************************************************************** */
/*商品の登録 */

const addReducer =(state, action) =>{

  let newItems = state.items.slice();
  newItems.splice(0);

  for(let i=0; i<action.array.length; i++){
    newItems.push({
      id: action.array[i].id,
      path: action.array[i].path,
      name: action.array[i].name,
      price: action.array[i].price,
      memo: null,
      info: action.array[i].info,
      ordering: 0,
      day: action.array[i].day
    });
  }
  return{
    items: newItems,
    mode: 'default',
    searchItem: [],
    userId: state.userId,
    pass: state.pass,
    email: state.email,
    shop: state.shop,
    storageUse: state.storageUse

  }
}
/*商品登録用*/

export const addItemArray =(array)=>{
  return{
    type: 'ADD',
    array: array
  }
}
/****************************************************************** */
/*数値変更レデユサー*/

const orderingChangeReducer = (state, action)=>{
  let newData = state.items.slice();
  let i = action.index;
  let number = action.number;
  newData[i].ordering = number;
  return{
    items: newData,
    mode: "default",
    searchItem: [],
    userId: state.userId,
    pass: state.pass,
    email: state.email,
    shop: state.shop,
    storageUse: state.storageUse
    
  }
}
/*数値変更メソット*/

export const orderingChange =(index, number)=>{
  return{
    type: 'ORDERINGCHANGE',
    index: index,
    number: number
  }
}

/******************************************************** */
const storageReducer =(state, action)=>{
  let newData = state.items.slice();
  

  newData.splice(0);
  for(let i=0; i<action.orders.length; i++){
    newData.push({
      id: action.orders[i].id,
      confirm: action.orders[i].confirm,
      path: action.orders[i].path,
      name: action.orders[i].name,
      price: action.orders[i].price,
      memo: action.orders[i].memo,
      info: action.orders[i].info,
      ordering: action.orders[i].num,
      day: action.orders[i].day
    });
  }

  return{
    items: newData,
    mode: state.mode,
    serchItem: state.searchItem,
    userId: action.users.id,
    pass: state.pass,
    email: state.email,
    shop: action.users.shop,
    storageUse: state.storageUse
    
  }
}
export const storageData =(users,orders)=>{
  return{
    type: 'COOKIE',
    users: users,
    orders: orders
  }
}
const resetcookieReducer =(state, action)=>{
  return{
    items: state.items,
    mode: state.mode,
    serchItem: state.searchItem,
    userId: null,
    pass: state.pass,
    email: state.email,
    shop: null,
    storageUse: false
  }
}
export const resetcookie =()=>{
  return{
    type: 'COOKIEDEL',
  }
}
/*********************************************************************** */
/*各ユーザーオーダーレデユサー*/
const orderData =(state, action)=>{
  /*alert(JSON.stringify(action.jsonData));*/
  let newData = state.items.slice();
  newData.splice(0);
  for(let i=0; i<action.jsonData[1].length; i++){
    newData.push({
      id: action.jsonData[1][i].id,
      confirm: action.jsonData[1][i].confirm,
      path: action.jsonData[1][i].path,
      name: action.jsonData[1][i].name,
      price: action.jsonData[1][i].price,
      memo: action.jsonData[1][i].memo,
      info: action.jsonData[1][i].info,
      ordering: action.jsonData[1][i].num,
      day: action.jsonData[1][i].day
    });
  }
  return{
    items: newData,
    mode: state.mode,
    serchItem: state.searchItem,
    userId: action.jsonData[0].id,
    pass: action.pass,
    email: action.email,
    shop: action.jsonData[0].shop,
    storageUse: true
   
    
  }


}
/*各ユーザーのオーダー*/
export const orderSend =(json, pass, email)=>{
  return{
    type: 'ORDERDATA',
    jsonData: json,
    pass: pass,
    email: email
  }
}
/*更新時の各ユーザーreducer */

const updateData =(state, action)=>{
  let newData = state.items.slice();
  newData.splice(0);
  for(let i=0; i<action.jsonData[1].length; i++){
    newData.push({
      id: action.jsonData[1][i].id,
      confirm: action.jsonData[1][i].confirm,
      path: action.jsonData[1][i].path,
      name: action.jsonData[1][i].name,
      price: action.jsonData[1][i].price,
      memo: action.jsonData[1][i].memo,
      info: action.jsonData[1][i].info,
      ordering: action.jsonData[1][i].num,
      day: action.jsonData[1][i].day
    });
  }
  return{
    items: newData,
    mode: state.mode,
    serchItem: state.searchItem,
    userId: action.jsonData[0].id,
    pass: state.pass,
    email: state.email,
    shop: action.jsonData[0].shop,
    storageUse: true
  }


}
/*各ユーザーのオーダー*/
export const  updateSend =(json)=>{
  return{
    type: 'ORDERUPDATE',
    jsonData: json,
  }
}



export default createStore(itemsReducer);