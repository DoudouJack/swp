import axios from 'axios'

class Api {
  getTransactions (token) {
    console.log('in transactions!')
    return axios.get('http://localhost:8081/', { headers:
            { authorization: `${token}` } })
  }
}

export let api = new Api()
