const router = require('express').Router()
const Accounts = require('./accounts-model')
const {checkAccountId, checkAccountPayload, checkAccountNameUnique} = require('./accounts-middleware')

router.get('/', (req, res) => {
    Accounts.getAll()
      .then(accounts => {
        res.status(200).json(accounts)
      })
      .catch(err => {
        res.status(500).json(err)
      })
})

router.get('/:id', checkAccountId, (req, res) => {
    Accounts.getById(req.params.id)
      .then(account => {
        res.status(200).json(account)
      })
      .catch(err => {
        res.status(500).json(err)
      })
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res) => {
    Accounts.create(req.body)
      .then(account => {
        res.status(210).json(account)
      })
      .catch(err => {
        res.status(500).json(err)
      })
})

router.put('/:id', (req, res) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
