const router = require('express').Router()
const Accounts = require('./accounts-model')
const {checkAccountId, checkAccountPayload, checkAccountNameUnique} = require('./accounts-middleware')

router.get('/', (req, res, next) => {
    Accounts.getAll()
      .then(accounts => {
        res.status(200).json(accounts)
      })
      .catch(err => {
        next(err)
      })
})

router.get('/:id', checkAccountId, (req, res, next) => {
    Accounts.getById(req.params.id)
      .then(account => {
        res.status(200).json(account)
      })
      .catch(err => {
        next(err)
      })
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
    Accounts.create(req.body)
      .then(account => {
        res.status(210).json(account)
      })
      .catch(err => {
        next(err)
      })
})

router.put('/:id', checkAccountId, checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
    Accounts.updateById(req.params.id, req.body)
            .then(account => {
              res.status(201).json(account);
            })
            .catch(err => {
              next(err);
            })
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  Accounts.deleteById(req.params.id)
  .then(deleted => {
    res.status(200).json({message: "This following account has been deleted:", deleted})
  })
  .catch(err => {
    next(err)
  })
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
