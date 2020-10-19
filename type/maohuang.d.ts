type NoParamReturnNulFunction = () => void;
type OneParamReturnNulFunction = (any: any) => void;
type GenericObjectType = { [key: string]: any };
type APIReturnFunction = (result: GenericObjectType, err: string) => void;

interface INoticePopOutConfig {
  noticeType: number;
  description: string;
  button: string;
}

interface IGameListItem {
  title: string;
  description: string;
  prefix: string;
  childs?: string[];
}

interface IInfoPage {
  header?: string;
  contents: IInfoPageContent[];
}

interface IInfoPageContent {
  title: string;
  label: string;
}

interface IProfile {
  id: number;
  memberId: number;
  name: string;
  phoneNumber: number;
}

interface IGameDetail {
  constant: string;
  name: string;
  title: string;
  description?: string;
  enable: boolean;
  file: string;
  logo: string;
  wallet: string;
  btn?: string;
}

interface IAPIConfig {
  path: string;
  callback?: APIReturnFunction;
  params?: FormData;
}

interface IDepositAccount {
  id: number;
  type: number;
  title: string;
  depositType: string;
  minDeposit: number;
  maxDeposit: number;
}

interface IMonthlyReward {
  total: number;
  claimDate: number[];
  canClaim: boolean;
}

interface IWalletList {
  constant: string;
  title: string;
  balance: number;
}

interface IBankAccount {
  accountId: string;
  bankName: string;
  bankAccName: string;
  bankAccNumber: string;
  bankAccBranch: string;
  iconUrl: string;
}

interface IBankList {
  bankId: string;
  bankName: string;
}

interface ITransactionHistory {
  id: number;
  createDate: string;
  type: string;
  status: string;
  amount: string;
}

interface IMail {
  id: string;
  title: string;
  message: string;
  status: number;
}
