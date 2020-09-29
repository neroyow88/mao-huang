import {
  changePasswordAPI,
  claimDailyReward,
  forgotPasswordAPI,
  forgotUsernameAPI,
  getVerificationCodeAPI,
  loginAPI,
  logoutAPI,
  registerAPI,
  requestBanners,
  setPinAPI,
} from "./server/LocalDatabase";
import { ApiPath } from "./WebConstant";

class APIClient {
  public callApi(
    path: ApiPath,
    callback: APIReturnFunction,
    params?: GenericObjectType
  ): void {
    const onAPIReturn = (dt, err): void => {
      console.log(`API path <${path}> return:`, dt, err);
      callback(dt, err);
    };
    this._callApi(path, params, onAPIReturn);
  }

  ///#region temp
  private _callApi(
    path: ApiPath,
    dt: GenericObjectType,
    cb: APIReturnFunction
  ): void {
    switch (path) {
      case ApiPath.REGISTER:
        registerAPI(dt, cb);
        break;
      case ApiPath.LOGIN:
        loginAPI(dt, cb);
        break;
      case ApiPath.LOGOUT:
        logoutAPI(cb);
        break;
      case ApiPath.FORGOT_USERNAME:
        forgotUsernameAPI(dt, cb);
        break;
      case ApiPath.FORGOT_PASSWORD:
        forgotPasswordAPI(dt, cb);
        break;
      case ApiPath.CHANGE_PASSWORD:
        changePasswordAPI(dt, cb);
        break;
      case ApiPath.CHANGE_PIN:
        setPinAPI(dt, cb);
        break;
      case ApiPath.GET_BANK_ACCOUNT:
        this._addBankAccount(dt, cb);
        break;
      case ApiPath.WITHDRAW:
        this._withdraw(dt, cb);
        break;
      case ApiPath.REQUEST_VERIFICATION_CODE:
        getVerificationCodeAPI(dt, cb);
        break;
      case ApiPath.CLAIM_DAILY_REWARD:
        claimDailyReward(dt, cb);
        break;
      case ApiPath.REQUEST_BANNER:
        requestBanners(cb);
        break;
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
}

const apiClient = new APIClient();
export { apiClient };
