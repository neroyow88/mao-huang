export class LoginStatusModel {
  private _isLogin: boolean;
  private _username: string;

  public constructor(data: GenericObjectType) {
    const { is_login, username } = data;
    this._isLogin = is_login;
    this._username = username ? username : undefined;
  }

  public get isLogin(): boolean {
    return this._isLogin;
  }

  public get username(): string {
    return this._username;
  }
}
