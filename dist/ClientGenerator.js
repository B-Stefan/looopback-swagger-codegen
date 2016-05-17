"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loopbackSwagger = require("loopback-swagger");

var _request = require("request");

var _request2 = _interopRequireDefault(_request);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _unzip = require("unzip");

var _unzip2 = _interopRequireDefault(_unzip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ClientGenerator = function () {
  _createClass(ClientGenerator, null, [{
    key: "BASE_URL_CLIENTS",
    get: function get() {
      return "http://generator.swagger.io/api/gen/clients/";
    }
  }, {
    key: "CLIENT_ENUM",
    get: function get() {
      //see  http://generator.swagger.io/api/gen/clients
      return {
        andorid: "android",
        nodeJs: "node-js",
        akkaScala: "akka-scala",
        asyncScala: "async-scala",
        clojure: "clojure",
        csharp: "csharp",
        CsharpDotNet2: "CsharpDotNet2",
        dart: "dart",
        dynamicHtml: "dynamic-html",
        flash: "flash",
        go: "go",
        html: "html",
        java: "java",
        javascript: "javascript",
        javascriptClosureAngular: "javascript-closure-angular",
        jmeter: "jmeter",
        objc: "objc",
        perl: "perl",
        php: "php",
        python: "python",
        qt5cpp: "qt5cpp",
        ruby: "ruby",
        scala: "scala",
        swagger: "swagger",
        swaggerYaml: "swagger-yaml",
        swift: "swift",
        tizen: "tizen",
        typescriptAngular: "typescript-angular",
        typescriptNode: "typescript-node"
      };
    }
  }]);

  function ClientGenerator(app) {
    _classCallCheck(this, ClientGenerator);

    this.app = app;
  }

  _createClass(ClientGenerator, [{
    key: "generateSwaggerSpec",
    value: function generateSwaggerSpec() {
      return (0, _loopbackSwagger.generateSwaggerSpec)(this.app);
    }
  }, {
    key: "downloadClient",
    value: function downloadClient(path, downloadResponse) {
      return new Promise(function (resolve, reject) {
        (0, _request2.default)(downloadResponse.link).pipe(_fs2.default.createWriteStream(path)).on("finish", resolve).on("error", reject);
      });
    }
  }, {
    key: "unzipClient",
    value: function unzipClient(zipPath, toPath) {
      if (zipPath.indexOf(".zip") == -1) throw new Error("fromPath should be an zip file your path is " + zipPath);
      return new Promise(function (resolve, reject) {
        _fs2.default.createReadStream(zipPath).pipe(_unzip2.default.Extract({ path: toPath })).on("error", reject).on("close", resolve);
      });
    }
  }, {
    key: "generateClient",
    value: function generateClient(type, opts, swaggerSpec) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var swaggerSpec = swaggerSpec ? swaggerSpec : (0, _loopbackSwagger.generateSwaggerSpec)(_this.app);
        var url = ClientGenerator.BASE_URL_CLIENTS + type;
        opts.spec = swaggerSpec;
        _request2.default.post({
          url: url,
          json: true,
          body: opts

        }, function (err, req, body) {
          if (err) {
            reject(err);
            return;
          }
          resolve(body);
        });
      });
    }
  }, {
    key: "generateAndroidClient",
    value: function generateAndroidClient(opts) {
      return this.generateClient(ClientGenerator.CLIENT_ENUM.andorid, opts);
    }
  }]);

  return ClientGenerator;
}();

exports.default = ClientGenerator;