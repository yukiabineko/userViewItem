 /*cookie処理*/
export const cookieParse =()=>{
  let baseCookie = document.cookie;
  if(baseCookie){
    let json = baseCookie.split('=')[1];
    let obj = JSON.parse(json);
    
    return{
      id: obj.id,
      shop: obj.shop
    }
  }
 
}