import axios from 'axios'

export function request (config){
  const instance= axios.create({
    timeout:5000,
    // baseURL:'http://114.115.142.213:8001',
    baseURL:'http://192.168.31.111:8000',
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

export function fetchapi(re_url, options){
  // const baseUrl = 'http://114.115.142.213:8001/'
  const baseUrl = 'http://192.168.31.111:8000/'
  const url = baseUrl + re_url
  return fetch(url, options)
}
// export const baseUrl = 'http://114.115.142.213:8001/'
export const baseUrl = 'http://192.168.31.111:8000/'


