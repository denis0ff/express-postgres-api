'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.updateMeetup =
  exports.getMeetups =
  exports.getMeetupById =
  exports.deleteMeetup =
  exports.createMeetup =
    void 0;
var _schema = require('./schema');
var _queries = require('./queries');
function _typeof(obj) {
  '@babel/helpers - typeof';
  return (
    (_typeof =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (obj) {
            return typeof obj;
          }
        : function (obj) {
            return obj &&
              'function' == typeof Symbol &&
              obj.constructor === Symbol &&
              obj !== Symbol.prototype
              ? 'symbol'
              : typeof obj;
          }),
    _typeof(obj)
  );
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly &&
      (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })),
      keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2
      ? ownKeys(Object(source), !0).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(
          target,
          Object.getOwnPropertyDescriptors(source)
        )
      : ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(source, key)
          );
        });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, 'string');
  return _typeof(key) === 'symbol' ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== 'object' || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || 'default');
    if (_typeof(res) !== 'object') return res;
    throw new TypeError('@@toPrimitive must return a primitive value.');
  }
  return (hint === 'string' ? String : Number)(input);
}
var getMeetups = function getMeetups(req, res) {
  var validationError = _schema.queryParams.validate(req.query).error;
  if (validationError) throw res.status(400).json(validationError.message);
  (0, _queries.selectAll)(req.query)
    .then(function (_ref) {
      var rows = _ref.rows;
      return res.status(200).json(rows);
    })
    ['catch'](function (err) {
      throw err;
    });
};
exports.getMeetups = getMeetups;
var getMeetupById = function getMeetupById(req, res) {
  var id = parseInt(req.params.id);
  var validationError = _schema.idParam.validate(id).error;
  if (validationError) throw res.status(400).json(validationError.message);
  (0, _queries.selectById)({
    id: id,
  })
    .then(function (data) {
      if (data.rowCount === 0)
        return res.status(404).json('Data with such id was not found');
      res.status(200).json(data.rows);
    })
    ['catch'](function (err) {
      throw err;
    });
};
exports.getMeetupById = getMeetupById;
var createMeetup = function createMeetup(req, res) {
  var validationError = _schema.bodyParams.validate(req.body).error;
  if (validationError) throw res.status(400).json(validationError.message);
  (0, _queries.insertData)(req.body)
    .then(function (data) {
      return res
        .status(201)
        .send('Meetup added with ID: '.concat(data.rows[0].id));
    })
    ['catch'](function (err) {
      throw err;
    });
};
exports.createMeetup = createMeetup;
var updateMeetup = function updateMeetup(req, res) {
  var id = parseInt(req.params.id);
  var validationError =
    _schema.bodyParams.validate(req.body).error ||
    _schema.idParam.validate(id).error;
  if (validationError) throw res.status(400).json(validationError.message);
  (0, _queries.selectById)({
    id: id,
  })
    .then(function (data) {
      if (data.rowCount === 0)
        return res.status(404).json('Data with such id was not found');
      (0, _queries.updateById)(
        _objectSpread(
          _objectSpread({}, req.body),
          {},
          {
            id: id,
          }
        )
      )
        .then(function () {
          return res.status(200).send('Meetup modified with ID: '.concat(id));
        })
        ['catch'](function (err) {
          throw err;
        });
    })
    ['catch'](function (err) {
      throw err;
    });
};
exports.updateMeetup = updateMeetup;
var deleteMeetup = function deleteMeetup(req, res) {
  var id = parseInt(req.params.id);
  var validationError = _schema.idParam.validate(id).error;
  if (validationError) throw res.status(400).json(validationError.message);
  (0, _queries.deleteById)({
    id: id,
  })
    .then(function () {
      return res.status(204).send('Meetup deleted with ID: '.concat(id));
    })
    ['catch'](function (err) {
      throw err;
    });
};
exports.deleteMeetup = deleteMeetup;
