export interface IWalletModel {
  maohuang: number;
  ky: number;
  leg: number;
  kg: number;
  kmg: number;
  ag: number;
  ebet: number;
  n2live: number;
}

export class MonthlyRewardModel {
  private _accumulate: number;
  private _canClaim: boolean;
  private _isRedeem: boolean;
  private _reward: number;

  public constructor(dt: GenericObjectType) {
    const { accumulate, canClaim, isRedeem, reward } = dt;
    this._accumulate = accumulate;
    this._canClaim = canClaim;
    this._isRedeem = isRedeem;
    this._reward = reward;
  }

  public get accumulate(): number {
    return this._accumulate;
  }

  public get canClaim(): boolean {
    return this._canClaim;
  }

  public get isRedeem(): boolean {
    return this._isRedeem;
  }

  public get reward(): number {
    return this._reward;
  }
}

export class BankAccountModel {
  private _bankType: number;
  private _bankName: string;
  private _username: string;
  private _cardNumber: string;
  private _cardType: string;

  public constructor(dt: GenericObjectType) {
    const { bankType, bankName, username, cardNumber, cardType } = dt;
    this._bankType = bankType;
    this._bankName = bankName;
    this._username = username;
    this._cardNumber = cardNumber;
    this._cardType = cardType;
  }

  public get bankType(): number {
    return this._bankType;
  }

  public get bankName(): string {
    return this._bankName;
  }

  public get username(): string {
    return this._username;
  }

  public get cardNumber(): string {
    return this._cardNumber;
  }

  public get cardType(): string {
    return this._cardType;
  }
}

export class MailModel {
  private _title: string;
  private _content: string;
  private _sender: string;
  private _isRead: boolean;

  public constructor(dt: GenericObjectType) {
    const { title, content, sender, isRead } = dt;
    this._title = title;
    this._content = content;
    this._sender = sender;
    this._isRead = isRead;
  }

  public get title(): string {
    return this._title;
  }

  public get content(): string {
    return this._content;
  }

  public get sender(): string {
    return this._sender;
  }

  public get isRead(): boolean {
    return this._isRead;
  }
}

export default class PlayerModel {
  private _username: string;
  private _phoneNumber: string;
  private _pinNumber: string;
  private _dailyReward: number;
  private _monthlyReward: { [keys: string]: MonthlyRewardModel };
  private _bankAccounts: BankAccountModel[];
  private _wallets: IWalletModel;
  private _mails: MailModel[];

  public constructor(dt?: GenericObjectType) {
    this.updateData(dt);
  }

  public updateData(dt: GenericObjectType): void {
    const {
      username,
      phoneNumber,
      pinNumber,
      dailyReward,
      monthlyReward,
      banks,
      wallets,
      mails,
    } = dt;
    this._username = username;
    this._phoneNumber = phoneNumber;
    this._pinNumber = pinNumber;
    this._dailyReward = dailyReward;

    const keys = Object.keys(monthlyReward);
    this._monthlyReward = Object.create(null);
    keys.forEach((key: string): void => {
      this._monthlyReward[key] = new MonthlyRewardModel(monthlyReward[key]);
      console.log("monthlyReward: ", monthlyReward);
    });

    this._bankAccounts = [];
    if (banks.length > 0) {
      for (let i = 0; i < banks.length; i++) {
        this._bankAccounts.push(new BankAccountModel(banks[i]));
      }
    }

    this._wallets = wallets;

    this._mails = [];
    if (mails.length > 0) {
      for (let i = 0; i < mails.length; i++) {
        this._mails.push(new MailModel(mails[i]));
      }
    }
  }

  public get username(): string {
    return this._username;
  }

  public get phoneNumber(): string {
    return this._phoneNumber;
  }

  public get pinNumber(): string {
    return this._pinNumber;
  }

  public get dailyReward(): number {
    return this._dailyReward;
  }

  public get monthlyReward(): { [keys: string]: MonthlyRewardModel } {
    return this._monthlyReward;
  }

  public get bankAccounts(): BankAccountModel[] {
    return this._bankAccounts;
  }

  public get wallets(): IWalletModel {
    return this._wallets;
  }

  public get mails(): MailModel[] {
    return this._mails;
  }
}
