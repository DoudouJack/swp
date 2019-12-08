const admin = require('../con/middlewareDB')

const createAuth = async (idToken) => {
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken)
        if(decodedToken){
          req.body.uid = decodedToken.uid
          return true
        } else {
          //return res.status(401).send('Nicht Authorisiert!')
          return false
        }  
    } catch (e) {
        return false
    }
}

module.exports = {
    middelwareService: createAuth
}