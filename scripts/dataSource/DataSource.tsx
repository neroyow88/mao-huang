import PlayerModel from "./PlayerModel";
import ServerModel from "./ServerModel";
import SystemModel from "./SystemModel";

class DataSource {
  private _playerModel: PlayerModel;
  private _serverModel: ServerModel;
  private _systemModel: SystemModel;

  public constructor() {
    this._playerModel = undefined;
    this._serverModel = new ServerModel();
    this._systemModel = new SystemModel({ isMobile: false });
  }

  public updatePlayerModel(dt: GenericObjectType): void {
    this._playerModel = dt ? new PlayerModel(dt) : undefined;
  }

  public updateServerModel(dt: GenericObjectType): void {
    this._serverModel.updateBanner(dt);
  }

  public updateSystemModel(dt: GenericObjectType): void {
    this._systemModel = new SystemModel(dt);
  }

  public get playerModel(): PlayerModel {
    return this._playerModel;
  }

  public get serverModel(): ServerModel {
    return this._serverModel;
  }

  public get systemModel(): SystemModel {
    return this._systemModel;
  }
}

const dataSource = new DataSource();
export { dataSource };