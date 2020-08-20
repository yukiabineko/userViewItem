 /*cookie処理*/
export const cookieParse =()=>{
  let baseCookie = document.cookie;
  if(baseCookie){
    let jsonArray = baseCookie.split('=')[1];
    let objecrArray = JSON.parse(jsonArray);
    let userJson = objecrArray[0];
    let orderJson = objecrArray[1];

    return{
      user: userJson,
      order: orderJson
    }
  }
 
}