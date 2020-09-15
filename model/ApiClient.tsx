import { dataSource } from "./DataSource";

const API_PATH = {
  REGISTER: "register",
  LOGIN: "login",
  LOGOUT: "logout",
  FORGOT_USERNAME: "forgotUsername",
  FORGOT_PASSWORD: "forgotPassword",
  CHANGE_PASSWORD: "changePassword",
  SET_PIN: "setPin",
  GET_BANK_ACCOUNT: "getBankAccount",
};

class APIClient {
  public register(data: GenericObjectType, callback: APIReturnFunction): void {
    const path = API_PATH.REGISTER;
    const apiReturn = (result: GenericObjectType, err: string): void => {
      console.log(`API return [${path}]: ${result}, ${err}`);
      if (err) {
        console.error(err);
        callback(undefined, err);
      } else {
        callback(result, undefined);
      }
    };

    this._callApi(path, data, apiReturn.bind(this));
  }

  public login(data: GenericObjectType, callback: APIReturnFunction): void {
    const path = API_PATH.LOGIN;
    const apiReturn = (result: GenericObjectType, err: string): void => {
      console.log(`API return [${path}]: ${result}, ${err}`);
      if (err) {
        console.error(err);
        callback(undefined, err);
      } else {
        dataSource.updatePlayerModel(result);
        callback(result, undefined);
      }
    };

    this._callApi(path, data, apiReturn.bind(this));
  }

  public logout(callback: APIReturnFunction): void {
    const path = API_PATH.LOGOUT;
    const apiReturn = (result: GenericObjectType, err: string): void => {
      console.log(`API return [${path}]: ${result}, ${err}`);
      if (err) {
        console.error(err);
        callback(undefined, err);
      } else {
        dataSource.updatePlayerModel(result);
        callback(result, undefined);
      }
    };

    this._callApi(path, undefined, apiReturn.bind(this));
  }

  public forgotUsername(
    data: GenericObjectType,
    callback: APIReturnFunction
  ): void {
    const path = API_PATH.FORGOT_USERNAME;
    const apiReturn = (result: GenericObjectType, err: string): void => {
      console.log(`API return [${path}]: ${result}, ${err}`);
      if (err) {
        console.error(err);
        callback(undefined, err);
      } else {
        callback(result, undefined);
      }
    };

    this._callApi(path, data, apiReturn.bind(this));
  }

  public forgotPassword(
    data: GenericObjectType,
    callback: APIReturnFunction
  ): void {
    const path = API_PATH.FORGOT_PASSWORD;
    const apiReturn = (result: GenericObjectType, err: string): void => {
      console.log(`API return [${path}]: ${result}, ${err}`);
      if (err) {
        console.error(err);
        callback(undefined, err);
      } else {
        callback(result, undefined);
      }
    };

    this._callApi(path, data, apiReturn.bind(this));
  }

  public changePassword(
    data: GenericObjectType,
    callback: APIReturnFunction
  ): void {
    const path = API_PATH.CHANGE_PASSWORD;
    const apiReturn = (result: GenericObjectType, err: string): void => {
      console.log(`API return [${path}]: ${result}, ${err}`);
      if (err) {
        console.error(err);
        callback(undefined, err);
      } else {
        callback(result, undefined);
      }
    };

    this._callApi(path, data, apiReturn.bind(this));
  }

  public setPin(data: GenericObjectType, callback: APIReturnFunction): void {
    const path = API_PATH.SET_PIN;
    const apiReturn = (result: GenericObjectType, err: string): void => {
      console.log(`API return [${path}]: ${result}, ${err}`);
      if (err) {
        console.error(err);
        callback(undefined, err);
      } else {
        callback(result, undefined);
      }
    };

    this._callApi(path, data, apiReturn.bind(this));
  }

  ///#region temp
  private _callApi(
    path: string,
    dt: GenericObjectType,
    cb: APIReturnFunction
  ): void {
    switch (path) {
      case API_PATH.REGISTER:
        this._register(dt, cb);
        break;
      case API_PATH.LOGIN:
        this._login(dt, cb);
        break;
      case API_PATH.LOGOUT:
        this._logout(cb);
        break;
      case API_PATH.FORGOT_USERNAME:
        this._forgotUsername(dt, cb);
        break;
      case API_PATH.FORGOT_PASSWORD:
        this._forgotPassword(dt, cb);
        break;
      case API_PATH.CHANGE_PASSWORD:
        this._changePassword(dt, cb);
        break;
      case API_PATH.SET_PIN:
        this._setPin(dt, cb);
        break;
    }
  }

  private _register(dt: GenericObjectType, cb: APIReturnFunction): void {
    const { username, verificationCode } = dt;
    if (verificationCode === "000000") {
      cb && cb(undefined, "verification");
    } else if (username === "nero") {
      cb && cb(undefined, "username");
    } else {
      cb && cb({ success: true }, undefined);
    }
  }

  private _login(dt: GenericObjectType, cb: APIReturnFunction): void {
    const { username } = dt;
    if (username) {
      const result = {
        isLogin: true,
        username: username,
        balance: 100000,
        withdrawDetails: [
          {
            bankName: "工商银行",
            cardType: "储蓄卡",
            ownerName: "金城五",
            cardNumber: "1234567824689999",
          },
        ],
      };
      cb && cb(result, undefined);
    } else {
      cb && cb(undefined, "login failed");
    }
  }

  private _logout(cb: APIReturnFunction): void {
    const result = {
      isLogin: false,
      username: "",
      balance: 0,
    };
    cb && cb(result, undefined);
  }

  private _forgotUsername(dt: GenericObjectType, cb: APIReturnFunction): void {
    const { verificationCode } = dt;
    if (verificationCode === "000000") {
      cb && cb(undefined, "verification");
    } else {
      cb && cb({ success: true }, undefined);
    }
  }

  private _forgotPassword(dt: GenericObjectType, cb: APIReturnFunction): void {
    const { verificationCode } = dt;
    if (verificationCode === "000000") {
      cb && cb(undefined, "verification");
    } else {
      cb && cb({ success: true }, undefined);
    }
  }

  private _changePassword(dt: GenericObjectType, cb: APIReturnFunction): void {
    const { newPassword, verifiedNewPassword } = dt;
    if (newPassword !== verifiedNewPassword) {
      cb && cb(undefined, "password");
    } else {
      cb && cb({ success: true }, undefined);
    }
  }

  private _setPin(dt: GenericObjectType, cb: APIReturnFunction): void {
    const { verificationCode, pin, verifiedPin } = dt;
    if (pin !== verifiedPin) {
      cb && cb(undefined, "pin");
    } else if (verificationCode === "000000") {
      cb && cb(undefined, "verification");
    } else {
      cb && cb({ success: true }, undefined);
    }
  }
  //#endregion
}

const apiClient = new APIClient();
export { apiClient };
