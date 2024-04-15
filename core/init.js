const requireDirectory = require("require-directory");

const Router = require("koa-router");

class InitManger {
  static initCore(app) {
    InitManger.app = app;
    //入口方法
    InitManger.initLoadRouters();
    InitManger.loadConfig();
    InitManger.loadHttpException();
  }
  static initLoadRouters() {
    const basePath = `${process.cwd()}/app/api`;
    requireDirectory(module, basePath, {
      visit: whenLoadModule,
    });
    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        InitManger.app.use(obj.routes());
      }
    }
  }
  static loadConfig() {
    const configPath = `${process.cwd()}/config/config.js`;
    const config = require(configPath);
    global.config = config;
  }
  static loadHttpException() {
    const errors = require("./http-exception");
    global.errs = errors;
  }
}

module.exports = InitManger;
