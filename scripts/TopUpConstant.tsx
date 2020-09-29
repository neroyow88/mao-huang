export const transactionModel = [
  {
    options: ["易付", "平安付", "众联付"],
    description: `提示:充值金额必须以"1-9"结尾`,
  },
  { options: ["平安银行", "工商银行"], description: "" },
  {
    options: ["平安银行", "工商银行"],
    description:
      "充值金额不能以元为整数,必须含角和分,例如:100.13,100.99,100.22",
  },
];
