import { ApiPath } from "./WebConstant";

class APIClient {
  public callApi(
    path: ApiPath,
    params: GenericObjectType,
    callback: APIReturnFunction
  ): void {
    this._callApi(path, params, callback);
  }

  ///#region temp
  private _callApi(
    path: ApiPath,
    dt: GenericObjectType,
    cb: APIReturnFunction
  ): void {
    switch (path) {
      case ApiPath.REGISTER:
        this._register(dt, cb);
        break;
      case ApiPath.LOGIN:
        this._login(dt, cb);
        break;
      case ApiPath.LOGOUT:
        this._logout(cb);
        break;
      case ApiPath.FORGOT_USERNAME:
        this._forgotUsername(dt, cb);
        break;
      case ApiPath.FORGOT_PASSWORD:
        this._forgotPassword(dt, cb);
        break;
      case ApiPath.CHANGE_PASSWORD:
        this._changePassword(dt, cb);
        break;
      case ApiPath.SET_PIN:
        this._setPin(dt, cb);
        break;
      case ApiPath.GET_BANK_ACCOUNT:
        this._addBankAccount(dt, cb);
        break;
      case ApiPath.WITHDRAW:
        this._withdraw(dt, cb);
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

  private _addBankAccount(dt: GenericObjectType, cb: APIReturnFunction): void {
    const {
      bankType,
      bankName,
      username,
      cardNumber,
      verifiedCardNumber,
      pinNumber,
    } = dt;

    if (cardNumber !== verifiedCardNumber) {
      cb && cb(undefined, "card");
    } else {
      const result = { bankType, bankName, username, cardNumber, pinNumber };
      cb && cb(result, undefined);
    }
  }

  private _withdraw(dt: GenericObjectType, cb: APIReturnFunction): void {
    const { pinNumber } = dt;
    if (pinNumber === "0000") {
      cb && cb(undefined, "pin");
    } else {
      cb && cb({ invoice: "000123456789" }, undefined);
    }
  }
  //#endregion

  // private _logResult(
  //   path: string,
  //   result: GenericObjectType,
  //   err: string
  // ): void {
  //   console.log(`API return [${path}]: ${result}, ${err}`);
  // }
}

const apiClient = new APIClient();
export { apiClient };
