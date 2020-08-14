import { createStore } from "redux";

const init_data ={
  items:[],
  mode: "default",
  searchItem: []
 
}
const itemsReducer =(state = init_data, action)=>{
  switch (action.type) {
    case "ADD":
      return addReducer(state, action);
    case "ORDERINGCHANGE":
      return orderingChangeReducer(state, action);  
  
    default:
      return state;
  }
}
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
    searchItem: []
  }
}
/*商品登録用*/

export const addItemArray =(array)=>{
  return{
    type: 'ADD',
    array: array
  }
}
/*数値変更レデユサー*/

const orderingChangeReducer = (state, action)=>{
  let newData = state.items.slice();
  let i = action.index;
  let number = action.number;
  newData[i].ordering = number;
  return{
    items: newData,
    mode: "default",
    searchItem: []
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


export default createStore(itemsReducer);