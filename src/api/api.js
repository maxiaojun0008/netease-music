import axios from 'axios'

function urlContact(url) {
  let http = 'http://localhost:3000'
  return http + url
}

export function musicUrl() {
  let url = urlContact('/music/url')
  return axios.get(url,{
    params:{
      id:33894312
    }
  }).then(res=>{
    return Promise.resolve(res.data)
  })
}


export function login(username,psd) {
  let url = urlContact('/login')
  return axios.get(url,{
    params:{
      email:username,
      password:psd
    }
  }).then(res=>{
    return Promise.resolve(res.data)
  })

}
