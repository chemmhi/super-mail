export function debounce(func,timeOut=300){
      let timer = null
      return (...args)=>{
        if(timer) clearTimeout(timer)
        timer = setTimeout(()=>{
          func(...args);
        },timeOut)
      }
    }

export function throttle(func, timeOut=300){
  let timer = null;
  return (...args)=>{
    if (timer) clearInterval(timer)
    timer = setInterval(()=>{
      func(...args)
    },timeOut)
  }
}
