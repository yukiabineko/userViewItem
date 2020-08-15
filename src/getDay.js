export const todayView = ()=>{
  let today = new Date();
  let  m = ("00" + (today.getMonth()+1)).slice(-2);
  let  d = ("00" + today.getDate()).slice(-2);
  let result =  m + "/" + d;
  return result;

}