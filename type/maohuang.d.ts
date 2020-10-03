type NoParamReturnNulFunction = () => void;
type OneParamReturnNulFunction = (any: any) => void;
type GenericObjectType = { [key: string]: any };
type APIReturnFunction = (result: GenericObjectType, err: string) => void;

interface INoticePopOutConfig {
  noticeType: number;
  description: string;
  button: string;
}

interface IWithdrawDetails {
  bankType: number;
  bankName: string;
  username: string;
  cardNumber: string;
  cardType: string;
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
