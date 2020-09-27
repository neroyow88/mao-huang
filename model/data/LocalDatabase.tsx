import { defaultProfile, testAccounts } from "./TestUsers";
import { ErrorType } from "./Error";

let localAccData;
if (!localAccData) {
  localAccData = testAccounts.slice(0, testAccounts.length);
  console.log("Accounts: ", localAccData);
}

function getAccount(username: string, phoneNumber?: string): GenericObjectType {
  let acc = undefined;
  testAccounts.forEach((data) => {
    if (
      data.username === username ||
      (phoneNumber && data.phoneNumber === phoneNumber)
    ) {
      acc = data;
    }
  });
  return acc;
}

let tempCode = undefined;
export function getVerificationCodeAPI(
  params: GenericObjectType,
  callback: APIReturnFunction
): void {
  const { phoneNumber } = params;
  const acc = getAccount("", phoneNumber);

  if (!acc) {
    callback(undefined, ErrorType.INVALID_PHONE_NUMBER);
    return;
  }

  let code = "";
  for (let i = 0; i < 6; i++) {
    const rand = Math.floor(Math.random() * 10);
    code = code + rand.toString();
  }
  tempCode = code;
  console.log("verificationCode: ", tempCode);
  callback({ success: true }, undefined);
}

export function registerAPI(
  params: GenericObjectType,
  callback: APIReturnFunction
): void {
  const { username, password, phoneNumber, verificationCode } = params;
  if (verificationCode !== tempCode) {
    callback(undefined, ErrorType.INVALID_VERIFICATION_CODE);
    return;
  }

  const acc = getAccount(username, phoneNumber);
  if (acc) {
    callback(undefined, ErrorType.USER_ALREADY_EXIST);
    return;
  }

  localAccData.push({
    username,
    password,
    phoneNumber,
    profile: Object.assign({}, defaultProfile, { username, phoneNumber }),
  });
}

export function loginAPI(
  params: GenericObjectType,
  callback: APIReturnFunction
): void {
  const { username, password, verificationCode } = params;
  const acc = getAccount(username);
  if (!acc) {
    callback(undefined, ErrorType.INVALID_USER);
    return;
  }

  if (acc.password !== password) {
    callback(undefined, ErrorType.INVALID_PASSWORD);
    return;
  }

  if (verificationCode !== -1 && verificationCode !== tempCode) {
    callback(undefined, ErrorType.INVALID_VERIFICATION_CODE);
    return;
  }

  callback(acc.profile, undefined);
}

export function logoutAPI(callback: APIReturnFunction): void {
  callback({ success: true }, undefined);
}

export function forgotUsernameAPI(
  params: GenericObjectType,
  callback: APIReturnFunction
): void {
  const { phoneNumber, verificationCode } = params;
  if (verificationCode !== tempCode) {
    callback(undefined, ErrorType.INVALID_VERIFICATION_CODE);
    return;
  }

  const acc = getAccount("", phoneNumber);
  if (!acc) {
    callback(undefined, ErrorType.INVALID_PHONE_NUMBER);
    return;
  }

  callback({ username: acc.username }, undefined);
}

export function forgotPasswordAPI(
  params: GenericObjectType,
  callback: APIReturnFunction
): void {
  const { username, newPassword, verificationCode } = params;
  if (verificationCode !== tempCode) {
    callback(undefined, ErrorType.INVALID_VERIFICATION_CODE);
    return;
  }

  const acc = getAccount(username);
  if (!acc) {
    callback(undefined, ErrorType.INVALID_USER);
    return;
  }

  acc.password = newPassword;
  callback({ success: true }, undefined);
}

export function changePasswordAPI(
  params: GenericObjectType,
  callback: APIReturnFunction
): void {
  const { username, oldPassword, newPassword, verifiedNewPassword } = params;
  const acc = getAccount(username);

  if (!acc) {
    callback(undefined, ErrorType.INVALID_USER);
    return;
  }

  if (acc.password !== oldPassword) {
    callback(undefined, ErrorType.INVALID_PASSWORD);
    return;
  }

  if (newPassword !== verifiedNewPassword) {
    callback(undefined, ErrorType.PASSWORD_NOT_VERIFIED);
    return;
  }

  acc.password = newPassword;
  callback({ success: true }, undefined);
}

export function setPinAPI(
  params: GenericObjectType,
  callback: APIReturnFunction
): void {
  const { username, pin, verifiedPin, verificationCode } = params;
  const acc = getAccount(username);

  if (!acc) {
    callback(undefined, ErrorType.INVALID_USER);
    return;
  }

  if (verificationCode !== tempCode) {
    callback(undefined, ErrorType.INVALID_VERIFICATION_CODE);
    return;
  }

  if (pin !== verifiedPin) {
    callback(undefined, ErrorType.PASSWORD_NOT_VERIFIED);
    return;
  }

  acc.profile.pinNumber = pin;
  callback({ success: true }, undefined);
}

export function claimDailyReward(
  params: GenericObjectType,
  callback: APIReturnFunction
): void {
  const { username, value } = params;
  const acc = getAccount(username);
  console.log(acc.profile.dailyReward, value);
  acc.profile.dailyReward = -1;
  acc.profile.wallets.maohuang += value;
  callback(acc.profile, undefined);
}
