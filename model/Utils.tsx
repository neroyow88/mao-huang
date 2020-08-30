class Utils {
  private _isMobile: boolean;

  public set isMobile(value: boolean) {
    this._isMobile = value;
  }
  public get isMobile(): boolean {
    return this._isMobile;
  }
}

const utils = new Utils();
export { utils };
