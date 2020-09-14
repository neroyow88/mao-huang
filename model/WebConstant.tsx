export enum PopOutType {
  NONE = 0,
  REGISTER = 1,
  LOGIN = 2,
  PROFILE = 3,
  FORGOT_USERNAME = 4,
  FORGOT_PASSWORD = 5,

  DEPOSIT_WALLET = 11,
  DEPOSIT_INSTRUCTION = 12,

  CARD_MOBILE = 21,
  LOGIN_MOBILE = 22,

  NEWS = 98,
  NOTICE = 99,
}

export enum NoticeType {
  SUCCESS = 1,
  ERROR = 2,
  ACCOUNT = 3,
}

export enum DepositType {
  ALIPAY = 0,
  BANK = 1,
  WECHAT = 2,
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
};
