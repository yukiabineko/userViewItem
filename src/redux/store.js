import { createStore } from "redux";
import axios from 'axios';

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
    case "LOGIN":
      return loginReducer(state, action); 
    case "COOKIE":
      return cookieReducer(state, action); 
    case "COOKIEDEL":
      return resetcookieReducer(state, action); 
    default:
      return state;
  }
}
/***************************************************************************************** */
/*商品の登録 */

const addReducer =(state, action) =>{
  
  let newItems = state.items.slice();

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
/********************************************************** */
/*login レデユサー*/

const loginReducer =(state, action)=>{
  
 let userId = action.id;
 

 return{
   items: state.items,
   mode: state.mode,
   serchItem: state.searchItem,
   userId: userId,
   shop: state.shop
 }
}
/*ログイン用id格納*/
export const loginSetId =(id)=>{
  return{
    type: 'LOGIN',
    id: id
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


export default createStore(itemsReducer);