export class GameListModel {
  private _constant: string;
  private _name: string;
  private _description: string;
  private _enable: boolean;

  public constructor(data: GenericObjectType) {
    const { constant, name, enable, description } = data;

    this._constant = constant;
    this._name = name;
    this._description = description ? description : undefined;
    this._enable = enable;
  }

  public get constant(): string {
    return this._constant;
  }

  public get name(): string {
    return this._name;
  }

  public get description(): string {
    return this._description;
  }

  public get enable(): boolean {
    return this._enable;
  }
}

export class PlatformsModel {
  private _gameList: { [keys: string]: GameListModel };

  public constructor(data: GenericObjectType) {
    this._gameList = Object.create(null);
    const keys = Object.keys(data);
    keys.forEach((key: string): void => {
      this._gameList[key] = data[key];
    });
  }

  public get gameList(): { [keys: string]: GameListModel } {
    return this._gameList;
  }

  public getGameListById(key: string): GameListModel {
    return this._gameList[key];
  }
}
