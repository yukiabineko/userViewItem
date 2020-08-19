import { createStore } from "redux";


/********************************************************* */

const init_data ={
  items:[],
  mode: "default",
  searchItem: [],
  userId: null,
  shop: null
 
}
const itemsReducer =(state = init_data, action)=>{
  switch (action.type) {
    case "ADD":
      return addReducer(state, action);
    case "ORDERINGCHANGE":
      return orderingChangeReducer(state, action);  
    
    case "COOKIE":
      return cookieReducer(state, action); 
    case "COOKIEDEL":
      return resetcookieReducer(state, action); 
    case "ORDERDATA":
      return orderData(state, action); 
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
      memo: action.array[i].memo,
      ordering: 0
    });
  }
  return{
    items: newItems,
    mode: 'default',
    searchItem: [],
    userId: state.userId,
    shop: state.shop
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
    shop: state.shop
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
const cookieReducer =(state, action)=>{
  return{
    items: state.items,
    mode: state.mode,
    serchItem: state.searchItem,
    userId: action.id,
    shop: action.shop
  }
}
export const cookieData =(id, shop)=>{
  return{
    type: 'COOKIE',
    id :id,
    shop: shop
  }
}
const resetcookieReducer =(state, action)=>{
  return{
    items: state.items,
    mode: state.mode,
    serchItem: state.searchItem,
    userId: null,
    shop: null
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
  alert(JSON.stringify(action.jsonData));
  alert(action.jsonData.length);
  alert(action.jsonData[0].user_id);
  let newData = state.items.slice();
  newData.splice(0);
  for(let i=0; i<action.jsonData.length; i++){
    newData.push({
      id: action.jsonData[i].id,
      path: action.jsonData[i].path,
      name: action.jsonData[i].name,
      price: action.jsonData[i].price,
      memo: action.jsonData[i].memo,
      ordering: action.jsonData[i].num
    });
  }
  return{
    items: newData,
    mode: state.mode,
    serchItem: state.searchItem,
    userId: action.jsonData[0].user_id,
    shop: state.shop
  }


}
/*各ユーザーのオーダー*/
export const orderSend =(json)=>{
  return{
    type: 'ORDERDATA',
    jsonData: json
  }
}


export default createStore(itemsReducer);