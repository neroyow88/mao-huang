import { dataSource } from "./DataSource";

class APIClient {
  public login(data: GenericObjectType): void {
    const { username, password } = data;
    const apiReturn = (result: GenericObjectType, err: string): void => {
      if (err) {
        console.error(err);
      } else {
        dataSource.updatePlayerModel(result);
      }
    };
    const config = {
      username,
      password,
    };
    this._callApi(config, apiReturn.bind(this));
  }

  private _callApi(dt: GenericObjectType, cb: APIReturnFunction): void {
    const { username } = dt;

    console.log("data", dt);
    if (username) {
      const result = {
        isLogin: true,
        username: username,
        balance: 100000,
      };
      cb && cb(result, undefined);
    } else {
      cb && cb(undefined, "login failed");
    }
  }
}

const apiClient = new APIClient();
export { apiClient };
