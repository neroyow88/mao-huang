import { PopOutType } from "./WebConstant";

class PopOutHandler {
  private _showPopOut: (
    type: PopOutType,
    customData?: GenericObjectType
  ) => void = undefined;
  private _hidePopOut: NoParamReturnNulFunction = undefined;
  private _showNotice: (customData: GenericObjectType) => void = undefined;
  private _hideNotice: NoParamReturnNulFunction = undefined;

  public init(config: GenericObjectType) {
    const { showPopOut, hidePopOut, showNotice, hideNotice } = config;
    this._showPopOut = showPopOut;
    this._hidePopOut = hidePopOut;
    this._showNotice = showNotice;
    this._hideNotice = hideNotice;
  }

  public showPopOut(type: PopOutType, customData?: GenericObjectType): void {
    this._showPopOut(type, customData);
  }

  public hidePopOut(): void {
    this._hidePopOut();
  }

  public showNotice(customData: GenericObjectType): void {
    this._showNotice(customData);
  }

  public hideNotice(): void {
    this._hideNotice();
  }
}

const popOutHandler = new PopOutHandler();
export { popOutHandler };
