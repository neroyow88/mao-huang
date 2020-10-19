export default class SystemModel {
  private _isMobile: boolean;
  private _isLogin: boolean;

  public constructor(dt: GenericObjectType) {
    this.updateData(dt);
  }

  public updateData(dt: GenericObjectType): void {
    const { isMobile } = dt;
    this._isMobile = isMobile;
  }

  public set isMobile(value: boolean) {
    this._isMobile = value;
  }

  public get isMobile(): boolean {
    return this._isMobile;
  }

  public set isLogin(value: boolean) {
    this._isLogin = value;
  }

  public get isLogin(): boolean {
    return this._isLogin;
  }
}
