export enum ApiPath {
  GET_ANNOUNCEMENT = "v2/site/get-announcements",
  GET_BANNER = "v2/site/get-banners",
  GET_CONTACT_INFO = "v2/site/info",
  GET_GAME_LIST = "v2/game/list",

  REGISTER = "v2/user/register",
  REQUEST_TAC = "v2/user/register-captcha",
  VALIDATE_USERNAME = "v2/user/check-username-exist",
  VALIDATE_PHONE_NUMBER = "v2/user/check-handphone-exist",

  LOGIN = "v2/user/login",
  LOGOUT = "v2/user/logout",
  GET_LOGIN_STATUS = "v2/user/login-status",
  GET_LOGIN_CAPTCHA = "v2/user/login-captcha",
  GET_LOGIN_CAPTCHA_STATUS = "v2/user/login-captcha-status",

  FORGOT_USERNAME = "v2/user/forget-account",
  REQUEST_FORGOT_USERNAME_TAC = "v2/user/forget-account-captcha",
  FORGOT_PASSWORD = "v2/user/forget-password",
  REQUEST_FORGOT_PASSWORD_TAC = "v2/user/forget-password-captcha",

  GET_PROFILE = "v2/user/info",
  CHANGE_PASSWORD = "v2/user/reset-login-password",
  UPDATE_PIN = "v2/user/reset-withdraw-password",
  REQUEST_UPDATE_PIN_TAC = "v2/user/reset-withdraw-password-captcha",

  GET_DAILY_CHECK_IN = "v2/event/check-in-status",
  DAILY_CHECK_IN = "v2/event/check-in",
  GET_MONTHLY_CHECK_IN = "v2/tutorial/status",
  MONTHLY_CHECK_IN = "v2/tutorial/accumulated-price",

  GET_DEPOSIT_ACOUNTS = "v2/deposit/get-accounts",
  DEPOSIT_SUBMIT = "v2/deposit/submit",
  DEPOSIT_CONFIRM = "v2/deposit/confirm",
  DEPOSIT_CANCEL = "v2/deposit/cancel",

  GET_WITHDRAW_ACCOUNTS = "v2/withdraw/get-accounts",
  GET_WITHDRAW_BANK_LIST = "v2/withdraw/get-bank-list",
  ADD_WITHDRAW_ACCOUNT = "v2/withdraw/add-account",
  DELETE_WITHDRAW_ACCOUNT = "v2/withdraw/delete-account",
  SUBMIT_WITHDRAW = "v2/withdraw/submit",

  GET_TRANSFER_BALANCES = "v2/transfer/get-balance",
  GET_AUTO_TRANSFER_STATUS = "v2/transfer/get-auto-transfer",
  UPDATE_AUTO_TRANSFER_STATUS = "v2/transfer/switch-auto-transfer",
  RESTORE_BALANCE = "v2/transfer/restore-amount",
  TRANSFER_BALANCE = "v2/transfer/transfer",
  GET_HISTORY = "v2/cashflow/record",
  LOGIN_GAME = "v2/transfer/login-game",

  GET_MESSAGE = "v2/message/get",
  DELETE_MESSAGE = "v2/message/delete",

  // TODO
  REQUEST_LIVE_CHAT = "v2/site/online-customer-service",
}

export enum ValidateState {
  NONE = 0,
  NOT_EXIST = 1,
  EXIST = 2,
}

export enum PopOutType {
  NONE = 0,
  REGISTER = 1,
  LOGIN = 2,
  PROFILE = 3,
  FORGOT_USERNAME = 4,
  FORGOT_PASSWORD = 5,
  BANNER = 6,
  NEWS = 7,
  CARD = 8,

  DEPOSIT_WALLET = 11,
  DEPOSIT_INSTRUCTION = 12,
  WITHDRAW_SELECTION = 13,
  WITHDRAW_ACCOUNT_ADD = 14,
  WITHDRAW_DETAIL = 15,
  WITHDRAW_SUCCESS = 16,
  TRANSFER_WALLET = 17,
  MAILBOX = 18,
  HISTORY = 19,

  CARD_MOBILE = 101,
  LOGIN_MOBILE = 102,
}

export enum BrowserState {
  HOME = 0,
  ABOUT = 1,
}

export enum NoticeType {
  SUCCESS = 1,
  ERROR = 2,
  ACCOUNT = 3,
}

export enum AudioList {
  KISS = "kiss",
  MONEY = "money",
}

export enum AboutType {
  NONE = -1,
  ABOUT_US = 0,
  SERVICE = 1,
  DEPOSIT = 2,
  WITHDRAW = 3,
  QUESTION_ANSWER = 4,
  PRIVACY = 5,
}

export enum PlatformId {
  MAOHUANG = "1",
  KG = "2",
  EBET = "3",
  AG = "4",
  N2LIVE = "6",
  KY = "7",
  LE = "8",
  KMG = "9",
}

export const GameIdList = [
  PlatformId.MAOHUANG,
  PlatformId.KY,
  PlatformId.LE,
  PlatformId.KG,
  PlatformId.KMG,
  PlatformId.AG,
  PlatformId.EBET,
  PlatformId.N2LIVE,
];

export enum DepositType {
  ALIPAY = "1",
  WECHAT = "2",
  UNION = "3",
  ONLINE_BANKING = "4",
  BANK = "5",
}

export const DepositAccountIcon = {
  "1": "wallet/pay_icon.png",
  "2": "wallet/pay_wechat_icon.png",
  "5": "wallet/bank_icon.png",
};

export enum MailStatus {
  UNREAD = 1,
  READ = 2,
}

export const NoticePopOutConfig = {
  REGISTER_SUCCESS: {
    noticeType: NoticeType.SUCCESS,
    description: "注册成功",
    button: "回首页登入",
  },
  LOGIN_SUCCESS: {
    noticeType: NoticeType.SUCCESS,
    description: "登入成功",
    button: "完成",
  },
  LOGOUT_SUCCESS: {
    noticeType: NoticeType.SUCCESS,
    description: "登出成功",
    button: "完成",
  },
  GET_USERNAME_SUCCESS: {
    noticeType: NoticeType.ACCOUNT,
    description: "您的猫皇帐号为 abcd1234",
    button: "回首页登入",
  },
  CHANGE_PASSWORD_SUCCESS: {
    noticeType: NoticeType.SUCCESS,
    description: "重置密码成功",
    button: "回首页登入",
  },
  SET_PIN_SUCCESS: {
    noticeType: NoticeType.SUCCESS,
    description: "重置密码成功",
    button: "回首页登入",
  },

  USERNAME_ALREADY_EXIST: {
    noticeType: NoticeType.ERROR,
    description: "用户已存在",
    button: "返回操作",
  },
  VERIFICATION_CODE_INCORRECT: {
    noticeType: NoticeType.ERROR,
    description: "请填写正确的验证码",
    button: "返回操作",
  },
  PIN_NOT_VERIFIED: {
    noticeType: NoticeType.ERROR,
    description: "请填写正确的验证码",
    button: "返回操作",
  },
  VERIFICATION_CARD_INCORRECT: {
    noticeType: NoticeType.ERROR,
    description: "银行卡号输入不一致,请重新输入",
    button: "返回操作",
  },
  PIN_INCORRECT: {
    noticeType: NoticeType.ERROR,
    description: "猫皇提款密码错误,请重新输入。",
    button: "返回操作",
  },
};
