"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryParams = exports.idParam = exports.bodyParams = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var bodyParams = _joi["default"].object().keys({
  title: _joi["default"].string().allow('').max(60).required().label('Title'),
  description: _joi["default"].string().allow('').max(600).required().label('Description'),
  tags: _joi["default"].array().items(_joi["default"].string().max(30)).required().label('Tags'),
  time: _joi["default"].date().greater('now').iso().required().label('Date')
});
exports.bodyParams = bodyParams;
var idParam = _joi["default"].number().required().label('Id');
exports.idParam = idParam;
var queryParams = _joi["default"].object().keys({
  title: _joi["default"].string().max(60).label('Title'),
  description: _joi["default"].string().max(30).label('Description'),
  order: _joi["default"].string().valid('DESC', 'ASC').label('Order (ASC or DESC)'),
  orderBy: _joi["default"].string().valid('title', 'description', 'id', 'time').label('The base field to order (orderBy)'),
  limit: _joi["default"].string().regex(/^\d+$/).label('Page limit (limit)'),
  page: _joi["default"].string().regex(/^\d+$/).label('Page number (page)')
});
exports.queryParams = queryParams;