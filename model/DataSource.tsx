import PlayerModel from "./PlayerModel";
import SystemModel from "./SystemModel";

class DataSource {
  private _playerModel: PlayerModel;
  private _systemModel: SystemModel;

  public constructor() {
    this._playerModel = new PlayerModel({ isLogin: false });
    this._systemModel = new SystemModel({ isMobile: false });
  }

  public updatePlayerModel(dt: GenericObjectType): void {
    this._playerModel = new PlayerModel(dt);
  }

  public updateSystemModel(dt: GenericObjectType): void {
    this._systemModel = new SystemModel(dt);
  }

  public get playerModel(): PlayerModel {
    return this._playerModel;
  }

  public get systemModel(): SystemModel {
    return this._systemModel;
  }
}

const dataSource = new DataSource();
export { dataSource };
