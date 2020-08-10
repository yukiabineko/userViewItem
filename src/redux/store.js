import { createStore } from "redux";

const init_data ={
  items:[
    {path: "/tmp/data30.jpg", name: "coffee", price: "400"},
    {path: "/tmp/data30.jpg", name: "tea", price: "300"}

  ],
  mode: "default",
  searchItem: []
}
const itemsReducer =(state = init_data, action)=>{
  switch (action.type) {
    case "ADD":
     
      break;
  
    default:
      return state;
  }
}
export default createStore(itemsReducer);