export class BannerModel {
  private _id: number;
  private _sliderUrl: string;
  private _popOutUrl: string;
  private _name: string;

  public constructor(data: GenericObjectType) {
    const { id, url, big_banner_url, name } = data;
    this._id = id;
    this._sliderUrl = url;
    this._popOutUrl = big_banner_url;
    this._name = name;
  }

  public get id(): number {
    return this._id;
  }

  public get sliderUrl(): string {
    return this._sliderUrl;
  }

  public get popOutUrl(): string {
    return this._popOutUrl;
  }

  public get name(): string {
    return this._name;
  }
}

export class BannersModel {
  private _banners: BannerModel[];

  public constructor(data: GenericObjectType) {
    this._banners = [];
    const keys = Object.keys(data);
    keys.forEach((key: string): void => {
      this._banners.push(new BannerModel(data[key]));
    });
  }

  public get banners(): BannerModel[] {
    return this._banners;
  }

  public getBannerById(index: number): BannerModel {
    return this._banners[index];
  }
}
