import axios from 'axios'

class Api {
  getTransactions (token) {
    console.log('in transactions!')
    return axios.get('http://localhost:8081/', { headers:
            { authorization: `${token}` } })
  }
  sendTokens (userToken, messageToken) {
    console.log('in send tokens!')
    return axios.post('http://127.0.0.1:8081/saveUserRelatedTokens', {
      userToken: userToken,
      messageToken: messageToken
    }).then(response => {
      console.log(response)
    })
      .catch(e => {
        this.error.push(e)
      })
  }
}

export let api = new Api()
