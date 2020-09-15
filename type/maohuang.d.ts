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
  bankName: string;
  cardType: string;
  ownerName: string;
  cardNumber: string;
}
