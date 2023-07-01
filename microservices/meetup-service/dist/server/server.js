"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initServer = initServer;
var _express = require("express");
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _controller = require("./server/controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function initServer() {
  var app = (0, _express.express)();
  var port = process.env.PORT || 3000;
  app.use(_bodyParser["default"].json());
  app.use(_bodyParser["default"].urlencoded({
    extended: true
  }));
  app.get('/', function (req, res) {
    res.json({
      info: 'Node.js, Express, and Postgres API'
    });
  });
  app.get('/meetups', _controller.getMeetups);
  app.get('/meetups/:id', _controller.getMeetupById);
  app.post('/meetups', _controller.createMeetup);
  app.put('/meetups/:id', _controller.updateMeetup);
  app["delete"]('/meetups/:id', _controller.deleteMeetup);
  app.listen(port, function () {
    console.log("App running on port ".concat(port, "."));
  });
}