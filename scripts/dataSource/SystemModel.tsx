export default class SystemModel {
  private _isMobile: boolean;

  public constructor(dt: GenericObjectType) {
    this.updateData(dt);
  }

  public updateData(dt: GenericObjectType): void {
    const { isMobile } = dt;
    this._isMobile = isMobile;
  }

  public get isMobile(): boolean {
    return this._isMobile;
  }
}
