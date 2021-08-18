const db = require("../../data/db-config")

const getAll = () => {
  return db("accounts")
}

const getById = id => {
  return db('accounts').where("id", id).first();
}

const create = account => {
  return db('accounts').insert(account).then(([id]) => getById(id));
}

async function updateById(id, {name, budget}){
  await db('accounts').where("id", id).update({name, budget})
  return getById(id)
}

async function deleteById (id) {
  const deletedAccount = await getById(id);
  await db("accounts").where("id", id).delete();
  return deletedAccount;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
