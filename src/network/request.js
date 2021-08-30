import axios from 'axios'

export function request (config){
  const instance= axios.create({
    timeout:5000,
    // baseURL:'http://152.136.185.210:7878/api/m5',
    baseURL:'http://127.0.0.1:8001',

  })
  instance.interceptors.request.use(config=>{
    return config
  },error=>{

  })
  instance.interceptors.response.use(
    result=>{
      return result.data
    },error=>{
    console.log(error);})
  return instance(config)
}
