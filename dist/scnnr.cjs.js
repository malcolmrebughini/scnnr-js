'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var axios = _interopDefault(require('axios'));

var defaults = {
  url: 'https://api.scnnr.cubki.jp/',
  version: 'v1',
  timeout: 0,
  key: ''
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var Connection = function () {
  function Connection(_ref) {
    var url = _ref.url,
        version = _ref.version,
        key = _ref.key,
        timeout = _ref.timeout;
    classCallCheck(this, Connection);

    this.axiosInstance = axios.create();

    this.axiosInstance.defaults.baseURL = url + version;
    this.axiosInstance.defaults.headers.post['x-api-key'] = key;

    if (timeout > 0) {
      this.axiosInstance.defaults.params = {}; // create default params
      this.axiosInstance.defaults.params['timeout'] = timeout;
    }
  }

  createClass(Connection, [{
    key: 'sendJson',
    value: function sendJson(path, data) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.axiosInstance.post(path, data, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject({} || error.response.error);
        });
      });
    }
  }]);
  return Connection;
}();

var Client = function () {
  function Client(config) {
    classCallCheck(this, Client);

    this.config = Object.assign({}, defaults, config);

    this.connection = new Connection(this.config);
  }

  // TODO: remove eslint-disable-line


  createClass(Client, [{
    key: 'recognizeUrl',
    value: function recognizeUrl(url) {
      return this.connection.sendJson('/remote/recognitions', { url: url });
    }

    // TODO: remove eslint-disable-line

  }, {
    key: 'recognizeImg',
    value: function recognizeImg(imageFile) {
      
    } // eslint-disable-line no-unused-vars

    // TODO: remove eslint-disable-line

  }, {
    key: 'fetch',
    value: function fetch(id) {// eslint-disable-line no-unused-vars

      
    }
  }]);
  return Client;
}();

Client.Connection = Connection;

var Recognition = function Recognition(_ref) {
  var id = _ref.id,
      _ref$objects = _ref.objects,
      objects = _ref$objects === undefined ? {} : _ref$objects,
      state = _ref.state,
      _ref$error = _ref.error,
      error = _ref$error === undefined ? {} : _ref$error;
  classCallCheck(this, Recognition);

  this.id = id;
  this.objects = objects;
  this.state = state;
  this.error = error;
};

var main = {
  Client: Client,
  Recognition: Recognition
};

module.exports = main;