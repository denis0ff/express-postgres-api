"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateById = exports.selectById = exports.selectAll = exports.insertData = exports.deleteById = void 0;
var _pg = require("pg");
var pool = new _pg.Pool({
  user: 'client',
  host: 'localhost',
  database: 'meetups',
  password: 'Yjz,hm2022',
  port: 5432
});
var selectAll = function selectAll(data) {
  var _data$title = data.title,
    title = _data$title === void 0 ? '' : _data$title,
    _data$description = data.description,
    description = _data$description === void 0 ? '' : _data$description,
    _data$orderBy = data.orderBy,
    orderBy = _data$orderBy === void 0 ? 'id' : _data$orderBy,
    _data$order = data.order,
    order = _data$order === void 0 ? 'ASC' : _data$order,
    _data$limit = data.limit,
    limit = _data$limit === void 0 ? 'ALL' : _data$limit;
  var offset = data.page && data.limit ? data.page * data.limit : '0';
  return pool.query("SELECT * FROM meetups WHERE title ~* $1 AND description ~* $2 ORDER BY ".concat(orderBy, " ").concat(order, " LIMIT ").concat(limit, " OFFSET $3"), [title, description, offset]);
};
exports.selectAll = selectAll;
var selectById = function selectById(data) {
  return pool.query('SELECT * FROM meetups WHERE id = $1', [data.id]);
};
exports.selectById = selectById;
var insertData = function insertData(data) {
  var title = data.title,
    description = data.description,
    tags = data.tags,
    time = data.time;
  return pool.query("INSERT INTO meetups (title, description, tags, time) VALUES ($1, $2, $3, $4) RETURNING *", [title, description, tags, time]);
};
exports.insertData = insertData;
var updateById = function updateById(data) {
  var title = data.title,
    description = data.description,
    tags = data.tags,
    time = data.time,
    id = data.id;
  return pool.query('UPDATE meetups SET title = $1, description = $2, tags = $3, time = $4 WHERE id = $5', [title, description, tags, time, id]);
};
exports.updateById = updateById;
var deleteById = function deleteById(data) {
  return pool.query('DELETE FROM meetups WHERE id = $1', [data.id]);
};
exports.deleteById = deleteById;