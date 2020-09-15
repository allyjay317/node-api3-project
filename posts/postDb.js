const db = require('../data/dbConfig.js');

module.exports = {
  get,
  getById,
  getByUserId,
  insert,
  update,
  remove,
};

function get() {
  return db('posts');
}

function getById(id) {
  return db('posts')
    .where({ id })
    .first();
}

function getByUserId(user_id) {
  return db('posts')
    .where({ user_id })
}

function insert(post) {
  return db('posts')
    .insert(post)
    .then(ids => {
      return getById(ids[0]);
    });
}

function update(id, changes) {
  return db('posts')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('posts')
    .where('id', id)
    .del();
}
