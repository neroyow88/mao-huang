class BannerModel {
  private _sliderSrc: string;
  private _popOutSrc: string;
  private _popOutTitle: string;

  public constructor(dt: GenericObjectType) {
    const { ss, pos, pot } = dt;
    this._sliderSrc = ss;
    this._popOutSrc = pos;
    this._popOutTitle = pot;
  }

  public get sliderSrc(): string {
    return this._sliderSrc;
  }

  public get popOutSrc(): string {
    return this._popOutSrc;
  }

  public get popOutTitle(): string {
    return this._popOutTitle;
  }
}

export default class ServerModel {
  private _banners: BannerModel[];

  public constructor() {
    this._banners = [];
  }

  public updateBanner(data: GenericObjectType): void {
    const { b } = data;
    if (b.length > 0) {
      for (let i = 0; i < b.length; i++) {
        this._banners.push(new BannerModel(b[i]));
      }
    } else {
      this._banners = [];
    }
  }

  public get banners(): BannerModel[] {
    return this._banners;
  }

  public getBannerById(index: number): BannerModel {
    return this._banners[index];
  }
}
