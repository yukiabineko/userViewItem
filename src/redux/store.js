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
      break;
  
    default:
      return state;
  }
}
const addReducer =(state, action) =>{
  
  let newItems = state.items.slice();
  for(let i=0; i<action.array.length; i++){
    newItems.push({
      path: action.array[i].path,
      name: action.array[i].name,
      price: action.array[i].price,
    });
  }
  return{
    items: newItems,
    mode: 'default',
    searchItem: []
  }
}
export const addItemArray =(array)=>{
  return{
    type: 'ADD',
    array: array
  }
}



export default createStore(itemsReducer);