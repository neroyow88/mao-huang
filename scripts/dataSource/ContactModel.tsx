export class ContactModel {
  private _wechat: string;
  private _qq: string;
  private _skype: string;
  private _gmail: string;

  public constructor(data: GenericObjectType) {
    const { WECHAT, QQ, SKYPE, GMAIL } = data;

    this._wechat = WECHAT;
    this._qq = QQ;
    this._skype = SKYPE;
    this._gmail = GMAIL;
  }

  public get wechat(): string {
    return this._wechat;
  }

  public get qq(): string {
    return this._qq;
  }

  public get skype(): string {
    return this._skype;
  }

  public get gmail(): string {
    return this._gmail;
  }
}
