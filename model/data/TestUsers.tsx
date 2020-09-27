export const defaultProfile = {
  pinNumber: undefined,
  bank: [],
  wallet: {
    maohuang: 0,
    ky: 0,
    leg: 0,
    kg: 0,
    kmg: 0,
    ag: 0,
    ebet: 0,
    n2live: 0,
  },
  mail: [],
};

export const testAccounts = [
  {
    username: "nero",
    password: "123456",
    phoneNumber: "0123456789",
    profile: {
      username: "nero",
      phoneNumber: "0123456789",
      pinNumber: "123456",
      dailyReward: 5,
      banks: [
        {
          bankType: 0,
          bankName: "工商银行",
          username: "金城五",
          cardNumber: "1234567824689999",
          cardType: "储蓄卡",
        },
      ],
      wallets: {
        maohuang: 941704.28,
        ky: 5,
        leg: 20,
        kg: 0,
        kmg: 40,
        ag: 10.72,
        ebet: 180,
        n2live: 0.5,
      },
      mails: [
        {
          title: "关于充值",
          content:
            "您好！财务部收到您提交的充值通知，但未收到您的充值款项。由于支付宝对游戏充值有一定的限制，偶然会导致充值失败，请您理解。建议每次使用不同的金额进行支付宝充值，或选用有优惠活动的【银行转账】方式，进行支付宝转银行卡，谢谢您！",
          sender: "猫皇客服敬上",
          isRead: false,
        },
        {
          title: "留言標題標題A",
          content:
            "您好！财务部收到您提交的充值通知，但未收到您的充值款项。由于支付宝对游戏充值有一定的限制，偶然会导致充值失败，请您理解。建议每次使用不同的金额进行支付宝充值，或选用有优惠活动的【银行转账】方式，进行支付宝转银行卡，谢谢您！",
          sender: "猫皇客服敬上",
          isRead: true,
        },
        {
          title: "留言標題標題B",
          content:
            "您好！财务部收到您提交的充值通知，但未收到您的充值款项。由于支付宝对游戏充值有一定的限制，偶然会导致充值失败，请您理解。建议每次使用不同的金额进行支付宝充值，或选用有优惠活动的【银行转账】方式，进行支付宝转银行卡，谢谢您！",
          sender: "猫皇客服敬上",
          isRead: true,
        },
        {
          title: "留言標題標題C",
          content:
            "您好！财务部收到您提交的充值通知，但未收到您的充值款项。由于支付宝对游戏充值有一定的限制，偶然会导致充值失败，请您理解。建议每次使用不同的金额进行支付宝充值，或选用有优惠活动的【银行转账】方式，进行支付宝转银行卡，谢谢您！",
          sender: "猫皇客服敬上",
          isRead: true,
        },
      ],
    },
  },
];
