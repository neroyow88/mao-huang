export default class PlayerModel {
  private _isLogin: boolean;
  private _username: string;
  private _balance: number;

  public constructor(dt: GenericObjectType) {
    this.updateData(dt);
  }

  public updateData(dt: GenericObjectType): void {
    const { isLogin, username, balance } = dt;
    this._isLogin = isLogin;
    this._username = username ? username : undefined;
    this._balance = balance ? balance : 0;
  }

  public get isLogin(): boolean {
    return this._isLogin;
  }

  public get username(): string {
    return this._username;
  }

  public get balance(): number {
    return this._balance;
  }
}
