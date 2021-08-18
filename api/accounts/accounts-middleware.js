const Accounts = require('./accounts-model')
const db = require('../../data/db-config')


const checkAccountPayload = (req, res, next) => {
  const{name, budget} = req.body;
  if(!name || !budget){
    res.status(400).json({message: "name and budget required"})
  }else if (typeof name !== "string"){
    res.status(400).json({message: "name must be a string"})
  } else if(name.length >100 || name.length < 3){
    res.status(400).json({message: "name must be betwwen 3 and 100 characters"})
  }
   else{
    next();
  }
}

const checkAccountNameUnique = async function(req, res, next){
       db("accounts")
      .where("name", req.body.name)
      .then(accountList => {
        if(accountList.length !== 0){
          res.status(400).json({message: "That account already exists"})
        }
        else{
          next();
        }
      })
}

const checkAccountId = async function(req, res, next) {
    const {id} = req.params;

    try{
        const account = await Accounts.getById(id)
        if(!account){
          res.status(404).json({message: "Account not found"})
        } else{
          req.account = account
          next();
        }
    }
    catch(err){
      res.status(500).json({message: "error finding account"})
    }
}

module.exports = {
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique
}
